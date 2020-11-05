import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewWapixComponent } from './pages/view-wapix/view-wapix.component';
import { NewWapixComponent } from './pages/new-wapix/new-wapix.component';
import { EditWapixComponent } from './pages/edit-wapix/edit-wapix.component';
import { GuestPlayComponent } from './pages/guest-play/guest-play.component';
import { PlayWapixComponent } from './pages/play-wapix/play-wapix.component';
import { ReportWapixComponent } from './pages/report-wapix/report-wapix.component';
import { WapixQuestionComponent } from './globals/components/wapix-question/wapix-question.component';

const routes: Routes = [
  { path: '', redirectTo : 'my-wapix', pathMatch : 'full' },
  { path: 'my-wapix', component : ViewWapixComponent },
  { path: 'my-wapix/new', component : NewWapixComponent },
  { path: 'my-wapix/play/:id', component : PlayWapixComponent },
  { path: 'my-wapix/:id', component : EditWapixComponent },
  { path: 'report', component : ReportWapixComponent },
  { path: 'guest', component : GuestPlayComponent },
  { path: 'my-wapix/play/:id/question/:questionId', component : WapixQuestionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
