import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
@Component({
  selector: 'app-food-rank',
  templateUrl: './food-rank.page.html',
  styleUrls: ['./food-rank.page.scss'],
})
export class FoodRankPage implements OnInit {

  food;
  constructor(
    public database: AngularFireDatabase,
    public router: Router
  ) {
   }

  ngOnInit() {
    
    var user = firebase.auth().currentUser;
    if (!user) {
      this.router.navigate(['/home']);      
    }
    this.database.list('/food-list/', ref => ref.orderByChild('amount').startAt(1).limitToFirst(4)).valueChanges().subscribe(_data => {
      this.food = _data;
    });
  }
  onClick(item) {
    this.router.navigate(['/foodDetail', item]);
  }
}