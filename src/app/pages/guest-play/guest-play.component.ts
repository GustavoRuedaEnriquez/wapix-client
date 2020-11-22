import { Component, OnInit } from '@angular/core';
import { NavbarConfigService } from '../../globals/services/navbar-config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WapixService } from '../../globals/services/wapix.service';
import { SocketService } from '../../globals/services/socket.service';

@Component({
  selector: 'app-guest-play',
  templateUrl: './guest-play.component.html',
  styleUrls: ['./guest-play.component.scss']
})
export class GuestPlayComponent implements OnInit {

  form: FormGroup;

  constructor(
    private navbarConfigService:NavbarConfigService,
    private fb:FormBuilder,
    private wapixService:WapixService,
    private socketService:SocketService) 
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
        if(data.availability) {
          console.log('Correcto, aquí es donde se hace la conexión con sockets.');
          this.socketService.connect();
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
