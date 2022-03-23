import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AcComponent } from './ac/ac.component';
import {MatButtonModule} from '@angular/material/button';
import { FormComponent } from './form/form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import {MatBadgeModule} from '@angular/material/badge';
import { MediaMatcher } from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card'

import { IconsModule } from 'angular-bootstrap-md'
// NGX Pagination
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { RouterModule, Routes } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {IvyGalleryModule} from 'angular-gallery';
//


import {

  MatAutocompleteModule,  
 } from '@angular/material/autocomplete';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { StudentListComponent } from './student-list/student-list.component';


// NGX Pagination
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { AdminComponent } from './admin/admin.component';
import { ProfilAffComponent } from './profil-aff/profil-aff.component';
import { FixeComponent } from './fixe/fixe.component';
import { LoginComponent } from './login/login.component';
import { FormAffComponent } from './form-aff/form-aff.component';
import { FormAjoutClentAffComponent } from './form-ajout-clent-aff/form-ajout-clent-aff.component';
import { HeaderComponent } from './header/header.component';
import { CatlogueComponent } from './catlogue/catlogue.component';
import { ConceptComponent } from './concept/concept.component';
import { Concept2Component } from './concept2/concept2.component';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



@NgModule({
  declarations: [AppComponent, AcComponent, FormComponent, AddStudentComponent, EditStudentComponent, StudentListComponent, AdminComponent, ProfilAffComponent, FixeComponent, LoginComponent, FormAffComponent, FormAjoutClentAffComponent, HeaderComponent, CatlogueComponent, ConceptComponent, Concept2Component],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    IvyGalleryModule,
    CarouselModule, WavesModule ,
    MatBadgeModule,
     MatCardModule,
       MatToolbarModule,
    MatSidenavModule,
    IvyCarouselModule,
    MatIconModule,
    MatDividerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserAnimationsModule, // required animations module
    NgxPaginationModule,
    IconsModule,
    ToastrModule.forRoot(),
   MatAutocompleteModule,ReactiveFormsModule,MatFormFieldModule,MatChipsModule,BrowserModule,MatMenuModule,MatButtonModule, AppRoutingModule, BrowserAnimationsModule, SharedModule, NgxSkeletonLoaderModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
