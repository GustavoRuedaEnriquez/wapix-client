import { Component, OnInit } from '@angular/core';
import { NavbarConfigService } from '../../globals/services/navbar-config.service';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../globals/services/socket.service';

@Component({
  selector: 'app-guest-question',
  templateUrl: './guest-question.component.html',
  styleUrls: ['./guest-question.component.scss']
})
export class GuestQuestionComponent implements OnInit {

  username:string = '';
  data:any = {};
  question:any = {};
  answers:any = [];

  constructor(
    private navbarConfigService:NavbarConfigService,
    private activatedRoute:ActivatedRoute,
    private socketService:SocketService)
  {
    this.navbarConfigService.hideNavbar();
    this.activatedRoute.params.subscribe( params => {
      this.username = params.username;
      console.log(this.username);
    });
  }

  ngOnInit(): void {
    this.socketService.on('wapix-send-question', (data) => {
      this.data = data;
      this.question = this.data.question;
      this.answers = this.question.answers;
      console.log(data);
    });
  }

}
