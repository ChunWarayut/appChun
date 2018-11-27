import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  food;
  ID = firebase.auth().currentUser.uid;
  
  constructor(
    public database: AngularFireDatabase,
    public router: Router) { }


  ngOnInit() {
    this.database.list('/users-detail/'  + this.ID, ref => ref.orderByChild('statusNumC').equalTo(0)).valueChanges().subscribe(_data => {
      this.food = _data;
      console.log(_data);
    });

  }

  onClick(item) {
    this.router.navigate(['/detail-list', item]);
  }
}
