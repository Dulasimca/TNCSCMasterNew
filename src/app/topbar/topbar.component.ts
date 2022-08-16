import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  @Output() menuClick = new EventEmitter<boolean>();
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onMenuClick() {
    this.menuClick.emit(true);
  }
}
