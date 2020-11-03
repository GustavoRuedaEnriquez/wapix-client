import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewWapixComponent } from './pages/view-wapix/view-wapix.component';
import { NewWapixComponent } from './pages/new-wapix/new-wapix.component';
import { GuestPlayComponent } from './pages/guest-play/guest-play.component';
import { MainPlayComponent } from './pages/main-play/main-play.component';
import { ReportWapixComponent } from './pages/report-wapix/report-wapix.component';

const routes: Routes = [
  { path: '', redirectTo : 'my-wapix', pathMatch : 'full' },
  { path: 'my-wapix', component : ViewWapixComponent },
  { path: 'my-wapix/new', component : NewWapixComponent },
  { path: 'guest', component : GuestPlayComponent },
  { path: 'play', component : MainPlayComponent },
  { path: 'my-wapix/report', component : ReportWapixComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
