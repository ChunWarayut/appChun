import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  email: any;
  password: any;
  name: any;
  location: any;
  phone: any;
  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  async signupF() {
    const toast = await this.toastCtrl.create({
      message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  async signup() {
    const account =  {
      name: this.name || '',
      location: this.location || '',
      phone: this.phone || '',
      email: this.email,
      password: this.password
    };
    const loader =  await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await  loader.present();
    firebase.auth().createUserWithEmailAndPassword(account['email'], account['password'])
    .then(
      newUser => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: this.name,
          // tslint:disable-next-line:max-line-length
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/lungnuad-a547e.appspot.com/o/Untitled-12.ico?alt=media&token=b7de86c3-bdd4-4a43-871e-e5cc5e0b36af'
        }).then(function() {
          // Update successful.
        }).catch(function(error) {
          // An error happened.
        });

        firebase.auth().signInWithEmailAndPassword(account['email'], account['password'])
          .then(
            authUser => {
              firebase.database().ref('users').child(authUser.user.uid).set(account);
              loader.dismiss();
        }
      )
      .catch(async error => {
        const toast = await this.toastCtrl.create({
          message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
          duration: 3000,
          position: 'top'
        });
        await toast.present();
      });
    }
    )
    .catch(function(error) {
    });
    this.router.navigate(['/home']);
  }
}
