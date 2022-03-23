import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';


import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';

import { group } from 'console';
import { element } from 'protractor';

//

import { CrudService } from '../services/crud.service';    // CRUD services API
import { FormBuilder, FormControl, Validators, FormGroup, FormGroupDirective, NgForm, FormArray } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr

import {COMMA, ENTER} from '@angular/cdk/keycodes';


import { interval, Subscription,Observable,Observer } from 'rxjs';
import { Router } from '@angular/router';

import {map, startWith} from 'rxjs/operators';
import {ErrorStateMatcher} from '@angular/material/core';


import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips'
import { LoginSService } from '../login-s.service';
import { saveAs } from 'file-saver';
//
@Component({
  selector: 'app-fixe',
  templateUrl: './fixe.component.html',
  styleUrls: ['./fixe.component.scss']
})
export class FixeComponent implements OnInit {
  livrison="direct"
  adresse=""
  testAdr=false;
  public studentForm: FormGroup;  // Define FormGroup to student's form
   user={
    name:"habib",
   prenom:"habib",
  email:"habib@gmail.fr",
   phone:555
  }
  //form
  typeProduit="Tous"
  showFiller = false;
  profil=false
  im=true;
  ProduitOrdre:any
  prixTot:any
  prixAff:any;
  PrixPannier=0
  prixNouveauAff=0
  menuList=[];
  prixTotaleAjoutClient=0
  email="ha9.0bib90@gmail.com";
  tab =false
  affForm=false
  li=false
  testPrixAff=false
  testPrixNouveaux=false
   formAff=false
  constructor(private ht:HttpClient ,public log:LoginSService ,public crudApi:CrudService,public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService) { }
   passerCommande(){
   
     this.crudApi.AddStudenAn(this.user,this.log.pans,this.log.Tot,this.log.totale,this. livrison,this.adresse)
   }

