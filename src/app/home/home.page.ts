import { Router } from '@angular/router';
import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email: any;
  password: any;
  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    public router: Router
    ) {
      const user = firebase.auth().currentUser;
      if (!user) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/food']);
      }
      firebase.auth().signOut();
    }

  async loginFailPresentToast() {
    const toast = await this.toastController.create({
      message: 'อีเมล์หรือรหัสผ่านไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async login() {
    const loading = await this.loadingController.create({
      message: 'รอสักครู่',
      duration: 2000
    });
    await loading.present();
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    .then(authData => {
      this.router.navigate(['/food']);
      loading.dismiss();
    }).catch(async error => {
      const toast = await this.toastController.create({
        message: 'อีเมล์หรือรหัสผ่านไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.password = '';
      loading.dismiss();
    }
    );
  }
  signup() {
    this.router.navigate(['/signup']);
  }
}
