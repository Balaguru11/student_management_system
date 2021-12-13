$(function () {
  // School-Create Form Validations - schooolName
  $("#schooolName").on("input", function () {
    var input = $(this);
    var is_name = input.val();
    if (!(is_name.length < 10)) {
      input.removeClass("invalid").addClass("valid");
      $("#schoolName_error").addClass("error").removeClass("error-display");
    } else {
      input.removeClass("valid").addClass("invalid");
      $("#schoolName_error").addClass("error-display").removeClass("error");
    }
  });

  // School-Create Form Validations - board
  // $('#board').on('select', function() {
  //   var selected = $(this);
  //   var is_selected = selected.val();
  //   if(is_selected !== ""){
  //     select.removeClass('invalid').addClass('valid');
  //     $('#board_error').addClass('error').removeClass('error-display');
  //   }else{
  //     select.removeClass('valid').addClass('invalid');
  //     $('#board_error').addClass('error-display').removeClass('error');
  //   }
  // })

  //   $("#board").on('change', function() {
  //     var board = $(this).find(":selected").val();
  //     if (board == "") {
  //       input.removeClass('valid').addClass('invalid');
  //       $('#board_error').addClass('error-display').removeClass('error');
  //         // alert("Please select an option!");
  //         // return false;
  //     }else{
  //       alert(board);
  //       input.removeClass('invalid').addClass('valid');
  //       $('#board_error').addClass('error').removeClass('error-display');
  //     }
  // });

  // School-Create Form Validations - email
  $("#email").on("input", function () {
    var input = $(this);
    var check =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var is_email = check.test(input.val());
    if (is_email) {
      input.removeClass("invalid").addClass("valid");
      $("#email_error").addClass("error").removeClass("error-display");
    } else {
      input.removeClass("valid").addClass("invalid");
      $("#email_error").addClass("error-display").removeClass("error");
    }
  });

  // School-Create Form Validations - Loation
  $("#schoolLocation").on("input", function () {
    var input = $(this);
    var is_name = input.val();
    if (!(is_name.length < 2)) {
      input.removeClass("invalid").addClass("valid");
      $("#schoolLocation_error").addClass("error").removeClass("error-display");
    } else {
      input.removeClass("valid").addClass("invalid");
      $("#schoolLocation_error").addClass("error-display").removeClass("error");
    }
  });

  // School-Create Form Validations - schoolUserName
  $("#schoolUserName").on("input", function () {
    var input = $(this);
    var is_name = input.val();
    if (!(is_name.length < 8)) {
      input.removeClass("invalid").addClass("valid");
      $("#schoolUserName_error").addClass("error").removeClass("error-display");
    } else {
      input.removeClass("valid").addClass("invalid");
      $("#schoolUserName_error").addClass("error-display").removeClass("error");
    }
  });

  // School-Create Form Validations - schoolPassword
  $("#schoolPassword").on("input", function () {
    var input = $(this);
    var check =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    var is_password = check.test(input.val());
    if (is_password) {
      input.removeClass("invalid").addClass("valid");
      $("#school_Password_error")
        .addClass("error")
        .removeClass("error-display");
    } else {
      input.removeClass("valid").addClass("invalid");
      $("#school_Password_error")
        .addClass("error-display")
        .removeClass("error");
    }
  });

  // School-Create Form Validations - schooolName

  // School-Create Form Validations - schooolName

  //username field
  $("#username").on("input", function () {
    var input = $(this);
    var is_name = input.val();
    if (!(is_name.length <= 3)) {
      input.removeClass("invalid").addClass("valid");
      $("#username-error").addClass("error").removeClass("error-display");
    } else {
      input.removeClass("valid").addClass("invalid");
      $("#username-error").addClass("error-display").removeClass("error");
    }
  });

  //password
  $("#password").on("input", function () {
    var input = $(this);
    var check =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    var is_password = check.test(input.val());
    if (is_password) {
      input.removeClass("invalid").addClass("valid");
      $("#password-error").addClass("error").removeClass("error-display");
    } else {
      input.removeClass("valid").addClass("invalid");
      $("#password-error").addClass("error-display").removeClass("error");
    }
  });

  // After Form Submitted Validation
  $("form").trigger("click", function (event) {
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
    if ($(".form-control.invalid").length) {
      alert("Please fill all the fields.");
      event.preventDefault();
    } else {
      alert("Form submitted");
    }
  });
});

