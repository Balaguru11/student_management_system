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

// Dynamic getting student data from fee-collection module
$(document).ready(function () {
  $("#stuId").on("change", function () {
    var student_id = this.value;
    // $("#mobile, #name, #email").val("");
    $.ajax({
      url: "/api/get-student-data",
      type: "POST",
      data: {
        stuId: student_id,
      },
      dataType: "Json",
      success: function (result) {
        $("#stuId").after(function () {
          $("#student_data").remove();
          return (
            "<div class='student_data' id='student_data'><div class='mt-3 mb-3'><label for='name'>Student Name: </label><input type='text' class='form-control' name='name' id='name' placeholder='Student Name' disabled value='" +
            result.student_name +
            "' /> </div> <div class='row g-3'> <div class='col'> <label for='name'>Student Email ID: </label> <input type='email' class='form-control' name='email' id='email' placeholder='Email ID:' disabled value='" +
            result.student_email +
            "' /> <span class='error' id='email_error' >Please enter the Student's Email.</span > </div> <div class='col'> <label for='name'>Student Mobile No: </label> <input type='tel' class='form-control' placeholder='Mobile Number:' name='mobile' id='mobile' disabled value='" +
            result.student_mobile +
            "' /> <span class='error' id='mobile_error' >Please enter the Student's 10 Digit Mobile Number.</span > </div> </div></div>"
          );
        });
      },
      error: function (err) {
        alert("No Student found");
      },
    });
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
        $("#fee-one, #fee-two").remove();
        $("#class_section").after(function () {
          return (
            "<div class='mb-3' id='fee-one'><label class='mt-3'>Fee Amount:</label><input type='number' class='form-control' name='actual_fee' id='actual_fee' value='" +
            data.class_fee +
            "'disabled /><input type='hidden' class='form-control' name='actual_fee_hide' id='actual_fee_hide' value='" +
            data.class_fee +
            "'/></div><div class='mb-3' id='fee-two'><label>Amount Paying:</label><input type='number' class='form-control' name='fee_paying' id='fee_paying' placeholder='Amount Paying:' max=" +
            data.class_fee +
            "><span class='error' id='fee_paying_error'>Please enter the amount.</span></div>"
          );
        });
      },
      error: function (err) {
        alert(err);
      },
    });
  });
});

