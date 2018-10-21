import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.page.html',
  styleUrls: ['./detail-list.page.scss'],
})
export class DetailListPage implements OnInit {

  item: any;
/* 
  id = '00';
  location = '000';
  name = '000';
  status = '000';
  total = '0000'; */

  detail
  constructor(
    public database: AngularFireDatabase,
    
    private route: ActivatedRoute,

  ) { 
    
  }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.item = param.id;
        console.log(this.item);
        this.database.list('users-detail/'  + firebase.auth().currentUser.uid + '/' + this.item).valueChanges().subscribe(_data => {
          this.detail = _data;
          console.log(_data);
        });
      }
    );
  }

}
