import { faUser,
        faEnvelope,
        faLock,
        faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/globals/services/user.service';
import { MustMatch } from 'src/app/globals/validators/password-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted:boolean = false;

  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faChevronLeft = faChevronLeft;

  constructor(
    private formBuilder: FormBuilder, 
    private userService:UserService,
    private titleService: Title
    ) { }

  ngOnInit() {
    this.titleService.setTitle('Wapix | Perfil');
     this.registerForm = this.formBuilder.group({
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  userRegister():void {
      this.submitted = true;

      if(this.registerForm.valid) {

        this.userService.createUser(this.registerForm.value)
        .then( data => {
          alert("El usuario fue creado");
        })
        .catch( err => {
          console.error(err);
          alert("Sucedió un error a la hora de crear el usuario.");
        })
      }
  }
}
