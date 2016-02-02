  var Quiz = function(){
    return {
      questions:[],
      score:0,
      maxScore:0,
      currentQuestion:0,
      qMax:0,
      init: function(qArr){
          this.currentQuestion=0;
          this.questions=qArr;
          this.qMax=qArr.length;
          /* inserts the very basis into the #quiz element the progressbar on the
          head, the container, which has all the question-divs and the forward button
          at the buttom off the page*/
          $("#quiz")
            .html("")
            .append('\
          <div id="max"><div id="corr"></div></div> \
          <div id="questions"></div>\
          <p id="info"><span class="glyphicon glyphicon glyphicon-info-sign"></span></p>\
          <p id="forward" class="quarter-circle"> \
            <span class="glyphicon glyphicon-circle-arrow-right"></span> \
          </p>');
          this.loadQuestion(1);
          
      },
      loadQuestion: function(first){
          //for only having to pass one arg
          first = typeof first === 'undefined' ? false : true;
          //todo render Question
          //todo add action
          if(!first){
            $("#quiz > #questions > #question").remove();
            this.currentQuestion+=1;
          }
          if(this.qMax>this.currentQuestion){
              var que=this.renderQuestion(this.currentQuestion);
              $("#quiz > #questions").append(que);
              $("#quiz > #questions > #question")
                  .css("visibility","hidden")
                  .velocity({ left: 360, opacity: 0 }, 
                      {
                      duration: 0, 
                      complete: function() { 
                          $("#quiz > #questions > #question")
                            .css("visibility","visible")
                            .velocity({ left: 0, opacity: 1 },500,{visibility:"visible"});

                      }});
              this.addEvents(this.currentQuestion);
          } else {
              $("#quiz > #questions").append('<div class="question">You win.</div>')
          } 
      },
      showInfo: function(first){
          $("#quiz > #questions > #question").remove();
          
          var que=this.renderQuestion(this.currentQuestion,true);
          $("#quiz > #questions").append(que);
          $("#quiz > #questions > #question")
              .css("visibility","hidden")
              .velocity({ left: 360, opacity: 0 }, 
                  {
                  duration: 0, 
                  complete: function() { 
                      $("#quiz > #questions > #question")
                        .css("visibility","visible")
                        .velocity({ left: 0, opacity: 1 },500,{visibility:"visible"});

                  }});
          this.addEvents(this.currentQuestion);
      },
      renderQuestion: function(num,info){
          var q = this.questions[num],
              type=q.type,
              head=q.question,
              midd=q.answers,
              html="";


              html+='<div id="question" class="'+type+' question">'
          if (info==true) {
              html+='<div class="infoText">'+q.explain.text+'</div>';
              html+='<img src="img/'+q.explain.image+'" class="img-responsive">'
              html+='<div class="source">'
                for (var i = 0; i < q.explain.source.length; i++) {
                    var p=i+1;
                    html+="["+p+'] <a href="'+q.explain.source[i][1]+'">'+q.explain.source[i][0]+'</a><br>'
                };
              html+='</div>'; // .source
              html+='</div>'; // .question
              return html;
          };
          //depending on the type of question applies the templates
          switch (type) {
            case "multiple":
                //multiple choice question with one question heading and 4 answers
                html+='<h4 id="q'+num+'-question">'+head+'</h4>';
                for (var i = 0; i < midd.length; i++) {
                    html+='<button id="ans'+i+'" value="'+i+'" class="ans btn btn-primary col-lg-10\
                           col-lg-offset-1 col-xs-10 col-xs-offset-1 col-md-10 \
                           col-sm-offset-1 col-md-10 col-sm-offset-1">\
                          '+midd[i]+'</button>';
                }
            break;
            case "multipleX":
                //multiple choice question with one question heading and 4 answers
                html+='<h4 id="q'+num+'-question">'+head+'</h4>';
                for (var i = 0; i < midd.length; i++) {
                    html+='<button id="ans'+i+'" value="'+i+'" class="ans btn btn-primary col-lg-10\
                           col-lg-offset-1 col-xs-10 col-xs-offset-1 col-md-10 \
                           col-sm-offset-1 col-md-10 col-sm-offset-1">\
                          '+midd[i]+'<span class="iconCheck glyphicon glyphicon-ok"></button>';
                }
                html+='<div class="button"><button id="check" class="check btn-check btn btn-success">Prüfen</button></div>';
            break;
            case "binary":
                var l=q.left,
                    r=q.right,
                    ans=q.answers;
                //a question heading with up to 12 switches and a check button
                html+='<h4 id="question">'+head+'</h4>';
                html+='<div class="slide-answers">'
                for (var i = 0; i < ans.length; i++) {
                    html+='<div id="bin-'+i+'" class="switch-toggle switch-3 switch-ios">'
                    html+='<input id="on'+i+'" value="on" name="state-d'+i+'" type="radio" checked="">'
                    html+='<label for="on'+i+'" onclick="">'+l+'</label>'

                    html+='<input id="na'+i+'" value="nan" name="state-d'+i+'" type="radio" checked="checked" disabled>'
                    html+='<label for="na'+i+'" onclick="">'+ans[i][0]+'</label>'

                    html+='<input id="off'+i+'" value="off" name="state-d'+i+'" type="radio">'
                    html+='<label for="off'+i+'" onclick="">'+r+'</label>'

                    html+='<a></a>'
                    html+='</div>' // .switch
                }
                html+='</div>' // .slider
                html+='<div class="button"><button id="check" class="check btn-check btn btn-success">Prüfen</button></div>';
            break;
            case "map":
                html+='<h4 class="questionHead">'+head+'</h4>';
                html+='<div class="map">'
                html+='<ul class="map-left">';
                for (var i = 0; i < midd.length; i++) {
                    html+='<li value="'+i+'" class="q'+num+'-item" id="l'+i+'"><div class="content">'+midd[i][0]+'</div><div class="flip"></div></li>'
                }
                html+='</ul>';// .map-left
                html+='<div id="connect"></div>'

                html+='<ul class="map-right">';
                for (var i = 0; i < midd.length; i++) {
                    html+='<li value="'+i+'" class="q'+num+'-item" id="r'+i+'"><div class="content">'+midd[i][1]+'</div><div class="flip"></div></li>'
                }
                html+='</ul>';// .map-right
                html+='</div>';// .map
                html+='<div class="button"><button id="q'+num+'-check" class="check btn-check btn btn-success">Prüfen</button></div>';
            break;
            case "sortable":
                //a question heading with up to 12 sortable issues and a check button
                html+='<h4 class="questionHead">'+head+'</h4>';
                html+='<div class="sort">'
                html+='<ul id="q'+num+'-sort" class="sort-list">';
                for (var i = 0; i < midd.length; i++) {
                    html+='<li value="'+i+'" class="q'+num+'-item">'+midd[i][0]+'</li>'
                }
                html+='</ul>';// .sort-list
                html+='</div>';// .sort-list
                html+='<div class="button"><button id="q'+num+'-check" class="check btn-check btn btn-success">Prüfen</button></div>';
            break;
            case "range":
                html+='<h4 class="questionHead">'+head+'</h4>';
                html+='<div id="rangeCirc"></div>' 
                html+='<div class="button"><button id="check" class="check btn-check btn btn-success">Prüfen</button></div>';
          
            break;
            case "cloze":
              var sub="",
                  fake="";
              html+='<h4 id="q'+num+'-question">'+head+'</h4>';
              html+='<div class="clozeText" id="q'+num+'-clozeText'+i+'">';


              for (var i = 0; i < midd.length; i++) {
                  html+=''+midd[i][0];
                  html+='<p id="gap'+i+'" class="gap"></p>'
                  sub+='<p id="clozer'+i+'" class="clozer">'+midd[i][1]+'</p>'
              }

              for (var i = 0; i < q.fake.length; i++) {
                  var p=midd.length+i;
                  sub+='<p id="clozer'+p+'" class="clozer">'+q.fake[i]+'</p>'
              }

              html+='</div>' // .clozeText
              html+='<div class="clozeBrick" id="clozeBrick'+i+'">';
              html+=sub;
              html+='</div>';
              html+='<div class="button"><button id="check" class="check btn-check btn btn-success">Prüfen</button></div>';

            break;
            default:

          }
          html+='</div>'; // .question
          return html;
      },
      addEvents: function(num){
          var q = this.questions;
          var cq=q[num];
          var score=0,scoreMax=0;
          switch (cq.type) {
            case "multiple":
                //event on a click on one of the buttons in this particuallary question container
                $("div#quiz > div#questions > div.multiple > button.ans").on("click",function () {
                  if(quiz.checkAnswered(cq.type)){
                      var aNum = $(this).attr("value"),
                          qNum = $(this).attr("id")[1],
                          corr = cq.correct;
                          scoreMax=1;

                      if (aNum!=corr) {
                          $(this).velocity({backgroundColor:"#ff0000"});
                          $("div#quiz > div#questions > .multiple > button#ans"+corr).velocity({backgroundColor:"#00ff00"});
                          score=0;
                      } else {
                          $(this).velocity({backgroundColor:"#00ff00"});
                          score=1;
                      }
                      quiz.showOptions();
                      quiz.addScore(score,scoreMax);
                  }
                });
            break;        
            case "multipleX":
                quiz.helper.mixList("div#quiz > div#questions > div.multipleX button.ans")    
                //event on a click on one of the buttons in this particuallary question container
                for (var i = 0; i < cq.answers.length; i++) {
                    $( "div#quiz > div#questions > div.multipleX > button#ans"+i).click(function() {
                      $( this ).toggleClass( "btn-primary btn-info" );
                      $( "span",this)
                          .toggleClass('glyphicon-remove glyphicon-ok')
                    });
                };
                $("div#quiz > div#questions > .multipleX >.button> button.check").on("click",function () {
                  if(quiz.checkAnswered(cq.type)){
	                    var qNum = quiz.currentQuestion;
	                    scoreMax=1;

					    var ans = Array.apply(false, Array(q[qNum].answers.length));
					    ans=ans.map(function (x, i) {
		                  	if($.inArray(i, q[qNum].correct)!=-1)
		                  		return true;
		                  	else
		                  		return false;
		                });

		                for (var k = 0; k < q[qNum].answers.length; k++){
		                      var obj = $("div#quiz > div#questions > div.multipleX > button#ans"+k+" > span")
		                      var correct = obj.hasClass("glyphicon-ok");
		                      if(correct){
		                          if (ans[k]) {
		                              score+=1;
		                              obj.velocity({color: "#00ff00"})
		                          } else {
		                            obj.velocity({color: "#ff0000"})
		                          }
		                      } else {
		                          if (!ans[k]) {
		                              score+=1;
		                              obj.velocity({color: "#00ff00"})
		                          } else {
		                            obj.velocity({color: "#ff0000"})
		                          }
		                      }
		                }

	                    score/=q[qNum].answers.length;
	                    quiz.showOptions();
	                    quiz.addScore(score,scoreMax);
                  }
                });
            break;
            case "sortable":
                //TODO
                $('div#quiz > div#questions > .sortable > .sort > .sort-list').sortable({});
                quiz.helper.mixList("div#quiz > div#questions > .sortable > .sort > .sort-list li")
                $("div#quiz > div#questions > .sortable >.button> button.check").on("click",function () {
                  if(quiz.checkAnswered(cq.type)){
                    var qNum = $(this).attr("id")[1];
                    var last=-1;

                    $('div#quiz > div#questions > .sortable > .sort > .sort-list > li').each(function (index, element) {
                      var pos = $(this).attr("value");
                      var r=229-18*pos,g=16+16*pos,b=98-3*pos,
                          rgb="#"+r.toString(16)+g.toString(16)+b.toString(16);
                      if(pos-1==last){
                          score+=1;
                      } scoreMax+=1;

                      $(this).velocity({ width: (1 - pos*.03)*300, backgroundColor:rgb});
                      $(this).append(" ("+q[qNum].answers[pos][1]+")")
                      last=pos;
                    });
                    quiz.showOptions();
                    quiz.addScore(score,scoreMax);
                  }
                });
            break;
            case "binary":
                quiz.helper.mixList("div#quiz > div#questions > .binary > .slide-answers .switch-toggle")
                $("div#quiz > div#questions > .binary >.button> button.check").on("click",function () {
                  if(quiz.checkAnswered(cq.type)){
                    var qNum = quiz.currentQuestion;
                    scoreMax=1;

                   for (var k = 0; k < q[qNum].answers.length; k++) {
                      var v = $("#quiz > #questions > .binary > .slide-answers > div#bin-"+k+" > input:checked").val();
                      var vv = -1;
                      if(v=="off") {vv=1};
                      if(v=="on") {vv=0};
                      if(q[qNum].answers[k][1]==vv){
                        score+=1;
                        $("#quiz > #questions > .binary > .slide-answers > div#bin-"+k+" > a").velocity({backgroundColor: "#00ff00"})
                      } else {
                        $("#quiz > #questions > .binary > .slide-answers > div#bin-"+k+" > a").velocity({backgroundColor: "#ff0000"})
                      }
                    }
                    score/=q[qNum].answers.length;
                    quiz.showOptions();
                    quiz.addScore(score,scoreMax);
                  }
                });
            break;
            case "map":
                $("#quiz > #questions > .map > .map > .map-left > li").on("click",(function() {
                var draw = SVG('connect').size(50, 460)
                var last = "";
                var circle;

                return function(e) {
                  var n=$(this).attr("id")[1]*43+18;
                  var id=$(this).attr("id");

                  $('#connect .'+id).remove();

                  circle = draw.circle(10)
                    .attr({fill: "#"+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)})
                    .move(-5, n)
                    .addClass(id)

                };
                })());
                $("#quiz > #questions > .map > .map > .map-right > li").on("click",function () {
                  var id=$(this).attr("id");
                  var n=$(this).attr("id")[1]*43+18;

                  circle = draw.circle(10)
                    .attr({fill: "#"+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)})
                    .move(45, n)
                    .addClass(id)
                });

                break;
            case "range":
                $("#rangeCirc").roundSlider({
                    startAngle: 90,
                    radius: 150,
                    width: 32,
                    sliderType: "range",
                    editableTooltip: false,
                    change: function (e) {
                      var v=e.handle.value,
                          u=v+cq.tolerance,
                          l=v-cq.tolerance;
                      $("#rangeCirc").roundSlider("option", "value", l+","+u);
                    },
                    min: cq.min,
                    max: cq.max
                }); 
                $("div#quiz > div#questions > .range >.button> button.check").on("click",function () {
                  if(quiz.checkAnswered(cq.type,q[quiz.currentQuestion].min)){
                    var qNum = quiz.currentQuestion;
                    maxScore=1;
                    var obj = $("#rangeCirc").data("roundSlider"),
                        min=obj.getValue(1)
                        max=obj.getValue(2),
                        score= min<=q[qNum].answer && q[qNum].answer <=max;

                    if(score){
                        $(".rs-range-color").velocity({backgroundColor:"#00ff00"});
                        score=1
                    }
                    else{
                        $(".rs-range-color").velocity({backgroundColor:"#ff0000"});
                        score=1;
                    }
                    $(".rs-tooltip-text").html('<h6>Lösung:</h6><br><span class="badge">'+q[qNum].answer+'</span>');

                    quiz.showOptions();
                    quiz.addScore(score,scoreMax);
                  }  
                });  
                $("#rangeCirc").roundSlider("option", "value", cq.min);  
            break;
            case "cloze":
                var cl = $("#quiz > #questions > .cloze > .clozeBrick > .clozer")
                cl.each( function() {
                  $(this).on("click",function () {
                      if($(this).parent().hasClass("clozeBrick")){
                          var id = $(this).attr("id");
                          var gap = $("#quiz > #questions > .cloze > .clozeText > .gap")
                          for (var g=0;g<quiz.questions[quiz.currentQuestion].answers.length;g+=1) {
                              var gap = $("#quiz > #questions > .cloze > .clozeText > #gap"+g);
                              if(gap.html()==""){
                                $(this).appendTo("#quiz > #questions > .cloze  > .clozeText > #gap"+g);
                                break;
                              }
                          }
                      } else if($(this).parent().hasClass("gap")){
                          $(this).appendTo("#quiz > #questions > .cloze > .clozeBrick");
                      }

                  });
                });
                quiz.helper.mixList("div#quiz > div#questions > .cloze > .clozeBrick .clozer")
                $("div#quiz > div#questions > div.cloze >.button> button.check").on("click",function () {
                  if(quiz.checkAnswered(cq.type)){
                    var qNum = $(this).attr("id")[1];
                    maxScore=1;

                    for (var g=0;g<quiz.questions[quiz.currentQuestion].answers.length;g+=1) {
                        var gap = $("#quiz > #questions > .cloze > .clozeText > #gap"+g+">p");
                        if(gap.html()==quiz.questions[quiz.currentQuestion].answers[g][1]){
                          score+=1
                          gap.velocity({backgroundColor:"#00ff00"});
                        } else {
                          gap.velocity({backgroundColor:"#ff0000"});
                        }
                    }    
                    score/=q[quiz.currentQuestion].answers.length;

                    quiz.showOptions();
                    quiz.addScore(score,scoreMax);
                  }
                });
            break;
            default:

          }
          $("#quiz > .quarter-circle").on("click",function () {
              $("#quiz > p#info").velocity({ bottom: -100 }, {duration:800, easing:"easeOutQuad", queue: false, visibility:"visible"});
              $("#quiz > .quarter-circle").velocity({ opacity: 0 }, { visibility: "hidden" });
              $("div#quiz > #questions >")
                  .velocity({ left:-360,opacity: 0 },
                  {
                  complete: function() { 
                      quiz.loadQuestion();
                  }
              });
          });
          $("#quiz > p#info").on("click",function () {
              $("#quiz > p#info").velocity({ bottom: -100 }, {duration:800, easing:"easeOutQuad", queue: false});
              $("div#quiz > #questions >")
                  .velocity({ left:-360,opacity: 0 },
                  {
                  complete: function() { 
                      quiz.showInfo();
                      quiz.addProgress();
                  }
              });
          });
      },
      addProgress:function () {
        line.animate(this.currentQuestion/this.qMax);  // Number from 0.0 to 1.0
        lineCor.animate(this.score/this.maxScore*(this.currentQuestion/this.qMax));  // Number from 0.0 to 1.0
      },
      addScore:function (got,max) {
        this.score+=got;
        this.maxScore+=max;
      },
      checkAnswered: function(type,check){
          switch (type) {
            case "multiple":
                return true;
            break;
            case "multipleX":
                return true;
            break;
            case "sortable":
                return true;
            break;
            case "binary":
              var filled=true;
              for (var k = 0; k < quiz.questions[quiz.currentQuestion].answers.length; k++) {
                  var v = $("#quiz > #questions > .binary > .slide-answers > div#bin-"+k+" > input:checked").val();
                    if(v=="nan"){
                        filled=false
                        break;
                    }
              }
                if(filled)
                  return true;
            break;
            case "range":
                if($("#rangeCirc").data("roundSlider").option("value")!=check+","+check)
                  return true;
            break;
            case "cloze":
                var filled=true;
                for (var g=0;g<quiz.questions[quiz.currentQuestion].answers.length;g+=1) {
                    var gap = $("#quiz > #questions > .cloze > .clozeText > #gap"+g+">p");
                    if(gap.html()==undefined){
                        filled=false
                        break;
                    }
                }
                if(filled)
                  return true;
            break;
          }


          toastr.info('Antworte zuerst auf alle Fragen und klicke dann auf weiter...',"",{target:"#questions"})
          $("#toast-container").removeClass().addClass("relToast")
          return false;
      },
      showOptions: function () {
        $("#quiz > p#info").velocity({ bottom: -20 }, {duration:800, easing:"easeOutQuad", queue: false, visibility: "visible"});
        $("#quiz > .quarter-circle").velocity({ opacity: 1 }, { visibility: "visible" });
        $("div#quiz > div#questions > .question >.button> button.check").velocity({ opacity: 0 }, { visibility: "hidden" });
      },
      helper: {
          refreshSlider: function(e){
              
          }, // addEvent
          checkSort: function(qNum) {
            // body...
          },
          mixList:function(sel){
              var collection = $(sel).get();
              collection.sort(function() {
                  return Math.random()*10 > 5 ? 1 : -1;
              });
              $.each(collection,function(i,el) {
                    $el = $(el);
                    $el.appendTo( $el.parent() );
              });
          }
      }
    }
  };

  //templates for different kinds of questions
  //multiple choice(single)
  var multi = 
  {
  type:"multiple",
  question:"Mehr als die Hälfte der deutschen Ackerflächen im Jahr 2014…",
  answers:[
    "…dient dem Anbau von Futtermitteln.",
    "…sind Viehweiden.",
    "…wird für die Erzeugung von exportierten Lebensmitteln benötigt.",
    "…eignet sich durch die Belastung mit Nitraten & Schwermetallen nicht mehr für die Nahrungsmittelproduktion.",
  ],
  correct:0,
  explain:{
          text:"Im Jahr 2014 werden in Deutschland 11,9 Millionen Hektar als Ackerland genutzt. Deutschland führte 2011 rund 3,2 Mio. Tonnen Sojabohnen sowie rund 3,4 Millionen Tonnen Sojaschrot ein, diese Menge bedarf einer Anbaufläche von 1,8 Millionen Hektar. Das heisst für die Tierfütterung müssen Agrarprodukte gleich 15% der deutschen Ackerfläche importiert werden.",
          image:"fläche.png",
          articles:["Fleischkonsum"],
          source:[
              ["Ackerfläche 2014","https://www.destatis.de/DE/PresseService/Presse/Pressemitteilungen/2014/07/PD14_267_412.html"],
              ["Bauernverband","http://www.bauernverband.de/62-betriebsmittel-/futtermittel"]
          ]
      },
  category:["Tiere","Recht"]
}  
//multiple choice(multi)
  var multiX = 
  {
  type:"multipleX",
  question:"Wähle die richtigen Aussagen?",
  answers:[
    "Antwort 1(richtige Antwort)",
    "Antwort 2",
    "Antwort 3",
    "Antwort 4(richtige Antwort)",
    "Antwort 5",
    "Antwort 6",
  ],
  correct:[0,3],
  explain:{
          text:"Schweinefleisch ist das häufigst konsumierte Tierfleisch in Deutschland, ein paar Infos zum Leben eines Schweines unten in der Infografik.",
          image:"Schwein.png",
          articles:["Fleischkonsum"],
          source:[
              ["Fleischatlas","https://www.boell.de/sites/default/files/fleischatlas_regional_2016.pdf"],
              ["Bundesministerium für Ernährung und Landwirtschaft","http://www.bmelv-statistik.de/de/fachstatistiken/preise-fleisch/"]
          ]
      },
  category:["Tiere","Recht"]
}  
    //binary choice
    var bin = {
    	type:"binary",
    	question:"Welche europäischen Länder haben die Haltung von Wildtieren im Zirkus bereits verboten oder zumindest eingeschränkt?",
    	left:"Verboten",
    	right:"Erlaubt",
    	answers:[
    		 ["Österreich",1],
         ["Slowenien",1],
         ["Griechenland",1],
         ["Bosnien-Herzegowina",1],
         ["Schweden",0],
         ["Tschechien",0],
         ["Slowakei",0],
         ["Bulgarien",0],
         ["Malta",0],
         ["Ungarn",0 ],
         ["Kroatien",0]
    	],
    	explain:{
          text:"Schweinefleisch ist das häufigst konsumierte Tierfleisch in Deutschland, ein paar Infos zum Leben eines Schweines unten in der Infografik.",
          image:"Schwein.png",
          articles:["Fleischkonsum"],
          source:[
              ["Fleischatlas","https://www.boell.de/sites/default/files/fleischatlas_regional_2016.pdf"],
              ["Bundesministerium für Ernährung und Landwirtschaft","http://www.bmelv-statistik.de/de/fachstatistiken/preise-fleisch/"]
          ]
      },
    	category:["Tiere","Recht"]
    }
    //sortable
    var sort = {
    	type:"sortable",
    	question:"Ordne folgende Lebensmittel nach ihrem zum Anbauen verursachten (blauen) Wasserverbrauch:",
    	answers:[
        ["1l Bier ","10l"],
        ["eine Dose CocaCola","70l"],
    		["1kg Tomaten","80l"],
        ["1l Orangensaf(USA)","1000l"],
    		["1kg Brot","1000l"],
        ["1kg Getreide","1500l"],
        ["1kg Reis","1900 l"],
      	["ein Brathähnchen","3500 l"],
        ["1kg Schweinefleisch","9700 l"],
        ["1kg Lammfleisch","10000 l"]
    	],
    	explain:{
          text:"Beim Wasserverbrauch unterscheidet man zwischen grauem Wasserverbrauch (Wasser das chemikalisch un biologisch nachhaltig belastet wird) und blauen Wasserverbrauch (Wasser, das dem entnommenem Gewässer nach der Bewässerung nicht wieder zurückgeführt wird).",
          image:"Wasserfus.jpg",
          articles:["Wasser"],
          source:[
              ["Infos vom Umweltbundesamt","http://www.umweltbundesamt.de/themen/wasser/wasser-bewirtschaften/wasserfussabdruck"],
              ["Interaktive Karte zum Wasserverbrauch der Länder","http://waterfootprint.org/en/resources/interactive-tools/national-water-footprint-explorer/"]
          ]
      },
    	category:["Wasser","Lebensmittel"]
    }
    var clozze = {
      type:"cloze",
      question:"Setze in die Lücken ein:",
      answers:[
        ["Auf der Erde leben zur Zeit ","7 Milliarden "],
        ["Menschen. Für jeden Menschen bleiben ","2000 "],
        ["m² landwirtschaftlich nutzbare Fläche, wenn man die verfügbare Ackerfläche auf die Personen runterrechnet. Menschen in Europa verbrauchen allerdings im Schnitt ","2700 m²"],
        [", wovon ","700 m²"],
        [" aus importen stammen. Diese Fläche beanspruchen wir mehr als der 'Mittelwert' der jedem zustände. Die Importe stammen hauptsächlich aus","Südamerika"]
      ],
      fake:["Afrika","5300 m²", "3400 m²"],
      explain:{
          text:"Wenn du dich weiter mit dem Thema Bodenverteilung befassen willst, dann informiere dich bei dieser Kampagne.",
          image:"2000m2.jpg",
          articles:["Fleischkonsum"],
          source:[
              ["Info euren 2000m2","http://www.2000m2.eu/"],
              ["Bundesministerium für Ernährung und Landwirtschaft","http://www.bmelv-statistik.de/de/fachstatistiken/preise-fleisch/"]
          ]
      },
      category:["Landwirtschaft","Bevölkerung","Resourcen"]
    }
    var map = {
      type:"map",
      question:"Verbinde die passenden Begriffe:",
      answers:[
        ["Zeit ","9 Milliarden "],
        ["Menschen Menschen ","2000 "],
        ["ha Schnitt ","7000 "],
        ["ha, während Afrika","850 "],
        ["ha verbrauchen.","asdf"]
      ],
      explain:{
          text:"Schweinefleisch ist das häufigst konsumierte Tierfleisch in Deutschland, ein paar Infos zum Leben eines Schweines unten in der Infografik.",
          image:"Schwein.png",
          articles:["Fleischkonsum"],
          source:[
              ["Fleischatlas","https://www.boell.de/sites/default/files/fleischatlas_regional_2016.pdf"],
              ["Bundesministerium für Ernährung und Landwirtschaft","http://www.bmelv-statistik.de/de/fachstatistiken/preise-fleisch/"]
          ]
      },
      category:["Wasser","Bevölkerung"]
    }    
    var range = {
      type:"range",
      question:"Wie hoch war 2010 der ökologisch erzeugte Anteil bei Schweinefleisch in Deutschland?",
      min:0,
      max:100,
      tolerance:5,
      answer:0.6,
      explain:{
          text:"Schweinefleisch ist das häufigst konsumierte Tierfleisch in Deutschland, ein paar Infos zum Leben eines Schweines unten in der Infografik.",
          image:"Schwein.png",
          articles:["Fleischkonsum"],
          source:[
              ["Fleischatlas","https://www.boell.de/sites/default/files/fleischatlas_regional_2016.pdf"],
              ["Bundesministerium für Ernährung und Landwirtschaft","http://www.bmelv-statistik.de/de/fachstatistiken/preise-fleisch/"]
          ]
      },
      category:["Tiere"]
    }

var quiz = new Quiz();
var arr=[multiX,bin,clozze,sort,multi,range];
quiz.init(arr);

var line = new ProgressBar.Line('#max', {
  color: '#FCB03C'
});
var lineCor = new ProgressBar.Line('#corr', {
  color: '#2f3'
});