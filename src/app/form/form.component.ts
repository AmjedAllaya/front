
//
import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm, FormArray } from '@angular/forms';
import { interval, Subscription,Observable,Observer } from 'rxjs';
import { Router } from '@angular/router';

import {map, startWith} from 'rxjs/operators';
import {ErrorStateMatcher} from '@angular/material/core';


import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips'
import { LoginSService } from '../login-s.service';
import { saveAs } from 'file-saver';

declare var $: any;
import { CrudService } from '../services/crud.service';    // CRUD services API

import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid );
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
 
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']


  // attach the slide in/out animation to the host (root) element of this component

})
export class FormComponent implements OnInit {
  im=true
  objData:any
  pass=""; 
 prixTOT=0
 matcher = new MyErrorStateMatcher();
 matcherEmail=new MyErrorStateMatcher();
  index:any
 user= new FormGroup({

   name: new FormControl('',[Validators.required ]),
   photoProfil:new FormControl(''),
   prenom: new FormControl('',[Validators.required ]),
  cin: new FormControl('',[Validators.required ]),
   password: new FormControl('',[Validators.required,this.vlPssCpss.bind(this)]),
   phone: new FormControl(null,Validators.required),
   email: new FormControl('',[Validators.required,Validators.email]),
   niveau:new FormControl(''),
   originale:new FormControl(true),
   chifreAffaire:new FormControl(0),
   commandes:new FormControl([]),
   listeDecroissnate:new FormControl([]),
   listeDecroissnateDirect:new FormControl([]),
  nombreDemmandes:new FormControl(0),
  listeCroissante:new FormControl([]),
  point:new FormControl(0),
  groupe:new FormControl(0) ,
  Aff:new FormControl(true) ,
  principale:new FormControl(true) ,
  nouveaux:new FormControl(false) ,
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

  dis=true;
  tot="$"+this.log.Tot.toString()
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = this.log.panniers
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  constructor( private route:Router,private ht:HttpClient, public log:LoginSService,  public crudApi: CrudService  ) { this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    startWith(null),
    map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
  ); }

//formMatrial
add(event: MatChipInputEvent): void {
  const value = (event.value || '').trim();

  // Add our fruit
  if (value) {
    this.fruits.push(value);
  }

  // Clear the input value
  event.chipInput!.clear();

  this.fruitCtrl.setValue(null);
}

remove(fruit: string): void {
  const index = this.fruits.indexOf(fruit);

  if (index >= 0) {
    this.fruits.splice(index, 1);
  }
}

selected(event: MatAutocompleteSelectedEvent): void {
  this.fruits.push(event.option.viewValue);
  this.fruitInput.nativeElement.value = '';
  this.fruitCtrl.setValue(null);
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
}
//Fin form matrail
//

  ngOnInit(): void {
    this.ht.get('http://localhost:5900/group/VGroup/').subscribe(data => {
  
     
  
      this.log.tabGrade=data
  
   
      function compare(a, b) {
        const br1=a.max
        const br2=b.max
       if (br1 > br2) return 1;
       if (br2 > br1) return -1;
     
       return 0;
     }
     
     this.log.tabGrade =this.log.tabGrade.sort(compare);
     
         console.log(this.log.tabGrade)

  
    })

  }
  chGrade(e){
   

       this.index=this.log.tabGrade.find(element => element.grade ==e.target.value); 
       console.log(this.index)
  }
  enregistre(){
    this.ht.post('http://localhost:5900/api/v1/registerAff/',this.user.value
    ).subscribe(data => {
      this.objData=data
      if(this.objData.message == true){
        this.ht.put('http://localhost:5900/api/v1/modifDemandeG/' + this.objData.user._id +'/', {grade:this.index}).subscribe(data => {
             alert(' enregistrer par succes')
      })
      }
       if(this.objData.message == false){
         alert('message deja enregistrer')
       } 
    })
  }

}
