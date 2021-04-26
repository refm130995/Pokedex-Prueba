import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  user: any;
  constructor(private navCtrl: NavController) {}

  async ngOnInit() {
    const { user } = await JSON.parse(localStorage.getItem("user"));
    this.user = user;
  }

  close() {
    localStorage.clear();
    this.navCtrl.navigateRoot("/");
  }

  goTo(url) {
    this.navCtrl.navigateForward(url);
  }
}
