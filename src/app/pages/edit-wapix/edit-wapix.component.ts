import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-edit-wapix',
  templateUrl: './edit-wapix.component.html',
  styleUrls: ['./edit-wapix.component.scss']
})
export class EditWapixComponent implements OnInit {

  wapixId:number;

  constructor(private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe( params => {
      console.log(params.id);
    });
  }

  ngOnInit(): void {
  }

}
