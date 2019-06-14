import { Component, OnInit } from "@angular/core";
import { HeroeModel } from "src/app/models/heroe.model";

@Component({
  selector: "app-heroe",
  templateUrl: "./heroe.component.html",
  styleUrls: ["./heroe.component.css"]
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor() {}

  ngOnInit() {}
}
