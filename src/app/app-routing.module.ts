import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewWapixComponent } from './pages/view-wapix/view-wapix.component';
import { NewWapixComponent } from './pages/new-wapix/new-wapix.component';
import { EditWapixComponent } from './pages/edit-wapix/edit-wapix.component';
import { GuestPlayComponent } from './pages/guest-play/guest-play.component';
import { GuestQuestionComponent } from './pages/guest-question/guest-question.component';

import { PlayWapixComponent } from './pages/play-wapix/play-wapix.component';
import { ReportWapixComponent } from './pages/report-wapix/report-wapix.component';
import { WapixQuestionComponent } from './globals/components/wapix-question/wapix-question.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './globals/guards/auth.guard';
import { UnAuthGuard } from './globals/guards/unauth.guard';

const routes: Routes = [
  { path: '', redirectTo : 'my-wapix', pathMatch : 'full' },
  { path: 'my-wapix', component : ViewWapixComponent, canActivate: [AuthGuard]},
  { path: 'my-wapix/new', component : NewWapixComponent, canActivate: [AuthGuard] },
  { path: 'my-wapix/play/:id', component : PlayWapixComponent, canActivate: [AuthGuard]},
  { path: 'my-wapix/:id', component : EditWapixComponent, canActivate: [AuthGuard]},
  { path: 'report', component : ReportWapixComponent, canActivate: [AuthGuard] },
  { path: 'guest', component : GuestPlayComponent},
  { path: 'guest-question/:username', component : GuestQuestionComponent},
  { path: 'my-wapix/play/:id/question/:questionId', component : WapixQuestionComponent, canActivate: [AuthGuard]},
  { path: 'login', component : LoginComponent, canActivate: [UnAuthGuard]},
  { path: 'register', component : RegisterComponent, canActivate: [UnAuthGuard]},
  { path: 'profile', component : ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
