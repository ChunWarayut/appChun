import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-cartload',
  templateUrl: './cartload.page.html',
  styleUrls: ['./cartload.page.scss'],
})
export class CartloadPage implements OnInit {

  constructor(
    public loadingController: LoadingController,
    public router: Router
  ) {
     setTimeout(async() => {
      const loadding = loadingController.create({
        message: 'รอสักครู่',
        duration: 5000
      });
    }, 0);
    setTimeout(() => {
      firebase.database().ref('cart-list').remove();
      firebase.database().ref('total').remove();
      this.router.navigate(['/detail']);
     }, 5000);
   }

 ngOnInit() {
  setTimeout(async() => {
    const loadding = this.loadingController.create({
      message: 'รอสักครู่',
      duration: 5000
    });
  }, 0);
  setTimeout(() => {
    firebase.database().ref('cart-list').remove();
    firebase.database().ref('total').remove();
    this.router.navigate(['/detail']);
   }, 5000);
  }

  ionViewWillLoad() {
    setTimeout(async() => {
      const loadding = this.loadingController.create({
        message: 'รอสักครู่',
        duration: 5000
      });
    }, 0);
    setTimeout(() => {
      firebase.database().ref('cart-list').remove();
      firebase.database().ref('total').remove();
      this.router.navigate(['/detail']);
     }, 5000);
  }
}
