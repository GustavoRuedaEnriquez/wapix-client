import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewWapixComponent } from './pages/view-wapix/view-wapix.component';
import { EditWapixComponent } from './pages/edit-wapix/edit-wapix.component';

const routes: Routes = [
  { path: '', redirectTo : 'my-wapix', pathMatch : 'full' },
  { path: 'my-wapix', component : ViewWapixComponent },
  { path: 'my-wapix/:id', component : EditWapixComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
