import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WapixService } from 'src/app/globals/services/wapix.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  submitted = false;

  constructor(private formBuilder:FormBuilder, private wapixService:WapixService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

  userLogin() {
    this.submitted = true;
    console.log(this.loginForm.value);

    // Email for testing = gare_98@hotmail.com

    if(this.loginForm.valid) {

      this.wapixService.loginUser(this.loginForm.value)
      .then( data => {
        console.log(data);
        alert("El usuario inicio sesión");
      })
      .catch( err => {
        console.error(err);
        alert("Sucedió un error a la hora de iniciar sesión.");
      })
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
    } else {
      console.log("Faltan datos");
      return;
    }
  }

}
