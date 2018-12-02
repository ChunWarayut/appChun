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

  detailID;
  DID
  name;
  item;
  total;
  location;
  status;
  color;

/*
  id = '00';
  location = '000';
  name = '000';
  status = '000';
  total = '0000'; */

  detail;
  constructor(
    public database: AngularFireDatabase,

    private route: ActivatedRoute,

  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.detailID = param.detailID;
        this.DID = param.DID;
        this.name = param.name;
        this.total = param.total;
        this.location = param.location;
        this.status = param.status;
        this.color = param.color;
        this.database.list('users-detail/'  + firebase.auth().currentUser.uid + '/' + param.detailID).valueChanges().subscribe(_data => {
          this.detail = _data[3];
          console.log(this.detail);
        });
      }
    );
  }

}
