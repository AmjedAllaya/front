import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm, FormArray } from '@angular/forms';
import { LoginSService } from 'src/app/login-s.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pass=""
  email=""
 
    constructor(private log:LoginSService) { }
  
    ngOnInit(): void {
  
    }
  login(){
    console.log(this.email)
    console.log(this.pass)
   this.log.login(this.email,this.pass)
  }
}
