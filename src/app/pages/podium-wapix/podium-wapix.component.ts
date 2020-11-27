import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SocketService } from '../../globals/services/socket.service';
import { NavbarConfigService } from '../../globals/services/navbar-config.service';

@Component({
  selector: 'app-podium-wapix',
  templateUrl: './podium-wapix.component.html',
  styleUrls: ['./podium-wapix.component.scss']
})

export class PodiumWapixComponent implements OnInit {

  totalResults:any = [];
  topFivePlayers:any = [];

  constructor(
    private navbarConfigService:NavbarConfigService,
    private titleService: Title,
    private socketService:SocketService)
  {
    this.navbarConfigService.hideNavbar();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Wapix | Podium');
    /* Event that receives the results of the guest */
    this.socketService.on('wapix-update-podium', (total) => {
      this.totalResults.push(total);
      this.calculateTopFive();
    });
  }

  calculateTopFive() {
    let topFive = [];
    topFive = this.totalResults.sort((a,b) => { return b.total - a.total });
    this.topFivePlayers = [];
    if(topFive.length <= 5) {
      this.topFivePlayers = topFive;
    } else {
      for(let i = 0; i < 5; i++) {
        this.topFivePlayers.push(topFive[i]);
      }
    }
    console.log(this.topFivePlayers);
  }

  exitWapix() {
    this.socketService.disconnect();
  }



}
