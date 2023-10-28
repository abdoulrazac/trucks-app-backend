import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api'; 
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private authService : AuthenticationService
  ){

  }

  ngOnInit(): void {
    if(!this.authService.isWelcomed){
      this.authService.setIsWelcomed(true)
      this.messageService.add({severity : 'info', summary : 'Bienvenu', detail : `Nous somme heureux de vous revoir`})
    }
  }

}
