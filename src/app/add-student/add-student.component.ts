import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { CrudService } from '../services/crud.service';    // CRUD services API
import { FormBuilder, FormControl, Validators, FormGroup, FormGroupDirective, NgForm, FormArray } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr

import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';

import { interval, Subscription,Observable,Observer } from 'rxjs';
import { Router } from '@angular/router';

import {map, startWith} from 'rxjs/operators';
import {ErrorStateMatcher} from '@angular/material/core';


import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips'
import { LoginSService } from '../login-s.service';
import { saveAs } from 'file-saver';
import { threadId } from 'worker_threads';


declare var $: any;
export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid );
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
 
}
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})

export class AddStudentComponent implements OnInit {
  tba=["hhh","ggg"]
  public studentForm: FormGroup;  // Define FormGroup to student's form
  livrison="direct"
 //form
 dis=true;
id:any
 tot="$"+this.log.Tot.toString()
 separatorKeysCodes: number[] = [ENTER, COMMA];
 fruitCtrl = new FormControl();
 filteredFruits: Observable<string[]>;
 fruits: string[] = this.log.panniers
 allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
 testAdr=false
 adresse=""
 objData:any
 pass=""; 
prixTOT=0
matcher = new MyErrorStateMatcher();
matcherEmail=new MyErrorStateMatcher();
userN= new FormGroup({
 
 name: new FormControl('',[Validators.required ]),

 prenom: new FormControl('',[Validators.required ]),
 phone: new FormControl(null,Validators.required),
 email: new FormControl('',[Validators.required,Validators.email]),
 commandes:new FormControl([]),
 Aff:new FormControl(false)  
  

})
user= new FormGroup({

  name: new FormControl('',[Validators.required ]),
  photoProfil:new FormControl(''),
  prenom: new FormControl('',[Validators.required ]),
 cin: new FormControl('',[Validators.required ]),
  password: new FormControl('',[Validators.required,this.vlPssCpss.bind(this)]),
  phone: new FormControl(null,Validators.required),
  email: new FormControl('',[Validators.required,Validators.email]),
 
  originale:new FormControl(true),
  nouveaux:new FormControl(true),
  chifreAffaire:new FormControl(0),
  commandes:new FormControl([]),
  listeDecroissnate:new FormControl([]),
  listeDecroissnateDirect:new FormControl([]),
 nombreDemmandes:new FormControl(0),
 listeCroissante:new FormControl([]),
 point:new FormControl(0),
 groupe:new FormControl(0) ,
 Aff:new FormControl(true),
 principale:new FormControl(false)  ,
 primeParinage:new FormControl(0),
 salaire:new FormControl(0),
 brut:new FormControl(0)

})

vlPssCpss (control:FormControl):object|null{
  console.log(this.pass);

 

 var   cpass=control.value
 console.log(cpass);
 


return this.pass ===  cpass ? null : { obj: true };
}
 //form
  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService,
    private route:Router,private ht:HttpClient, public log:LoginSService,  // Toastr service for alert message
  ) { }

 
  ngOnInit() {
    this.crudApi.GetStudentsList();  // Call GetStudentsList() before main form is being called
    this.studenForm(); 
                 // Call student form when component is ready
  }

  // Reactive student f
  studenForm() {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      prenom: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      pass: [''],
      tab:[this.tba]
    })  
  }

  // Accessing form control using getters
  get firstName() {
    return this.studentForm.get('name');
  }

  get lastName() {
    return this.studentForm.get('prenom');
  }  

  get email() {
    return this.studentForm.get('email');
  }

  get mobileNumber() {
    return this.studentForm.get('phone');
  }

  // Reset student form's values
  ResetForm() {
    this.studentForm.reset();
  }  
 
  submitStudentData() {   
    this.crudApi.AddStudent(this.user.value,this.log.pans,this.log.Tot,this.log.totale,this.livrison,this.adresse)// Submit student data using CRUD API
    this.toastr.success(this.studentForm.controls['name'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
   };
   passerAff(){
    this.crudApi.AddStudent(this.user.value,this.log.pans,this.log.Tot,this.log.totale,this.livrison,this.adresse)
    alert ("votre commande en cours")
  }
  passerNonAff(){
    console.log(5)
    this.log.Tot=this.log.totale

    this.crudApi.AddStudent(this.userN.value,this.log.pans,this.log.Tot,this.log.totale,this.livrison,this.adresse)
    alert("votre comande en cours")
  }
  //livrseon
  fulivr(e){
     this.livrison=e.target.value
     this.testAdr=true
  }
  fuposte(e){
    this.livrison=e.target.value
    this.testAdr=true
  }
  fudir(e){
    this.livrison=e.target.value
    this.testAdr=false
  }
}
/*<div class="pt-3 pb-2 mb-3 border-bottom">
  <h1 class="h2">Add Student</h1>
  <p class="custom-text">A demo CRUD  for <strong>student management system</strong> built with <strong>Angular 10
      and Firebase</strong></p>
</div>

<!-- Student form -->
<form [formGroup]="studentForm" (ngSubmit)="submitStudentData()" novalidate>
  <div class="row">
    <div class="col-lg-5 col-md-12 col-sm-12">
      <div class="row">

        <div class="col-md-12 mb-3">
          <label>First name</label>
          <input type="text" formControlName="name" class="form-control" required>
          <!-- Showing errors using getter method -->
         <!---- <p *ngIf="firstName.touched && firstName.invalid" class="error"><sup>*</sup>Please enter atleast first name</p>
          <p *ngIf="firstName.errors?.minlength" class="error"><sup>*</sup>Name shouldn't be less than 2 words</p>-->
        </div>

        <div class="col-md-12 mb-3">
          <label>Last name</label>
          <input type="text" formControlName="prenom" class="form-control">
        </div>

      </div>

      <div class="row">
        <div class="col-md-12 mb-3">
          <label>Email</label>
          <input type="email" formControlName="email" class="form-control" required>
          <!-- Showing errors using getter method -->
         <!---- <p *ngIf="email.touched && email.invalid" class="error"><sup>*</sup>Please provide email</p>
          <p *ngIf="email.errors?.pattern" class="error"><sup>*</sup>Please enter correct email</p>-->
        </div>

        <div class="col-md-12 mb-3">
          <label>Mobile number</label>
          <input type="text" formControlName="phone" class="form-control" required>
          <!-- Showing errors using getter method -->
         <!---- <p *ngIf="mobileNumber.touched && mobileNumber.invalid" class="error"><sup>*</sup>Please provide contact
            number</p>
          <p *ngIf="mobileNumber.errors?.pattern" class="error"><sup>*</sup>Use numbers only
            number</p>-->
        </div>
        <div class="col-md-12 mb-3">
          <label>pass</label>
          <input type="text" formControlName="pass" class="form-control" required>
          <!-- Showing errors using getter method -->
         <!---- <p *ngIf="mobileNumber.touched && mobileNumber.invalid" class="error"><sup>*</sup>Please provide contact
            number</p>
          <p *ngIf="mobileNumber.errors?.pattern" class="error"><sup>*</sup>Use numbers only
            number</p>-->
        </div>
      </div>

      <div class="form-group text-right">
        <button type="button" class="btn btn-warning mr-2" (click)="ResetForm()">Reset</button>
        <button type="submit" class="btn btn-primary" [disabled]="!studentForm.valid">Add Student</button>
      </div>

    </div>
  </div>
</form><!-- Student form ends-->
<mdb-carousel class="carousel slide carousel-fade" [animation]="'fade'">
  <mdb-carousel-item>
    <video class="video-fluid" autoplay loop muted>
      <img src="https://thumbs.gfycat.com/TerribleDisgustingJenny-size_restricted.gif" type="video/mp4" />
    </video>
  </mdb-carousel-item>
  <mdb-carousel-item>
    <video class="video-fluid" autoplay loop muted>
      <img src="https://c.tenor.com/596y6zABaH4AAAAC/perfume-dolce.gif" type="video/mp4" />
    </video>
  </mdb-carousel-item>
  <mdb-carousel-item>
    <video class="video-fluid" autoplay loop muted>
      <img src="https://64.media.tumblr.com/e5c25a25797859735dcf7e0bac1e1edb/tumblr_nv6zpfXnQJ1rpywblo1_500.gifv" type="video/mp4" />
    </video>
  </mdb-carousel-item>
</mdb-carousel>*/