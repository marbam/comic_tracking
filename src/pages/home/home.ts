import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MonthsPage } from '../months/months';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private navCtrl: NavController, private storage: Storage) {

  }

  goToMonths() {
  	this.storage.set('second_load', true).then(() => {
  		this.navCtrl.push(MonthsPage);
  	})
  }

}
