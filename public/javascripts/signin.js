$(document).ready(function() {
	jQuery('#password').val('');
	PasswordMask.init(jQuery('#password'));
	var storedUserName = localStorage["username"];
	console.log(storedUserName);
	jQuery('#username').removeClass( "loginTextboxGreyedOut").addClass("loginTextboxGreyedOut");
	if(storedUserName != undefined)
	{
		jQuery('#username').val(storedUserName);
		jQuery('#username').removeClass( "loginTextboxGreyedOut").addClass("loginTextbox");
		jQuery('#password').focus();
	}
	else{
		jQuery('#username').val('user name');
	}			
	jQuery('#password').keyup(function (event){
	
	  if (event.keyCode == '13'){
	     Signin();
	  }
	});


	jQuery('#username').blur(function (event){
		if(jQuery('#username').val().length === 0){
			jQuery('#username').val('user name');
			jQuery('#username').removeClass("loginTextbox").addClass("loginTextboxGreyedOut");
		}
	});

	jQuery('#username').focus(function (event){
		if(jQuery('#username').val() === 'user name'){
			jQuery('#username').val('');
			jQuery('#username').removeClass( "loginTextboxGreyedOut").addClass("loginTextbox");
		}
	});

	
	jQuery('#btnLogin').click(function (event){
		Signin();
		return false;
	});

});


function Signin(){
	if(jQuery('#username').val() != 'user name'){
		localStorage["username"] = jQuery('#username').val();
	}
	else{
		localStorage["username"] = '';
	}
	jQuery('#password').addClass('loginTextboxTextInvisible');  // hack so user does not see their unmasked password
	document.forms[0].elements[1].value = PasswordMask.password();
	document.forms[0].submit();
	return false;
}




var PasswordMask = (function(){
  var myPrivateVar = 0;
	var unmasked_string = '';
	var field = null;
    var myPrivateMethod = function(someText){
        //console.log(someText);
    };

    var fillFieldWithBullets = function(){
    	// Mask Field With Bullets
      var bullet_string = "";
      // Loop through and add bullets
      for(i = 0; i < jQuery(field).val().length;i++){
        bullet_string += String.fromCharCode(8226);    
      }
      // Fill bullets
      jQuery(field).val(bullet_string);
    };
     
    return {
        temp: "",
		init: function(source){
			field = source;
			jQuery(field).val('enter password');
			jQuery(field).keypress(function(event) {
				PasswordMask.onKeyPress(event, jQuery(field))
			});
			jQuery(field).keyup(function(event) {
				PasswordMask.onKeyUp(event, jQuery(field))
			});	
			jQuery(field).blur(function(event) {
				PasswordMask.onBlur(event, jQuery(field))
			});	
			jQuery(field).focus(function(event) {
				PasswordMask.onFocus(event, jQuery(field))
			});	
			jQuery(field).bind('paste', (function(event) {
				var el = $(this);
				setTimeout(function() {
					PasswordMask.onPaste(event, jQuery(field));
				}, 50);
			}));	
		},
		onFocus: function(e, source){
			if(jQuery(field).val() === 'enter password'){
				jQuery(field).val('');
			}
		},
		
		onBlur: function(e, source){
			if(jQuery(field).val().length === 0){
				jQuery(field).removeClass( "loginTextbox").addClass("loginTextboxGreyedOut");
				unmasked_string = '';
				jQuery(field).val('enter password');
			}
		},
		
		onKeyUp: function(e, source){
			// this accounts for delete/backspace...
			if(e.which == 8) {
				unmasked_string = unmasked_string.substr(0,jQuery(source).val().length);
			}
		},

		onPaste: function(e, source){
			jQuery(field).removeClass("loginTextboxGreyedOut").addClass("loginTextbox");
			unmasked_string = jQuery(field).val();
			fillFieldWithBullets();
		},


    onKeyPress: function(e, source){
			jQuery(field).removeClass("loginTextboxGreyedOut").addClass("loginTextbox");
			fillFieldWithBullets();
			var typedChar = String.fromCharCode(e.which);
			unmasked_string += typedChar;
			// Wait for user to stop typeing
			setTimeout(function() {
				setTimeout(function() {
					if(jQuery(field).val() != 'enter password'){
						jQuery(field).val(jQuery(field).val().replace(/.$/,String.fromCharCode(8226))); 
					}
					}, 500);        
			},1000);		
        },
		password: function(){
			return unmasked_string;
		}
    };
     
})();
