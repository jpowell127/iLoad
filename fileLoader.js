(function() {
  window.URL = window.URL || window.webkitURL;
  // store uploaded files
  var storedFiles = [];
  // dom references
  var fileSelect = document.getElementById("fileSelect"),
    fileInput = document.getElementById("fileInput"),
    fileList = document.getElementById("fileList"),
    fileTotal = document.getElementById("fileTotal"),
    fileDrop = document.getElementById("fileDrop"),
    toggleViewLink = document.getElementById("toggleView");
  // input change event
  fileInput.addEventListener(
    "change",
    function() {
      addFilesToStore(this.files);
    },
    false
  );
  // click hidden input when fileSelect button is clicked
  fileSelect.addEventListener("click", clickFileInput, false);
  // toggle view event
  toggleViewLink.addEventListener("click", toggleView, false);
  // drag and drop events
  fileDrop.addEventListener("dragenter", dragenter, false);
  fileDrop.addEventListener("dragover", dragover, false);
  fileDrop.addEventListener("drop", drop, false);
  // push uploaded files into files store
  function addFilesToStore(files) {
    Array.prototype.forEach.call(files, function(file) {
      storedFiles.push(file);
    });
    renderView();
  }
  // remove a file from files store via index from dom element
  function removeFileFromStore(event) {
    storedFiles.splice(event.target.id, 1);
    renderView();
  }
  // click hidden input to trigger upload event
  function clickFileInput(e) {
    e.preventDefault();
    if (fileInput) fileInput.click();
  }
  // switch view of files to grid or list
  function toggleView(e) {
    e.preventDefault();
    fileList.classList.toggle("grid");
  }
  // dragenter function to stop futher propagation of this event
  function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
  }
  // dragover function to stop futher propagation of this event
  function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
  }
  // get data from drop event and push the files given to file store
  function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

    addFilesToStore(files);
  }
  // create template for file view component
  function createFileCard() {
    var div = document.createElement("div");
    div.className = "card m-3 p-3";
    return div;
  }
  // create thumbnail for file image preview
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
  // create template for file info
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
  // create delete link for file component and attach function to remove a file
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
  // generate view from files in file store
  function renderView() {
    var totalFilesSize = 0;
    if (!storedFiles.length) {
      // if no files, show message and file size total of 0
      fileList.innerHTML = "<p>No files loaded!</p>";
      fileTotal.innerHTML = totalFilesSize + " bytes";
    } else {
      // if files create view from files in file store
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
        // create file info template
        var info = createFileInfo(storedFiles[i]);
        div.appendChild(info);
        // create delete link for each file
        var a = createFileDeleteLink(i);
        div.appendChild(a);
      }
      // update file size total
      fileTotal.innerHTML = totalFilesSize + " bytes";
    }
  }
})();
