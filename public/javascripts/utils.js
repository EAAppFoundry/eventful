function center(div)
{
	var top = ($(window).height() - div.height()) / 2+$(window).scrollTop() + "px";
	var left = ($(window).width() - div.width()) / 2+$(window).scrollLeft() + "px";
	div.css({"top" : top});
	div.css({"left" : left});
	return div;
}

function showDialog(dialog){
	var mask = '';
	mask += "<div style='position:fixed;height:100%;width:100%;";
	mask += "background:#000;background:rgba(0,0,0,.6);";
	mask += "z-index: 100;top:0;left:a0;'></div>";
	$('body').append(mask);
	center(dialog);
	dialog.show('medium');
}

// 15 second timeout.
function AJAX(type, data, endpoint, callback){
	jQuery.ajax({
	   type: type,
	   url: endpoint,
	   timeout: 15000,
	   data: data,
	   error: function(jqXHR, textStatus, errorThrown){
		   ajaxErrorHandler(jqXHR, textStatus, errorThrown);
	   },
	   success: function(msg){
		   console.log('successfully called endpoint -> ' + endpoint);
	     callback(msg);
	   }
	 });	
};

function ajaxErrorHandler(jqXHR, textStatus, errorThrown){
	console.log('**** AJAX ERROR *****');
	console.log(textStatus + ' ' + errorThrown.toString());
	return false;
}