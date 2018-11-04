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

  username = firebase.auth().currentUser.displayName;
  photoURL = firebase.auth().currentUser.photoURL;
  food;
  constructor(
    public database: AngularFireDatabase,
    public router: Router
  ) {
   }

  ngOnInit() {
    const user = firebase.auth().currentUser;
    if (!user) {
      this.router.navigate(['/home']);
    }

    firebase.auth().onAuthStateChanged(function(users) {
      if (users) {
        // User is signed in.
        const displayName = users.displayName;
        const email = users.email;
        const uid = users.uid;

        console.log(displayName, email, uid, this.photoURL);


        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
    this.database.list('/food-list/').valueChanges().subscribe(_data => {
      this.food = _data;
    });
  }
  onClick(item) {
    this.router.navigate(['/foodDetail', item]);
  }
}
