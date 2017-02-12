import { Injectable } from '@angular/core';

@Injectable()
export class LinkValidationService {
  private list_O_O = [
    "Uni-direct (null tag)",
    "Uni-direct (tag)",
    "Bi-direct (null tags)",
    "Bi-direct (tag)",
    "Bi-direct (ftag, btag)",
    "Aggregation-Participation",
    "Exhibition-Characterization",
    "Generalization-Specialization",
    "Classification-Instantiation",
  ];
  private list_O_P = [
    "Exhibition-Characterization",
    "Consumption",
    "Agent",
    "Instrument",
    "Condition Consumption",
    "Condition Effect",
    "Condition Instrument",
    "Condition Agent",
    "Event Consumption",
    "Event Effect",
    "Event Instrument",
    "Event Agent",
  ];
  private list_P_O = [
    "Exhibition-Characterization",
    "Result",
    "Effect",
  ];
  private list_P_P = [
    "Uni-direct (null tag)",
    "Uni-direct (tag)",
    "Bi-direct (null tags)",
    "Bi-direct (tag)",
    "Bi-direct (ftag, btag)",
    "Aggregation-Participation",
    "Exhibition-Characterization",
    "Generalization-Specialization",
    "Classification-Instantiation",
    "Invocation",
    "Overtime exception <maxtime, unit>",
    "Undertime exception <mintime, unit>",
    "Undertime and overtime exception <mintime..maxtime, unit>",
  ];
  private list_Os_O = [
    "Uni-direct (null tag)",
    "Uni-direct (tag)",
    "Bi-direct (null tags)",
    "Bi-direct (tag)",
    "Bi-direct (ftag, btag)",
    "Exhibition-Characterization",
  ];
  private list_O_Os = [
    "Uni-direct (null tag)",
    "Uni-direct (tag)",
    "Bi-direct (null tags)",
    "Bi-direct (tag)",
    "Bi-direct (ftag, btag)",
    "Exhibition-Characterization",
  ];
  private list_Os_P = [
    "Exhibition-Characterization",
    "Consumption",
    "Agent",
    "Instrument",
    "split input",
    "Overtime exception <maxtime, unit>",
    "Condition Consumption",
    "Condition Instrument",
    "Condition Agent",
    "Event Consumption",
  ];
  private list_P_Os = [
    "Exhibition-Characterization",
    "Result",
    "split output",
  ];
  private list_Os_Os = [
    "Uni-direct (null tag)",
    "Uni-direct (tag)",
    "Bi-direct (null tags)",
    "Bi-direct (tag)",
    "Bi-direct (ftag, btag)",
  ];
  private list_P_P_same = [
    "Invocation",
  ];
  private list_Os_P_Os_same = [
    "In-out link pair",
    "Overtime exception <maxtime, unit>",
    "Condition Input",
  ];
  private list_Os_P_O_same = [
    "In-out link pair",
    "Overtime exception <maxtime, unit>",
    "Condition Input",
  ];
  private list_O_P_Os_same = [
    "In-out link pair",
    "Condition Input",
  ];
  private list_many_destinations = [
    "Uni-direct (null tag)",
    "Uni-direct (tag)",
    "Aggregation-Participation",
    "Exhibition-Characterization",
    "Generalization-Specialization",
    "Classification-Instantiation",
  ];


  constructor() {}

  private isInListOfLinks(link:string, listOfLinks:string[]) :boolean {
    var i;
    for (i = 0; i < listOfLinks.length; i++) {
      if(link == listOfLinks[i])
        return true;
    }
    return false;
  }



  /*
   * Check sentence for Bi-Direct (ftag, btag) if source or destination different from object
   * It seems like there is a mistake in the excel file
   */
  private BiDirect(source, destination, tag, manyTags:boolean = false) :string {
    if(manyTags) {
      var ftag = tag[0];
      var btag = tag[1];
      if(source.type == "object" && destination.type == "object") {
        return source.name+" "+ftag+" "+destination.name+" and "+destination.name+" "+btag+" "+source.name+".";
      } else if(source.type == "objectState" && destination.type == "object") {
        return source.name+" "+source.object+" "+ftag+" "+destination.name+" and "
          +destination.name+" "+btag+" "+source.name+" "+source.object+".";
      } else if(source.type == "object" && destination.type == "objectState") {
        return source.name+" "+ftag+" "+destination.name+" "+destination.object+" and "
          +destination.name+" "+destination.object+" "+btag+" "+source.name+".";
      } else {
        return source.name+" "+source.object+" "+ftag+" "+destination.name+" "+destination.object+" and "
          +destination.name+" "+destination.object+" "+btag+" "+source.name+" "+source.object+".";
      }
    } else {
      var tag2 = (tag == null ? "equivalent" : tag);
      if (source.type == "objectState" && destination.type == "object") {
        return source.name+" "+source.object+" and "+destination.name+" are "+tag2+".";
      } else if (source.type == "object" && destination.type == "objectState") {
        return source.name+" and "+destination.name+" "+destination.object+" are "+tag2+".";
      } else if (source.type == "objectState" && destination.type == "objectState") {
        return source.name+" "+source.object+" and "+destination.name+" "+destination.object+" are "+tag2+".";
      } else {
        return source.name+" and "+destination.name+" are "+tag2+".";
      }
    }
  }

