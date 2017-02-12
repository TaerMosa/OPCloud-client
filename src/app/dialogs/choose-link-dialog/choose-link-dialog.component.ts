import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef ,MdDialogConfig} from '@angular/material';
import { LinkValidationService } from './link-API.service'





@Component({
  selector: 'app-choose-link-dialog',
  templateUrl: './choose_link_dialog.component.html',
  styleUrls: ['./choose-link-dialog.component.css']
})



export class ChooseLinkDialogComponent implements OnInit {
  public newLink: any;
  public linkSource: any;
  public linkTarget: any;
  private opmLinks = opmLinks;
  private selected: any;

  // for service check
  private source : String;
  private Target : String;
  links_names:string[] = [];
  checker:boolean[] = [];
  opl_sentences:string[] = [];
  Symbols:string[]=[];
  serv:any[]=[];

  constructor(
    @Optional() public dialogRef: MdDialogRef<ChooseLinkDialogComponent>
    ,private linkValidationService:LinkValidationService){

  }



  ngOnInit() {
  }

  select(link) {
    this.selected = link;
  }
  private bridge_names(name){
      let css_name=name.replace(/\s/g, "-");
      console.log(css_name.toLowerCase());
      return css_name.toLowerCase();

  }
  public check_links(){

    var source ;
    var destination;


    if(this.linkSource.attributes.type === "opm.Process"){
      source = {name: "<P>", type:"process"};
      console.log("process");
    }
    if(this.linkSource.attributes.type === "opm.Object"){
      source = {name: "<O>", type:"object"};
      console.log("object");
    }
    if(this.linkTarget.attributes.type === "opm.Process"){
      destination = {name: "<P>", type:"process"};
      console.log("Tprocess");
    }
    if(this.linkTarget.attributes.type === "opm.Object"){
      destination = {name: "<O>", type:"object"};
      console.log("Tobject");
    }

    var links = this.linkValidationService.listOfAuthorizedLinks(source, destination, false);
    this.links_names = links;
    var k=0;
    var links_index;
    for(links_index = 0; links_index < links.length; links_index++) {

      var flag = this.linkValidationService.validateLink(source, destination, links[links_index], false, false);
      this.checker.push(flag);
      if(flag) {
        this.opl_sentences[k]=(this.linkValidationService.getOPLSentence(source, destination,links[links_index], false, false, "<tag>",
          false, "<mintime>", "<maxtime>", "<unit>", {name:"null"}));
        this.Symbols[k]="1.png";
        k++;
      }

    }

    type list_t = Array<list_links>;

    var list_opm:list_t = [];
    for(k=0;k<this.links_names.length;k++){
    //  list_opm[k]= new list_links(this.links_names[k],this.opl_sentences[k],'1.png');
      this.serv.push(
        {
          name:this.links_names[k],
          opl:this.opl_sentences[k],
          icon:this.bridge_names(this.links_names[k])
        }
      );
    }
    console.log(this.serv[1]);
  }



}
const opmLinks = [
  {name: 'consumption'},
  {name: 'creation'},
  {name: 'effect'},
];

class list_links {
  name: string;
  opl:string;
  icon:string;

  constructor(name,opl,icon){
    this.name = name;
    this.opl = opl;
    this.icon=icon

  }
}







