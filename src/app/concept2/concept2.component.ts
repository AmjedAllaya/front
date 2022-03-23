import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-concept2',
  templateUrl: './concept2.component.html',
  styleUrls: ['./concept2.component.scss']
})
export class Concept2Component implements OnInit {
x:any
myIndex=0
  constructor() { }

  ngOnInit(): void {

    this.carousel()
    setTimeout(this.carousel, 2500); 


}
carousel() {
  var i;
this.x = document.getElementsByClassName("mySlides");
for (i = 0; i < this.x.length; i++) {
  this.x[i].style.display = "none";  

}
this.myIndex++;
if (this.myIndex > this.x.length) {this.myIndex = 1}    
this.x[this.myIndex-1].style.display = "block";  
   
}
}
