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

  ngOnInit() {
    this.database.list('/cart-list/').valueChanges().subscribe(_data => {
      this.data = _data;
      console.log(_data);
    });
    firebase.database().ref('cart-list').orderByChild('amout').on('child_added', _data => {
      let add = 0;
      add = Number( _data.val().amout );
      this.total += add;
      console.log(this.total);
      const summary = {
        total: this.total
      };
    firebase.database().ref('total').update(summary);
    });
  }
  async  goBack() {
    await  this.router.navigate(['/food']);
  }
  async goTO() {
    await this.router.navigate(['/cartTwo']);
  }
}
