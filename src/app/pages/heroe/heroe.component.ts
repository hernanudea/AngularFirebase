import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";

import { HeroeModel } from "src/app/models/heroe.model";
import { HeroesService } from "src/app/services/heroes.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-heroe",
  templateUrl: "./heroe.component.html"
})
export class HeroeComponent implements OnInit {
  heroe = new HeroeModel();

  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id !== "nuevo") {
      this.heroesService.obtenerHeroe(id)
      .subscribe((resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log("Formulario no valido");
      return;
    }
    Swal.fire({
      title: "Espere",
      text: "Guardando información",
      type: "info",
      allowOutsideClick: false
    });
    Swal.showLoading();
    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }
    peticion.subscribe(rest => {
      Swal.fire({
        title: this.heroe.nombre,
        text: "Se ha actualizado correctamente",
        type: "success"
      });
    });
  }
}
