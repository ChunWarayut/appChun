import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  data;
  total = 0;
  constructor(
    public database: AngularFireDatabase,
    public router: Router
  ) { }

  async ngOnInit() {
    
    var user = firebase.auth().currentUser;
    if (user) {
      
    } else {
      this.router.navigate(['/home']);
    }

    await this.database.list('/cartList/' + firebase.auth().currentUser.uid).valueChanges().subscribe(_data => {
      this.data = _data;
      console.log(_data);
    });

    await firebase.database().ref('cartList/' + firebase.auth().currentUser.uid).orderByChild('amout').on('child_added', _data => {
      
      this.total += _data.val().amout;
      const summary = {
        total: this.total
      };
    firebase.database().ref().update(summary);
    });
  }
  async  goBack() {
    await  this.router.navigate(['/food']);
  }
  async goTO() {
    await this.router.navigate(['/cartTwo']);
  }
}
