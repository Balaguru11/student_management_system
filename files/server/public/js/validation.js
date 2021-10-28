$(function() {

  //username field
    $('#username').on('input', function(){
        var input = $(this);
        var is_name = input.val();
        if( !(is_name.length <= 3) ){
            input.removeClass('invalid').addClass('valid');
            $('#username-error').addClass('error').removeClass('error-display');
        }else{
            input.removeClass('valid').addClass('invalid');
            $('#username-error').addClass('error-display').removeClass('error');
        }
    })


  //password 
  $('#password').on('input', function() {
    var input = $(this);
    var check = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    var is_password = check.test(input.val());
    if(is_password){
      input.removeClass('invalid').addClass('valid');
      $('#password-error').addClass('error').removeClass('error-display');
    }else{
      input.removeClass('valid').addClass('invalid');
      $('#password-error').addClass('error-display').removeClass('error');
    }
  });

  // After Form Submitted Validation
  $("form").trigger("click", function(event){
      $("input").trigger("input");
      var form_data = $("#login-form").serializeArray();
      // var error_free=true;
      // for (var input in form_data) {
      //   var element=$(form_data[input]['name']);
      //   var valid=element.hasClass("valid");
      //   var error_element=$("span", element.parent());
      //   if (!valid){error_element.removeClass("error").addClass("error_show"); error_free=false;}
      //   else{error_element.removeClass("error_show").addClass("error");}
      // }
      if ($(".form-control.invalid").length){
        alert('Please fill all the fields.');
        event.preventDefault();
      }
      else{
        alert('Form submitted');
      }
    });
});
