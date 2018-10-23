import { Component, OnInit } from '@angular/core';
import  * as    firebase from 'firebase';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  email
  location
  name
  phone
  constructor(
    public router: Router,
    public loadingController: LoadingController,    
  ) { }

  ngOnInit() {
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value').then( _data => {
      console.log(_data.val());
      this.email =  _data.val().email
      this.location = _data.val().location
      this.name = _data.val().name
      this.phone = _data.val().phone
    })
  }

  btnLogout() {
    
    firebase.auth().signOut().then( async () => {
      const loading = await this.loadingController.create({
        message: 'กำลังออกจากระบบ',
        duration: 2000
      });
      await loading.present().then(() => {        
      this.router.navigate(['home']);
      });
    })
  }
}
