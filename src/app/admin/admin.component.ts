import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import {COMMA, ENTER, I} from '@angular/cdk/keycodes';

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
import { CrudService } from '../services/crud.service';  // CRUD API service class
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr
import { Console } from 'console';
import { resolve } from 'dns';


export interface Student {
    $key: string;
    firstName: string;
    lastName: string;
    email: string
    mobileNumber: Number;
 }
export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid );
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }

}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    navList = [{name:'home'},{name:'home'},{name:'home'},{name:'home'},{name:'home'}];
  //fir
  k:any
  p: number = 1;                      // Settup up pagination variable
  Student: Student[];                 // Save students data in Student's array.
  hideWhenNoStudent: boolean = false; // Hide students data table when no student.
  noData: boolean = false;  
  //fir
    dtWh:any
  selectF:File=null
 
 pass=""; 
 prixTOT=0
 matcher = new MyErrorStateMatcher();
 matcherEmail=new MyErrorStateMatcher();


objData:any;  
 obj:any;
 pannier:any;
 //menue
 Ajclient=false;
 Ajcommande=false;
 ajProd=false;
 nvCom=false
 gradeAff=false
 testSal=false
 ///
 panniers: any[] = [];
 nombre=1
 prixApyé=0
//produit
 nameProd='';
 prixProd=0;
 refProd='';
 image:any
 sex="f"
 Tprod="cosmetique"
promo=0
//fin produit
//grade
grade=""
min=0
max=0
prime=0
remise=0
niveau=0
PrimePar=0
testPrime=false;
tabpri=[];
in=0
tabpirme:any
testRemp=false
testAjRemp=false
gradePrime:any
//fingrade
//salaire
tabSalaire:any
//
whileTeste:any
 value=""
 Ncommandes:any //pour nouveaux commandes
 tabNC=[] //pour tableau  nouveaux commande
  porduit=[]
  tabNiv=["ambasadeur","consielAide","animateurAide","animateur","superviseur"]
  prod:any
   //mat
 
   name = "Angular";

   unfilteredDataToSearch: any[] = [];
     
 
   filteredDataToSearch: any[] = [];
 
   public beComponentForm: FormGroup = new FormGroup({
     slct_cntrl: new FormControl("")
   });
  
   selectFile(e){
    console.log(e);
    this.selectF=<File>e.target.files[0]
    
  }

 
  
 
   lookup(e:any) {
     this.filteredDataToSearch = this.unfilteredDataToSearch
       .filter(
         i =>
           (i.nameProd + " - "  + "(" + i.refProd + ")")
             .toString()
             .toLowerCase()
             .indexOf(e.target.value) > -1
       )
       .map(w => {
         return {
           text: w.nameProd + " - " + "(" + w.refProd + ")",
           value: w._id,
           prixProd:w.prixProd
          
         };
       });

       console.log( this.filteredDataToSearch ,"zzz")
   }
 
   clean(t:any){
     t.value = '';
     this.lookup(t.value);
   }
  com(e:any){
     this.pannier=this.filteredDataToSearch[e]
     console.log(this.pannier)
  }

   //fmat
 constructor( private route:Router,private ht:HttpClient, public log:LoginSService,    public crudApi: CrudService, // Inject student CRUD services in constructor.
  public toastr: ToastrService ) {  
}

