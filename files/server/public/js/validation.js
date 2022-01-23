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
    if ($(".form-control.invalid").length) {
      alert("Please fill all the fields.");
      event.preventDefault();
    } else {
      alert("Form submitted");
    }
  });
});

$(document).ready(function () {
  $(".nav-pills button").on("shown.bs.tab", function (e) {
    var current_tab = e.target;
    var previous_tab = e.relatedTarget;
  });
});

// view fee due collection data as modal
$(document).ready(function () {
  $('.viewDueCollData').on('click', function () {
    var student_id = $(this).attr('data-st-id');
    var admission_id = $(this).attr('data-id');
    $.ajax({
      url: '/api/get-due-collection-records',
      type: 'POST',
      data: {
        student_id: student_id,
        admission_id: admission_id,
      }, dataType: 'JSON',
      success: function (data) {

        $('.view-modal-body').html(function () {
          return (`<div><h4 class='text-center'>Viewing Payment Records of ${data.feeDueRows[0].name}</h4><br /><div id='year_wise_payments'></div><p>Year: ${data.feeDueRows[0].academic_year} | Class: ${data.feeDueRows[0].class_std} std- ${data.feeDueRows[0].medium} Med- ${data.feeDueRows[0].class_section} sec</p>
          <table class='table table-light text-center'>
          <thead> <tr><th scope='col'>S.No</th><th scope='200px'>Class Sec</th><th scope='200px'>Year</th><th scope='200px'>Course Fee</th><th scope='100px'>Paid</th><th scope='200px'>Due Status</th><th scope='100px'>Payment Mode</th><th scope='100px'>Paid Date</th><th width='200px'>Actions</th> </tr></thead>
          <tbody class='view-due-records' id='view-due-records'>
          <tr><th scope='row'>1</th><td>${data.feeDueRows[0].class_std} std- ${data.feeDueRows[0].medium} Med- ${data.feeDueRows[0].class_section} sec</td><td>${data.feeDueRows[0].academic_year}</td><td>${data.feeDueRows[0].actual_fee}</td><td id='admission_paid'></td><td id='first_payment_status'></td><td>${data.feeDueRows[0].admi_payment_mode}</td><td>${data.feeDueRows[0].admission_date}</td><td><button data-id='13' type='button' class='deleteSchedTemp btn btn-danger View' data-bs-toggle='modal'><i class='far fa-trash-alt' aria-hidden='true'></i></button></td></tr>
          </tbody></table></div>`);
        })

        var due_total = 0;
        if (data.feeDueRows[1]){
          $.each(data.feeDueRows, function (key, value) {
            due_total += value.currently_paying
            $("#view-due-records").append(
              `<tr><th scope='row'>${key+2}</th><td>${value.class_std} std- ${value.medium} Med- ${value.class_section} sec</td><td>${value.academic_year}</td><td>${value.actual_fee}</td><td>${value.currently_paying}</td><td>${value.due_status}</td><td>${value.payment_mode}</td><td>${value.duepaid_date}</td><td><button data-id='13' type='button' class='deleteSchedTemp btn btn-danger View' data-bs-toggle='modal'><i class='far fa-trash-alt' aria-hidden='true'></i></button></td></tr>`
            );
          });
        }
        var first_paid = data.feeDueRows[0].actual_fee - due_total
        $('#admission_paid').append(first_paid);

        if (first_paid == data.feeDueRows[0].actual_fee){
          $('#first_payment_status').append('No Due');
        } else {
          $('#first_payment_status').append('Due');
        }
        $('#viewDueCollDataModal').modal('show');
      }, error: function (err) {
        console.log(err);
      }
    })
  })
})

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
        console.log("No Student found");
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
        console.log(err);
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
        console.log("No Student found.");
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
          return (
            `<form id='edituseracc-form' action='../dashboard/users/edit/${staff_id}?_method=PUT' method='POST'><input type='hidden' class='form-control' name='staff_edit_id' id='staff_edit_id' value='${staff_id}' /><div class='mb-3'><label for='select'>Role:</label><select id='role_update' name='role_update' class='form-control'><option value='${role_fetched}' selected >${data.userData[0].role_name}</option><option value='9'>Admin</option> <option value='4'>Head Master</option><option value='8'>Teaching Faculty</option><option value='2'>Non-teaching Faculty</option></select></div><div class='mb-3'><label for='username'>Username:</label><input type='text' class='form-control' name='username' placeholder='Username' id='username' value='${data.userData[0].username}' disabled/><span class='error' id='username-error' >Username should be at least 3 characters long.</span ></div><div class='mb-3'><label for='email'>Email:</label><input type='email' class='form-control' name='email' placeholder='Type your email here' id='email' value='${data.userData[0].email}' disabled /><span class='error' id='email-error'>Email is invalid.</span></div><div class='mb-3'> <label for='status_edit'>Account Status:</label> <select id='status_edit' name='status_edit' class='form-control'><option value='${data.userData[0].status}' selected >${data.userData[0].status}</option><option value='Active'>Active</option><option value='Inactive'>Inactive</option></select> </div><div class='login'><button class='btn btn-secondary' type='submit'>Update User</button></div></form>`
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

// get Delete Modal for USER ACCOUNTS by School
$(document).ready(function () {
  $(".deleteUserAcc").on("click", function () {
    var user_id = $(this).attr("data-id");
    $.ajax({
      url: "/api/delete-user-account",
      type: "POST",
      data: {
        user_id: user_id,
      },
      dataType: "Json",
      success: function (data) {
        $(".modal-body").html(function () {
          return (
            "<div class='container'><div class='row'><input type='hidden' class='form-control' name='user_id_hidden' id='user_id_hidden' value='" +
            data.userLogin[0].id +
            "' /><p><b>Do you want to delete '" +
            data.userLogin[0].username +
            "'s account'?</b></p></div><div class='row'><div class='col-4'></div><div class='col-4'><a role='button' class='btn btn-secondary btn-block' data-bs-dismiss='modal'>Cancel</a></div><div class='col-4'><a href='../dashboard/users/delete/" +
            data.userLogin[0].id +
            "?_method=DELETE' role='button' class='btn btn-primary btn-block'>Delete</a></div></div></div>"
          );
        });
        // show data in the element.
        $("#deleteUserAccModal").modal("show");
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// check if the week schedule for a class section already added or not
$(document).ready(function () {
  $('#day, #class_sec').on('change', function () {
    var class_sec_id = $("#class_sec").val();
    var day = $('#day').val();
    $.ajax({
      url: '/api/get-week-schedule-added',
      type: 'POST',
      data: {
        class_sec_id: class_sec_id,
        day: day,
      }, dataType: 'JSON',
      success: function (data){
        // DO THE PRECIOUS THING HERE
        if (data.foundNos > 0) {
          $("#day").after(function () {
            $('#schedule_name').attr('disabled', 'disabled');
            $('#sched_warn').remove();
            return (`<p id='sched_warn' class='m-2 alert alert-danger'>Schedule of this Class Section for the day is already added. </p>`)
          })
        } else {
          $("#day").after(function () {
            $('#schedule_name').removeAttr("disabled");
            $('#sched_warn').remove();
          })
        }
      }, error: function (err) {
        console.log(err);
      }
    })
  })
})

// get No of periods from schedule_template
$(document).ready(function () {
  $("#schedule_name").on("change", function () {
    var schedule_temp_id = $("#schedule_name").val();
    var class_sec_id = $("#class_sec").val();
    $.ajax({
      url: "/api/get-periods-from-schedule-template",
      type: "POST",
      data: {
        schedule_temp_id: schedule_temp_id,
        class_sec_id: class_sec_id,
      },
      dataType: "Json",
      success: function (data) {
        $("#schedule_name").after(function () {
          // getting fields
          var counter = 1;
          var period = data.periods[0].no_of_periods;
          var foo = []; // [1, 2, 3, ... 8]
          for (var i = 1; i <= period; i++) {
            foo.push(i);
            $("#schedule_list").html("<p>Schedule Plan</p> <hr />");
            $.each(foo, (key, value) => { // 0 (index), 1
              $("#schedule_list").append(
                `<input type='hidden' name='period_no_${value}' value='${value}'></input><div id='schedule_main_${value}' class='m-1 row g-3'><div class='col'><label for='period_${value}_sub'>Period ${value}- Subject</label><select data-id='${counter}' id='subject_option period_${value}_sub' class='period_${value}_sub form-control subject_option' name='period_${value}_sub' required><option value=''>Choose a Subject</option></select></div><div class='col'><label for='period_${value}_staff'>Period ${value} - Staff</label><input disabled id='period_${value}_staff subject_staff' type='text' class='${counter} subject_staff period_${value}_staff form-control' placeholder='Choose Staff' name='period_${value}_staff'><input id='period_${value}_staff_hidden subject_staff_hidden' type='hidden' class='${counter}_hidden subject_staff_hidden period_${value}_staff form-control' name='period_${value}_staff_hidden'></div></div>`
              );
              counter++;
            });
          } // for loop closing. getting subjects dropdown below
          var subject_name = []; // [c++, tamil]
          for (var i = 0; i < data.subjects.length; i++) {
            subject_name.push(data.subjects[i].subject_name);
          }
          $.each(subject_name, (key, value) => {
            $(".subject_option").append(
              "<option value='" +
                data.subjects[key].subject_id +
                "'>" +
                data.subjects[key].subject_name +
                "</option>"
            );
          });
        });
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// fetching staff_id_assigned for schedule creation
$(document).on(
  "change",
  ".period_1_sub, .period_2_sub, .period_3_sub, .period_4_sub,.period_5_sub, .period_6_sub, .period_7_sub, .period_8_sub, .period_9_sub, .period_10_sub",
  function () {
    var counter_id = $(this).attr("data-id");
    var subject_id = $(this).val();
    var class_sec_id = $("#class_sec").val();

    $.ajax({
      url: "/api/get-staff-assigned-to-subject",
      type: "POST",
      data: {
        subject_id: subject_id,
        class_sec_id: class_sec_id,
      },
      dataType: "JSON",
      success: function (data) {
        $("." + counter_id).val(data.staff[0].name);
        $("." + counter_id + "_hidden").val(data.staff[0].staff_id_assigned);
      },
      error: function (err) {
        console.log(err);
      },
    });
  }
);

// run insert query on focusout in week schedule
$(document).on('change', ".period_1_sub, .period_2_sub, .period_3_sub, .period_4_sub,.period_5_sub, .period_6_sub, .period_7_sub, .period_8_sub, .period_9_sub, .period_10_sub", function () {
  var class_sec_id = $('#class_sec').val();
  var day = $('#day').val();
  var sched_temp_name = $('#schedule_name').val();
  var subject = $('.subject_option').val();
  var staff = $('.subject_staff_hidden').val();
  var period_name = $(this).attr('name').match(/\d+/);
  var period_no = period_name[0];
  $.ajax({
    url: '/api/insert-week-schedule-by-period',
    type: 'POST',
    data: {
      class_sec_id: class_sec_id,
      day: day,
      sched_temp_name: sched_temp_name,
      period_no: period_no,
      subject: subject,
      staff: staff,
    }, dataType: 'JSON',
    success: function (data) {
      if (data.dataFound.length > 0) {
        $('#error_'+data.dataFound[0].period_no).remove();
        $('#schedule_main_'+data.dataFound[0].period_no).addClass('alert alert-danger').append(`<small id='error_${data.dataFound[0].period_no}'>Staff is not available at this time.</small>`);
      } else {
        $('#schedule_main_'+period_no).addClass('alert alert-success')
      }

      $('#period_'+data.dataFound[0].period_no+'_sub').on('change', function () {
        $('#schedule_main_'+data.dataFound[0].period_no).removeClass('alert alert-danger')
      })

      $('#period_'+period_no+'_sub').on('change', function () {
        $('#schedule_main_'+period_no).removeClass('alert alert-danger')
      })

      var errorCount = 0;
      errorCount = errorCount + $('div#schedule_list div.alert-danger').length;
      if (errorCount > 0) {
        $('#add_button_error').remove();
        $('#add_week_schedule').attr('disabled', 'disabled').after(function () {
          return (`<small class='text-danger' id='add_button_error'>One or more staff not available. Please assign to available staff.</small>`);
        })
      } else {
        $('#add_week_schedule').removeAttr('disabled');
      }
    }, error: function (err) {
      console.log(err)
    }
  })
});

// viewing period wsie subject staff in modal from View Week schedule Table
$(document).ready(function () {
  $('.viewWeekSched').on('click', function () {
    var weekSched_id = $(this).attr('data-id');
    var day_id = $(this).attr('dayta-id');
    var class_sec_id = $(this).attr('sec-id');
    var sched_tempid = $(this).attr('template-id');
    $.ajax({
      url: '/api/view-week-schedule-period-staff',
      type: 'POST',
      data: {
        weekSched_id: weekSched_id,
        day_id: day_id,
        class_sec_id: class_sec_id,
        sched_tempid: sched_tempid,
      }, dataType: 'JSON',
      success: function (data) {
        if (data.schedule.length > 0){
          $('.view-modal-body').html(function () {
            return (
              `<table class='table table-light text-center'>
              <thead> <tr><th scope='col'>Period No</th><th scope='200px'>Subject</th><th scope='200px'>Staff</th></tr></thead>
              <tbody class='view-schedule-periods' id='view-schedule-periods'></tbody></table>`
            );
          })
          $.each(data.schedule, function (key, value){
            $('#view-schedule-periods').append(function () {
              return (
                `<tr><th scope='row'>${value.period_no}</th><td>${value.subject_name}</td><td>${value.name}</td></tr>`
              )
            })
          })
        } else {
          $('.view-modal-body').html(function () {
            return (
              `<p>No Period found with this schedule. Click on the edit button to make changes.</p>`
            );
          })
        }
        $('#viewWeekSchedModal').modal('show');
      }, error: function (err) {
        console.log(err);
      }
    })
  })
})

// edit class Schedule modal from week schedule list - HAVING ISSUE
$(document).ready(function () {
  $('.editWeekSched').on('click', function () {
    var weekSched_id = $(this).attr('data-id');
    var day_id = $(this).attr('dayta-id');
    var class_sec_id = $(this).attr('sec-id');
    // var class_Sec_name = $(this).text();
    var sched_temp_id = $(this).attr('template-id');
    $.ajax({
      url: '/api/edit-week-schedule-preiods',
      type: 'POST',
      data: {
        weekSched_id: weekSched_id,
        day_id: day_id,
        class_sec_id: class_sec_id,
        sched_temp_id: sched_temp_id,
      }, dataType: 'JSON',
      success: function (data) {
        if (data.scheduleData[2].length > 0){
            // $('#schedule_name_edit').on('click', function () {
            //   $(this).after(function () {
             
              var counter = 1;
              var period_count = data.scheduleData[2].length;
              var create_inputs = [];
              for (var i = 1; i <= period_count; i++) {
                create_inputs.push(i);
                $("#schedule_list").html("<p>Schedule Plan</p> <hr />");
                var period_inputs = "";
                $.each(create_inputs, (key, value) => {
                  // $('#schedule_list').append(
                   period_inputs = period_inputs + `<input type='hidden' name='period_no_${value}' value='${value}'></input><div id='schedule_main_${value}' class='m-1 row g-3'><div class='col'><label for='period_${value}_sub'>Period ${value}- Subject</label><select data-id='${counter}' id='subject_option period_${value}_sub' class='period_${value}_sub form-control subject_option' name='period_${value}_sub' required><option value='${data.scheduleData[2][key].period_subject_id}'>${data.scheduleData[2][key].subject_name}</option></select></div><div class='col'><label for='period_${value}_staff'>Period ${value} - Staff</label><input disabled id='period_${value}_staff subject_staff' type='text' class='${counter} subject_staff period_${value}_staff form-control' placeholder='Choose Staff' name='period_${value}_staff' value='${data.scheduleData[2][key].name}'><input id='period_${value}_staff_hidden subject_staff_hidden' type='hidden' class='${counter}_hidden subject_staff_hidden period_${value}_staff form-control' name='period_${value}_staff_hidden' value='${data.scheduleData[2][key].period_staff_id}'></div></div>`
                  // );
                  counter++;
                });
              }
          //   })
          // })

          $('.edit-weeksched-modal-body').html(
              `<div class='m-2'><form id='editweeksched-form' action='../dashboard/week-schedule/edit/${day_id}/${class_sec_id}?_method=PUT' method='POST'> <div class='mb-3'> <label for='class'>Class & Medium:</label> 	<input type='text' id='class_sec_edit' class='class_sec_edit form-control' name='class_sec_edit' value='${data.scheduleData[1][0].class_std} STD - ${data.scheduleData[1][0].medium} Medium - ${data.scheduleData[1][0].class_section} Sec' disabled/> <input type='hidden' id='class_sec' class='class_sec form-control' name='class_sec' value='${data.scheduleData[1][0].classroom_id}'/> <span class='error' id='class_error'>Class should not be empty.</span> </div> <div class='mb-3'> <label for='day'>Schedule Day </label> 	<input type='text' id='day_edit' class='day_edit form-control' name='day_edit' value='${day_id}' disabled /> <input type='hidden' id='day' class='day form-control' name='day' value='${day_id}' /> <span class='error' id='day_error'>Please Select a Day.</span> </div> <div class='mb-3'> <label for='schedule_name'>Schedule Template: </label> 	<input type='text' id='schedule_name_edit' class='schedule_name form-control' name='schedule_name' value='${data.scheduleData[0][0].schedule_name}' disabled/> <input type='hidden' id='schedule_name' class='schedule_name form-control' name='schedule_name' value='${data.scheduleData[0][0].id}' /> <span class='error' id='schedule_template_error'>Please Select a Schedule Template.</span> </div> <div class='mb-3' id='schedule_list'>${period_inputs}</div> <div class='mb-3'> <button id='edit_week_schedule' class='btn btn-secondary' type='submit' value='submit'> Update Schedule </button> </div> </form></div> `
            )

            var subject_name = [];
            for (var s = 0; s < data.scheduleData[1].length; s++) {
              subject_name.push(data.scheduleData[1].subject_name);
            }
            $.each(subject_name, (key, value) => {
              $(".subject_option").append(
                `<option value='${data.scheduleData[1][key].subject_id}'>${data.scheduleData[1][key].subject_name}</option>`
              );
            })
        } else {
          $('#edit_week_schedule').attr("disabled", 'disabled');
          $('.edit-weeksched-modal-body').html(function () {
            return (
              `<p>No Periods found with this Schedule. </p><br><p>Possible Issues: You may be loggedout, please login to try again. If you see this message again for this particular Schedule, feel free to delete the schedule and start afresh.</p>`
            );
          })
        }
        $('#editWeekSchedModal').modal('show');
      }, error: function (err) {
        console.log(err);
      }
    })
  })
})

// editing the subjects in edit week schedule modal
// $(document).on('change', "#schedule_name_edit", function () {
//   $(this).focus(function() { 
//     var schedule_temp_id = $("#schedule_name_edit").val();
//     var class_sec_id = $("#class_sec").val();
//     $.ajax({
//       url: "/api/get-periods-from-schedule-template",
//       type: "POST",
//       data: {
//         schedule_temp_id: schedule_temp_id,
//         class_sec_id: class_sec_id,
//       },
//       dataType: "Json",
//       success: function (data) {
//         $("#schedule_name_edit").after(function () {
//           // getting fields
//           var counter = 1;
//           var period = data.periods[0].no_of_periods;
//           var foo = [];
//           for (var i = 1; i <= period; i++) {
//             foo.push(i);
//             $("#schedule_list").html("<p>Schedule Plan</p> <hr />");
//             $.each(foo, (key, value) => {
//               $("#schedule_list").append(
//                 `<input type='hidden' name='period_no_${value}' value='${value}'></input><div id='schedule_main_${value}' class='m-1 row g-3'><div class='col'><label for='period_${value}_sub'>Period ${value}- Subject</label><select data-id='${counter}' id='subject_option period_${value}_sub' class='period_${value}_sub form-control subject_option' name='period_${value}_sub' required><option value=''>Choose a Subject</option></select></div><div class='col'><label for='period_${value}_staff'>Period ${value} - Staff</label><input disabled id='period_${value}_staff subject_staff' type='text' class='${counter} subject_staff period_${value}_staff form-control' placeholder='Choose Staff' name='period_${value}_staff'><input id='period_${value}_staff_hidden subject_staff_hidden' type='hidden' class='${counter}_hidden subject_staff_hidden period_${value}_staff form-control' name='period_${value}_staff_hidden'></div></div>`
//               );
//               counter++;
//             });
//           } // for loop closing. getting subjects dropdown below
//           var subject_name = [];
//           for (var i = 0; i < data.subjects.length; i++) {
//             subject_name.push(data.subjects[i].subject_name);
//           }
//           $.each(subject_name, (key, value) => {
//             $(".subject_option").append(
//               "<option value='" +
//                 data.subjects[key].subject_id +
//                 "'>" +
//                 data.subjects[key].subject_name +
//                 "</option>"
//             );
//           });
//         });
//       },
//       error: function (err) {
//         console.log(err);
//       },
//     });
//   });
// });

// DELETING WEEK SCHEDULE FROM WEEK SCHEDULE LIST - having issue
$(document).ready(function () {
  $('.deleteWeekSched').on('click', function () {
    var day_id_d = $(this).attr('dayta-id');
    var class_sec_id_d = $(this).attr('sec-id');
    $.ajax({
      url: '/api/delete-week-schedule-preiods',
      type: 'POST',
      data: {
        day_id_d: day_id_d,
        class_sec_id_d: class_sec_id_d,
      }, dataType: 'JSON',
      success: function (data) {
          $('.delete-modal-body').html(function () {
          return (
              `<div class='container'>
              <div class='row'>
              <input type='hidden' class='form-control' name='sec_id_hidden' id='sec_id_hidden' value='${class_sec_id_d}' />
              <input type='hidden' class='form-control' name='day_id_hidden' id='day_id_hidden' value='${day_id_d}' />
              <p><b>Do you want to delete, '${data.selectedOne[0].day} Schedule of '${data.selectedOne[0].class_std} Std - ${data.selectedOne[0].medium} Medium ${data.selectedOne[0].class_section} section'?</b></p>
              </div>
              <div class='row'>
              <div class='col-4'></div><div class='col-4'><a role='button' class='btn btn-secondary btn-block' data-bs-dismiss='modal'>Cancel</a></div>
              <div class='col-4'><a href='../dashboard/week-schedule/delete/${day_id_d}/${class_sec_id_d}?_method=DELETE'  role='button' class='btn btn-primary btn-block'>Delete</a></div>
              </div></div>`
            )
          })
          $("#deleteWeekSchedModal").modal("show");
      }, error: function (err){
        console.log(err);
        $('.delete-modal-body').html(function () {
          return (
            `<p>No schedule found</p>`
          )
        })
        $("#deleteWeekSchedModal").modal("show");
      }
  })
})
})

// OPEN edit Class section Modal
$(document).ready(function () {
  $(".editClassSec").on("click", function () {
    var section_id = $(this).attr("data-id");
    $.ajax({
      url: "/api/edit-class-section",
      type: "POST",
      data: {
        section_id: section_id,
      },
      dataType: "Json",
      success: function (data) {
        $(".modal-body").html(function () {
          return `<form id='editclass-form' action='../dashboard/sections/edit/${data.sectionData[0].classsec_id}?_method=PUT' method='POST'><input type='hidden' class='form-control' name='std_id' id='std_id' value='${data.sectionData[0].std_id}' /><input type='hidden' class='form-control' name='classsec_id' id='classsec_id' value='${data.sectionData[0].classsec_id}' /><div class='mb-3'><label for='class_std'>Class Std & Medium :</label><input type='text' class='form-control' name='class_std_edit' id='class_std_edit' placeholder='6 / LKG / UKG etc' value='${data.sectionData[0].class_std} std - ${data.sectionData[0].medium} medium' disabled /></div><div class='mb-3'><label for='section'>Class Section:</label><input id='section_edit' class='form-control' name='section_edit' value='${data.sectionData[0].class_section}'/><span class='error' id='section_edit_error' >Please Enter a section name.</span ></div><div class='mb-3'><label for='class_strength'>Class Strength: </label><input type='number' class='form-control' name='strength_edit' id='strength_edit' placeholder='Class strength in Nos.' value='${data.sectionData[0].students_strength}' /><span class='error' id='strength_edit_error' >Please enter the Class Strength.</span ></div><div class='mb-3'><button class='btn btn-secondary' type='submit' value='submit'> Update </button></div></form>`;
        });
        // show data in the element.
        $("#editClassSecModal").modal("show");
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// Class section GET DELETE Modal
$(document).ready(function () {
  $(".deleteClassSec").on("click", function () {
    var section_id = $(this).attr("data-id");
    $.ajax({
      url: "/api/delete-class-section",
      type: "POST",
      data: {
        section_id: section_id,
      },
      dataType: "Json",
      success: function (data) {
        $(".modal-body").html(function () {
          return (
            `<div class='container'><div class='row'><input type='hidden' class='form-control' name='sec_id_hidden' id='sec_id_hidden' value='${data.secData[0].id}' /><p><b>Do you want to delete '${data.secData[0].class_std} Std - ${data.secData[0].medium} Medium ${data.secData[0].class_section} section'?</b></p></div><div class='row'><div class='col-4'></div><div class='col-4'><a role='button' class='btn btn-secondary btn-block' data-bs-dismiss='modal'>Cancel</a></div><div class='col-4'><a href='../dashboard/sections/delete/${data.secData[0].id}?_method=DELETE' role='button' class='btn btn-primary btn-block'>Delete</a></div></div></div>`
          );
        });
        // show data in the element.
        $("#deleteClassSecModal").modal("show");
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// OPEN edit Subject Class Staff Mapping Modal - having issue
$(document).ready(function () {
  $(".editMapping").on("click", function () {
    var mapping_id = $(this).attr("data-id");
    $.ajax({
      url: "/api/edit-subclassstaff-mapping",
      type: "POST",
      data: {
        mapping_id: mapping_id,
      },
      dataType: "Json",
      success: function (data) {
        if(data.mapData.length > 0) {
        $(".modal-body").html(function () {
          return `<form id='edimapping-form' action='../dashboard/section-subject-staff/edit/${mapping_id}?_method=PUT' method='POST'><input type='hidden' class='form-control' name='map_id' id='map_id' value='${mapping_id}' /><div class='mb-3'><label for='class_std'>Class Std & Medium :</label><select disabled class='class_std_sec_edit form-control' name='class_std_sec_edit' id='class_std_sec_edit'><option value='${data.mapData[0][0].classsec_id}' selected >${data.mapData[0][0].class_std} std - ${data.mapData[0][0].medium} medium - ${data.mapData[0][0].class_section} sec</option></select></div><div class='mb-3'><label for='subject_edit'>Subject: </label><input type='text' class='form-control' name='subject_edit' id='strength_edit' value='${data.mapData[0][0].subject_name}' disabled /><input type='hidden' class='form-control' name='subject_edit_hide' id='strength_edit_hide' value='${data.mapData[0][0].subject_id}' /></div><div class='mb-3'><label for='staff_edit'>Select A Staff:</label><select id='staff_edit' class='form-control' name='staff_edit'><option value='${data.mapData[0][0].prim_id}'>${data.mapData[0][0].primary_staff}</option></select></div>
          <div id='seco_alert' class='mb-3'><label for='sec_staff_edit'>Select Alternative Staff:</label><select id='sec_staff_edit' class='form-control' name='sec_staff_edit'> <option value='${data.mapData[0][0].sec_id}'>${data.mapData[0][0].secondary_staff}</option></select></div>
          <div class='mb-3'><button class='btn btn-secondary' type='submit' value='submit'> Update </button></div></form>`;
        });

        var staffs = [];
        for (let i = 0; i < data.mapData[1].length; i++ ) {
          staffs.push(data.mapData[1][i].username);
        }

        $.each(staffs, (key, value) => {
          $('#staff_edit, #sec_staff_edit').append(
            `<option value='${data.mapData[1][key].id}'>${data.mapData[1][key].username}</option>`
          )
        })

        // $('#staff_edit').on('change', 'select', function (){
        //   var primary = $(this).val();
        //   $(this).find('option[value="' + primary + '"]').attr("selected", "selected");
        // })
        // $('#sec_staff_edit').on('change', 'select', function (){
        //   var secondary = $(this).val();
        //   $(this).find('option[value="' + secondary + '"]').attr("selected", "selected");
        // })

      } else {
        $(".modal-body").html(function () {
          return (
            `<p>No data found</p>`
          )
        })
      }
        $("#editMappingModal").modal("show");
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// edit mapping modal on change of staff = sec_staff alert warning
// $(document).on('change', '#staff_edit, #sec_staff_edit', function () {
//   var primary = $('#staff_edit').find('option:selected').val();
//   var secondary = $('#sec_staff_edit').find('option:selected').val();
//   if(primary == secondary){
//     $('#seco_alert').addClass('alert alert-warning');
//     $('#seco_alert').append(`<p id='error_staff'>Primary and secondary staff can not be the same.</p>`);
//   } else {
//     $('#seco_alert').removeClass('alert alert-warning');
//     $('#error_staff').remove();
//   }
// })

// fetching staff and subject for chosen class section - mapping edit - having issue
$(document).on("click", ".class_std_sec_edit", function () {
  var school_id = $("#school_id").val();
  var class_sec = $(this).val();
  $.ajax({
    url: "/api/get-staff-subject-from-class-sec",
    type: "POST",
    data: {
      school_id: school_id,
      class_sec: class_sec,
    },
    dataType: "JSON",
    success: function (data) {
      var class_sec_drop = [];
      for (var i = 0; i < data.classDrop.length; i++) {
        class_sec_drop.push(data.classDrop[i].id);
      }
      $.each(class_sec_drop, (key, value) => {
        $("#class_std_sec_edit").append(
          `<option value='${data.classDrop[key].id}'>${data.classDrop[key].class_std} std - ${data.classDrop[key].medium} medium - ${data.classDrop[key].class_section} sec </option>`
        );
      });
    },
    error: function (err) {
      console.log(err);
    },
  });
});

// delete modal for mapping
$(document).ready(function () {
  $(".deleteMapping").on("click", function () {
    var map_id = $(this).attr("data-id");
    $.ajax({
      url: "/api/delete-mapping",
      type: "POST",
      data: {
        map_id: map_id,
      },
      dataType: "Json",
      success: function (data) {
        $(".modal-body").html(function () {
          return `<div class='container'><div class='row text-center'><input type='hidden' class='form-control' name='map_id_hidden' id='map_id_hidden' value='${data.mappedData[0].id}' /><p class='mb-3'><b>Do you want to delete?</p><p class='mb-3'>${data.mappedData[0].class_std} STD - ${data.mappedData[0].medium} Medium - ${data.mappedData[0].class_section} Section 's</p><p class='mb-3'><h6>${data.mappedData[0].subject_name} Subject & Faculty. ${data.mappedData[0].name}'s bonding ?</h6></p></div><div class='row'><div class='col-4'></div><div class='col-4'><a role='button' class='btn btn-secondary btn-block' data-bs-dismiss='modal'>Cancel</a></div><div class='col-4'><a href='../dashboard/section-subject-staff/delete/${data.mappedData[0].id}?_method=DELETE' role='button' class='btn btn-primary btn-block'>Delete</a></div></div></div>`;
        });
        // show data in the element.
        $("#deleteMappingModal").modal("show");
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// data tables
$(document).ready(function () {
  $("#schedule").DataTable();
});

// multi select option
$(document).ready(function() {
  $('.js-example-basic-multiple').select2();
});

// Password Reset student Account Modal for School Login
$(document).ready(function () {
  $(".pwdStudAcc").on("click", function () {
    var student_id = $(this).attr("data-id");
    $.ajax({
      url: "/api/get-edit-student-account",
      type: "POST",
      data: {
        student_id: student_id,
      },
      dataType: "Json",
      success: function (data) {
        $(".modal-body").html(function () {
          return (
            "<div class='container'><div class='row'><input type='hidden' class='form-control' name='student_id_hidden' id='student_id_hidden' value='" +
            data.studData[0].id +
            "' /><p><b>Do you want to RESET PASSWORD for '" +
            data.studData[0].username +
            "'s account'?</b></p><small>The Student will be notified to his/her Email id: <b>" +
            data.studData[0].email +
            "</b></small><br></div><div class='row mt-2'><div class='col-2'></div><div class='col-5'><a role='button' class='btn btn-secondary' data-bs-dismiss='modal'>Cancel</a></div><div class='col-5'><form id='resetpwd-form' action='../dashboard/students/edit/" +
            data.studData[0].id +
            "?_method=PUT' method='POST'><button class='btn btn-primary' type='submit' value='submit'>RESET PASSWORD</button></form></div></div></div>"
          );
        });
        // show data in the element.
        $("#pwdStudAccModal").modal("show");
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// Edit student Account Modal for School Login
$(document).ready(function () {
  $(".editStudAcc").on("click", function () {
    var student_id = $(this).attr("data-id");
    $.ajax({
      url: "/api/get-edit-student-account",
      type: "POST",
      data: {
        student_id: student_id,
      },
      dataType: "Json",
      success: function (data) {
        $(".edit-modal-body").html(function () {
          return (
            `<div class='container'>
            <div class='row'><input type='hidden' class='form-control' name='user_id_hidden' id='user_id_hidden' value='${data.studData[0].id}' /><p><b>Update Status for '${data.studData[0].username} 's account'?</b></p></div>
            <div class='row'>
            <form id='editstu-form' action='../dashboard/students/edit/${data.studData[0].id}?_method=PUT' method='POST'>
            <div class='mb-3'><label for='status'>Student Status:</label><select id='status_edit' class='form-control' name='status_edit'><option value='${data.studData[0].status}'>${data.studData[0].status}</option><option value='Active'>Active</option><option value='Inactive'>Inactive</option></select></div>
            <div class='mb-3'><a role='button' class='btn btn-secondary btn-block' data-bs-dismiss='modal'>Cancel</a> <button class='btn btn-primary' type='submit' value='submit'>Update</button></div>
            </form>
            </div></div>`
          );
        });
        // show data in the element.
        $("#editStudAccModal").modal("show");
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// get Delete Modal for Student ACCOUNTS by School
$(document).ready(function () {
  $(".deleteStudAcc").on("click", function () {
    var student_id = $(this).attr("data-id");
    $.ajax({
      url: "/api/delete-student-account",
      type: "POST",
      data: {
        student_id: student_id,
      },
      dataType: "Json",
      success: function (data) {
        $(".delete-modal-body").html(function () {
          return (
            `<div class='container'>
            <div class='row'><input type='hidden' class='form-control' name='user_id_hidden' id='user_id_hidden' value='${data.studLogin[0].id}' /><p><b>Do you want to delete '${data.studLogin[0].username}'s account'?</b></p></div>
            <div class='row'>
            <form id='delstu-form' action='../dashboard/students/delete/${data.studLogin[0].id}?_method=DELETE' method='POST'>
            <div class='mb-3'><label for='status'>Want to change status as well?</label><select id='status_edit' class='form-control' name='status_edit'><option value='${data.studLogin[0].status}'>${data.studLogin[0].status}</option><option value='Active'>Active</option><option value='Inactive'>Inactive</option></select></div>
            <div class='mb-3'><a role='button' class='btn btn-secondary btn-block' data-bs-dismiss='modal'>Cancel</a> <button class='btn btn-primary' type='submit' value='submit'>Delete</button></div>
            </form>
            </div></div>`
          );
          
        });
        // show data in the element.
        $("#deleteStudAccModal").modal("show");
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// Edit PARENT Account Modal for School Login
$(document).ready(function () {
  $(".editParAcc").on("click", function () {
    var parent_id = $(this).attr("data-id");
    $.ajax({
      url: "/api/get-parent-account-data",
      type: "POST",
      data: {
        parent_id: parent_id,
      },
      dataType: "Json",
      success: function (data) {
        $(".edit-modal-body").html(function () {
          return (
            `<div class='container'>
            <div class='row'><input type='hidden' class='form-control' name='user_id_hidden' id='user_id_hidden' value='${data.parData[0].id}' /><p><b>Update Status for '${data.parData[0].username} 's account'?</b></p></div>
            <div class='row'>
            <form id='editpar-form' action='../dashboard/parents/edit/${data.parData[0].id}?_method=PUT' method='POST'>
            <div class='mb-3'><label for='status'>Parent Status:</label><select id='status_edit' class='form-control' name='status_edit'><option value='${data.parData[0].status}'>${data.parData[0].status}</option><option value='Active'>Active</option><option value='Inactive'>Inactive</option></select></div>
            <div class='mb-3'><a role='button' class='btn btn-secondary btn-block' data-bs-dismiss='modal'>Cancel</a> <button class='btn btn-primary' type='submit' value='submit'>Update</button></div>
            </form>
            </div></div>`
          );
        });
        // show data in the element.
        $("#editParAccModal").modal("show");
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// showing modal to map children with parent
$(document).ready(function(){
  $(".mapParAcc").on("click", function () {
    var parent_id = $(this).attr("data-id");
    $.ajax({
      url: "/api/get-parent-account-mapped-data",
      type: "POST",
      data: {
        parent_id: parent_id,
      },
      dataType: "Json",
      success: function (data) {
        $(".modal-body").html(function () {
          
          return (
            `<div class='container'>
            <div class='row'><input type='hidden' class='form-control' name='user_id_hidden' id='user_id_hidden' value='${data.parMapData[0][0].id}' /><p><b>Let Ms./Mr. ${data.parMapData[0][0].username} to track following students</b></p></div>
            <div class='row'>
            <form id='editpar-form' action='../dashboard/parents/map/${data.parMapData[0][0].id}?_method=PUT' method='POST'>
            <div class='mb-3' id='previously_mapped'><label for='status'>Earlier Mapped Students:</label>
            <select id='mapped_students_edit' class='js-example-basic-multiple js-example-responsive form-control' name='mapped_students_edit[]' multiple='multiple'></select>
            <select id='mapped_students_old_hide' class='js-example-basic-multiple js-example-responsive form-control' name='mapped_students_old_hide[]' multiple='multiple'></select>
            </div>
            <div class='mb-3' ><label for='status'>Add New Students:</label>
            <select id='map_students_edit' class='js-example-basic-multiple form-control' name='map_students_edit[]' multiple='multiple'></select></div>
            <div class='mb-3'><a role='button' class='btn btn-secondary btn-block' data-bs-dismiss='modal'>Cancel</a> <button class='btn btn-primary' type='submit' value='submit'>Update</button></div>
            </form>
            </div></div>`
          );
        })

        // showing previosuly mapped students here
        if (data.parMapData[1].length > 0){
          var full_data = [];
          var mapped = "";
          $.each(data.parMapData[1], function(key, value){
            $('#mapped_students_edit, #mapped_students_old_hide').append(
              `<option value='${value.ml_student_id}' selected="selected" >${value.student_name}</option>`
            )
          })
        } else {
          $('#previously_mapped').remove();
        }
        
        if (data.parMapData[2].length > 0) {
          $.each(data.parMapData[2], function(key, value){
            $('#map_students_edit').append(
              `<option value='${value.student_id}'>${value.student_name}</option>`
            )
          })
        } else {
          $('#map_students_edit').append(
            `<option disabled value=''>No student found</option>`
          )
        }
        
        // show data in the element.
        $("#mapParAccModal").modal("show");
        $("#mapped_students_edit").select2({
          dropdownParent: $('#mapParAccModal'), width: '100%'
        });
        $("#map_students_edit").select2({
          dropdownParent: $('#mapParAccModal'), width: '100%'
        });
      }, error: function (err){
        console.log(err)
      }
    })
  })
})

$(document).ready(function () {
  $('#mapParAccModal').on('shown.bs.modal', function () {
    $('#mapped_students_old_hide').hide();
  })
})

// $(document).ready(function() {
//   $('#mapped_students_edit').select2({
//       dropdownParent: $('#mapParAccModal')
//   });
// });

// get Delete Modal for PARENT ACCOUNTS by School
$(document).ready(function () {
  $(".deleteParAcc").on("click", function () {
    var parent_id = $(this).attr("data-id");
    $.ajax({
      url: "/api/get-parent-account-data",
      type: "POST",
      data: {
        parent_id: parent_id,
      },
      dataType: "Json",
      success: function (data) {
        $(".delete-modal-body").html(function () {
          return (
            `<div class='container'>
            <div class='row'><input type='hidden' class='form-control' name='user_id_hidden' id='user_id_hidden' value='${data.parData[0].id}' /><p><b>Do you want to delete '${data.parData[0].username}'s account'?</b></p></div>
            <div class='row'>
            <form id='delpar-form' action='../dashboard/parents/delete/${data.parData[0].id}?_method=DELETE' method='POST'>
            <div class='mb-3'><label for='status'>Want to change status as well?</label><select id='status_edit' class='form-control' name='status_edit'><option value='${data.parData[0].status}'>${data.parData[0].status}</option><option value='Active'>Active</option><option value='Inactive'>Inactive</option></select></div>
            <div class='mb-3'><a role='button' class='btn btn-secondary btn-block' data-bs-dismiss='modal'>Cancel</a> <button class='btn btn-primary' type='submit' value='submit'>Delete</button></div>
            </form>
            </div></div>`
          );
          
        });
        // show data in the element.
        $("#deleteParAccModal").modal("show");
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// delete schedule template from school login
$(document).ready(function () {
  $('.deleteSchedTemp').on('click', function() {
    var sched_tempid = $(this).attr('data-id');
    $.ajax({
      url: '/api/get-schedule-template-data',
      type: 'POST',
      data: {
        sched_tempid: sched_tempid,
      }, dataType: 'JSON',
      success: function (data){
        $('.delete-modal-body').html(function (){
          return (
            `<div class='container'>
            <div class='row'><input type='hidden' class='form-control' name='schedtemp_id_hidden' id='schedtemp_id_hidden' value='${data.tempData[0].id}' /><p><b>Do you want to delete '${data.tempData[0].schedule_name}' Template ?</b></p></div>
            <div class='row'>
            <form id='delschedtemp-form' action='../dashboard/schedule-plan/delete/${data.tempData[0].id}?_method=DELETE' method='POST'>
            <div class='mb-3'><a role='button' class='btn btn-secondary btn-block' data-bs-dismiss='modal'>No</a> <button class='btn btn-primary' type='submit' value='submit'>Yes</button></div>
            </form>
            </div></div>`
          )
        })
        $('#deleteSchedTempModal').modal("show");
      }, 
      error: function (err) {
        console.log(err);
      }, 
      zero: function () {
        $('.delete-modal-body').html(function (data){
          return `<p>${data.text}<p>`
        })
        $('#deleteSchedTempModal').modal("show");
      }
    })
  })
})

// student asking doubt to his / her staff
$(document).ready(function() {
  $('.chatbutton').on('click', function () {
    var staff_selected = $(this).attr('data-id');
    $.ajax({
      url: '/api/student-ask-doubt',
      type: 'POST',
      data: {
        staff_selected: staff_selected,
      }, dataType: 'JSON',
      success: function (data) {
        $('.chat-modal-body').html(function () {
          return (
            `<div class='container'>
            <div class='row'><p><b>Sending Message to: ${data.staff[0].name}</b></p></div>
            <div class='row'>
            <form id='editpar-form' action='../dashboard/ask-new-doubt/${data.staff[0].staff_id}' method='POST'>
            <div class='mb-3'><label for='status'>Doubt Title:</label>
            <input type='text' class='form-control' name='doubt_title' id='doubt_title' />
            <div class='mt-3 mb-3'><label for='status'>Describe it:</label>
            <textarea class='form-control' name='doubt_desc' id='doubt_desc' rows='5'></textarea>
            </div>
            <div class='mb-3'><a role='button' class='btn btn-secondary btn-block' data-bs-dismiss='modal'>Cancel</a> <button class='btn btn-primary' type='submit' value='submit'>Send</button></div>
            </form>
            </div></div>`
          )
        })
        $('#chatbuttonModal').modal('show');
      }, error: function (err) {
        console.log(err);
      }
    })
  })
})

// student / staff replying to the doubt and creating thread.
$(document).on('click', '.seeThreadButton, .replybutton', function () {
  var doubt_ref = $(this).attr('data-id');
  $('#doubt_'+doubt_ref).after(function () {
    $('#thread_doubt_'+doubt_ref).remove();
    $('#new-doubt-thread-form').remove();
    $('.no-thread').remove();
    return (
      `<div class='m-2 row alert alert-secondary' id='new-doubt-thread-form'> <form id='doubtthread-form' method='POST' action='../dashboard/add-doubt-thread-message'> <input type='hidden' class='form-control' name='doubt_id' id='doubt_id' value='${doubt_ref}' /><p>Replying</p> <hr /> <div class='mt-3 mb-3'> <textarea class='form-control' name='reply_msg' placeholder='Type your reply' id='reply_msg' rows='2' ></textarea> <span class='error' id='reply_msg' >Reply message should not be blank.</span > </div> <div class='mb-3'> <label for='doubt_status'>Make the thread:</label> <select id='doubt_status' name='doubt_status' class='form-control' required> <option value=''>Select an Option</option> <option value='open'>Open</option> <option value='closed'>Closed</option> </select> </div> <div class='login'> <button class='btn btn-secondary' type='submit'> Send </button> </div> </form> </div>`
    )
  })
})

// student / staff seeing the messages thread
$(document).on('click', '.seeThreadButton', function() {
  var doubt_ref = $(this).attr('data-id');
  var asked_by = $(this).attr('who_is');
  var logged_in = $(this).attr('who_logged_in')
  console.log(logged_in);
  console.log(asked_by);
  $.ajax({
    url: '/api/see-doubt-threads',
    type: 'POST',
    data: {
      doubt_ref: doubt_ref,
    }, dataType: 'JSON',
    success: function (data) {
      $('#doubt_'+doubt_ref).after(function () {
        $('#new-doubt-thread-form').remove();
        $('#unread_doubt_'+doubt_ref).remove();
        $('#doubt_box_'+doubt_ref).append(
          `0 Unread`
        )
        var doubt_thread = "";
        if(data.threadMsg.length > 0){
          $.each(data.threadMsg, function (key, value) {
            if(data.threadMsg[key].message_by == asked_by && logged_in == asked_by) {
              let message = `<div class='text-end text-white bg-primary bg-gradient alert alert-secondary'><b>${data.threadMsg[key].message}</b><br><small><i>sent by: ${data.threadMsg[key].stu_name}</i></small></div>`
              doubt_thread = doubt_thread + message;
            } else if(data.threadMsg[key].message_by == asked_by && logged_in != asked_by){ 
              let message = `<div class='text-start text-dark bg-light bg-gradient alert alert-secondary'><b>${data.threadMsg[key].message}</b><br><small><i>sent by: ${data.threadMsg[key].stu_name}</i></small></div>`
              doubt_thread = doubt_thread + message;
            } else if (data.threadMsg[key].message_by != asked_by && logged_in == data.threadMsg[key].message_by){ 
              let message = `<div class='text-end text-white bg-primary bg-gradient alert alert-secondary'><b>${data.threadMsg[key].message}</b><br><small><i>sent by: ${data.threadMsg[key].staff_name}</i></small></div>`
              doubt_thread = doubt_thread + message;
            } else if (data.threadMsg[key].message_by != asked_by && logged_in != data.threadMsg[key].message_by){
              let message = `<div class='text-start text-dark bg-light bg-gradient alert alert-secondary'><b>${data.threadMsg[key].message}</b><br><small><i>sent by: ${data.threadMsg[key].staff_name}</i></small></div>`
              doubt_thread = doubt_thread + message;
            } 
          })
        } else {
          $('.no-thread').remove();
          return (`<p class='no-thread alert alert-warning text-dark m-3'>No messages found.</p>`)
        }
        return (
          `<div class='container' id='thread_doubt_${doubt_ref}'><div class='row mt-3'>${doubt_thread}</div><div class='row alert alert-secondary' id='new-doubt-thread-form'> <form id='doubtthread-form' method='POST' action='../dashboard/add-doubt-thread-message'> <input type='hidden' class='form-control' name='doubt_id' id='doubt_id' value='${doubt_ref}' /><p>Replying</p> <hr /> <div class='mt-3 mb-3'> <textarea class='form-control' name='reply_msg' placeholder='Type your reply' id='reply_msg' rows='2' ></textarea> <span class='error' id='reply_msg' >Reply message should not be blank.</span > </div> <div class='mb-3'> <label for='doubt_status'>Make the thread:</label> <select id='doubt_status' name='doubt_status' class='form-control' required> <option value=''>Select an Option</option> <option value='open'>Open</option> <option value='closed'>Closed</option> </select> </div> <div class='login'> <button class='btn btn-secondary' type='submit'> Send </button> </div> </form></div></div>`
        )
      })
    }, error: function (err) {
      console.log(err);
    }
  })
})

// reduce the message count by click event

// Add attendance - Dynamically removing students from options
// $(document).ready(function () {
//   $('#absent_stu').on('change', function () {
//     var absentees = $(this).val(); // array
//     if (absentees.length > 0) {
//       $.each(absentees, function (key, value){
//         $('#leave_informed_stu, #on_duty_stu').find("option[value='" + value + "']").attr('disabled', 'disabled');
//       })
//     } else {
//       $('#leave_informed_stu, #on_duty_stu').find("option").removeAttr('disabled');
//     }
//   })
// })

// $(document).on('change', '#leave_informed_stu', function () {
//   var leave_today = $('#leave_informed_stu').val();
//   if(leave_today.length > 0) {
//     $.each(leave_today, function (key, value) {
//       $('#absent_stu, #on_duty_stu').find("option[value='" + value + "']").attr('disabled', 'disabled');
//     })
//   } else {
//     $('#absent_stu, #on_duty_stu').find("option").removeAttr('disabled');
//   }
// })

// $(document).on('change', '#on_duty_stu', function () {
//   var on_duty = $('#on_duty_stu').val();
//   if(on_duty.length > 0){
//     $.each(on_duty, function (key, value) {
//       $('#absent_stu, #leave_informed_stu').find("option[value='" + value + "']").attr('disabled', 'disabled');
//     })
//   }else {
//     $('#absent_stu, #leave_informed_stu').find("option").removeAttr('disabled');
//   }
// })

$(document).ready(function () {
  $('#present_student_div').hide();
  $('#absent_stu, #leave_informed_stu, #on_duty_stu').on('change', function () {
    var absentees = $("#absent_stu").val();
    var leave_informed = $("#leave_informed_stu").val();
    var onduties = $("#on_duty_stu").val();

    $('#leave_informed_stu, #on_duty_stu, #absent_stu').find("option").removeAttr('disabled');

    $.each(absentees, (key, value) => {
      $('#leave_informed_stu, #on_duty_stu').find("option[value='" + value + "']").attr('disabled', 'disabled');
      $('#present_students').find("option[value='" + value + "']").remove();
    })
    $.each(leave_informed, (key, value) => {
      $('#absent_stu, #on_duty_stu').find("option[value='" + value + "']").attr('disabled', 'disabled');
      $('#present_students').find("option[value='" + value + "']").remove();
    })
    $.each(onduties, (key, value) => {
      $('#leave_informed_stu, #absent_stu').find("option[value='" + value + "']").attr('disabled', 'disabled');
      $('#present_students').find("option[value='" + value + "']").remove();
    })

  })
})