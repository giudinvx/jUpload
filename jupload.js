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
	
/*
	if (window.FileReader) {
		return true;
	}
	if (window.FormData) {
		return false;
	}
	
*/
	var dropbox = document.getElementById( "dropbox" );
	
	dropbox.addEventListener( "drop", readFiles, false );
	dropbox.addEventListener( "dragleave", cancel, false );
	dropbox.addEventListener( "dragover", cancel, false );
	dropbox.addEventListener( "dragenter", cancel, false );

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
					 
				freader.onload = function( file ) {
					setFiles( file );
				};
				freader.readAsDataURL( file );
			}
		}
	}
	
	function setFiles( file )
	{
		var img = document.createElement( 'img' );
		var preview = document.getElementById( 'preview' );
		img.file = file;
		img.src = file.target.result;
		img.height = 100;
		img.width = 150;
		preview.appendChild( img );
	}

	function upload() 
	{
		
	}

}
