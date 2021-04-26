import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PokemonsService {
  constructor(private http: HttpClient) {}

  getList(limit) {
    return this.http.get("https://pokeapi.co/api/v2/pokemon/?limit=" + limit);
  }
  getPokemonDetail(id) {
    return this.http.get("https://pokeapi.co/api/v2/pokemon/" + id);
  }
}
