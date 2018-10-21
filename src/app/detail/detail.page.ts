import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  food;
  ID = firebase.auth().currentUser.uid;
  constructor(
    public database: AngularFireDatabase,
    public router: Router) { }

  ngOnInit() {
    this.database.list('/detail/' ).valueChanges().subscribe(_data => {
      this.food = _data;
      console.log(_data);
      
    });
  }

  onClick(item) {
    this.router.navigate(['/detail-list', item]);
  }
}
