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
    this.database.list('/users-detail/'  + this.ID, ref => ref.orderByChild('status')).valueChanges().subscribe(_data => {
      this.food = _data;
      console.log(_data);
    });
  }

  onClick(item) {
    
    let cartclc = {
      cartList:''
    };
    setTimeout(() => {

    firebase.database().ref().update(cartclc);
    }, 500);
    
    var ref = firebase.database().ref('/detail/');
    ref.orderByKey().on("child_added", function(snapshot) {
      console.log(snapshot.key);

      if(snapshot.val().food == null || snapshot.val().total == null ){
        firebase.database().ref('/detail/' + snapshot.key).remove();
      }
    })          
    var ref2 = firebase.database().ref('users-detail/'  + this.ID );
    ref2.orderByKey().on("child_added", function(snapshot) {
      console.log(snapshot.key);
      firebase.auth().currentUser.uid

      if(snapshot.val().food == null ||  snapshot.val().total == null ){
      firebase.database().ref('users-detail/'+ firebase.auth().currentUser.uid + '/' + snapshot.key ).remove();              
      }
    }) 

    this.router.navigate(['/detail-list', item]);
  }
}
