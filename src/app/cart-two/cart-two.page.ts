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
          id: firebase.database().ref().child('posts').push().key,
          name: this.name,
          location: this.location,
          food: _data,
          status: 'กำลังดำเนินการ',
          total: dat.val()
        };
            
        // Get a key for a new Post.
        let newPostKey = firebase.database().ref().child('posts').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        let updates = {};
        updates['/detail/' + newPostKey] = list;
        updates['/users-detail/'  + this.UID +'/' + newPostKey] = list;

        return firebase.database().ref().update(updates).then((_data)=>{
          let cartclc = {
            cartList:''
          };
          let totalclc = {
            total:''
          }
          firebase.database().ref().update(cartclc);
          firebase.database().ref().update(totalclc);/* 
          var ref = firebase.database().ref('/detail/');
          ref.orderByKey().on("child_added", function(snapshot) {
            console.log(snapshot.key);

            if(snapshot.val().food == null || snapshot.val().total == null ){
              firebase.database().ref('/detail/' + snapshot.key).remove();
            }
          })          
          var ref2 = firebase.database().ref('users-detail/'  + this.UID );
          ref2.orderByKey().on("child_added", function(snapshot) {
            console.log(snapshot.key);
            firebase.auth().currentUser.uid

            if(snapshot.val().food == null ||  snapshot.val().total == null ){
            firebase.database().ref('users-detail/'+ firebase.auth().currentUser.uid + '/' + snapshot.key ).remove();              
            }
          }) */

          this.router.navigate(['/detail']);        
        }
        );
      });
    });
  });
  }
  pushCartNew() {
  }
}
