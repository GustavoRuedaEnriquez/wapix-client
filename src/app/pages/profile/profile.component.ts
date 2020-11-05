import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { empty } from 'rxjs';
import { UserService } from 'src/app/globals/services/user.service';
import { MustMatch } from 'src/app/globals/validators/password-match.validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editForm: FormGroup;
  submitted: boolean = false;
  logged: boolean = false;
  isLoading: Boolean = true;
  edit: boolean = false;
  user: any;
  name:String;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      username: ['', Validators.pattern('[(!/^\s/)]*[a-zA-Z ]*[(!/^\s/)]*') ],
      password: ['', Validators.minLength(6)],
      confirmPassword: ''
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    this.getUserInfo();

  }
  
  getUserInfo():void{
     /*
    Obtain the token and the email from the session,
    for now, it is hardcoded.
    */
   let email: string = 'gare_98@hotmail.com';

   let token: string = environment.token;

   this.userService.getUser(email, token)
     .then(data => {
       this.isLoading = false;
       this.user = data.user[0];
     })
     .catch(err => {
       console.error(err);
     });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  editBtn(): void {
    this.edit = !this.edit;
    this.submitted = false;
    this.getUserInfo();
  }

  userEdit(): void {
    this.submitted = true;

    let value = this.editForm.getRawValue();

    this.name = value.username;

    let userObj = {
      "username": this.editForm.value.username
    }

    /*
    Obtain the token and the email from the session,
    for now, it is hardcoded.
    */

    let token: string = environment.token;

    if (this.editForm.valid && this.name && this.editForm.value.password) {
            
      this.logged = true;

      this.userService.updatetUser(this.editForm.value, this.user.email, token)
        .then(data => {
          console.log(data);
          this.editBtn();
        })
        .catch(err => {
          this.logged = false;
          console.log("Faltan datos");
        });

        this.getUserInfo();
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.editForm.value))

    } else if (this.editForm.valid && this.editForm.value.password && !this.name) {
            
      this.logged = true;

      this.editForm.value.username = this.user.username;

      this.userService.updatetUser(this.editForm.value, this.user.email, token)
        .then(data => {
          console.log(data);
          this.editBtn();
        })
        .catch(err => {
          this.logged = false;
          console.log("Faltan datos");
        });

        this.getUserInfo();


    } else if (this.editForm.valid && this.name && !this.editForm.value.password) {
      
      this.logged = true;

      this.userService.updatetUser(userObj, this.user.email, token)
        .then(data => {
          console.log(data);
          this.editBtn();
        })
        .catch(err => {
          this.logged = false;
          console.log("Faltan datos");
        });

        this.getUserInfo();

    } else {
      // stop here if form is invalid
      this.logged = false;
      console.log("Faltan datos");
    }
  }

}
