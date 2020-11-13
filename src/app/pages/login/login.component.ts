import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSleigh } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/globals/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  logged = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  userLogin(): void {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.logged = true;
      this.userService.loginUser(this.loginForm.value)
        .then(data => {
          console.log(data);
          this.router.navigate(['../my-wapix']);
        })
        .catch(err => {
          this.logged = false;
          alert("No se pudo iniciar sesión, verifique sus datos o inténtelo más tarde.");
        })
    } 
  }

}
