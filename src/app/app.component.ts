import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { monthNames } from "../providers/config";

import { HomePage } from '../pages/home/home';
import { MonthsPage } from '../pages/months/months';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();

      storage.get('months').then((data) => {
        if (data == null) {
          var d = new Date();
          var month = d.getMonth();
          var year = d.getFullYear();
          var months = [];
          months.push({'month':month, 'year': year, 'monthName': monthNames[month], 'read': 0, 'dates':[] });
          for(var i = 1; i< 12; i++) {
            month++;
            if(month == 12) {
              month = 0;
              year++;
            }
            months.push({'month':month, 'year': year, 'monthName': monthNames[month], 'read':0, 'dates':[] });
          }
          storage.set('months', months).then(() => {
            storage.set('total_year', 0).then(() => {
              this.setRootPage();
            });
          });
        } else {
          this.setRootPage();  
        }
      })
    });
  }

  setRootPage() {
    this.storage.get('second_load').then((data) => {
      if(data) {
        this.rootPage = MonthsPage;
      } else {
        this.rootPage = HomePage;
      }
    });    
  }
}

