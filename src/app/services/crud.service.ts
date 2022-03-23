import { HttpClient } from '@angular/common/http';
import { PrefixNot } from '@angular/compiler';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
import { LoginSService } from '../login-s.service';
/*export interface Student {
    $key: string;
    name: string;
     prenom: string;
    email: string
    phone: Number;
 }*/
@Injectable({
  providedIn: 'root'
})

export class CrudService {
  studentsRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  studentRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too
  nombreC:any
  objData:any
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase,private ht:HttpClient,public log:LoginSService) { }

  // Create Student
  AddStudent(student:any,panniers:any,prix,prixt,typeLiverison,Adres) {
      var name=student.name
      var prenom=student.prenom
      var email=student.email
      var phone=student.phone
          console.log(student)
    this.studentsRef.push({
      name:name,
      prenom:prenom,
      phone:phone,
      email:email 
    }).then(element=>{ 
      let s = this.GetStudentsList(); 
      
      s.snapshotChanges().subscribe(data => {
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
  
     
     var key= data[data.length-1].key
    this.ht.post('http://localhost:5900/api/v1/registerAff/',student
    ).subscribe(data => {
      console.log(data)
      this.objData=data
      if(this.objData.message == true){
        this.ht.get('http://localhost:5900/api/v1/voirPrincipale/').subscribe(data => {
          var userPrin:any
          userPrin=data
         
          this.ht.put('http://localhost:5900/api/v1/modifDemandeG/' + this.objData.user._id +'', {userAj:  userPrin._id}).subscribe(data => {
        console.log(data,'rttytg')
        this.ht.post('http://localhost:5900/eve/creercomande/',{
         date:Date(),
         datSeconde:Date.now() + 120000,
         typeLiverison:typeLiverison,
         key:key,
         produit:panniers,
         prix:prix,
         prixTot:prixt,
         nouveaux:true,
         vaildationAdminstration:false,
         datReponse:"",
         validaTionGrade:true,
         Adresse:Adres, 
         user:this.objData.user._id,
         users:[this.objData.user._id],
        }).subscribe(data => {
           console.log(data,"commande")

         })
        })
        })
      }
  
    })
  })
})
   
  }
  //pour les non afflier

//pour les nouveaux afflier ajouter
AddStudenAj(student:any,panniers:any,prix,prixt,typeLiverison,Adres) {
  var name=student.name
  var prenom=student.prenom
  var email=student.email
  var phone=student.phone
      console.log(student)
this.studentsRef.push({
  name:name,
  prenom:prenom,
  phone:phone,
  email:email 
}).then(element=>{ 
  let s = this.GetStudentsList(); 
  
  s.snapshotChanges().subscribe(data => {
  // Using snapshotChanges() method to retrieve list of data along with metadata($key)

 
 var key= data[data.length-1].key
this.ht.post('http://localhost:5900/api/v1/registerAff/',student
).subscribe(data => {
  console.log(data)
  this.objData=data
  if(this.objData.message == true){
   
     
      this.ht.put('http://localhost:5900/api/v1/modifDemandeG/' + this.objData.user._id +'', {userAj:  this.log.user._id}).subscribe(data => {
    console.log(data,'rttytg')
    this.ht.post('http://localhost:5900/eve/creercomande/',{
     date:Date(),
     datSeconde:Date.now() + 120000,
     key:key,
     produit:panniers,
     prix:prix,
     prixTot:prixt,
     typeLiverison:typeLiverison,
     nouveaux:true,
     vaildationAdminstration:false,
     datReponse:"",
     validaTionGrade:true,
     Adresse:Adres,
     user:this.objData.user._id,
     users:[this.objData.user._id],
    }).subscribe(data => {
       console.log(data,"commande")

     })
    })
  
  }

})
})
})
alert("commande en cours")
}
//pour ancien aff
AddStudenAn(student:any,panniers:any,prix,prixt,typeLiverison,Adres) {
  var name=student.name
  var prenom=student.prenom
  var email=student.email
  var phone=student.phone
      console.log(student)
this.studentsRef.push({
  name:name,
  prenom:prenom,
  phone:phone,
  email:email 
}).then(element=>{ 
  let s = this.GetStudentsList(); 
  
  s.snapshotChanges().subscribe(data => {
  // Using snapshotChanges() method to retrieve list of data along with metadata($key)

 
 var key= data[data.length-1].key

    console.log('eeen')

   
     
     
    this.ht.post('http://localhost:5900/eve/creercomande/',{
     date:Date(),
     datSeconde:Date.now() + 120000,
      key:key,
     produit:panniers,
     typeLiverison:typeLiverison,
     prix:prix,
     prixTot:prixt,
     nouveaux:true,
     vaildationAdminstration:false,
     datReponse:"",
     validaTionGrade:true,
   
     user:this.log.user._id,
     Adresse:Adres,
     users:[this.log.user._id],
    }).subscribe(data => {
       console.log(data,"commande")

     })

  
     alert("commande en cours")


})
})

}
  // Fetch Single Student Object
  GetStudent(id: string) {
    this.studentRef = this.db.object('students-list/' + id);
    return this.studentRef;
  }

  // Fetch Students List
  GetStudentsList() {
    this.studentsRef = this.db.list('students-list');
    console.log(this.studentsRef)
    return this.studentsRef;

  }  

  // Update Student Objectxx
  UpdateStudent(student:any) {
    this.studentRef.update({
      name: student.name,
       prenom: student .prenom,
      email: student.email,
      phone: student.phone
    })
  }  

  // Delete Student Object
  DeleteStudent(id: string) { 
    this.studentRef = this.db.object('students-list/'+id);
    this.studentRef.remove();
  }
  //voire nouveaux commandes
  voireCommandeNouveaux(noveauxC:any,tab:any){
    this.ht.get('http://localhost:5900/eve/voirEve/').subscribe(data=>{
      noveauxC=data
      tab=noveauxC.eves
      console.log(tab,"tabbb")
  
    })

  }
}