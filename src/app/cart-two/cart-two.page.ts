import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-cart-two',
  templateUrl: './cart-two.page.html',
  styleUrls: ['./cart-two.page.scss'],
})
export class CartTwoPage implements OnInit {
  UID = firebase.auth().currentUser.uid;
  name = firebase.auth().currentUser.displayName;
  location;

  item;
  constructor(
    public route: ActivatedRoute,
    public database: AngularFireDatabase,
    public router: Router
  ) { }

  ngOnInit() {
    this.database.list('cart-list').valueChanges().subscribe(_data => {
      console.log(_data);
      firebase.database().ref('users/' + this.UID).once('value').then(data => {
        this.location = data.val().location;
      });
    });
  }
  async  goBack() {
    await  this.router.navigate(['/food']);
  }
  async pushCart() {
    await firebase.database().ref('total').once('value').then(dat => {
      console.log(dat.val());
    this.database.list('cart-list').valueChanges().subscribe(_data => {
      console.log(_data);
      firebase.database().ref('users/' + this.UID).once('value').then(data => {
        this.location = data.val().location;
        const list = {
          name: this.name,
          location: this.location,
          food: _data,
          total: dat.val()
        };
        firebase.database().ref('detail').push(list);
        this.router.navigate(['/cartload']);
      });
    });
  });
  }
  pushCartNew() {
  }
}
