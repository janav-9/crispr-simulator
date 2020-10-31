import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { CRISPRresult, APIresult } from '../models';
import { Observable } from 'rxjs';
import * as  SeqViz  from "seqviz";

@Component({
  selector: 'app-crispr',
  templateUrl: './crispr.component.html',
  styleUrls: ['./crispr.component.css']
})
export class CrisprComponent implements OnInit {
  public species: string = '';
  public pamseq: string = '';
  public direction: string = '';
  public userseq: string = '';
  public fastaseq: string = '';
  public resultArray: CRISPRresult[] = [];
  public displayedColumns: string[] = ['position', 'sequence', '8mer', '12mer', '20mer'];
  public showEmpty: boolean = false;
  public fileToUpload: File;
  public sekvencaTip;
  public tipSek: string = '';
  public strand: string ='';
  public filename: string = '';

  constructor(private httpClient: HttpClient) { }


  ngOnInit() {
  }

  public sendRequest(): Observable<APIresult> {
    const self = this;
    const params = new HttpParams()
      .set('userseq', self.userseq)
      .set('pam', self.pamseq)
      .set('db', self.species)
      .set('format', 'json')

    return self.httpClient.get<APIresult>("http://localhost:4200/api?" + params);
  }

  public downLoadCrispr(): Observable<any> {
    const self = this;
    const params = new HttpParams()
      .set('userseq', self.userseq)
      .set('pam', self.pamseq)
      .set('db', self.species)
      .set('format', 'txt')
      .set('download', 'download');

    return self.httpClient.get<any>("http://localhost:4200/api?" + params,{responseType: 'blob' as 'json'} );
  }

  public getCRISPR(download?: string): void {
    const self = this;
    if(self.userseq.length > 4000){
      alert("Секвенцата е поголема од дозволените 4000 нуклеотиди!")
    }
    else if(self.direction != '' && self.pamseq != ''){
      if (download == null || download == undefined || download != "download") {
        self.resultArray = [];
        self.sendRequest().subscribe(result => {
          if (result.results.length > 0) {
            result.results.forEach(element => {
              if (element.strand == self.strand) {
                self.resultArray.push(element);
              }
            });
            console.log(this.resultArray)

          }
          else self.showEmpty = true;
        });
      }
  
      else {
        self.downLoadCrispr().subscribe(response => {      
          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', '.txt');
          document.body.appendChild(downloadLink);
          downloadLink.click();});
      }
    }
  }

  async handleFileInput(files: FileList) {
    const self = this;
    this.fileToUpload = files.item(0);
    var fileContent = await this.getFile(files[0]);
    var fastaParser = require('fasta-js');

    var options = {
      'definition': 'gi|accession|description',
      'delimiter': '|'
    };
    var fasta = new fastaParser(options);
    var fastacontent = fasta.parse(fileContent);
    self.userseq = fastacontent[0].sequence;
    self.filename = fastacontent[0].accession;
  }

  getFile(file: File): Promise<string> {

    return new Promise<string>((resolve, reject) => {
      if (!file) {
        resolve('');
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const text = reader.result.toString();
        resolve(text);

      };

      reader.readAsText(file);
    });
  }

  setValue() {
    const self = this;
    self.tipSek = self.sekvencaTip;
  }

  setValueStrand() {
    const self = this;
    self.strand = self.direction;
  }
}
