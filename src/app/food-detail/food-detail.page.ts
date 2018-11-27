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
  warmth: number = 1;
  brightness: number = 1;
  newPostKey = firebase.database().ref().child('posts').push().key;
  food;
  item: any;
  amout:number;
 tt
  y: number[] = [ 
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100
  ];
  constructor(
    private route: ActivatedRoute,
    public toastController: ToastController,
    private router: Router
  ) {
  }
  onClick() {
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
          foodID: this.newPostKey,
          food: param.FOOD_NAME,
          price: param.FOOD_PRICE,
          amount: this.amout,
          amout: this.amout * param.FOOD_PRICE
        };
        const update = {}
        const sum : number =Number(param.amount) + this.amout
        update['cartList/' + firebase.auth().currentUser.uid + '/' + this.newPostKey] = cartList;
        update['food-list/' + param.key + '/' + 'amount'] = Number(sum); 
        firebase.database().ref().update(update);
        this.goTO();
      }
    );
  }
  async goTO() {
    await  this.router.navigate(['/cart']);
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
