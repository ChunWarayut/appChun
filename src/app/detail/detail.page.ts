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

  IDE
  constructor(
    public database: AngularFireDatabase,
    public router: Router) { }

  ngOnInit() {
    
    var user = firebase.auth().currentUser;
    if (user) {
      
    } else {
      this.router.navigate(['/home']);
    }

    this.database.list('/users-detail/'  + this.ID, ref => ref.orderByChild('status')).valueChanges().subscribe(_data => {
      this.food = _data;
      console.log(_data);
    });
  }

  onClick(item) {
    
      
      firebase.database().ref('cartList/' + firebase.auth().currentUser.uid).orderByKey().on("child_added", snap =>{

        this.IDE = snap.key

      });       


    let cartUP = {
      amount:"",
      amout:"", 
      food:"" ,
      foodID:"",
      price:""
    } 

    firebase.database().ref('/cartList/' +  firebase.auth().currentUser.uid+ '/'  + this.IDE ).update(cartUP).then( () => {

     firebase.database().ref('/cartList/'  +  firebase.auth().currentUser.uid+ '/' + this.IDE ).remove();            

    })

    var ref = firebase.database().ref('/detail/');
    ref.orderByKey().on("child_added", function(snapshot) {
      console.log(snapshot.key);

      if(snapshot.val().food == null || snapshot.val().total == "" || snapshot.val().food[0].foodID == ""){
        setTimeout(() => {
        firebase.database().ref('/detail/' + snapshot.key).remove();          
        }, 2000);
      }
    })          
    var ref2 = firebase.database().ref('users-detail/'  + this.ID );
    ref2.orderByKey().on("child_added", function(snapshot) {
      console.log(snapshot.key);
      firebase.auth().currentUser.uid

      if(snapshot.val().food == null ||  snapshot.val().total == "" || snapshot.val().food[0].foodID == ""){
      firebase.database().ref('users-detail/'+ firebase.auth().currentUser.uid + '/' + snapshot.key ).remove();              
      }
      
    })

    this.router.navigate(['/detail-list', item]);
  }
}
