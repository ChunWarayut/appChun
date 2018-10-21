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
        let d = new Date();
        let curr_date = d.getDate();
        let curr_month = d.getMonth() + 1; //Months are zero based
        let curr_year = d.getFullYear();
        let curr_hourse = d.getHours();
        let curr_minutes = d.getMinutes();
        let curr_secounds = d.getSeconds();
        const list = {
          id: 'abc',
          name: this.name,
          location: this.location,
          food: _data,
          status: 'กำลังดำเนินการ',
          total: dat.val()
        };
            
        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('posts').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        let  uid = '1';
        updates['/detail/' + newPostKey] = list;
        updates['/user-detail/'  + this.UID +'/' +newPostKey] = newPostKey, list;

        return firebase.database().ref().update(updates).then((_data)=>{
          this.router.navigate(['/cartload'])
        }
        );
      });
    });
  });
  }
  pushCartNew() {
  }
}
