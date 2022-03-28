import { environment } from '../../environments/environment';
export class apiServices {

    static async apiGet(service:string) {
        try{
            const request = await fetch(`${environment.apiUrl}${service}`);
            const response = await request.json();
            return response.data;
        }
        catch(err : unknown){
            console.log(err);
        }
    }

    static async apiPostReport(from:string, to:string, projectId:string, gatewayId:string ) {
        const todayDate = new Date();
        const todayLessOneYear = new Date();
        todayLessOneYear.setMonth(todayLessOneYear.getMonth() - 12);

        try{
            const request = await fetch(`${environment.apiUrl}report`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                  {
                    from: from ? this.formatDate(from) : todayLessOneYear.toISOString().slice(0, 10),
                    to: to ? this.formatDate(to) : todayDate.toISOString().slice(0, 10),
                    projectId : projectId,
                    gatewayId : gatewayId
                  })
                });
              const response = await request.json();

              return response.data;
              
        }
        catch(err : unknown){
            console.log(err);
        }
    }

    static formatDate(date:string){
        const datePiece = date.split('/')
        return `${datePiece[2]}-${datePiece[1]}-${datePiece[0]}`
    }


}


