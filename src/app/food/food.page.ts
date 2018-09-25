import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {

/*   username = firebase.auth().currentUser.displayName;
  photoURL = firebase.auth().currentUser.photoURL; */
  food;
  constructor(
    public database: AngularFireDatabase,
    public router: Router
  ) {
   }

  ngOnInit() {
    this.database.list('/food-list/').valueChanges().subscribe(_data => {
      this.food = _data;
    });
  }
  onClick(item) {
    this.router.navigate(['/foodDetail', item]);
  }
}
