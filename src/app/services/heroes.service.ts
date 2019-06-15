import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HeroeModel } from "../models/heroe.model";
import { map, delay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class HeroesService {
  private url = "https://login-app-ee5af.firebaseio.com";

  constructor(private http: HttpClient) {}

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {
    //JS envia los objetos por referencia, de este modo rompo la referencia
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  obtenerHeroes() {
    return this.http
      .get(`${this.url}/heroes.json`)
      .pipe(map(resp => this.crearArreglo(resp),
      delay(0)
      ));
  }

  private crearArreglo(heroeObj: Object) {
    if (heroeObj === null) {
      return [];
    }

    console.log(heroeObj);
    const heroes: HeroeModel[] = [];

    Object.keys(heroeObj).forEach(key => {
      const heroe: HeroeModel = heroeObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }

  obtenerHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  borrorHeroe(id: string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
}
