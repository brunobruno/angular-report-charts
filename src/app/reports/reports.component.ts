import {Component, OnInit} from '@angular/core'
import {apiServices} from '../services/api.service'
import {projectType,projectFirstItem, gatewayType,gatewayFirstItem,colorsArray} from './reportTypes'
import {ChartData, ChartType} from 'chart.js'
import {DateAdapter} from '@angular/material/core'

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
})

export class ReportsComponent implements OnInit {
	
    public chartLabels: string[] = []
	public chartValues: number[] = []
    public chartTotal: number = 0
    public chartData: ChartData <'doughnut'> = {
        labels: this.chartLabels,
        datasets: [{data: this.chartValues}]
    };
    public chartType: ChartType = 'doughnut'
    public projects: projectType = []
    public gateways: gatewayType = []
    public selectedGateway : string = ''
    public selectedProject : string = ''
    public reportObj : any = []
    public showChart : string[] = []

    constructor(private dateAdapter: DateAdapter<Date>) {
        this.dateAdapter.setLocale('en-GB')
    }

    ngOnInit(): void {
        this.loadData()
    }

    async loadData() {
        this.projects = await apiServices.apiGet('projects')
        this.projects.unshift(projectFirstItem)
        this.gateways = await apiServices.apiGet('gateways')
        this.gateways.unshift(gatewayFirstItem)
    }

    async postReport(from: string, to: string, projectId: string, gatewayId: string) {
        //values for interface
        this.selectedGateway = this.getProjectOrGatewayNameById(gatewayId,'g')
        this.selectedProject= this.getProjectOrGatewayNameById(projectId,'p')
        //call api
        const reports = await apiServices.apiPostReport(from, to, projectId, gatewayId)
		//group results by project
        const groupByProjectId = reports.reduce((r: any, a: any) => {
            r[a.projectId] = [...(r[a.projectId] || []), a]
            return r;
        }, [])
		//reset reports data
		this.reportObj = []
		this.chartLabels = []
		this.chartValues = []
		this.chartData = {
			labels: this.chartLabels,
			datasets: [{
				data: this.chartValues,
                backgroundColor: colorsArray,
			}],
		};
        //generate report for interface
        for (const [key, value] of Object.entries(groupByProjectId)) {
            const valuesArray: any = value
			const projectName : string = this.getProjectOrGatewayNameById(key,'p')
			const totalAmount : number = valuesArray.reduce((total: any, currentValue: any) => { return total + currentValue.amount}, 0)
			//generate chart
			this.chartLabels.push(projectName)
			this.chartValues.push(totalAmount)
			//generate report data
            this.reportObj.push({
                projectId: projectName,
                totalAmount: totalAmount,
                items: value
            })
        }
        //total amount all
        this.chartTotal = this.chartValues.reduce((a, b) => a + b, 0)
        //show hide chart
        this.showChart = [this.selectedGateway,this.selectedProject].filter(item => item.indexOf('All') > -1)
    }

    getProjectOrGatewayNameById(id:string='',type:string){
        return type ==='p' ?
            this.projects.filter(item => item.projectId == id)[0].name :
            this.gateways.filter(item => item.gatewayId == id)[0].name
    }


}