  private generalSentence(source, destination, manyDestinations:boolean, tag:string) :string {
    if(manyDestinations && destination.length > 2) {
      var sentence = source.name+" "+tag+" ";
      var i;
      for(i = 0; i < destination.length - 1; i++){
        sentence += destination[i].name+", ";
      }
      sentence += "and "+destination[destination.length-1].name+".";
      return sentence;
    } else if(manyDestinations && destination.length==2) {
      return source.name+" "+tag+" "+destination[0].name+" and "+destination[1].name+".";
    } else if(source.type == "objectState" && destination.type == "object") {
      return source.name+" "+source.object+" "+tag+" "+destination.name+".";
    } else if(source.type == "object" && destination.type == "objectState") {
      return source.name+" "+tag+" "+destination.name+" "+destination.object+".";
    } else if(source.type == "objectState" && destination.type == "objectState") {
      return source.name+" "+source.object+" "+tag+" "+destination.name+" "+destination.object+".";
    } else {
      return source.name+" "+tag+" "+destination.name+".";
    }
  }

  private genSpecOrClasInst(source, destination, manyDestinations:boolean, isClasInst:boolean = false) :string {
    var tag2 = (isClasInst ? "instances of " : "");
    var s1 = source.name;
    if(manyDestinations && destination.length > 2) {
      var sentence="";
      var i;
      for(i = 0; i < destination.length - 1; i++){
        sentence += destination[i].name+", ";
      }
      sentence += "and "+destination[destination.length-1].name+" are "+tag2+s1+"s.";
      return sentence;
    } else if(manyDestinations && destination.length==2) {
      return destination[0].name+" and "+destination[1].name+" are "+tag2+s1+"s.";
    } else if(isClasInst) {
      return destination.name+" is an instance of "+s1+".";
    } else {
      return destination.name+" is a "+destination.name+".";
    }
  }

  private inOutPair(source, destination, intermediateProcess) :string {
    if(source.type == "object") {
      return intermediateProcess.name+" changes "+source.name+" to "+destination.name+".";
    } else if(destination.type == "object") {
      return intermediateProcess.name+" changes "+destination.name+" from "+source.name+".";
    } else {
      return intermediateProcess.name+" changes "+source.object+" from "+source.name+" to "+destination.name+".";
    }
  }

  private splitInOrOut(source, destination, isOut:boolean = false) :string {
    var tag = isOut ? " to " : " from ";
    var O = isOut ? destination.object : source.object;
    var s = isOut ? destination.name : source.name;
    var P = isOut ? source.name : destination.name;
    return P+" changes "+O+tag+s+".";
  }

  private invoc(source, destination, same:boolean = false) :string {
    var sentence = source.name+" invokes ";
    return same ? sentence+"itself." : sentence+destination.name+".";
  }

  private timeException(source, destination, intermediateProcess = {name:"null"}, mintime:string, maxtime:string = null,
                        unit:string, isOver:boolean = false) :string {
    if(isOver) {
      if(source.type == "process") {
        return destination.name+" occurs if "+source.name+" lasts more than "+maxtime+" "+unit+".";
      } else if(intermediateProcess.name == "null") {
        return source.object+" triggers "+destination.name+" when "+source.object+" is "+source.name
          +" more than "+maxtime+" "+unit+".";
      } else if(destination.type == "objectState") {
        var O = source.object;
        var s1 = source.name;
        var s2 = destination.name;
        return O+" triggers "+intermediateProcess.name+" when "+O+" is "+s1+" more than "+maxtime+" "+unit
          +", in which case "+intermediateProcess.name+" changes "+O+" to "+s2+".";
      } else {
        var O = source.object;
        var s1 = source.name;
        return O+" triggers "+intermediateProcess.name+" when "+O+" is "+s1+" more than "+maxtime+" "+unit
          +", in which case "+intermediateProcess.name+" changes "+O+".";
      }
    } else {
      var sentence = destination.name+" occurs if "+source.name+" falls short of "+mintime+" "+unit;
      sentence += maxtime != null ? " or lasts more than "+maxtime+" "+unit+"." : ".";
      return sentence;
    }

  }

