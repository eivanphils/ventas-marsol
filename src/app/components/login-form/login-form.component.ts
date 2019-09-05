import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loading: any;
  user = {
    username: null,
    password: null
  };

  constructor(
    protected modalCtrl: ModalController,
    protected userService: UserService,
    protected loadingCtrl: LoadingController,
    protected router: Router,
    protected toastCtrl: ToastController
    ) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  login() {
    this.presentLoading();
    this.userService.logIn(this.user.username, this.user.password).subscribe(
      (response) => {
        if (response) {
          this.userService.saveUserData(response);
          this.router.navigate(['/home']);
          this.closeModal();
        }

        this.presentToast('primary', 'Inicio de sesión exitoso!');
        this.loading.dismiss();
      },
      (error) => {
        this.presentToast('danger', error.error);
        this.loading.dismiss();
      }
    );
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'dots'
    });

    return this.loading.present();
  }

  async presentToast(color: string, message: string) {
    const toast = await this.toastCtrl.create({
      color,
      message,
      duration: 3000,
      position: 'bottom',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
           console.log('close toast');
          }
        }
      ]
    });

    toast.present();
  }
}
