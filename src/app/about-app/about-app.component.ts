import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-about-app',
  templateUrl: './about-app.component.html',
  styleUrls: ['./about-app.component.css']
})
export class AboutAppComponent implements OnInit {

  constructor() { }

  dataSource : Pam[] = [];
  displayedColumns = ["nuclease", "organism", "pam"];

  ngOnInit() {
    this.dataSource = [
      {
        nuclease:"SpCas9",
        pam:"Streptococcus pyogenes	",
        organism:"NGG"
      },
      {
        nuclease:"SaCas9",
        pam:"Staphylococcus aureus",
        organism:"NGRRT или NGRRN"
      },
      {
        nuclease:"NmeCas9",
        pam:"Neisseria meningitidis",
        organism:"NNNNGATT"
      },
      {
        nuclease:"CjCas9",
        pam:"Campylobacter jejuni",
        organism:"NNNNRYAC"
      },
      {
        nuclease:"StCas9",
        pam:"Streptococcus thermophilus",
        organism:"NNAGAAW"
      },
      {
        nuclease:"LbCpf1",
        pam:"Lachnospiraceae bacterium",
        organism:"TTTV"
      }
    ]
  }
}

export interface Pam{
  nuclease: string;
  organism: string;
  pam: string;
}
