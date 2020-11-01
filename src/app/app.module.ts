import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './globals/components/navigation-bar/navigation-bar.component';
import { ViewWapixComponent } from './pages/view-wapix/view-wapix.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditWapixComponent } from './pages/edit-wapix/edit-wapix.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    ViewWapixComponent,
    EditWapixComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
