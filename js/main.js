var imported = document.createElement('script');
imported.src = 'js/model/uploads.js';
document.head.appendChild(imported);

(function() {

// getElementById
function $id(id) {
  return document.getElementById(id);
}

// output information
function Output(msg) {
  var m = $id("messages");
  m.innerHTML = msg + m.innerHTML;
}

// file drag hover
function FileDragHover(e) {
  e.stopPropagation();
  e.preventDefault();
  e.target.className = (e.type == "dragover" ? "hover" : "");
}

// file selection
function FileSelectHandler(e) {
  // cancel event and hover styling
  FileDragHover(e);

  // fetch FileList object
  var files = e.target.files || e.dataTransfer.files;

  // process all File objects
  for (var i = 0, f; f = files[i]; i++) {
    ParseFile(f);
    UploadFile(f)
  }
}

function ParseFile(file) {
  Output(
    "<p>File Information: <strong>" + file.name +
    "</strong> type: <strong>" + file.type +
    "</strong> size: <strong>" + file.size +
    "</p>"
  );

  // display text
  if(file.type.indexOf("text") == 0) {
    var reader = new FileReader();
    reader.onload = function(e) {
      Output(
        "<p><strong>" + file.name + ":</strong></p><pre>" + e.target.result.replace(/</g, "&lt;").replace(/>/g, "$gt;") +
        "</pre>"
      );
    }
    reader.readAsText(file);
  }

  // display an image
  if(file.type.indexOf("image") == 0) {
    var reader = new FileReader();
    reader.onload = function(e) {
      Output(
        "<p><strong>" + file.name + ":</strong><br />" +
        '<img src="' + e.target.result + '" /></p>'
      );
    }
    reader.readAsDataURL(file);
  }
}

  // upload files
  function UploadFile(file) {
    var xhr = new XMLHttpRequest();
    if(xhr.upload && file.size <= $id("MAX_FILE_SIZE").value) {

      // create progress bar
      var o = $id("progress");
      var progress = o.appendChild(document.createElement("p"));
      progress.appendChild(document.createTextNode("upload " + file.name));

      // progress bar
      xhr.upload.addEventListener("progress", function(e) {
        var pc = parseInt(100 - (e.loaded / e.total *  100));
        progress.style.backgroundPosition = pc + "% 0";
      }, false);

      // file received/failed
      xhr.onreadystatechange = function(e) {
        if(xhr.readyState == 4) {
          progress.className = (xhr.status == 200 ? "success" : "failure");
        }
      };

      // start upload
      xhr.open("POST", $id("upload").action, true);
      xhr.setRequestHeader("X-FILENAME", file.name);
      xhr.send(file);
    }

  }



// initialize
function Init() {
  var fileselect = $id("fileselect"),
  filedrag = $id("filedrag"),
  submitbutton = $id("submitbutton");

  // file select
  fileselect.addEventListener("change", FileSelectHandler, false);

  // XHR2 available?
  var xhr = new XMLHttpRequest();
  if (xhr.upload) {
    // file drop
    filedrag.addEventListener("dragover", FileDragHover, false);
    filedrag.addEventListener("dragleave", FileDragHover, false);
    filedrag.addEventListener("drop", FileSelectHandler, false);
    filedrag.style.display = "block";
  }

  // remove submit button
  //submitbutton.style.display = "none";
}

// call init file
if (window.File && window.FileList && window.FileReader) {
  Init();
}

})();

