(function() {
  window.URL = window.URL || window.webkitURL;

  var storedFiles = [];

  var fileSelect = document.getElementById("fileSelect"),
    fileInput = document.getElementById("fileInput"),
    fileList = document.getElementById("fileList"),
    fileTotal = document.getElementById("fileTotal"),
    fileDrop = document.getElementById("fileDrop"),
    toggleViewLink = document.getElementById("toggleView");

  fileInput.addEventListener(
    "change",
    function() {
      addFilesToStore(this.files);
    },
    false
  );

  fileSelect.addEventListener("click", clickFileInput, false);

  toggleViewLink.addEventListener("click", toggleView, false);

  fileDrop.addEventListener("dragenter", dragenter, false);
  fileDrop.addEventListener("dragover", dragover, false);
  fileDrop.addEventListener("drop", drop, false);

  function addFilesToStore(files) {
    Array.prototype.forEach.call(files, function(file) {
      storedFiles.push(file);
    });
    renderView();
  }

  function removeFileFromStore(event) {
    storedFiles.splice(event.target.id, 1);
    renderView();
  }

  function clickFileInput(e) {
    e.preventDefault();
    if (fileInput) fileInput.click();
  }

  function toggleView(e, className) {
    e.preventDefault();
    fileList.classList.toggle("grid");
  }

  function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

    addFilesToStore(files);
  }

  function createFileCard() {
    var div = document.createElement("div");
    div.className = "card m-3 p-3";
    return div;
  }

  function createFileThumbnail(file) {
    var img = document.createElement("img");
    img.src = window.URL.createObjectURL(file);
    img.height = 50;
    img.width = 50;
    img.className = "rounded";
    img.onload = function() {
      window.URL.revokeObjectURL(this.src);
    };
    return img;
  }

  function createFileInfo(file) {
    var info = document.createElement("div");
    info.className = "card-body";
    var name = document.createElement("p");
    name.innerHTML = "Name: " + file.name;
    var type = document.createElement("p");
    type.innerHTML = "Type: " + file.type;
    var size = document.createElement("p");
    size.innerHTML = "Type: " + file.size + " bytes";
    info.appendChild(name);
    info.appendChild(type);
    info.appendChild(size);
    return info;
  }

  function createFileDeleteLink(index) {
    var a = document.createElement("a");
    var linkText = document.createTextNode("Delete");
    a.appendChild(linkText);
    a.id = index;
    a.className = "btn btn-danger btn-sm";
    a.title = "Delete This";
    a.href = "#";
    a.onclick = removeFileFromStore;
    return a;
  }

  function renderView() {
    var totalFilesSize = 0;
    if (!storedFiles.length) {
      fileList.innerHTML = "<p>No files loaded!</p>";
      fileTotal.innerHTML = totalFilesSize + " bytes";
    } else {
      fileList.innerHTML = "";
      for (var i = 0; i < storedFiles.length; i++) {
        // calculate total size of all files
        totalFilesSize += storedFiles[i].size;
        var div = createFileCard();
        fileList.appendChild(div);
        // if file is an image, create a thumbnail preview
        if (storedFiles[i].type.split("/")[0] == "image") {
          var img = createFileThumbnail(storedFiles[i]);
          div.appendChild(img);
        }
        var info = createFileInfo(storedFiles[i]);
        div.appendChild(info);
        var a = createFileDeleteLink(i);
        div.appendChild(a);
      }
      fileTotal.innerHTML = totalFilesSize + " bytes";
    }
  }
})();