ajtPan(){
 var pan ={
 prod:this.pannier,
 nombre:this.nombre
 }

  this.panniers.push(pan)
  this.prixTOT=this.prixTOT + (pan.prod.prixProd *Number(this.nombre) )
  console.log(Number(this.nombre))
  console.log( this.prixTOT)
  if(this.prixTOT>100){
   this.Ajclient=true

  }
 else{
   this.Ajclient=false
 }
}
 /*pusher(e:any){
  console.log(e.target.value)
  var prix=this.porduit[e.target.value].prix
  this.prixTOT=this.prixTOT+this.porduit[e.target.value].prix
  console.log(this.prixTOT)
  if(this.prixTOT>100){
    this.Ajclient=true
  }
 }*/
 ///registre produit 
 enre(){
  var fd=new FormData
  console.log(this.selectF);
  
  fd.append('image',this.selectF,this.selectF.name)
  this.ht.post('http://localhost:3090/upload/',fd).subscribe(res=>{
    this.image=res.valueOf()
    console.log(this.image)
  
   console.log("ha")
   this.ht.post('http://localhost:5900/todo/produitC/',({nameProd:this.nameProd,refProd:this.refProd,prixProd:this.prixProd,img:this.image.source,type:this.Tprod,sex:this.sex,promo:this.promo })).subscribe(data => {
  console.log(data)  ;
  alert("produit ajouter")
})
  })
 }
 ngOnInit(): void {
   $(document).ready(function(){
     $("#menu_icon").click(function(){
         $(".open_sidbar").toggleClass("small_sidebar");
         $('.remove_text').toggleClass('text_hide');
         $('#content_body').toggleClass('margin_left');
     });
 });
 var i=0
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetStudentsList(); 
    s.snapshotChanges().subscribe(data => {
       // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Student = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Student.push(a as Student);
       this.k= this.Student.length
      })
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
      this.tabpirme=this.log.tabGrade
         console.log(this.log.tabGrade)

  
    })

    this.ht.get('http://localhost:5900/api/v1/voirPrincipale/').subscribe(data => {
      this.whileTeste= data
    })

 }
 dataState() {     
  this.crudApi.GetStudentsList().valueChanges().subscribe(data => {
    
    if(data.length <= 0){
      this.hideWhenNoStudent = false;
      this.noData = true;
    } else {
      this.hideWhenNoStudent = true;
      this.noData = false;
    }
  })
}
 selctProd(e){
  this.Tprod=e.target.value
 }
 selectSex(e){
  this.sex=e.target.value
 }
 ajout(){
   this.Ajclient=false
   this.Ajcommande=true
   this.testPrime=false
   this.ht.get('http://localhost:5900/todo/produit/').subscribe(data => {
     console.log(data)

    this.obj=data
    this.unfilteredDataToSearch=this.obj
    this.filteredDataToSearch = this.unfilteredDataToSearch.map(w => {
     return {
       text: w.nameProd + " - " + "(" + w.refProd + ")",
       value: w._id,
       prixProd:w.prixProd
     };
   });
  })
 }
 ajoutP(){
   this.Ajclient=false
   this.Ajcommande=false
   this.ajProd=true
   this.nvCom=false
   this.gradeAff=false
   this.testPrime=false
   this.testSal=false
 }
 //grade
 ajoutG(){
  this.Ajclient=false
  this.Ajcommande=false
  this.ajProd=false
  this.nvCom=false
  this.gradeAff=true
  this.testPrime=false
  this.testSal=false
 }
 ajoutGradePrime(){
  var i=0
  this.in=this.log.tabGrade[0].grade
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


 
       this.Ajclient=false
       this.Ajcommande=false
       this.ajProd=false
       this.nvCom=false
       this.gradeAff=false
       this.testPrime=true     })
 }
 chGrade(e){
   console.log(5)
   console.log(e.target.value)
   console.log(this.log.tabGrade.findIndex(element => element.grade ==e.target.value) )
   this.gradePrime=this.log.tabGrade.find(element => element.grade ==e.target.value)
   console.log(this.gradePrime,"ggrade")
 this.tabpirme= this.log.tabGrade.slice(0,this.log.tabGrade.findIndex(element => element.grade ==e.target.value) );
  console.log(  this.tabpirme,'rr')
  this.testRemp=true
  this.testAjRemp=true
 }
 
 
 prio(e,i){
   var salair={
     grade:this.tabpirme[i].grade,
     salaire: e.target.value
   }
  
console.log(this.tabpri.findIndex(element => element.grade ==this.tabpirme[i].grade),"l1")
var ind=this.tabpri.findIndex(element => element.grade ==this.tabpirme[i].grade)
if(ind< 0){
  this.tabpri.push(salair) 
}
if(ind>= 0){
  this.tabpri.splice(ind, 1,salair);
}
console.log( this.tabpri,"ee")
 }
 registrePrimeAni(){
  this.ht.put('http://localhost:5900/group/modifDemandeG/' +this.gradePrime._id +'/', {    primeSalaire:this.tabpri}).subscribe(data => { console.log(data,"nnn")
alert('prime annimation ajouter')})
 }
 enreG(){
  this.ht.post('http://localhost:5900/group/registreGrade/',{grade:this.grade,min:this.min,max:this.max,remise:this.remise,primeParin:this.PrimePar}).subscribe(data => {
    console.log(data)
  alert('grade a ajouter')})
 }
 ///tab commande
 voireC(){

    this.ht.get('http://localhost:5900/eve/voirEve/').subscribe(data=>{
      this.Ncommandes=data
      this.tabNC=this.Ncommandes.eves
      this.tabNC=this.tabNC.reverse()
      console.log(  this.tabNC,"tabbb")
  
    })


  this.Ajclient=false
  this.Ajcommande=false
  this.ajProd=false
  this.nvCom=true
  this.gradeAff=false
  this.testSal=false
  
 }

