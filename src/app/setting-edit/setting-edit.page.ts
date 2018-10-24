import { Component, OnInit } from '@angular/core';
import  * as    firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-edit',
  templateUrl: './setting-edit.page.html',
  styleUrls: ['./setting-edit.page.scss'],
})
export class SettingEDITPage implements OnInit {

  
  email
  location
  name
  phone
  password
  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value').then( _data => {
      console.log(_data.val());
      this.email =  _data.val().email
      this.location = _data.val().location
      this.name = _data.val().name
      this.phone = _data.val().phone
      this.password = _data.val().password
    })

  }

  edit() {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: this.name,
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });

    const account = {
      email :  this.email,
      location : this.location,
      name : this.name,
      phone : this.phone
    }
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).update(account).then( () =>{
      this.router.navigate(['setting'])
    });
  }
}
