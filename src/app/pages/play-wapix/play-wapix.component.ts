import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play-wapix',
  templateUrl: './play-wapix.component.html',
  styleUrls: ['./play-wapix.component.scss']
})
export class PlayWapixComponent implements OnInit {

  wapixId:string;

  constructor(private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe( params => {
      this.wapixId = params.id;
    })
   }

  ngOnInit(): void {
  }

}
