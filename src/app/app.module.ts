import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './globals/components/navigation-bar/navigation-bar.component';
import { ViewWapixComponent } from './pages/view-wapix/view-wapix.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewWapixComponent } from './pages/new-wapix/new-wapix.component';
import { GuestPlayComponent } from './pages/guest-play/guest-play.component';
import { MainPlayComponent } from './pages/main-play/main-play.component';
import { MainNavigationBarComponent } from './globals/components/main-navigation-bar/main-navigation-bar.component';
import { ReportWapixComponent } from './pages/report-wapix/report-wapix.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    ViewWapixComponent,
    NewWapixComponent,
    GuestPlayComponent,
    MainPlayComponent,
    MainNavigationBarComponent,
    ReportWapixComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
