//      jupload.js
//      
//      Copyright 2011 Giuseppe D'Inverno <giudinvx[at]gmail[dot]com>
//
//      This program is free software; you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation; either version 2 of the License, or
//      (at your option) any later version.
//      
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//      
//      You should have received a copy of the GNU General Public License
//      along with this program; if not, write to the Free Software
//      Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//      MA 02110-1301, USA.


var jUpload = function() {


	var dropbox = document.getElementById( "dropbox" );
	var queue=[]; var uploas= []; 

 
	dropbox.addEventListener( "drop", readFiles, false );
	dropbox.addEventListener( "dragleave", cancel, false );
	dropbox.addEventListener( "dragover", cancel, false );
	dropbox.addEventListener( "dragenter", cancel, false );

	var uploadyes = document.getElementById( "upload" );
	uploadyes.addEventListener( "click", upload, false );

	function cancel( event )
	{
		event.stopPropagation();
		event.preventDefault();
	}
	
	function readFiles( event )
	{
		event.stopPropagation();
		event.preventDefault();
		
		var files = event.dataTransfer.files;
		var flength = files.length;

		for( var i = 0, file; i < flength; i++ ) {
			file = files[i];
			
			if( file.type.toLowerCase().match(/image.*/) ) {
				var freader = new FileReader();
 				queue.push(file);
				freader.onload = function( file ) {
					setFiles( file );
				};
				freader.readAsDataURL( file );
			}
		}
	}
	
	function setFiles( file )
	{
		var img		= document.createElement( 'img' );
		var preview	= document.getElementById( 'preview' );
		img.id		= "imgpreview";
		img.file	= file;
		img.src		= file.target.result;
		img.height 	= 100;
		img.width 	= 150;

		preview.appendChild( img );
	}
	
	function checkua()
	{
		if( window.FileReader )
			return true;
		
		if( window.FormData )
			return false;

		return false;
	}
	
	function generateBoundary() 
	{
		return "-----------------------------9" + (new Date).getTime();
	}
	
	function bluildpack(file, boundary)
	{						 
		var mex		= '';
 		var	crlf	= '\r\n';

		mex  = '--' + boundary + crlf;
		mex += 'Content-Disposition: form-data; name="Files[]"; filename="'+file.name+'"'+ crlf;
		mex += 'Content-Type: ' + file.type + crlf + crlf;
		mex += file.getAsBinary() + crlf;
		mex += '--' + boundary + crlf;
		mex += '--' + boundary + '--' + crlf;

		uploas.push(mex);
	}

	function upload() 
	{
		var boundary = generateBoundary();

 		if( checkua() ) {
 			var leng = queue.length;
 
			for( var i = 0; i < leng; i++ ) {
				bluildpack(queue.shift(), boundary   );
			}
			
			var upls = uploas.length;

			for( var l = 0; l < upls; l++ ) {
				var	xhr	= new XMLHttpRequest();
				
				xhr.open("POST", "upload.php", true);
				xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
				xhr.sendAsBinary(uploas.shift());
			}
		}
	}
	
}
