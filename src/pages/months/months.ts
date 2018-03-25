import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { monthNames } from "../../providers/config";
import { AddEntryPage } from '../add-entry/add-entry';

/**
 * Generated class for the MonthsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-months',
  templateUrl: 'months.html',
})
export class MonthsPage {
  month = {'month':'', 'year': '', 'monthName': '', 'dates':{}};
  first = 12;
  last = -1;
  months;
  total_year;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  	this.setup();
  }

  ionViewDidEnter() {
    this.setup();
  }
  
  setup() {
    this.storage.get('months').then((months) => {
      this.months = months;
      var d = new Date();
      var this_month = d.getMonth();
      for (let m of this.months ) {
        if (m['month'] == this_month) {
          this.month = m;
          break;
        }
      }
      this.first = months[0]['month'];
      this.last = months[11]['month'];
    });

    this.storage.get('total_year').then((year) => {
      this.total_year = year;
    })
  }

  getNext(){
  	var index = this.months.indexOf(this.month);
  	this.month = this.months[index+1];
  }

  getPrev(){
  	var index = this.months.indexOf(this.month);
  	this.month = this.months[index-1];
  }

  addToMonth(){
    this.navCtrl.push(AddEntryPage, {'month':this.month, 'months':this.months, 'total_year': this.total_year});
  }

}