//
//salire
vSalaire(){
  this.Ajclient=false
  this.Ajcommande=false
  this.ajProd=false
  this.nvCom=false
  this.gradeAff=false
  this.testSal=true
  this.ht.get('http://localhost:5900/eve/pyesalaire/').subscribe(data => {
   console.log(data,"eerrrr")
   this.tabSalaire=data
  })
}
//

sup(e){
  this.crudApi.DeleteStudent(this.tabNC[e].user.key)
  alert('commande supprimé')
}
async valider(e){
  var com:any
  com=this.tabNC[e]
 var userNou:any
 
  this.crudApi.DeleteStudent(this.tabNC[e].key)
  var p=  new Promise(resolve => {
    this.ht.post('http://localhost:5900/eve/pushDemandes/'+this.tabNC[e].user._id+"/"+this.tabNC[e]._id +"/",{}).subscribe(data => {
      resolve(data)
    })
  });
    userNou= await p 
    console.log(userNou,'tt')

  console.log(e)


   
  
 
if(this.tabNC[e].user.Aff==true){// pusher commande pour user principale
  if(this.tabNC[e].user.nouveaux==false && this.tabNC[e].user.Aff==true){
    let list: any[] = [];
            var prixCommandes=0
            list=userNou.commandes.concat(userNou.commandesIndirect);

            list=list.filter(word => word.validaTionGrade==true);

            list.forEach(element=> {
             
              prixCommandes=prixCommandes+element.prixTot
            }); 
             console.log(prixCommandes,'ty')
            if(prixCommandes> userNou.grade.max){
              var grade2=this.log.tabGrade.find(element => element.min < prixCommandes &&  element.max >= prixCommandes); 
              console.log(grade2,"pp")
              this.ht.put('http://localhost:5900/api/v1/modifDemandeG/' + userNou._id +'/', {grade:grade2}).subscribe(data => {
                
              })

             
            }

            

  }//si elle non noveaux
  
  if(this.tabNC[e].user.nouveaux==true && this.tabNC[e].user.Aff==true ){
           console.log("55m")
        var grade=this.log.tabGrade.find(element => element.min < this.tabNC[e]. prixTot &&  element.max >= this.tabNC[e]. prixTot); 
        console.log(grade,"55m")
        var p2=  new Promise(resolve => {
          this.ht.put('http://localhost:5900/api/v1/modifDemandeG/' + this.tabNC[e].user._id +'/', {nouveaux:false,grade:grade}).subscribe(data => {
            resolve(data)
          })
        });
       
          var userr:any
          userr= await p2
          console.log(userr,"rrtuyopuhitt")
          
             
          this.ht.post('http://localhost:5900/eve/pushDemandeslisteCroissnte/'+ userr.userAj._id +"/" +userr._id + "/", {}).subscribe(data => {
            console.log(data,'eeeo')
})
             
       
      } ///si elle nouveaux pour terminer postion grade
        
         
    
      
      var p5=  new Promise(resolve => {
                
        this.ht.get('http://localhost:5900/group/VGroupe/' +  userNou.userAj.grade +'/').subscribe(data => {
          resolve(data)
        })
      
      });

       var pr:any
     
       pr=await p5
       console.log(pr,"uuio")
       var primeParinnage= userNou.userAj.primeParinage+pr.primeParin
       var p6=  new Promise(resolve => {
        this.ht.put('http://localhost:5900/api/v1/modifDemandeG/' + userNou.userAj._id+'/', {primeParinage:primeParinnage}).subscribe(data => {
          resolve(data)
        })
      });  
   var primm:any
   primm=await p6
   console.log(primm,"voire prime")

var p3=  new Promise(resolve => {
  this.ht.get('http://localhost:5900/eve/voirTotFals/').subscribe(data=>{
    resolve(data)
  })
});
            this.dtWh=userNou.userAj
            
        var unique= 10
              var users:any
              users=await p3
              this.dtWh=users.tab.find(element => element.email==this.dtWh.email)
              console.log( this.dtWh,"avec")
              var tabWh=[]
               while (unique<20){
                console.log('while')

                tabWh.push(this.dtWh)

              
               
                 var or=this.dtWh.principale
                 console.log(or,)
                 if(or==true){
                   unique=21
                 }
                 if(or==false){
                  
                      this.dtWh=users.tab.find(element => element.email==this.dtWh.userAj.email)

                      unique=10
                 }
                
                
          }
          console.log(tabWh,'aaaaa')
          console.log(com ,"thiddf,fgmm")
          var p11=  new Promise(resolve => {
            this.ht.post('http://localhost:5900/eve/pushDemandesbou/'+ com._id +"/" ,{tab:tabWh,tabGrade:this.log.tabGrade}) .subscribe(data=>{
               
              resolve(data)
              }) 
          })
         var op:any
         op=await p11
         console.log(op,"rttyyy")
         
              var tabsalire=tabWh.slice(0,tabWh.length)
              tabsalire.push(com.user)
              console.log(tabsalire,'eaeu')
              this.ht.post('http://localhost:5900/eve/salaire/' ,{tab:tabsalire,commmande:com}) .subscribe(data=>{
              
                 console.log(data,'voire prime')
                 this.ht.post('http://localhost:5900/eve/userAjEliminer/',{tab:tabsalire}).subscribe(data => {
                
                  console.log(data,"top")
                })

               }) 
        
            
             
            this.ht.put('http://localhost:5900/eve/modifDemande/'+ com._id  + '/', {  vaildationAdminstration:true, nouveaux:false , datValidation:Date(),datSeconde:Date.now() + 120000}).subscribe(data => { 
              
                  console.log(data,"vvv")
              this.ht.get('http://localhost:5900/eve/voirEve/').subscribe(data=>{
                  this.Ncommandes=data
                  this.tabNC=this.Ncommandes.eves
                  this.tabNC=this.tabNC.reverse()
                  console.log(  this.tabNC,"tabbb")
              
                })
              })

          
      
           
          
            
            alert('commande valider')
        
            
    
    
    
   


 }
   
  
  
 if(this.tabNC[e].user.Aff==false){
   console.log(this.tabNC[e].user.Aff,"nonaFF")
  this.ht.put('http://localhost:5900/eve/modifDemande/'+ com._id  + '/', {  vaildationAdminstration:true, nouveaux:false , datValidation:Date(),datSeconde:Date.now() + 120000}).subscribe(data => { 
              
    console.log(data,"vvv")
this.ht.get('http://localhost:5900/eve/voirEve/').subscribe(data=>{
    this.Ncommandes=data
    this.tabNC=this.Ncommandes.eves
    this.tabNC=this.tabNC.reverse()
    console.log(  this.tabNC,"tabbb")

  })
})
 }


     
  }


}