$(document).ready(function () {
  // // Handling data-toggle manually
  //     $('.nav-tabs a').click(function(){
  //         $(this).tab('show');
  //     });
  // The on tab shown event
  $(".nav-pills button").on("shown.bs.tab", function (e) {
    var current_tab = e.target;
    // if(current_tab.id == ){
    //   //show elements
    // }
    var previous_tab = e.relatedTarget;
  });
});

// dynamic select opption based on selected option in HTML form
$(document).ready(function () {
  $("#class_medium").on("change", function () {
    var class_medium = this.value;
    $("#class_section").html("");
    $.ajax({
      url: "/api/get-class-sections",
      type: "POST",
      data: {
        class_id: class_medium,
      },
      dataType: "json",
      success: function (result) {
        $("#class_section").html(
          '<option value="">Select Class Section here.</option>'
        );
        $.each(result.class_secs, function (key, value) {
          $("#class_section").append(
            '<option value="' +
              value.id +
              '">' +
              value.class_section +
              " Sec - " +
              value.seats_free +
              " Seats Left </option>"
          );
        });
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// dynamic select opption based on selected option in HTML form
$(document).ready(function () {
  $("#class_medium").on("change", function () {
    var class_medium_1 = this.value;
    $("#actual_fee").val("");
    $.ajax({
      url: "/api/get-class-fee",
      type: "POST",
      data: {
        class_id: class_medium_1,
      },
      dataType: "json",
      success: function (data) {
        $('#fee-one, #fee-two').remove()
        $("#class_section").after(function(){
          return "<div class='mb-3' id='fee-one'><label class='mt-3'>Fee Amount:</label><input type='number' class='form-control' name='actual_fee' id='actual_fee' value='"+ data.class_fee +"'disabled ></input></div><div class='mb-3' id='fee-two'><label>Amount Paying:</label><input type='number' class='form-control' name='fee_paying' id='fee_paying' placeholder='Amount Paying:' min='0' max=" + data.class_fee + "><span class='error' id='fee_paying_error'>Please enter the amount.</span></div>";
        })
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// show previously paid amount in total;
// $(document).ready(function () {
//   $('#email').on('change', function (){
//     var email_id = this.value;
//     $('#academic_year').on('change', function(){
//       var academic = this.value;
//       $("#class_medium").on("change", function () {
//         var class_med = this.value;
//         $("#fee_earlier").val("");
//         $.ajax({
//           url: "/api/get-paid-amount",
//           type: "POST",
//           data: {
//             email: email_id,
//             academic_year: academic,
//             class_id: class_med,
//           },
//           dataType: "Json",
//           success: function(data) {
//             // show data in the element.
//             alert('Called');
//           },
//           error: function (err) {
//             alert(err);
//           },
//         })
//       })
//     })
//   })
// }) // last close

// combining one
$(document).ready(function () {
  $('#email, #academic_year, #class_medium').on('change', function (){
    var email_id = $('#email').val();
    var academic = $('#academic_year').val();
    var class_med = $('#class_medium').val();
    $("#fee_earlier").val("");
      $.ajax({
        url: "/api/get-paid-amount",
        type: "POST",
        data: {
          email: email_id,
          academic_year: academic,
          class_id: class_med,
        },
        dataType: "Json",
        success: function(data) {
          // show data in the element.
          $('#actual_fee').after(function(){
            return "<div class='mb-3 form-group'><label class='mt-3' for='fee_earlier'>Fee already Paid:</label><input type='number' class='form-control' name='fee_earlier' id='fee_earlier' placeholder='Fees already paid' value='"+ data.amount_earlier_paid +"' disabled /></div>"
          })
        },
        error: function (err) {
          console.log(err);
        },
      })
  })
}) // last close


//payment success
// onPaymentSuccess(data, any);
// {
//   window.location.href = data.payulink;
//   //This will redirect you to payumoney payment form
// }
