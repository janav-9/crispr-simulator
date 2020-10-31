import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guide-rna',
  templateUrl: './guide-rna.component.html',
  styleUrls: ['./guide-rna.component.css']
})
export class GuideRNAComponent implements OnInit {

  public userseq: string = '';
  public sgrnaRes: string = '';
  public scaffold: string = 'GUUUUAGAGC UAGAAAUAGC AAGUUAAAAU AAGGCUAGUC CGUUAUCAAC UUGAAAAAGU GGCACCGAGU CGGUGCUUUU';
  constructor() { }

  ngOnInit() {
  }

  set_query() {
    const self = this;
    if(self.userseq != ''){
      self.sgrnaRes =
      self.userseq.replace(/[^ATGCUNRYMKSWHBVD-]/gi, '').replace(/...$/, '')+
      self.scaffold.replace(/[^ATGCUNRYMKSWHBVD-]/gi, '') ;;
    }
    }
}
