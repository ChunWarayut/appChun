import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { SeoService } from '../app/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'หน้าหลัก',
      url: '/food',
      icon: 'home'
    },
    {
      title: 'เมนูยอดนิยม',
      url: '/foodRank',
      icon: 'ribbon'
    },
    {
      title: 'อาหารที่สั่ง',
      url: '/cart',
      icon: 'cart'
    },
    {
      title: 'สถานะอาหาร',
      url: '/detail',
      icon: 'basket'
    },
    {
      title: 'ข้อมูลส่วนตัว',
      url: '/setting',
      icon: 'contact'
    }
  ];

  constructor(
    private seo: SeoService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router
  ) {
    seo.addTwitterCard(
      'ร้านอาหารลุงหนวด',
      'ร้านอาหารลุงหนวด ร้านเด็ดในอำเภอเมืองพล จังหวัดขอนแก่น',
      '../assets/icon/img.jpg'
    );
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
