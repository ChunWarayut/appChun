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
  nameID = firebase.auth().currentUser.uid;
  
  location;

  total;
  item;
  constructor(
    public route: ActivatedRoute,
    public database: AngularFireDatabase,
    public router: Router
  ) { }

  async ngOnInit() {
    this.database.list('cartList').valueChanges().subscribe(_data => {
      console.log(_data);
      firebase.database().ref('users/' + this.UID).once('value').then(data => {
        this.location = data.val().location;
      });
    });
    await firebase.database().ref('total').once('value').then(dat => {
      console.log(dat.val());
      this.total = dat.val();
    });
  }
  async  goBack() {
    await  this.router.navigate(['/food']);
  }
  async pushCart() {
    
    this.database.list('cartList').valueChanges().subscribe(_data => {
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
        
        // Get a key for a new Post.
        let newPostKey = firebase.database().ref().child('posts').push().key;
        const list = {
          detailID: newPostKey,
          name: this.name,
          nameID: this.nameID,
          location: this.location,
          food: _data,
          date: curr_date + "-" + curr_month + "-" +  curr_year + ", " + curr_hourse + ":" + curr_minutes + ":" + curr_secounds,
          status: 'กำลังดำเนินการ',
          total: this.total
        };
        // Write the new post's data simultaneously in the posts list and the user's post list.
        let updates = {};
        updates['/detail/' + newPostKey] = list;
        updates['/users-detail/'  + this.UID +'/' + newPostKey] = list;

        return firebase.database().ref().update(updates).then((_data)=>{
         
          let totalclc = {
            total:''
          }
          firebase.database().ref().update(totalclc)
          this.router.navigate(['detail']);          
        }
        );
      });
    });

  }
  pushCartNew() {
  }

}
