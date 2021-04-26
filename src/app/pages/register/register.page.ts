import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilitiesService } from "src/app/services/utilities/utilities.service";
import { NavController } from "@ionic/angular";
import { CONSTANTES } from "src/app/services/constantes";
import { AngularFireAuth } from "@angular/fire/auth";
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  formGroup: FormGroup;
  constructor(
    private firestore: FirestoreService,
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
      password: ["", Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.formGroup.reset();
  }

  // Metodo de registrar usuario
  async signUp() {
    await this.utilities.displayLoading();
    const { email, password } = this.formGroup.value;
    try {
      // Iniciamos la consulta
      this.ngFireAuth.createUserWithEmailAndPassword(email, password).then(
        (res: any) => {
          this.firestore.registerUser({
            uid: res.user.uid,
            email: res.user.email,
          });
          this.utilities.dismissLoading();
          this.utilities.displayToast("Registro Exitoso");
          this.navCtrl.navigateForward("/");
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
