import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catlogue',
  templateUrl: './catlogue.component.html',
  styleUrls: ['./catlogue.component.scss']
})
export class CatlogueComponent implements OnInit {
ProduitOrdre:any
  constructor(private ht:HttpClient) { }

  ngOnInit(): void {
     this.ht.get('http://localhost:5900/todo/produit/').subscribe(data => {
  
     
  
      this.ProduitOrdre=data
      this.ProduitOrdre=this.ProduitOrdre.slice(0,3)
      console.log(this.ProduitOrdre)
      
  
    })
  }

}
