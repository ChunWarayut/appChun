import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
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
        this.item = param.id;
        console.log(this.item);
        
        var ref2 = firebase.database().ref('users-detail/'  + firebase.auth().currentUser.uid + '/' + '-LPN4sgXxLd3fCPIJ21l');
        ref2.orderByKey().on("value", function(snapshot) {
          console.log(snapshot.val());
        })
      }
    );
  }

}
