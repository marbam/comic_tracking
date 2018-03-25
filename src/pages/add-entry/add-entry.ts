import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AddEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-entry',
  templateUrl: 'add-entry.html',
})
export class AddEntryPage {
  date = '';
  entry = {'series':'', 'year':'2018', 'issues': 1};
  month;
  months;
  total_year;
  valid = true;
  max_year = 2018;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  	this.month = navParams.get('month');
  	this.months = navParams.get('months');
  	this.total_year = navParams.get('total_year');
  	var d = new Date();
  	this.max_year = d.getFullYear();
  }

  save() {

  	var okay = true;

  	if(this.date == '') okay = false;
  	if(this.entry.series == '') okay = false;
  	// console.log(this.date, this)

  	if(okay) {
		var humanDate = this.getReadable(this.date);

	  	if(this.month.dates.length == 0) {
	  		this.month.dates.push({'date':this.date, 'humanDate': humanDate, 'comics':[this.entry]});
	  		console.log('empty', this.month.dates);
	  	} else {
	  		var found = false;
	  		for(let d of this.month.dates) {
	  			if(d['date'] == this.date) {
	  				d['comics'].push(this.entry);
	  				found = true;
	  			}
	  		}
	  		if (!found) {
	   			this.month.dates.push({'date':this.date, 'humanDate': humanDate, 'comics':[this.entry]});
	  		}
	  		console.log('not empty', this.month.dates);
	  	}

	  	this.month.read += this.entry.issues;
	  	this.total_year += this.entry.issues;

	  	for (let m of this.months) {
	  		if (m['month'] == this.month['month']) {
	  			m = this.month;
	  		}
	  	}

	  	this.storage.set('months', this.months).then(() => {
	  		this.storage.set('total_year', this.total_year).then(() => {
	  			this.navCtrl.pop();
	  		});
	  	});  		
  	} else {
  		this.valid = false;
  	}
  }

  getReadable(date) {
  	var dateObject = new Date(Date.parse(this.date));
	return dateObject.toLocaleDateString();  	
  }

}
