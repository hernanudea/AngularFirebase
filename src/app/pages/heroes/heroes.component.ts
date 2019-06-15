import { Component, OnInit } from "@angular/core";
import { HeroesService } from "src/app/services/heroes.service";
import { HeroeModel } from "src/app/models/heroe.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html"
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando = true;

  constructor(private heroesService: HeroesService) {}

  ngOnInit() {
    this.heroesService.obtenerHeroes().subscribe(resp => {
      this.heroes = resp;
      this.cargando = false;
    });
  }

  borrarHeroe(heroe: HeroeModel, index: number) {
    Swal.fire({
      title: "Está seguro?",
      text: `Quiere borrar el héroe ${heroe.nombre}?`,
      type: "question",
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.heroesService.borrorHeroe(heroe.id).subscribe(resp => {
          this.heroes.splice(index, 1);
        });
      }
    });
  }
}
