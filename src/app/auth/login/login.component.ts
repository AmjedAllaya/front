import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm, FormArray } from '@angular/forms';
import { LoginSService } from 'src/app/login-s.service';

@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
pass=""
email=""
user:any
  constructor(private log:LoginSService) { }

  ngOnInit(): void {

  }
login(){
 this.log.login(this.email,this.pass)
}
}
