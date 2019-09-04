import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(protected userService: UserService) {}

  ngOnInit() {
    this.userService.logIn('mreodriguez', 'EstaEsMiSuperClave').subscribe(
      (response) => {
       console.log(response);
      }
    );
  }
}
