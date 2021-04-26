import { UtilitiesService } from "src/app/services/utilities/utilities.service";
import { NavController } from "@ionic/angular";
import { PokemonsService } from "./../../services/pokemons/pokemons.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-donate",
  templateUrl: "./donate.page.html",
  styleUrls: ["./donate.page.scss"],
})
export class DonatePage implements OnInit {
  pokemonSelected;
  pokemon: any = [];
  constructor(
    private router: ActivatedRoute,
    private service: PokemonsService,
    private navCtrl: NavController,
    private util: UtilitiesService
  ) {
    this.pokemonSelected = this.router.snapshot.params.id;
  }

  ngOnInit() {
    this.getPokemonById();
  }

  async getPokemonById() {
    await this.util.displayLoading();
    this.service.getPokemonDetail(this.pokemonSelected).subscribe(
      (res) => {
        this.pokemon = res;
        this.util.dismissLoading();
      },
      (err) => {
        this.util.dismissLoading();
      }
    );
  }

  goBack() {
    this.navCtrl.pop();
  }
}
