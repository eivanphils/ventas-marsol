import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(protected modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openLoginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginFormComponent,
    });

    return await modal.present();
  }

}
