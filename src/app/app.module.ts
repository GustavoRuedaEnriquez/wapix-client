import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

/* Global components */
import { NavigationBarComponent } from './globals/components/navigation-bar/navigation-bar.component';
import { WapixFormComponent } from './globals/components/wapix-form/wapix-form.component';

/* Pages components */
import { ViewWapixComponent } from './pages/view-wapix/view-wapix.component';
import { NewWapixComponent } from './pages/new-wapix/new-wapix.component';
import { PlayWapixComponent } from './pages/play-wapix/play-wapix.component';
import { EditWapixComponent } from './pages/edit-wapix/edit-wapix.component';
import { WapixQuestionComponent } from './globals/components/wapix-question/wapix-question.component';
import { ReportWapixComponent } from './pages/report-wapix/report-wapix.component';
import { GuestPlayComponent } from './pages/guest-play/guest-play.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    WapixFormComponent,
    ViewWapixComponent,
    ReportWapixComponent,
    NewWapixComponent,
    EditWapixComponent,
    PlayWapixComponent,
    WapixQuestionComponent,
    GuestPlayComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
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
