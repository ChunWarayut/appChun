import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.page.html',
  styleUrls: ['./detail-list.page.scss'],
})
export class DetailListPage implements OnInit {

  item: any;

  constructor(
    
    private route: ActivatedRoute,
  ) { 
    
  }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.item = param;
        console.log(param);
      }
    );
  }

}