  ngOnInit(): void {
    document.getElementById("myLinks").style.display="none"
    this.crudApi.GetStudentsList();  // Call GetStudentsList() before main form is being called
    this.studenForm(); 
    console.log(this.log.user.listeDecroissnateDirect)
    this.ht.get('http://localhost:5900/todo/produit/').subscribe(data => {
  
     
  
       this.ProduitOrdre=data
       this.ProduitOrdre=this.ProduitOrdre.reverse()
      console.log(this.ProduitOrdre)
      
  
    })
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
  testShop(){
    this.im=true
    this.profil=false
    this.tab=false;
  }
  poFil(){
    this.im=false
    this.profil=true
    this.tab=false;
  }
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
  ResetForm() {
    this.studentForm.reset();
  }  
info(){
  this.profil=true
  this.im=false
}
ajout(e){
    
  this.menuList.push(this.ProduitOrdre[e])
 

}
sup(i){
  this.menuList.splice(i,1)  
}
liste(){
 if(this.menuList.length>0){
   this.li=true
 }
 else{
   this.li=false
 }
}

tba(){
  this.PrixPannier=0
  this.menuList.forEach(ele=>{
    this.PrixPannier=this.PrixPannier+ele.prixProd
  })
  this.log.totale=this.PrixPannier
  this.log.pans=this.menuList
this.ht.get('http://localhost:5900/api/v1/voir/'+ this.log.user._id +'/').subscribe(data => {
  var user:any
   user=data
    var s=0
 
    console.log(user,'ee')
 let list: any[] = [];
  list=user.commandes;
  list=list.filter(word => word.validaTionGrade==true);
  list.forEach(element=> {
   
     s=s+element.prixTot //s somme de commande
  }); 
  console.log(s,'point')
  
  var prixTot=s+this.PrixPannier
  console.log(prixTot,'prix Tot')
  if(prixTot<=user.grade.max){
    console.log("aaa")
    this.prixAff=this.PrixPannier-(this.PrixPannier*user.grade.remise/100)
  }
   else{
    console.log("bbb")
    var restPermierMax=user.grade.max-s
    var somme=(user.grade.max-s) - ((user.grade.max-s)*user.grade.remise/100)//premier somme
    console.log(somme,'eee')
    var grade2=this.log.tabGrade.find(element => element.min < prixTot &&  element.max >= prixTot);
    console.log(grade2,'grade2')

   
    var gr=user.grade  
   var  sommeMax=restPermierMax
 
   if((  this.log.tabGrade.findIndex((element) => element.max ==grade2.max)-this.log.tabGrade.findIndex((element) => element.max ==gr.max))>1){
    
    

    console.log(">2")
    for (let i = this.log.tabGrade.findIndex((element) => element.max ==gr.max)+1 ; i <    this.log.tabGrade.findIndex((element) => element.max ==grade2.max); i++) {

      somme = somme+(((this.log.tabGrade[i].max-sommeMax)-((this.log.tabGrade[i].max-sommeMax)*this.log.tabGrade[i].remise/100)))
    
       sommeMax=this.log.tabGrade[i].max
        
    }
  }
       var reste=(this.PrixPannier-sommeMax)-(this.PrixPannier-sommeMax)*(this.log.tabGrade[  this.log.tabGrade.findIndex((element) => element.max ==grade2.max)].remise/100)
       console.log(reste)
     this.prixAff=somme+reste
     this.log.Tot= this.prixAff
  
   }
   this.tab=true
   this.im=false
    this.affForm=false
    this.profil=false
    this.testPrixAff=true
  this.testPrixNouveaux=false
  this.formAff=false
})
}    
ajoutClent(){
  this.PrixPannier=0
  this.menuList.forEach(ele=>{
    this.PrixPannier=this.PrixPannier+ele.prixProd
  })
  this.log.totale=this.PrixPannier
  this.log.pans=this.menuList
  var grade:any;
  var somme=0;
  var sommeMax=0
 grade=this.log.tabGrade.find(element => element.min < this.PrixPannier &&  element.max >= this.PrixPannier);
 console.log(grade,'eee')

 //  user.niveau=grade.grade
 //  console.log(user,"servlog")   
     var niv=this.log.tabGrade.indexOf(grade)
     console.log(niv)
     if(niv>0){
for (let i = 0; i <  niv; i++) {
  somme = somme+(((this.log.tabGrade[i].max-sommeMax)-((this.log.tabGrade[i].max-sommeMax)*this.log.tabGrade[i].remise/100)))
 
    sommeMax=this.log.tabGrade[i].max
   
}
}
console.log(somme,"1")
console.log(sommeMax,"2")
this.prixNouveauAff=somme +((this.PrixPannier-sommeMax)-(this.PrixPannier-sommeMax)*this.log.tabGrade[niv].remise/100)
this.log.Tot=this.prixNouveauAff
  this.tab=true
 this.im=false
  this.affForm=false
  this.profil=false
  this.testPrixAff=false
  this.testPrixNouveaux=true
  this.formAff=true
}


parf(){
  this.im=true
  this.profil=false
  this.tab=false;
  this.ht.get('http://localhost:5900/todo/produit/').subscribe(data => {    

  
   this.typeProduit="Parfums"
   this.ProduitOrdre=data
  this.ProduitOrdre=this.ProduitOrdre.filter(ele=>ele.type=="parfum")

  document.getElementById("myLinks").style.display="none"
  console.log(this.ProduitOrdre,"prod")
       
 
 })
}
cosm(){
  this.im=true
  this.profil=false
  this.tab=false;
console.log("ee")
 this.ht.get('http://localhost:5900/todo/produit/').subscribe(data => {

  this.typeProduit="Cosmétique naturelle"
    this.ProduitOrdre=data
this.ProduitOrdre=this.ProduitOrdre.filter(ele=>ele.type =="cosmetique")
console.log(this.ProduitOrdre,"prod")
document.getElementById("myLinks").style.display="none"

   
})
}

acce(){
  this.im=true
  this.profil=false
  this.tab=false;

    this.ht.get('http://localhost:5900/todo/produit/').subscribe(data => {
      this.typeProduit="Accessoires"
    this.ProduitOrdre=data
this.ProduitOrdre=this.ProduitOrdre.filter(ele=>ele.type=="accesoires")
console.log(this.ProduitOrdre,"prod")
console.log(this.ProduitOrdre)
document.getElementById("myLinks").style.display="none"

    })
}
Navigate(elem: HTMLElement) {
elem.scrollIntoView({ behavior: 'smooth' });
}
bij(){    
  this.im=true
  this.profil=false
  this.tab=false;
this.ht.get('http://localhost:5900/todo/produit/').subscribe(data => {
 this.typeProduit="Bijoux"
 this.ProduitOrdre=data
this.ProduitOrdre=this.ProduitOrdre.filter(ele=>ele.type=="bijoux")
console.log(this.ProduitOrdre,"prod")
console.log(this.ProduitOrdre)
document.getElementById("myLinks").style.display="none"

 })

}
ling(){
  this.im=true
  this.profil=false
  this.tab=false;
this.ht.get('http://localhost:5900/todo/produit/').subscribe(data => {
 this.typeProduit="Lingerie"
 this.ProduitOrdre=data
this.ProduitOrdre=this.ProduitOrdre.filter(ele=>ele.type=="lingerie")
console.log(this.ProduitOrdre,"prod")
console.log(this.ProduitOrdre)
document.getElementById("myLinks").style.display="none"

 })

}
maq(){
  this.im=true
  this.profil=false
  this.tab=false;
this.ht.get('http://localhost:5900/todo/produit/').subscribe(data => {
 this.typeProduit="Maquillage"
 this.ProduitOrdre=data
this.ProduitOrdre=this.ProduitOrdre.filter(ele=>ele.type=="maquillage")
console.log(this.ProduitOrdre,"prod")
console.log(this.ProduitOrdre)
document.getElementById("myLinks").style.display="none"

 })
}
navMobile(){

 var x = document.getElementById("myLinks");
 if (x.style.display === "block") {
   x.style.display = "none";
 } else {
   x.style.display = "block";
 }

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
