import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewWapixComponent } from './pages/view-wapix/view-wapix.component';
import { NewWapixComponent } from './pages/new-wapix/new-wapix.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo : 'my-wapix', pathMatch : 'full' },
  { path: 'my-wapix', component : ViewWapixComponent },
  { path: 'my-wapix/new', component : NewWapixComponent },
  { path: 'login', component : LoginComponent },
  { path: 'register', component : RegisterComponent },
  { path: 'profile', component : ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
