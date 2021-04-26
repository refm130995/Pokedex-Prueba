import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { NavController } from "@ionic/angular";
import { UtilitiesService } from "src/app/services/utilities/utilities.service";
import { CONSTANTES } from "src/app/services/constantes";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private utilities: UtilitiesService,
    private navCtrl: NavController,
    public ngFireAuth: AngularFireAuth
  ) {
    this.formGroup = this.fb.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ]),
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  ngOnInit() {}

  // Metodo de iniciar usuario
  async signIn() {
    await this.utilities.displayLoading();
    const { email, password } = this.formGroup.value;
    try {
      // Iniciamos la consulta
      this.ngFireAuth.signInWithEmailAndPassword(email, password).then(
        (res: any) => {
          localStorage.setItem("user", JSON.stringify(res));
          this.utilities.dismissLoading();
          this.navCtrl.navigateForward("/home");
        },
        (e) => {
          // En caso de error
          this.utilities.dismissLoading();
          this.utilities.displayToast(
            e.error.message ? e.error.message : CONSTANTES.MESSAGES.error
          );
        }
      );
    } catch (e) {
      this.utilities.dismissLoading();
      this.utilities.displayToast(
        e.error.message ? e.error.message : CONSTANTES.MESSAGES.error
      );
      console.error(e);
    }
  }

  goTo(url) {
    this.navCtrl.navigateForward(url);
  }
}
