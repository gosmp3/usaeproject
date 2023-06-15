import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Form2Component } from './form2/form2.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'form', component: Form2Component},
  { path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }