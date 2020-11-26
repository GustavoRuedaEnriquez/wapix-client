import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WapixService } from '../../globals/services/wapix.service';
import { SocketService } from '../../globals/services/socket.service';
import { NavbarConfigService } from '../../globals/services/navbar-config.service';

@Component({
  selector: 'app-guest-play',
  templateUrl: './guest-play.component.html',
  styleUrls: ['./guest-play.component.scss']
})
export class GuestPlayComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private navbarConfigService:NavbarConfigService,
    private fb:FormBuilder,
    private wapixService:WapixService,
    private socketService:SocketService,
    private route:Router) 
  {
    this.navbarConfigService.hideNavbar();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      code: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if(this.form.valid) {
      this.wapixService.enterWapixCode(this.form.get('code').value)
      .then( data => {
        /*
          An available Wapix with that code is found, a connection,
          will be made
        */
        if(data.availability) {
          this.submitted = true;
          /* Establish socket connection */
          this.socketService.connect();
          /* Connect to Wapix */
          this.socketService.emit('wapix-connect-player', {
            username : this.form.get('username').value,
            hostId : data.wapixInfo._id
          });
          /* Host starts the game */
          this.socketService.on('wapix-start-game', (resultId) => {
            this.route.navigate([`/guest-question/${this.form.get('username').value}/${resultId}`]);
          });
        }
        else {
          alert(`${data.message}`);
        }
      })
      .catch( err => {
        console.error(err);
        alert("Sucedió un error a la hora de cargar el wapix.");
      })
    } else {
      alert("Por favor llene todos los campos requeridos");
    }
  }
  
}
