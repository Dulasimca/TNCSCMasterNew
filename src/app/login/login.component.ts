import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PathConstants } from '../constants/path.constants';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './login.service';
import { StatusMessage } from '../constants/Messages';
import { RestAPIService } from '../services/restAPI.service';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  roleId: number;
  godownCode: any;
  regionCode: any;
  godownName: any;
  regionName: any;
  openPanel: boolean;
  userName: string;
  password: any;
  isChecked: boolean;
  form: any = [];
  mappingId: any;
  mappingName: any;
  showPswd: boolean = false;
  @Output() loggingIn = new EventEmitter<boolean>();
  @ViewChild('pswd', { static: false }) pInput: ElementRef;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService,
    private restApiService: RestAPIService, private loginService: LoginService,
    private messageService: MessageService) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      pswd: ['', Validators.required]
    });
    this.isChecked = JSON.parse(this.authService.getKeepMeLoggedInStatus());
    // if (this.isChecked) {
    //   this.userName =  (this.authService.getCredentials() !== null) ? this.authService.getCredentials() : this.userName;
    //  }
  }

  onShowPswd() {
    var inputValue = (<HTMLInputElement>document.getElementById('pswd'));
    if (inputValue.type === 'password') {
      inputValue.type = 'text';
      this.showPswd = !this.showPswd;
    } else {
      this.showPswd = !this.showPswd;
      inputValue.type = 'password';
    }
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSignIn() {
    if (this.loginForm.invalid) {
      this.messageService.clear();
      this.messageService.add({
        key: 't-err', severity: StatusMessage.SEVERITY_ERROR,
        summary: StatusMessage.SUMMARY_ERROR, detail: StatusMessage.ValidCredentialsErrorMessage
      });
      return;
    } else {
      let username = new HttpParams().append('userName', this.userName).append('password', this.password);
      this.restApiService.getByParameters(PathConstants.LOGIN, username).subscribe((credentials: any) => {
        if (credentials.Item1 === true) {
          if (credentials.Item3[0].RoleId === 1 && credentials.Item3[0].MappingId === 1) {
            this.router.navigate(['Home']);
            this.roleId = credentials.Item3[0].RoleId;
            this.mappingId = credentials.Item3[0].MappingId;
            this.mappingName = credentials.Item3[0].MappingName;
            this.godownCode = (credentials.Item3[0].GodownCode !== '' && credentials.Item3[0].GodownCode !== undefined) ? credentials.Item3[0].GodownCode : 0;
            this.regionCode = (credentials.Item3[0].Regioncode !== '' && credentials.Item3[0].Regioncode !== undefined) ? credentials.Item3[0].Regioncode : 0;
            this.godownName = (credentials.Item3[0].GodownName !== null && credentials.Item3[0].GodownName !== undefined) ? credentials.Item3[0].GodownName : '';
            this.regionName = (credentials.Item3[0].RegionName !== null && credentials.Item3[0].RegionName !== undefined) ? credentials.Item3[0].RegionName : '';
            this.loginService.setValue(this.roleId);
            this.loginService.setValue(this.mappingId);
            this.loginService.setUsername(this.userName);
            const params = {
              RoleId: this.roleId,
              GCode: this.godownCode,
              RCode: this.regionCode,
              GName: this.godownName,
              RName: this.regionName,
              MappingId: this.mappingId,
              MappingName: this.mappingName
            };
            this.authService.login(this.loginForm.value, params);
          } else {
            this.clearFields();
            this.messageService.clear();
            this.messageService.add({
              key: 't-err', severity: StatusMessage.SEVERITY_ERROR,
              summary: StatusMessage.SUMMARY_ERROR, detail: StatusMessage.MasterAccessError
            });
          }
        } else {
          // this.clearFields();
          this.messageService.clear();
          this.messageService.add({
            key: 't-err', severity: StatusMessage.SEVERITY_ERROR,
            summary: StatusMessage.SUMMARY_ERROR, detail: credentials.Item2
          });
        }
      }, (err: HttpErrorResponse) => {
        if (err.status === 0 || err.status === 400) {
          this.messageService.clear();
          this.messageService.add({
            key: 't-err', severity: StatusMessage.SEVERITY_ERROR,
            summary: StatusMessage.SUMMARY_ERROR, detail: StatusMessage.ErrorMessage
          });
        }
      });
    }
  }

  toggleVisibility(e) {
    this.authService.isKeepMeLoggedIn(e.target.checked);
    let check: any = this.authService.getKeepMeLoggedInStatus();
    this.isChecked = (check !== undefined &&
      check !== null) ? check : false;

  }

  clearFields() {
    this.userName = this.password = '';
  }
}
