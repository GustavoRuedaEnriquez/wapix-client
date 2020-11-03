import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WapixService } from 'src/app/globals/services/wapix.service';
import { MustMatch } from 'src/app/globals/validators/password-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private wapixService:WapixService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required]
      }, {
          validator: MustMatch('password', 'confirmPassword')
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      if(this.registerForm.valid) {

        this.wapixService.createUser(this.registerForm.value)
        .then( data => {
          console.log(data);
          alert("El usuario fue creado");
        })
        .catch( err => {
          console.error(err);
          alert("Sucedió un error a la hora de crear el usuario.");
        })
          //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
      } else {
        // stop here if form is invalid
        console.log("Faltan datos");
        return;
      }
  }
}
