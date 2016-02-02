 // create the editor
  var container = document.getElementById('jsoneditor');
  var editor = new JSONEditor(container);
  editor.set([]);

    // add multiple choice
  document.getElementById('qmc').onclick = function () {
    var json = editor.get();
    json.unshift(multi);
    editor.set(json);
    editor.expandAll();
    restart ()
  }; 
    // add multipleX choice
  document.getElementById('qmx').onclick = function () {
    var json = editor.get();
    json.unshift(multiX);
    editor.set(json);
    editor.expandAll();
    restart ()
  };  // add binary
  document.getElementById('qjn').onclick = function () {
    var json = editor.get();
    json.unshift(bin);
    editor.set(json);
    editor.expandAll();
    restart ()
  };// run test    // add multiple choice
  document.getElementById('qst').onclick = function () {
    var json = editor.get();
    json.unshift(sort);
    editor.set(json);
    editor.expandAll();
    restart ()
  };  // add binary
  document.getElementById('ltxt-btn').onclick = function () {
    var json = editor.get();
    json.unshift(clozze);
    editor.set(json);
    editor.expandAll();
    restart ()
  }
      // add range
  document.getElementById('rng').onclick = function () {
    var json = editor.get();
    json.unshift(range);
    editor.set(json);
    editor.expandAll();
    restart ()
  };// run test
  document.getElementById('starttest').onclick = restart;

function restart () {
    var json = editor.get();
    $("#quiz").html("");
    quiz.init(json);
}

document.getElementById('submit-Now').onclick = function () {
    var json = editor.get();
    var fileNm= $("#fileName").val();
    var json2={"name":fileNm,"quiz":json}
    $.ajax({
        url: "/cgi-bin/quiz/save.py",
        type: "post",
        data: JSON.stringify(json2),
        dataType: "json",
        success: function(response) {
            alert(response.message);
        }
    });
  };  

  document.getElementById('load').onclick = function () {
    var json = editor.get();

    $.ajax({
        url: "/cgi-bin/quiz/load.py",
        type: "post",
        data: JSON.stringify({"request":"files"}),
        dataType: "json",
        success: function(response) {
            var html = '';
            for (var i = 0; i < response.message.length; i++) {
              html+='<option>'+response.message[i]+'</option>'
            };
            $("#fileSelect").html("")
            $("#fileSelect").html(html)
            $('#fileSelect').selectpicker('refresh');
            $('#fSel').modal('show')
        }
    });
  };


  document.getElementById('loadQuiz').onclick = function () {
    var e = document.getElementById("fileSelect");
    var strUser = e.options[e.selectedIndex].value;
    $.ajax({
        url: "/cgi-bin/quiz/load.py",
        type: "post",
        data: JSON.stringify({"request":"load","name":strUser}),
        dataType: "json",
        success: function(response) {
            $('#fSel').modal('hide')
            editor.set(response.message);
        }
    });
  };