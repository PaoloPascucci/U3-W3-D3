import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';

import { ProfiloPersComponent } from './components/profilo-pers/profilo-pers.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'pp',
    component:ProfiloPersComponent
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  declarations: [
    HomeComponent,    
    ProfiloPersComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule, FormsModule],
})
export class AppRoutingModule {}
