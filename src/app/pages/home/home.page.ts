import { NavController } from "@ionic/angular";
import { PokemonsService } from "./../../services/pokemons/pokemons.service";
import { Component, OnInit } from "@angular/core";
import { FirestoreService } from "./../../services/firestore/firestore.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  limit: number;
  pokemons: any = [];

  favoriteIds: any = [];

  favoritePokemonsList: any = [];
  selectedSegment = "list";

  constructor(
    private firestore: FirestoreService,
    private service: PokemonsService,
    private navCtrl: NavController
  ) {
    this.limit = 0;
  }

  ngOnInit() {
    this.firestore.getFavoritesList().then(async (res: any) => {
      this.favoriteIds =
        res && res.data && res.data().favoriteIds ? res.data().favoriteIds : [];
      if (this.favoriteIds.length) {
        this.favoritesList();
      }
    });
    this.getPokemons();
  }

  loadData(event) {
    this.getPokemons(event);
  }

  assignArtwork(index) {
    return (
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
      index +
      ".png"
    );
  }

  favoritesList() {
    const promises = [];

    this.favoriteIds.map((pokemonId) => {
      promises.push(this.service.getPokemonDetail(pokemonId).toPromise());
    });

    Promise.all(promises).then((results) => {
      this.favoritePokemonsList = results;
      this.favoritePokemonsList.forEach((element) => {
        element["artwork"] = this.assignArtwork(element.id);
      });
    });
  }

  isOnFavorites(id) {
    if (this.favoriteIds.indexOf(id) !== -1) {
      return true;
    }
    return false;
  }

  addToFavorites(id) {
    const favoriteIds = this.favoriteIds;

    const pokemonIdIndex = this.favoriteIds.indexOf(id);

    if (pokemonIdIndex < 0) {
      favoriteIds.push(id);
    } else {
      favoriteIds.splice(pokemonIdIndex, 1);
    }

    this.firestore.updateFavoritesList(favoriteIds);

    this.favoriteIds = favoriteIds;

    this.favoritesList();
  }

  getPokemons(event?) {
    this.limit = this.limit + 20;

    this.service.getList(this.limit).subscribe(
      (res: any) => {
        this.pokemons = res.results;
        this.pokemons.forEach((element, index) => {
          element["id"] = index + 1;
          element["artwork"] = this.assignArtwork(index + 1);
        });
        if (event) {
          event.target.complete();
          if (res.results.length >= res.count) {
            event.target.disabled = true;
          }
        }
      },
      (err) => {
        if (event) {
          event.target.complete();
        }
      }
    );
  }

  goDetails(id: any) {
    this.navCtrl.navigateForward("/donate/" + id);
  }

  addFavorite(item) {}

  segmentChanged(event) {
    this.selectedSegment = event.detail.value;
  }

  goTo(url) {
    this.navCtrl.navigateForward(url);
  }
}