  private condIn(source, destination, intermediateProcess) :string {
    var P = intermediateProcess.name;
    var O = source.object;
    if(source.type == "objectState" && destination.type == "objectState") {
      var s1 = source.name;
      var s2 = destination.name;
      return P+" occurs if "+O+" is "+s1+", in which case "+P+" changes "+O+" from "+s1+" to "+s2
        +", otherwise "+P+" is skipped."
    } else if(source.type == "objectState") {
      var s = source.name;
      return P+" occurs if "+O+" is "+s+", in which case "+P+" changes "+O+" from "+s+" , otherwise "+P+"  is skipped.";
    } else {
      var s = destination.name;
      return P+" occurs if "+O+" exist, in which case "+P+" changes "+O+" to "+s+", otherwise "+P+"  is skipped.";
    }
  }

  private condCons(source, destination, tag:string) :string {
    var P = destination.name;
    if(source.type == "object") {
      var O = source.name;
      return P+" occurs if "+O+" exists, in which case "+P+" "+tag+" "+O+", otherwise "+P+"  is skipped.";
    } else {
      var O = source.object;
      var s = source.name;
      return P+" occurs if  "+O+" is at state "+s+", in which case "+P+" "+tag+" "+O+", otherwise "+P+" is skipped.";
    }
  }

  private condInsOrAgent(source, destination, isAgent:boolean = false) :string {
    var tag = isAgent ? "at state " : "";
    var P = destination.name;
    if(source.type == "object") {
      var O = source.name;
      return P+" occurs if "+O+" exists, otherwise "+P+"  is skipped.";
    } else {
      var O = source.object;
      var s = source.name;
      return P+" occurs if "+O+" is "+tag+s+", otherwise "+P+"  is skipped.";
    }
  }

  private event(source, destination, tag:string, isAgent:boolean = false) :string {
    var P = destination.name;
    if(source.type == "objectState") {
      var O = source.object;
      var s = source.name;
      return s+" "+O+" initiates "+P+", which "+tag+ " "+O+".";
    } else {
      var O = source.name;
      var sentence = O+" initiates ";
      return isAgent ? sentence+" and handles "+P+"." : sentence+P+", which "+tag+" "+O+".";
    }
  }




  public listOfAuthorizedLinks(source, destination, same:boolean = false) :string[]{
    if (same) {
      switch(source.type) {
        case "process":
          return this.list_P_P_same;
        case "objectState":
          if (destination.type == "objectState") {
            return this.list_Os_P_Os_same;
          } else {
            return this.list_Os_P_O_same;
          }
        case "object":
          return this.list_O_P_Os_same;
      }
    } else {
      switch(source.type) {
        case "object":
          switch (destination.type) {
            case "object":
              return this.list_O_O;
            case "process":
              return this.list_O_P;
            case "objectState":
              return this.list_O_Os;
          }
        case "process":
          switch (destination.type) {
            case "object":
              return this.list_P_O;
            case "process":
              return this.list_P_P;
            case "objectState":
              return this.list_P_Os;
          }
        case "objectState":
          switch (destination.type) {
            case "object":
              return this.list_Os_O;
            case "process":
              return this.list_Os_P;
            case "objectState":
              return this.list_Os_Os;
          }
      }
    }
  }

  public validateLink(source, destination, link:string, manyDestinations:boolean = false,
                      same:boolean = false) :boolean {
    if(manyDestinations) {
      if(source.type != "object" || this.isInListOfLinks(link, this.list_many_destinations) == false) {
        return false;
      } else {
        var j;
        for(j = 0; j < destination.length; j++) {
          if(destination[j].type != "object") {
            return false;
          }
        }
        return true;
      }
    } else {
      var list: string[] = this.listOfAuthorizedLinks(source, destination, same);
      return this.isInListOfLinks(link, list);
    }
  }


