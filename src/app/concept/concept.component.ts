import { Component, OnInit } from '@angular/core';
import {Gallery} from 'angular-gallery';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss']
})
export class ConceptComponent implements OnInit {
  images: [
    {path: 'assets/images/leb/4 (2).jpg'},
    {path: 'assets/images/leb/4 (2).jpg'},
    {path: 'assets/images/leb/4 (2).jpg'},
    {path: 'assets/images/leb/4 (2).jpg'},
    {path: 'assets/images/leb/4 (2).jpg'},
    {path: 'assets/images/leb/4 (2).jpg'},
  
  ]
  constructor(private gallery: Gallery) {}
 
  
     
       
    
  ngOnInit(): void {
  }

}
