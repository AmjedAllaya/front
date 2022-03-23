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

declare var $: any;
export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid );
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-form-ajout-clent-aff',
  templateUrl: './form-ajout-clent-aff.component.html',
  styleUrls: ['./form-ajout-clent-aff.component.scss']
})
export class FormAjoutClentAffComponent implements OnInit {
  livrison="direct"
  tba=["hhh","ggg"]
  adresse=""
  testAdr=false
  public studentForm: FormGroup;  // Define FormGroup to student's form
 //form
 dis=true;
id:any
 tot="$"+this.log.Tot.toString()
 separatorKeysCodes: number[] = [ENTER, COMMA];
 fruitCtrl = new FormControl();
 filteredFruits: Observable<string[]>;
 fruits: string[] = this.log.panniers
 allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
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
 Aff:new FormControl(false) ,
 principale:new FormControl(false) 
  

})
user= new FormGroup({

  name: new FormControl('',[Validators.required ]),
  photoProfil:new FormControl(''),
  prenom: new FormControl('',[Validators.required ]),
 cin: new FormControl('',[Validators.required ]),
  password: new FormControl('',[Validators.required,this.vlPssCpss.bind(this)]),
  phone: new FormControl(null,Validators.required),
  email: new FormControl('',[Validators.required,Validators.email]),
  principale:new FormControl(false) ,
  originale:new FormControl(false),
  nouveaux:new FormControl(true),
  chifreAffaire:new FormControl(0),
  commandes:new FormControl([]),
  listeDecroissnate:new FormControl([]),
  listeDecroissnateDirect:new FormControl([]),
 nombreDemmandes:new FormControl(0),
 listeCroissante:new FormControl([]),
 point:new FormControl(0),
 groupe:new FormControl(0) ,
 Aff:new FormControl(true)  ,
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
    this.crudApi.AddStudenAj(this.user.value,this.log.pans,this.log.Tot,this.log.totale,this.livrison,this.adresse)    
    alert ("votre commande en cours")
  }
  passerNonAff(){
  
  }
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
