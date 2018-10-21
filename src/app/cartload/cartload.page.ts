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

  user = firebase.auth().currentUser
  constructor(
    public loadingController: LoadingController,
    public router: Router
  ) {
    
   }

   doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.router.navigate(['/detail']);                                
    }, 2000);
  }


 ngOnInit() {
  var ref = firebase.database().ref('/cart-list/');
    ref.orderByKey().limitToLast(1).on("child_added", function(snapshot) {
      
      if(snapshot.val()==null){
        setTimeout(() => {
        this.router.navigate(['/detail']);                          
        }, 3000);
      }
    })
  }

  ionClick() {
    firebase.database().ref('cart-list').remove();
    firebase.database().ref('total').remove();
    var ref = firebase.database().ref('/detail/');
    ref.orderByKey().on("child_added", function(snapshot) {
      console.log(snapshot.key);

      if(snapshot.val().food == null){
        firebase.database().ref('/detail/' + snapshot.key).remove();
      }
    })

    ref.orderByKey().on("child_added", function(snapshot) {
      console.log(snapshot.key);
      
     
      if(snapshot.val().total == null){
        firebase.database().ref('/detail/' + snapshot.key).remove();
      }
      
    })
    this.router.navigate(['/detail']);        
  }
}
