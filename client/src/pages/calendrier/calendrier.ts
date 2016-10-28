import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Match} from "../../models/match";
import {MatchService} from "../../providers/match-service";

/*
  Generated class for the Calendrier page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-calendrier',
  templateUrl: 'calendrier.html'
})
export class CalendrierPage {

  nextMatch: Match[];
  nextMatchs: Match[];

  constructor(public navCtrl: NavController, public matchService: MatchService) {
    matchService.load('Sautron').subscribe(matchs => {
        matchs = matchs.filter(match => match.local_score === null);

        matchs.sort(function (a, b) {
          return a.date-b.date;
        });
        matchs.forEach(match => match.date = match.date * 1000);
        this.nextMatch = matchs.slice(0, 1);
        this.nextMatchs = matchs.splice(1);
        },
        err => this.logError(err)
      );
  }

  ionViewDidLoad() {
    console.log('Hello Calendrier Page');
  }

  public logError(err: TemplateStringsArray) {
    console.error('Error: ' + err);
  }
}
