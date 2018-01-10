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

  function createFileThumbnail(file) {
    var img = document.createElement("img");
    img.src = window.URL.createObjectURL(file);
    img.height = 50;
    img.width = 50;
    img.onload = function() {
      window.URL.revokeObjectURL(this.src);
    };
    return img;
  }

  function createFileInfo(file) {
    var info = document.createElement("p");
    info.innerHTML =
      "Name: " +
      file.name +
      "Type: " +
      file.type +
      "Size: " +
      file.size +
      " bytes";
    return info;
  }

  function createFileDeleteLink(index) {
    var a = document.createElement("a");
    var linkText = document.createTextNode("Delete");
    a.appendChild(linkText);
    a.id = index;
    a.title = "Delete This";
    a.href = "#";
    a.onclick = removeFileFromStore;
    return a;
  }

  function renderView() {
    if (!storedFiles.length) {
      fileList.innerHTML = "<p>No files loaded!</p>";
    } else {
      fileList.innerHTML = "";
      var totalFilesSize = 0;
      for (var i = 0; i < storedFiles.length; i++) {
        // calculate total size of all files
        totalFilesSize += storedFiles[i].size;
        var div = document.createElement("div");
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
      fileTotal.innerHTML = "Total File Sizes: " + totalFilesSize + " bytes";
    }
  }
})();
