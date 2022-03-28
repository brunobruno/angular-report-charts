import { Component, OnInit } from '@angular/core'
import { apiServices } from './services/api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

  opened: boolean = true;
  users : {email:string, firstName:string, lastName:string, userId:string}[] = []
  activeUser: any;//specify

  constructor() { }

  ngOnInit(): void {
    this.loadUser()
  }

  async loadUser(){
    this.users = await apiServices.apiGet('users');
    this.activeUser = this.users[0]
  }
}