  /*
   * @source - object like {type: "", name: ""} or {type: "", name: "", object: ""}
   *         - 'type' can only be "process", "object" or "objectState"
   *             * if type == "process" or "object", then the name of the process/object is in the
   *                                                 attribute 'name' - {type: "", name: ""}
   *             * if type == "objectState", then the name of the object is in 'object' and 'name' contains the name of
   *                                         the state - {type: "", name: "", object: ""}
   *
   * @destination - object like @source, or an array of them, depending on @manyDestinations (further)
   *
   * @link - string defining the link for which you want a sentence
   *
   * @manyDestinations - true if @destination is an array of destinations
   *                   - false if it's a simple object
   *
   * @same - true if the link is a loop link
   *
   * @tag - "tag" (string) or ["btag", "ftag"] (array of 2 strings) depending on @manyTags (further)
   *      - tags for structural links ('Uni-direct' or 'Bi-direct')
   *      - null if not relevant
   *
   * @manyTags - true if tag = ["btag", "ftag"] (array of 2 strings)
   *           - false if tag = "tag" (string) or not relevant
   *
   * @mintime, maxtime, unit - (string) input for 'time exceptions' different links
   *                         - null if not relevant
   *
   * @intermediateProcess - the intermediate process needed in some specific links (like 'In-out link pair')
   *                      - {type: "", name: ""}
   *                      - if not relevant: ={name:"null"} (by default)
   * */
  public getOPLSentence(source, destination, link:string, manyDestinations:boolean = false, same:boolean = false,
                        tag = null, manyTags:boolean = false, mintime:string = null, maxtime:string = null,
                        unit:string = null, intermediateProcess = {name:"null"}) :string {
    if(intermediateProcess.name != "null") {
      switch(link) {
        case "In-out link pair":
          return this.inOutPair(source, destination, intermediateProcess);
        case "Overtime exception <maxtime, unit>":
          return this.timeException(source, destination, intermediateProcess, mintime, maxtime, unit, true);
        case "Condition Input":
          return this.condIn(source, destination, intermediateProcess);
      }
    } else {
      switch (link) {
        case "Uni-direct (null tag)":
          return this.generalSentence(source, destination, manyDestinations, "relates to");
        case "Uni-direct (tag)":
          return this.generalSentence(source, destination, manyDestinations, tag);
        case "Bi-direct (null tags)":
          return this.BiDirect(source, destination, tag, manyTags);
        case "Bi-direct (tag)":
          return this.BiDirect(source, destination, tag, manyTags);
        case "Bi-direct (ftag, btag)":
          return this.BiDirect(source, destination, tag, manyTags);
        case "Aggregation-Participation":
          return this.generalSentence(source, destination, manyDestinations, "consist of");
        case "Exhibition-Characterization":
          return this.generalSentence(source, destination, manyDestinations, "exhibits");
        case "Generalization-Specialization":
          return this.genSpecOrClasInst(source, destination, manyDestinations, false);
        case "Classification-Instantiation":
          return this.genSpecOrClasInst(source, destination, manyDestinations, true);
        case "Result":
          return this.generalSentence(source, destination, manyDestinations, "yields");
        case "Consumption":
          return this.generalSentence(source, destination, manyDestinations, "consumes");
        case "Effect":
          return this.generalSentence(source, destination, manyDestinations, "affects");
        case "Agent":
          return this.generalSentence(source, destination, manyDestinations, "handles");
        case "Instrument":
          return this.generalSentence(source, destination, manyDestinations, "requires");
        case "split input":
          return this.splitInOrOut(source, destination, false);
        case "split output":
          return this.splitInOrOut(source, destination, true);
        case "Invocation":
          return this.invoc(source, destination, same);
        case "Overtime exception <maxtime, unit>":
          return this.timeException(source, destination, intermediateProcess, mintime, maxtime, unit, true);
        case "Undertime exception <mintime, unit>":
          return this.timeException(source, destination, intermediateProcess, mintime, maxtime, unit, false);
        case "Undertime and overtime exception <mintime..maxtime, unit>":
          return this.timeException(source, destination, intermediateProcess, mintime, maxtime, unit, false);
        case "Condition Consumption":
          return this.condCons(source, destination, "consumes");
        case "Condition Effect":
          return this.condCons(source, destination, "affects");
        case "Condition Instrument":
          return this.condInsOrAgent(source, destination, false);
        case "Condition Agent":
          return this.condInsOrAgent(source, destination, true);
        case "Event Consumption":
          return this.event(source, destination, "consumes", false);
        case "Event Effect":
          return this.event(source, destination, "affects", false);
        case "Event Input":       // ATTENTION
          return "incomplete";
        case "Event Instrument":
          return this.event(source, destination, "requires", false);
        case "Event Agent":
          return this.event(source, destination, "consumes", true);
      }
    }
  }
}
