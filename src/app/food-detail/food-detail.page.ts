import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage implements OnInit {

  newPostKey = firebase.database().ref().child('posts').push().key;
  food;
  item: any;
  amout;
  constructor(
    private route: ActivatedRoute,
    public toastController: ToastController,
    private router: Router
  ) {
  }
  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.item = param;
        console.log(param);
      }
    );
  }
  async  createCartList() {
    await  this.route.params.subscribe(
      param => {
        const  cartList = {
          id: this.newPostKey,
          food: param.FOOD_NAME,
          price: param.FOOD_PRICE,
          amount: this.amout,
          amout: this.amout * param.FOOD_PRICE
        };
        firebase.database().ref('cartList/').push(cartList);
        this.goTO();
      }
    );
  }
  async goTO() {
    await  this.router.navigate(['cart']);
  }
  async  goBack() {
    await  this.router.navigate(['/food']);
  }
  async  errorCreate() {
    const toast = await this.toastController.create({
      message: 'กรุณาใส่จำนวนที่ต้องการสั่ง',
      duration: 3000,
      position: 'top'
    });
    return  toast.present();
  }
}