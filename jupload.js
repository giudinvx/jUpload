var jUpload = function () {
	
/*
	if (window.FileReader) {
		return true;
	}
	if (window.FormData) {
		return false;
	}
	
*/
 
var dropbox = document.getElementById("dropbox");  
dropbox.addEventListener("drop", readFiles, false );
dropbox.addEventListener("dragleave", cancel, false);
dropbox.addEventListener("dragover", cancel, false);
dropbox.addEventListener("dragenter", cancel, false);

function cancel (event)
{
	event.stopPropagation();
	event.preventDefault();
}
function readFiles (event)
{
	event.stopPropagation();
	event.preventDefault();
	
	var files = event.dataTransfer.files;
	var flength = files.length;
 
//    if (file[0].type.toLowerCase().match(/image.*/)) {
 
	for (var i = 0, file; i < flength; i++) {
		file = files[i];
		
		var freader = new FileReader();
			 
		freader.onload = function (file) {
			setFiles(file);
		};

		freader.readAsDataURL(file);
}

}
function setFiles (file)
{
	var img = document.createElement('img');
	img.file = file;
	img.src = file.target.result;
	preview.appendChild( img );
 
	
}

function resize () {
	

	
}
function upload () {}

}
