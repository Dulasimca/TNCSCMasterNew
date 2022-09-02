import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('700ms ease-in-out')),
      transition('out => in', animate('700ms ease-in-out'))
    ]),
  ]
})
export class MenuComponent implements OnInit {
  showSideBar: boolean;
  showDownArrow_SM: boolean = false;
  showDownArrow_FP: boolean = false;
  showDownArrow_OM: boolean = false;
  showDownArrow_CM: boolean = false;
  showDownArrow_MD: boolean = false;
  showDownArrow_SCU: boolean = false;
  showDownArrow_FCI: boolean = false;
  constructor() { }

  ngOnInit() {


  }

  toggleButton(type) {
    switch (type) {
      case 'fp':
        this.showDownArrow_FP = !this.showDownArrow_FP;
        break;
      case 'sc':
        this.showDownArrow_SM = !this.showDownArrow_SM;
        break;
      case 'cm':
        this.showDownArrow_CM = !this.showDownArrow_CM;
        break;
      case 'ot':
        this.showDownArrow_OM = !this.showDownArrow_OM;
        break;
      case 'md':
        this.showDownArrow_MD = !this.showDownArrow_MD;
        break;
      case 'scu':
        this.showDownArrow_SCU = !this.showDownArrow_SCU;
        break;
      case 'fc':
      this.showDownArrow_FCI = !this.showDownArrow_FCI;
      break;
    }
  }

  onClickMenuBar(event) {
    this.showSideBar = event;
  }

}

