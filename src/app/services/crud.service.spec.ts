import { TestBed } from '@angular/core/testing';

import { CrudService } from './crud.service';

describe('CrudService', () => {
  let service: CrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
 /*AddStudent(user:Student,prix:number,panniers:any) {
    console.log(5)
   
    this.studentsRef.push({
      name:user.name,
      prenom: user.prenom,
      email: user.email,
      phone: user.phone
    }).then(element=>{ 
      let s = this.GetStudentsList(); 
      
      s.snapshotChanges().subscribe(data => {
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
  
      
      user.key=data[data.length-1].payload.toJSON()
    this.ht.post('http://localhost:5900/api/v1/registerAff/',user
    ).subscribe(data => {
      if(this.objData==true){
        this.ht.post('http://localhost:5900/eve/pushDemandes/'+this.objData.user._id+'/',{
         date:Date(),
         datSeconde:Date.now() + 120000,
        
         produit:panniers,
         prix:prix,
        
         nouveaux:true,
         vaildationAdminstration:false,
         datReponse:"",
         validaTionGrade:true,
       
         user:this.objData.user._id,
         users:[this.objData.user._id],
        }).subscribe(data => {
           console.log(data,"commande")

         })
      }

    })*/
     