// combining one
$(document).ready(function () {
  $("#stuId, #academic_year, #class_medium").on("change", function () {
    var student_id = $("#stuId").val();
    var academic = $("#academic_year").val();
    var class_med = $("#class_medium").val();
    $("#fee_earlier").val("");
    $.ajax({
      url: "/api/get-paid-amount",
      type: "POST",
      data: {
        student_id: student_id,
        academic_year: academic,
        class_id: class_med,
      },
      dataType: "Json",
      success: function (data) {
        // show data in the element.
        $("#actual_fee").after(function () {
          return (
            "<div class='mb-3 form-group'><label class='mt-3' for='fee_earlier'>Fee already Paid:</label><input type='number' class='form-control' name='fee_earlier' id='fee_earlier' placeholder='Fees already paid' value='" +
            data.amount_earlier_paid +
            "' disabled /></div>"
          );
        });
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
}); // last close

// Dynamic getting student data for fee due module from admission table
$(document).ready(function () {
  $("#stuId_due").on("change", function () {
    var student_id = this.value;
    // $("#mobile, #name, #email").val("");
    $.ajax({
      url: "/api/get-student-enrollment-data",
      type: "POST",
      data: {
        stuId: student_id,
      },
      dataType: "Json",
      success: function (result) {
        $("#stuId_due").after(function () {
          var max_amount = result.actual_fee - result.earlier_paid;
          $("#student_enroll_data").remove();
          return (
            "<div class='student_enroll_data' id='student_enroll_data'>            <div class='mt-3 mb-3'><label for='name'>Student Name: </label><input type='text' class='form-control' name='name' id='name' placeholder='Student Name' disabled value='" +
            result.student_name +
            "' /> </div>                <div class='row g-3'> <div class='col'> <label for='name'>Student Email ID: </label> <input type='email' class='form-control' name='email' id='email' placeholder='Email ID:' disabled value='" +
            result.student_email +
            "' /> </div> <div class='col'> <label for='name'>Student Mobile No: </label> <input type='tel' class='form-control' placeholder='Mobile Number:' name='mobile' id='mobile' disabled value='" +
            result.student_mobile +
            "' /> </div> </div>                <div class='mt-3 mb-3'> <label for='academic_year'>Academic Year: </label> <input type='text' class='form-control' name='academic_year' id='academic_year' disabled value='" +
            result.academic_year +
            "'/> </div>                 <div class='mb-3'> <label for='class_medium'>Class & Medium: </label> <input type='text' id='class_medium' class='form-control' name='class_medium' disabled value='" +
            result.class_std +
            " std - " +
            result.class_med +
            " medium' /> </div>                 <div class='mb-3'><label for='class_section'>Class section: </label> <input type='text' id='class_section' class='form-control' name='class_section' disabled value='" +
            result.class_sec +
            " Section' /> </div>                <div class='mb-3'><label for='course_fee' >Actual fee:</label><input type='number' class='form-control' name='course_fee' id='course_fee' value='" +
            result.actual_fee +
            "' /></div>                <div class='mb-3'><label for='paid_fee' >Amount Paid so far:</label><input type='number' class='form-control' name='paid_fee' id='paid_fee' value='" +
            result.earlier_paid +
            "' disabled /><input type='hidden' class='form-control' name='paid_fee_hide' id='paid_fee_hide' value='" +
            result.earlier_paid +
            "' /></div>                <div class='mb-1'><label for='paying_fee'>Amount Paying now:</label><input type='number' class='form-control' name='paying_fee' id='paying_fee' min='0' max='" +
            max_amount +
            "' /></div>                <input type='hidden' id='admission_id' name='admission_id' value='" +
            result.admission_id +
            "'></div>"
          );
        });
      },
      error: function (err) {
        alert("No Student found.");
      },
    });
  });
});

// Open Modal to view Student Profile
$(document).ready(function () {
  $(".viewbutton").on("click", function () {
    var student_id = $(this).attr("data-id");
    $.ajax({
      url: "/api/get-one-student-profile",
      type: "POST",
      data: {
        student_id: student_id,
      },
      dataType: "Json",
      success: function (data) {
        $(".modal-body").html(function () {
          return (
            "<div class='row px-3'><div class='col-6'><b>Name</b></div><div class='col-6'><p>" +
            data.student[0].name +
            "</p></div><div class='col-6'><b>Mobile Number</b></div><div class='col-6'><p>" +
            data.student[0].mobile_number +
            "</p></p></div><div class='col-6'><b>Email ID: </b></div><div class='col-6'><p>" +
            data.student[0].email +
            "</p></div><div class='col-6'><b>Date of Birth: </b></div><div class='col-6'><p>" +
            data.student[0].date_of_birth +
            "</p></div><div class='col-6'><b>Father's Name: </b></div><div class='col-6'><p>" +
            data.student[0].father_name +
            "</p></div><div class='col-6'><b>Parent Mobile Number</b></div><div class='col-6'><p>" +
            data.student[0].parent_mobile +
            "</p></div><div class='col-6'><b>Parent Email ID: </b></div><div class='col-6'><p>" +
            data.student[0].parent_email +
            "</p></div><div class='col-6'><b>City: </b></div><div class='col-6'><p>" +
            data.student[0].city +
            "</p></div><div class='col-6'><b>State: </b></div><div class='col-6'><p>" +
            data.student[0].state +
            "</p></div></div>"
          );
        });
        // show data in the element.
        $("#viewStuProfModal").modal("show");
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
}); // last close

// Open Modal to view STAFF Profile
$(document).ready(function () {
  $(".viewstaffprofile").on("click", function () {
    var staff_id = $(this).attr("data-id");
    $.ajax({
      url: "/api/get-one-staff-profile",
      type: "POST",
      data: {
        staff_id: staff_id,
      },
      dataType: "Json",
      success: function (data) {
        $(".modal-body").html(function () {
          return (
            "<div class='row px-3'><div class='col-6'><b>Name</b></div><div class='col-6'><p>" +
            data.staff[0].name +
            "</p></div><div class='col-6'><b>Mobile Number</b></div><div class='col-6'><p>" +
            data.staff[0].mobile_number +
            "</p></p></div><div class='col-6'><b>Email ID: </b></div><div class='col-6'><p>" +
            data.staff[0].email +
            "</p></div><div class='col-6'><b>Date of Birth: </b></div><div class='col-6'><p>" +
            data.staff[0].date_of_birth +
            "</p></div><div class='col-6'><b>Qualification: </b></div><div class='col-6'><p>" +
            data.staff[0].qualification +
            "</p></div><div class='col-6'><b>City: </b></div><div class='col-6'><p>" +
            data.staff[0].city +
            "</p></div><div class='col-6'><b>State: </b></div><div class='col-6'><p>" +
            data.staff[0].state +
            "</p></div></div>"
          );
        });
        // show data in the element.
        $("#viewStaffProfModal").modal("show");
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// fee-structure (class-medium) edit Modal
$(document).ready(function () {
  $(".editFeeStruct").on("click", function () {
    var class_medium_id = $(this).attr("data-id");
    $.ajax({
      url: "/api/edit-class-medium-fee",
      type: "POST",
      data: {
        class_medium_id: class_medium_id,
      },
      dataType: "Json",
      success: function (data) {
        $(".modal-body").html(function () {
          var fetched_medium = data.feeRow[0].medium;
          $("#medium_edit").val(fetched_medium);
          // $(
          //   "#medium_edit select > option[value='" + fetched_medium + "']"
          // ).attr("selected", true);

          return (
            "<form id='editclass-form' action='../dashboard/fee-structure/edit/" +
            data.feeRow[0].id +
            "?_method=PUT' method='POST'><input type='hidden' class='form-control' name='fee_id' id='fee_id' value='" +
            data.feeRow[0].id +
            "' /><div class='mb-3'><label for='class_std'>Class (Std):</label><input type='text' class='form-control' name='class_std_edit' id='class_std_edit' placeholder='6 / LKG / UKG etc' value='" +
            data.feeRow[0].class_std +
            "' /><span class='error' id='class_std_error' >Please enter the Class / Standarad.</span ></div><div class='mb-3'><label for='medium'>Medium of Language:</label><select id='medium_edit' class='form-control' name='medium_edit'><option value=''>Select One</option><option value='Tamil'>Tamil</option><option value='English'>English</option><option value='Hindi'>Hindi</option></select><span class='error' id='medium_error' >Please select the Medium.</span ></div><div class='mb-3'><label for='fee'>Fees: </label><input type='number' class='form-control' name='fee_edit' id='fee_edit' placeholder='Fee (in INR) per year.' value='" +
            data.feeRow[0].actual_fee +
            "' /><span class='error' id='fee_error' >Please enter the Fee amount.</span ></div><div class='mb-3'><button class='btn btn-secondary' type='submit' value='submit'> Update </button></div></form>"
          );
        });
        // show data in the element.
        $("#editFeeStructModal").modal("show");
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// fee structure GET DELETE Modal
$(document).ready(function () {
  $(".deleteFeeStruct").on("click", function () {
    var class_medium_id = $(this).attr("data-id");
    $.ajax({
      url: "/api/delete-class-medium-fee",
      type: "POST",
      data: {
        class_medium_id: class_medium_id,
      },
      dataType: "Json",
      success: function (data) {
        $(".modal-body").html(function () {
          return (
            "<div class='container'><div class='row'><input type='hidden' class='form-control' name='classmed_id_hidden' id='classmed_id_hidden' value='" +
            data.sections[0].id +
            "' /><p><b>Do you want to delete '" +
            data.sections[0].class_std +
            " Std - " +
            data.sections[0].medium +
            " Medium'?</b></p></div><div class='row'><div class='col-4'></div><div class='col-4'><a role='button' class='btn btn-secondary btn-block' data-bs-dismiss='modal'>Cancel</a></div><div class='col-4'><a href='../dashboard/fee-structure/delete/" +
            data.sections[0].id +
            "?_method=DELETE' role='button' class='btn btn-primary btn-block'>Delete</a></div></div></div>"
          );
        });
        // show data in the element.
        $("#deleteFeeStructModal").modal("show");
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// get EDIT Modal for USER ACCOUNTS by ADMIN & SCHOOL
$(document).ready(function () {
  $(".editUserAcc").on("click", function () {
    var staff_id = $(this).attr("data-id");
    $.ajax({
      url: "/api/get-edit-user-account",
      type: "POST",
      data: {
        staff_id: staff_id,
      },
      dataType: "Json",
      success: function (data) {
        $(".modal-body").html(function () {
          var role_fetched = data.userData[0].role_id_fk;
          $("#role_update").val(role_fetched);
          var status = data.userData[0].status;
          $("#status_edit").val(status);
          return (
            "<form id='edituseracc-form' action='../dashboard/users/edit/" +
            data.userData[0].id +
            "?_method=PUT' method='POST'><input type='hidden' class='form-control' name='staff_edit_id' id='staff_edit_id' value='" +
            data.userData[0].id +
            "' /><div class='mb-3'><label for='select'>Role:</label><select id='role_update' name='role_update' class='form-control'><option value='9'>Admin</option> <option value='4'>Head Master</option><option value='8'>Teaching Faculty</option><option value='2'>Non-teaching Faculty</option></select></div><div class='mb-3'><label for='username'>Username:</label><input type='text' class='form-control' name='username' placeholder='Username' id='username' value='" +
            data.userData[0].username +
            "' disabled/><span class='error' id='username-error' >Username should be at least 3 characters long.</span ></div><div class='mb-3'><label for='email'>Email:</label><input type='email' class='form-control' name='email' placeholder='Type your email here' id='email' value='" +
            data.userData[0].email +
            "' disabled /><span class='error' id='email-error'>Email is invalid.</span></div><div class='mb-3'> <label for='status_edit'>Account Status:</label> <select id='status_edit' name='status_edit' class='form-control'> <option value='Active'>Active</option><option value='Inactive'>Inactive</option></select> </div><div class='login'><button class='btn btn-secondary' type='submit'>Update User</button></div></form>"
          );
        });
        // show data in the element.
        $("#editUserAccModal").modal("show");
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// get No of periods from schedule_template
$(document).ready(function(){
  $('#schedule_name').on('change', function(){
    var schedule_temp_id = $('#schedule_name').val();
    var class_sec_id =  $('#class').val(); 
    $.ajax({
      url: '/api/get-periods-from-schedule-template',
      type: 'POST',
      data: {
        schedule_temp_id: schedule_temp_id,
        class_sec_id: class_sec_id,
      },
      dataType: "Json",
      success: function (data) {
          $("#schedule_name").after(function () {
            // getting fields
            var period = data.periods[0].no_of_periods;
            var foo = [];
            for (var i = 1; i <= period; i++) {
              foo.push(i);
              $('#schedule_list').html(
                '<p>Schedule Plan</p> <hr />'
              );
              $.each(foo, (key, value) => {
                $('#schedule_list').append(
                  "<div id='schedule_main' class='mt-3 row g-3'><div class='col'><label for='period_" + value + "_sub'>Period " + value + "- Subject</label><select id='subject_option period_" + value + "_sub' class='period_" + value + "_sub form-control subject_option' name='period_" + value + "_sub'><option>Choose a Subject</option></select></div><div class='col'><label for='period_" + value + "_staff'>Period " + value + " - Staff</label><input id='period_" + value + "_staff subject_staff' type='text' class='subject_staff period_" + value + "_staff form-control' placeholder='Choose Staff' name='period_" + value + "_staff'></div></div>"
                )
              })
            } // for loop closing. getting subjects dropdown below
            var subject_name = [];
            for (var i = 0; i < data.subjects.length; i++) {
              subject_name.push(data.subjects[i].subject_name);
            }
            $.each(subject_name, (key, value) => {
              $('.subject_option').append(
                "<option value='"+ data.subjects[key].subject_id +"'>"+ data.subjects[key].subject_name +"</option>"
                );
            })
          })
      },
      error: function(err){
        console.log(err);
      }
    })
  })
})

// fetching staff_id_assigned for schedule creation
$(document).on("change", ".subject_option", function() {
    var subject_id = $('.subject_option').val();
    var class_sec_id = $('#class').val();
    $.ajax({
      url: '/api/get-staff-assigned-to-subject',
      type: 'POST',
      data: {
        subject_id: subject_id,
        class_sec_id: class_sec_id,
      },
      dataType: "JSON", 
      success: function (data) {
        $('.subject_staff').val(data.staff[0].staff_id_assigned).text(data.staff[0].name);
        data.staff[0]
      },
      error: function(err){
        console.log(err);
      }
    })
  })

// add ajax call for Subjects to week schedule
// $(document).ready(function(){
// $("#class").on('change', function(){
//   var class_sec_id =  $('#class').val();
//     $.ajax({
//       url: '/api/get-subjects-from-class-section',
//       type: 'POST',
//       data: {
//         class_sec_id: class_sec_id,
//       },
//       dataType: "Json",
//       success: function (data) {
//         var subject_name = [];
//         var subject_id = [];
//         var staff_id = [];
//         var staff_name = [];
//         // var class_sec = data.subjects[0].classroom_id;

//         for (var i = 0; i <= data.subjects.length; i++) {
//           subject_name.push(data.subjects[i].subject_name);
//           subject_id.push(data.subjects[i].subject_id);
//           staff_id.push(data.subjects[i].staff_id_assigned);
//           staff_name.push(data.subjects[i].name);
//         }
//         console.log(subject_name);

//         var select = $('#subject_option');
//         $(subject_name).each(function(){
//           select.append($('<option>').prop('value', this).text(this.charAt(0).toUpperCase() + this.slice(1)));
//         })

//         // var label = $('<label>').prop('for', 'subject').text('Choose Subject:');

//         // var br = $('<br>');

//         $('#schedule_name').append(select);

//       //   $("#schedule_name").after(function () {
//       //   //success call
//       //   $('#subject_option').append(
//       //     '<option>Select Class first </option>'
//       //   );
//       //   $.each()
//       // })
//   },
//   error: function(err){
//     console.log(err);
//   }
//     })
//   })
// })