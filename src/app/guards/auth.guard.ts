import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { NavController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private navCtrl: NavController) {}

  async canActivate() {
    // Validamos que existe un usuario en el localstorage almacenado
    const user = await localStorage.getItem("user");
    // let onboard = localStorage.getItem(CONSTANTES.LOCAL_STORAGE.tutorial);
    if (user) {
      this.navCtrl.navigateRoot("/home");
      return true;
    } else {
      return true;
    }
  }
}
