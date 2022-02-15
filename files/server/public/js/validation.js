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

// DELETE BATCH - Open Modal id deleteBatchModal
$(document).ready(function () {
  $('.deleteBatch').on('click', function () {
    var batch_id = $(this).attr('data-id');
    $.ajax({
      url: '/api/get-batch-data-by-id',
      type: 'POST',
      data: {
        batch_id: batch_id,
      }, dataType: 'JSON',
      success: function (data){
        // do
        $('.delete-batch-modal-body').html(function () {
          return (
            `<div class='container'><div class='row'><input type='hidden' class='form-control' name='batch_id_hidden' id='batch_id_hidden' value='${batch_id}' /><p class='text-center mt-3 mb-3'><b>Do you want to delete '${data.batch[0].batch_name}'?</b></p></div><div class='row mb-3'><div class='col-4'></div><div class='col-4'><a role='button' class='btn btn-secondary btn-block' data-bs-dismiss='modal'>Cancel</a></div><div class='col-4'><a href='../dashboard/batch/delete/${data.batch[0].id}?_method=DELETE' role='button' class='btn btn-primary btn-block'>Delete</a></div></div></div>`
          )
        })
        $('#deleteBatchModal').modal('show');
      }, error: function (err) {
        console.log(err);
      }
    })
  })
})

// Add Class std, dynamic fields
$(document).ready(function () {
  $('#class_std, #batch_id, #medium, #academic_month').on('change', function () {
    var batch_id = $('#batch_id').val();
    var class_std = $('#class_std').val();
    if(class_std > 11){
      $('#class_std_dyna').before(function () {
        $('#std_error').remove();
        $('#add_fee_struc').attr('disabled', 'disabled');
        return(`<p class='alert alert-danger' id='std_error'>Could not add more than 11 th standard.</p>`);
      })
    } else {
      $('#add_fee_struc').removeAttr('disabled');
      $('#std_error').remove();
    }
    var medium = $('#medium').val();
    var acmf = $('#academic_month').val();
    var academic_month_f = +acmf;
    $.ajax({
      url: '/api/get-batch-data-by-id',
      type: 'POST',
      data: {
        batch_id: batch_id,
      }, dataType: 'JSON',
      success: function (data) {
        let academic_month_e, year_correction;
        if(academic_month_f != 0){
          let sum = academic_month_f + 11;
          if(sum <= 12){
            academic_month_e = sum;
            year_correction = 0
          } else {
            academic_month_e = sum - 12;
            year_correction = 1;
          }
        }
        let class_std_row = ""
        let class_stdd = 0
        let cc = parseInt(class_std); // 5
        for (let i = data.batch[0].year_from; i < data.batch[0].year_to; i++) {

        class_stdd = `${i}` == `${data.batch[0].year_from}` ? cc : class_stdd+1
          
           class_std_row += `<tr id='${i}'>
            <th><input type="number" class="form-control class_std" name="class_std_${i}" id="class_std_${i}" value = "${class_stdd}" disabled/><input type="hidden" class="form-control class_std" name="class_std_hide_${i}" id="class_std_${i}" value = "${class_stdd}"/></th>
            <td class='text-center'>${medium}</td>
            <td><input type="number" class="form-control" name="fee_${i}" id="fee_${i}" placeholder="Rs / Year" required/></td>
            <td>
            <input
                        type="hidden"
                        name="std_year_${i}"
                        placeholder="MM - YYYY" 
                        value="${i}"
                      />
            <input
                        type="text"
                        class="form-control"
                        name="academic_from_${i}"
                        id="academic_from"
                        placeholder="MM - YYYY" 
                        value="${academic_month_f}-${i}" disabled
                      />
            <input
                      type="hidden"
                      class="form-control"
                      name="academic_from_hide_${i}"
                      id="academic_from"
                      value="${academic_month_f}-${i}"
                    />
            </td>
            <td>
            <input
                        type="text" disabled
                        class="form-control"
                        name="academic_to_${i}"
                        id="academic_to"
                        placeholder="MM - YYYY"
                        value="${academic_month_e}-${i+year_correction}"
                      />
            <input
                      type="hidden"
                      class="form-control"
                      name="academic_to_hide_${i}"
                      id="academic_to"
                      value="${academic_month_e}-${i+year_correction}"
                    />
            </td>
            </tr>`
        }
        
        $('#class_std_dyna').after(function () {
          $('.class_std_batch').remove();
          return (
            `<div class='class_std_batch'><div class='border border-success rounded p-3'><b>This Batch will consist of ${data.batch[0].year_to - data.batch[0].year_from} Class standard(s). You are required to fill all the ${data.batch[0].year_to - data.batch[0].year_from} row(s) to create new class standard.</b></div><table class='table table-light text-center mt-3 mb-3'><thead><tr><th width="200px">Class Std</th><th width="200px">Medium</th><th width="200px">Fees</th><th width="200px">Academic Year (From)</th><th width="200px">Academic Year (To)</th></tr></thead><tbody><input
                    type="hidden"
                    name="year_from"
                    id="year_from"
                    value="${data.batch[0].year_from}"
                  /><input
                  type="hidden"
                  name="year_to"
                  id="year_to"
                  value="${data.batch[0].year_to}"
                />
            ${class_std_row}</tbody></table></div>`
          )
        })
        
      }, error: function (err) {
        console.log(err);
      }
    })
  })
})

// checking duplicate entry in class_std
$(document).on('change', '#class_std, #batch_id, #medium, #academic_month', function () { 
  var batch_id = $('#batch_id').val();
  var class_std = $('#class_std').val();
  var medium = $('#medium').val();
  $.ajax({
    url: '/api/get-fee-structure-data',
    type: 'POST', 
    data: {
      batch_id: batch_id,
      class_std: class_std,
      medium: medium,
    }, dataType: 'JSON',
    success: function (data) {
      if(data.foundFee.length > 0){
        $('.class_std_batch, .class_duplicate').remove();
        $('#add_fee_struc').attr('disabled', 'disabled');
        $('#class_std_dyna').after(function () {
          return (
            `<p class="alert alert-danger class_duplicate">Class Standard already exists.</p>`
          )
        })
      } else {
        $('.class_duplicate').remove();
        $('#add_fee_struc').removeAttr('disabled');

      }
    }, error: function (err) {
      console.log(err);
    }
  })
})

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
$(document).on("change", "#class_medium_newad", function () {
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
        $(".student_type").after(function () {
          return (
            `<div class='mb-3' id='fee-one'><label>Fee Amount:</label><input type='number' class='form-control' name='actual_fee' id='actual_fee' value='${data.class_fee}'disabled /><input type='hidden' class='form-control' name='actual_fee_hide' id='actual_fee_hide' value='${data.class_fee}'/></div><div class='mb-3' id='fee-two'><label>Amount Paying:</label><input type='number' class='form-control' name='fee_paying' id='fee_paying' placeholder='Amount Paying:' max=${data.class_fee}><span class='error' id='fee_paying_error'>Please enter the amount.</span></div>`
          );
        });
      },
      error: function (err) {
        console.log(err);
      },
    });
});

// getting student Type Admission / Academic Fee payment
$(document).ready(function () {
  $('#stuId').on('keyup', function () {
    var student_id = $("#stuId").val();
    $.ajax({
      url: '/api/get-student-type',
      type: 'POST', 
      data: {
        student_id: student_id,
      }, dataType: 'JSON',
      success: function (data) {
        if(data.studentType[0].count != 0) {
          $('.student_type').remove();
          $('#new_enrollment').after(function () {
            return (
              `<p class="border border-warning m-2 text-center display-6 student_type" id="student_old" data-id="student_old">Enrolled Student</p>`
            )
          })
         } else {
          $('.student_type').remove();
          $('#new_enrollment').after(function () {           return (
              `<div class='student_type'><p class="border border-success m-2 text-center display-6" id="student_new" data-id="student_new"><i class="fas fa-smile-plus"></i> New Student</p>
              <div class="mt-3 mb-3" id="select_class">
              <label for="class_medium">Select Class:</label>
              <select id="class_medium_newad" class="form-control" name="class_medium" required ></select>
              <span class="error" id="class_medium_error"
                >Please choose Class & medium.</span
              >
            </div>
            <div class="mb-3">
            <label for='class_section_newad'>Choose A Section</label>
              <select
                id="class_section_newad"
                class="form-control"
                name="class_section"
                required
              ></select>
              <span class="error" id="class_medium_error"
                >Please choose Class & medium.</span
              >
            </div></div>
              `
            )
          })
        }
      }, error: function (err) {
        console.log(err);
      }
    })
  })
})

// dynamic select opption based on selected option in HTML form
$(document).on("change", "#class_medium_newad", function () {
    var class_medium = $('#class_medium_newad').val();
    console.log(class_medium);
    $.ajax({
      url: "/api/get-class-sections",
      type: "POST",
      data: {
        class_id: class_medium,
      },
      dataType: "json",
      success: function (result) {
        $("#class_section_newad").html(
          '<option value="">Select Class Section here.</option>'
        );
        $.each(result.class_secs, function (key, value) {
          $("#class_section_newad").append(
            `<option value="${value.id}">${value.class_section} Sec (${value.batch_name}) | ${value.seats_free} Seats Left </option>`
          );
        });s
      },
      error: function (err) {
        console.log(err);
      },
    });
});

// getting fee data from the student admission
$(document).on("change", "#stuId, #academic_year, #class_medium", function () {
  var student_id = $("#stuId").val();
  var academic = $("#academic_year").val();
  var class_med = $("#class_medium").val();
  var student_type = $('.student_type').data('id');
  $("#fee_earlier").val("");
  if(student_type == 'student_old'){
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
          $('.form-group').remove();
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
  } else {
    var current_year = $('#current_year').val();
    $.ajax({
      url: '/api/get-class-medium-for-current-year',
      type: 'POST',
      data: {
        current_year: current_year,
      }, dataType: 'JSON',
      success: function (data) {
        let class_med_options = `<option value="">Class Std & Medium:</option>`;
        if(data.classMediums.length > 0){
          $('#class_medium_newad').removeAttr('disabled');
          $('.no_class_alert').remove();
            for (let i=0; i < data.classMediums.length; i++){
              let clo = `<option value="${data.classMediums[i].id}">${data.classMediums[i].class_std} STD - ${data.classMediums[i].medium} Medium (${data.classMediums[i].batch_name})</option>`
              class_med_options += clo;
            }
            $('#class_medium_newad').append(`${class_med_options}`)
        } else {
          $('#class_medium_newad').attr('disabled', 'disabled').after(
            `<small class='alert alert-warning no_class_alert'>No class standard found</small>`
          )
        }
      }, error: function (err) {
        console.log(err);
      }
    })
  }
});

// Dynamic getting student data for fee due module from admission table
$(document).ready(function () {
  $('#stuId_due').on('change', function () {
    var student_id = $("#stuId_due").val();   
    $.ajax({
      url: '/api/get-academic-year-for-id',
      type: 'POST',
      data: {
        student_id, student_id,
      }, dataType: 'JSON',
      success: function (data) {
        // do stuff
        $('#student_id_due').after(function () {
          let year_options = "";
          if (data.academics.length > 0) {
            for (let i=0; i < data.academics.length; i++ ) {
              var option = `<option value='${data.academics[i].academic_year}'>${data.academics[i].academic_year}</option>`
              year_options += option;
            }
          } else {
            year_options;
          }
          $('#academic_year_div').remove();
          return (`<div class='mt-1 mb-3' id='academic_year_div'><label for='academic_year'>Academic Year: </label><select id='academic_year' class='form-control' name='academic_year'><option value=''>Select Year</option>${year_options}</select></div>`)
        })
      }, error: function (err) {
        console.log(err);
      }
    })
  })
})

// fee due collection
$(document).on("change", "#academic_year", function () {
  var student_id = $("#stuId_due").val();
  var academicYear = $("#academic_year").val();
  $.ajax({
    url: "/api/get-student-enrollment-data",
    type: "POST",
    data: {
      stuId: student_id,
      academicYear: academicYear,
    },
    dataType: "Json",
    success: function (result) {
      $("#academic_year").after(function () {
        var max_amount = result.actual_fee - result.earlier_paid;
        $("#student_enroll_data").remove();
        return (
          `<div class='student_enroll_data' id='student_enroll_data'>            <div class='mt-3 mb-3'><label for='name'>Student Name: </label><input type='text' class='form-control' name='name' id='name' placeholder='Student Name' disabled value='${result.student_name}' /> </div>                <div class='row g-3 mb-3'> <div class='col'> <label for='name'>Student Email ID: </label> <input type='email' class='form-control' name='email' id='email' placeholder='Email ID:' disabled value='${result.student_email}' /> </div> <div class='col'> <label for='name'>Student Mobile No: </label> <input type='tel' class='form-control' placeholder='Mobile Number:' name='mobile' id='mobile' disabled value='${result.student_mobile}' /> </div> </div>                                 <div class='mb-3'> <label for='class_medium'>Class & Medium: </label> <input type='text' id='class_medium' class='form-control' name='class_medium' disabled value='${result.class_std} std - ${result.class_med} medium' /> </div>                 <div class='mb-3'><label for='class_section'>Class section: </label> <input type='text' id='class_section' class='form-control' name='class_section' disabled value='${result.class_sec} Section' /> </div>                <div class='mb-3'><label for='course_fee' >Actual fee:</label><input type='number' class='form-control' name='course_fee_disabled' id='course_fee_disabled' value='${result.actual_fee}' disabled /><input type='hidden' class='form-control' name='course_fee' id='course_fee' value='${result.actual_fee}' /></div>                <div class='mb-3'><label for='paid_fee' >Amount Paid so far:</label><input type='number' class='form-control' name='paid_fee' id='paid_fee' value='${result.earlier_paid}' disabled /><input type='hidden' class='form-control' name='paid_fee_hide' id='paid_fee_hide' value='${result.earlier_paid}' /></div>                <div class='mb-1'><label for='paying_fee'>Amount Paying now:</label><input type='number' class='form-control' name='paying_fee' id='paying_fee' min='0' max='${max_amount}' /></div>                <input type='hidden' id='admission_id' name='admission_id' value='${result.admission_id}'></div>`
        );
      });
    },
    error: function (err) {
      console.log("No Student found.");
    },
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
          // var fetched_medium = ;
          // $("#medium_edit").val(fetched_medium);

          return (
            `<form id='editclass-form' action='../dashboard/fee-structure/edit/${data.feeRow[0].id}?_method=PUT' method='POST'><input type='hidden' class='form-control' name='fee_id' id='fee_id' value='${data.feeRow[0].id}' /><div class='mb-3'><label for='batch_id'>Batch:</label><input type='text' class='form-control' name='batch_id_edit_disa' id='batch_id_edit_disa' value='${data.feeRow[0].batch_name}' disabled /><input type='hidden' class='form-control' name='batch_id_edit' id='batch_id_edit' value='${data.feeRow[0].batch_id}' /></div><div class='mb-3'><label for='class_std'>Class (Std):</label><input type='text' class='form-control' name='class_std_edit_disa' id='class_std_edit_disa' placeholder='6 / LKG / UKG etc' value='${data.feeRow[0].class_std}' disabled /><input type='hidden' class='form-control' name='class_std_edit' id='class_std_edit' placeholder='6 / LKG / UKG etc' value='${data.feeRow[0].class_std}' /><span class='error' id='class_std_error' >Please enter the Class / Standarad.</span ></div><div class='mb-3'><label for='medium'>Medium of Language:</label><select id='medium_edit' class='form-control' name='medium_edit'><option value='${data.feeRow[0].medium}'>${data.feeRow[0].medium}</option><option value='Tamil'>Tamil</option><option value='English'>English</option><option value='Hindi'>Hindi</option></select><span class='error' id='medium_error' >Please select the Medium.</span ></div><div class='mb-3'><label for='fee'>Fees: </label><input type='number' class='form-control' name='fee_edit' id='fee_edit' placeholder='Fee (in INR) per year.' value='${data.feeRow[0].actual_fee}' /><span class='error' id='fee_error' >Please enter the Fee amount.</span ></div><div class='mb-3'><button class='btn btn-secondary' id='update-fee-struc-button' type='submit' value='submit'> Update </button></div></form>`
          );
        });

        $('#update-fee-struc-button').attr('disabled', 'disabled');
        // show data in the element.
        $("#editFeeStructModal").modal("show");

        $('#medium_edit').on('change', function () {
          var selected = $(this).val();
          console.log(selected);
          $('#medium_edit').find("option").removeAttr('selected');
          $('#medium_edit').find("option[value='"+ selected +"']").attr('selected', 'selected');
        })
        // enabiling button on change
        $('#medium_edit, #fee_edit').on('change', function () {
          $('#update-fee-struc-button').removeAttr('disabled');
        })


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
  $("#schedule, #datatable").DataTable();
});

// multi select option
$(document).ready(function() {
  $('.js-example-basic-multiple').select2();
});

// date Picker JQuery UI
$(document).ready(function() { // deafult
    $(".my_date_picker").flatpickr({
      minDate: "today",
      maxDate: new Date().fp_incr(120),
      enableTime: true,
      time_24hr: true,
      minTime: "05:00",
      maxTime: "22:30",
      dateFormat: "d-m-Y H:i",
  })
})

// flat pickr for class std
$(document).ready(function () {
  $('#academic_from, #academic_to').flatpickr({
    dateFormat: "m-Y",
    allowInput: true,
  })
})

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

// Delete Exam Master
$(document).on('click', '.deleteExamMaster', function () {
  var xMaster_id = $(this).attr('data-id');
  $.ajax({
    url: '/api/get-exam-master-data',
    type: 'POST',
    data: {
      xMaster_id: xMaster_id,
    }, dataType: 'JSON',
    success: function (data) {
      $('.delete-exam-master-modal-body').html(function () {
        return (
          `<div class='container'><div class='row'><p class='text-center mt-3 mb-3'><b>Do you want to delete '${data.masterData[0].exam_name}' of type '${data.masterData[0].exam_type}' ?</b></p></div><div class='row mb-3'><div class='col-4'></div><div class='col-4'><a role='button' class='btn btn-secondary btn-block' data-bs-dismiss='modal'>Cancel</a></div><div class='col-4'><a href='../dashboard/exam-master/delete/${data.masterData[0].id}?_method=DELETE' role='button' class='btn btn-primary btn-block'>Delete</a></div></div></div>`
        )
      })
      $('#deleteExamMasterModal').modal('show');
    }, error: function (err) {
      console.log(err);
    }
  })
})

// getting Exam Master data from Add Exam Screen after selecting the Exam master 
$(document).ready(function () {
  $('#create_exam_button, #exam_conducted_for').attr('disabled', 'disabled');
  $('#exam_master').on('change', function () {
    var xMaster_id = $(this).val();
    $.ajax({
      url: '/api/get-exam-master-data',
      type: 'POST',
      data: {
        xMaster_id: xMaster_id,
      }, dataType: 'JSON',
      success: function (data) {
        if (xMaster_id == "0"){
          $('#appended_master').remove();
          $('#appended_master_error').remove();
          $('#exam_master_data').append(function () {
            return (
              `<div id='appended_master_error' class='m-1'><p class='bg-danger '>Please select Exam master.</p></div>`
            )
          })
        } else {
          $('#exam_conducted_for').removeAttr('disabled');
          $('#appended_master_error').remove();
          $('#appended_master').remove();
          $('#exam_master_data').append(function () {
            return (
              `<div id='appended_master' class='m-1'><p>Exam Name: <b>${data.masterData[0].exam_name}</b> | Exam Type: <b>${data.masterData[0].exam_type}</b></p></div>`
            )
        })
        }
      }, error: function (err) {
        console.log(err);
      }
    })
  })
})

// Adding EXAM - Gettimng subject rows after class sec
$(document).on('change', '#exam_conducted_for', function () {
    var exam_std = $(this).val();
    $.ajax({
      url: '/api/get-subjects-from-exam-class',
      type: 'POST',
      data: {
        exam_std: exam_std,
      }, dataType: 'JSON',
      success: function (data) {
        $('#exam_conducted_for').after(function () {
          $('#exam_plan').html(`<input id='subject_count' type='hidden' class='subject_count form-control' name='subject_count' value='${data.subjects.length}'>`);
          if(data.std.length > 0) {
            for (let s=0; s < data.std.length; s++){
              $('#exam_plan').append(`<div class='m-2 p-2 border border-secondary rounded'><p class='std-exam-plan' id='std_exam_plan_${data.std[s].id}'><b>Exam Plan for ${data.std[s].class_std} STD - ${data.std[s].medium} Medium (${data.std[s].batch_name})</b></p><hr><div class='std_${data.std[s].id}' id='std_${data.std[s].id}'></div></div>`)
            }
          } else {
            $('#create_exam_button').attr('disabled', 'disabled');
          }

          if(data.subjects.length > 0) {
            $('#no_subject_alert').remove();
            for (let i = 0; i < data.subjects.length; i++) {
              $('#std_'+data.subjects[i].std_id).append(`
              <div id='subject_list subject_${i+1}' class='m-1 row g-3 align-middle subject_row'>
              <div class='col-1 align-bottom'><label class='text-center' for='sec_${i+1}'>Sec</label>
              <input id='sec' type='text' class='text-center text-white rounded bg-success form-control' name='sec' value='${data.subjects[i].class_section}' disabled>
              </div>
              <div class='col-2'>
              <input id='sec_id_${i+1}' type='hidden' class='sec_id_${i+1} form-control' name='sec_${i+1}_id' value='${data.subjects[i].sec_id}'><input id='subject_id_${i+1}' type='hidden' class='subject_id_${i+1} form-control' name='subject_${i+1}_id' value='${data.subjects[i].subject_id}'><label for='subject_name_${i+1}'>Subject ${i+1}</label><input id='subject_name_${i+1}' type='text' class='subject_name_${i+1} form-control' name='subject_name_${i+1}' value='${data.subjects[i].subject_name}' disabled>
              </div>
              <div class='col-3'>
              <label for='exam_date_${i+1}'>Exam Date</label><input id='exam_date_${i+1}' type='text' class='my_date_picker exam_date_${i+1} form-control' name='exam_${i+1}_date' required>
              </div>
              <div class='col-2'>
              <label for='exam_duration_${i+1}'>Duration</label><input placeholder='in Mins' id='exam_duration_${i+1}' type='text' class='exam_duration_${i+1} form-control' name='exam_${i+1}_duration' required>
              </div>
              <div class='col-2'>
              <label for='sub_total_${i+1}'>Total Mark</label><input id='sub_total_${i+1}' type='number' class='subject_total sub_total_${i+1} form-control' name='sub_${i+1}_total' required>
              </div>
              <div class='col-2'>
              <label for='cutoff_${i+1}'>Pass Mark</label><input id='cutoff_${i+1}' type='number' class='cutoff_mark cutoff_${i+1} form-control' name='cutoff_${i+1}_mark' required>
              </div>
              </div>`)
            }
            $('#create_exam_button').removeAttr('disabled');

          } else {
            $('#subject_list').remove();
            $('#exam_plan').html("<p class='text-danger' id='no_subject_alert'>Please select at least one Class std with subjects mapped to it.</p>")
            $('#create_exam_button').attr('disabled', 'disabled');
          }
          $('.my_date_picker').flatpickr({
            minDate: "today",
            maxDate: new Date().fp_incr(120),
            enableTime: true,
            time_24hr: true,
            minTime: "05:00",
            maxTime: "22:30",
            dateFormat: "d-m-Y H:i",
          })
      })
      }, error: function (err) {
        $('#exam_plan').html("<p>No Subject Found</p>")
      }
    })
  })

$(document).on('change', '.subject_total, .cutoff_mark', function () {
  var count = $('#subject_count').val();
  for (let i=1; i <= count; i++) {
    var subject_total = $('#sub_total_'+i).val();
    $('#cutoff_'+i).attr('min', '0').attr('max', `${subject_total}`);
  }
})

// While adding exams to the sec, check for duplicate exams
$(document).on('change', '#exam_conducted_for', function () {
  var exam_std = $('#exam_conducted_for').val();
  var xMaster_id = $('#exam_master').val();
  if (xMaster_id == 0){
    $('#exam_conducted_for').attr('disabled', 'disabled');
    $('#exam_conducted_for').val('')
    $('#appended_master').remove();
    $('#appended_master_error').remove();
    $('#exam_master_data').append(function () {
      return (
        `<div id='appended_master_error' class='bg-danger m-1'><p>Please select Exam master.</p></div>`
      )
    })
  } else {
    $('#exam_conducted_for').removeAttr('disabled');
    $('#appended_master_error').remove();
    $.ajax({
      url: '/api/duplicate-exam-check',
      type: 'POST',
      data: {
        exam_std: exam_std,
        xMaster_id: xMaster_id,
      }, dataType: 'JSON',
      success: function (data) {
        if (exam_std.length == 1){
          $('#no_std_alert').remove();
          for (let l=0; l < data.duplicate.length; l++){
            $('#duplicate_alert').remove();
            $('#std_'+data.duplicate[l].class_id).css("pointer-events", 'none').append(
              `<p class='bg-danger p-2' id='duplicate_alert'>We have found these exams in the list below. You can edit the same instead of recreating again. Or Slecet / Create a new Exam Master to proceed further.</p>`);
            $('#create_exam_button').attr('disabled', 'disabled');
          }
        }
        else if(exam_std.length > 1){
          $.each(data.duplicate, function (key, value) {
            if(data.duplicate[key].length > 0){
              $('#no_std_alert').remove();
              for (let l=0; l < data.duplicate[key].length; l++){
                $('#duplicate_alert').remove();
                $('#std_'+data.duplicate[key][l].class_id).css("pointer-events", 'none').append(
                  `<p class='bg-danger p-2' id='duplicate_alert'>We have found these exams in the list below. You can edit the same instead of recreating again. Or Slecet / Create a new Exam Master to proceed further.</p>`);
                $('#create_exam_button').attr('disabled', 'disabled');
              }
            } else {
              $('#create_exam_button').attr('disabled', 'disabled');
            }
          })
        } else if (exam_std.length === 'undefined' || 0) {
          $('#exam_plan').remove();
        } else {
          $('#exam_plan').remove();
        }
      }, error: function (err) {
        console.log(err);
      }
    })
  }
})

// HM edits an Exam
$(document).on('click', '.editExam', function () {
   var exam_id = $(this).attr('data-id');
   $.ajax({
     url: '/api/get-exam-data',
     type: 'POST',
     data: {
       exam_id: exam_id,
     }, dataType: 'JSON',
     success: function (data) {
      $('.edit-exam-modal-body').html(function () {
        return (
          `<div class='row m-3 p-1 rounded bg-warning'><h5>${data.exam[0].exam_name}</h5><hr><span><p>Exam type: ${data.exam[0].exam_type}</p><p>Subject: <b>${data.exam[0].subject_name}</b></p><p>Class Sec: <b>${data.exam[0].class_std} STD - ${data.exam[0].medium} Medium - ${data.exam[0].class_section} Section</b></p></span></div><div>
          <form id='editExam-form' action='../dashboard/exams/edit/${data.exam[0].id}' method='POST'> <div class='row m-3'> 
          <div class='mb-3'> <label for='exam_date_edit'>Exam Date:</label> <input type='text' class='my_date_picker form-control' name='exam_date_edit' id='exam_date_edit' value='${data.exam[0].exam_format_date}' /> <input type='hidden' class='form-control' name='exam_date_utc' id='exam_date_utc' value='${data.exam[0].exam_utc}' /> </div> <div class='mb-3'> <label for='exam_duration_edit'>Exam Duration (in Mins):</label> <input type='number' class='form-control' name='exam_duration_edit' id='exam_duration_edit' placeholder='Exam duration in Mins.' value='${data.exam[0].exam_duration}' /> </div>  <div class='mb-3'> <label for='subj_mark_edit'>Total Marks:</label> <input type='number' class='form-control' name='subj_mark_edit' id='subj_mark_edit' placeholder='Total marks' value='${data.exam[0].sub_outoff_marks}' /> </div><div class='mb-3'> <label for='cutoff_mark_edit'>Pass Mark:</label> <input type='number' class='form-control' name='cutoff_mark_edit' id='cutoff_mark_edit' placeholder='Pass mark' value='${data.exam[0].cutoff_mark}' min='1' max='${data.exam[0].sub_outoff_marks}' /> </div> <div class='mb-3'> <label for='exam_status_edit'>Exam Status:</label> <select id='exam_status_edit' class='form-control' name='exam_status_edit' value='${data.exam[0].exam_status}'> <option value='scheduled' >Scheduled</option> <option value='postponed'>Postponed</option> <option value='cancelled'>Cancelled</option> <option value='onhold'>Withheld (On Hold)</option> </select> <span class='error' id='class_error' >Please choose a Status.</span > </div> <div class='mb-3'> <button id='create_exam_button' class='btn btn-secondary' type='submit' value='submit'> Update Exam </button> </div> </form></div>`
        )
      })
      // when matching date - check the time inside and get the option added.
      var curr_time = +new Date();
      console.log(curr_time); // ms
      var exam_start_ms = +new Date(data.exam[0].exam_utc); 
      var exam_end_ms = (data.exam[0].exam_duration*60*1000)
      console.log(`Start: ${exam_start_ms}, End: ${exam_end_ms}`)
      if(( exam_start_ms + exam_end_ms) < curr_time ){
        console.log('Yes');
        $('#exam_status_edit').append(
          `<option value='completed' class='text-white mark bg-success'>Completed</option>`
        )
      } else {
        console.log('No');
      }
 
      $('.my_date_picker').flatpickr({
        minDate: "today",
        maxDate: new Date().fp_incr(120),
        enableTime: true,
        time_24hr: true,
        minTime: "05:00",
        maxTime: "22:30",
        dateFormat: "d-m-Y H:i",
    });
      $('#editExamModal').modal('show');
     }, error: function (err) {
       console.log(err);
     }
   })
 })

// HM deletes an Exam
$(document).ready(function () {
  $('.deleteExam').on('click', function () {
    var exam_id = $(this).attr('data-id');
    $.ajax({
      url: '/api/get-exam-data',
      type: 'POST',
      data: {
        exam_id: exam_id,
      }, dataType: 'JSON',
      success: function (data) {
        $('.delete-exam-modal-body').html(function () {
          return (
            `<div class='container'><div class='row'><input type='hidden' class='form-control' name='exam_status_hidden' id='exam_status_hidden' value='${data.exam[0].exam_status}'/><p class='text-center mt-3 mb-3'><b>Do you want to delete ${data.exam[0].exam_name} for ${data.exam[0].class_std} STD - ${data.exam[0].medium} Medium ?</b></p></div><div class='row mb-3'><div class='col-4'></div><div class='col-4'><a role='button' class='btn btn-secondary btn-block' data-bs-dismiss='modal'>Cancel</a></div><div class='col-4'><a href='../dashboard/exams/delete/${data.exam[0].id}?_method=DELETE' role='button' class='btn btn-primary btn-block'>Delete</a></div></div></div>`
          )
        })
        $('#deleteExamModal').modal('show');
      }, error: function (err) {
        console.log(err);
      }
    })
  })
})

// HM & TEACHER Views EXAM MARKS .view_exam_mark
$(document).on('click', '.view_exam_mark', function () {
    var exam_id = $(this).attr('data-id');
    var staff_role = $(this).attr('logged-in');
    $.ajax({
      url: '/api/get-exam-scores',
      type: 'POST',
      data: {
        exam_id: exam_id,
      }, dataType: 'JSON',
      success: function (data) {

          let view_mark = ``;
          for (let i=0; i < data.markList.length; i++) {
            let view_i = `<tr><th scope="row">${i+1}</th><td><b>${data.markList[i].name}</b> (${data.markList[i].student_id})</td><td>${data.markList[i].received_mark}</td><td>${data.markList[i].subject_result}</td></tr>`
            view_mark += view_i;
          }

        $('.view-exam-modal-body').html(function () {
          return (
            `<div class="row m-2"><div class='col-8'>
            <h5>Total Students: <b>${data.markList.length}</b></h5></div><div class='col-4'><button data-id="${exam_id}" logged-in = "${staff_role}" type="button" class="edit_exam_mark btn btn-warning" id="mark-edit-button" data-bs-toggle="modal" ><i class="far fa-edit"></i> Marks</button></div><hr></div>
            <div class="row markList_data m-2"><table class='text-center table table-light'><thead><tr><th scope='col'>S.No</th><th width='200px'>Student Name</th><th width='200px'>Marks</th><th>Status</th></tr></thead><tbody>${view_mark}</tbody></table></div>`
          )
        })

        if (staff_role == 4) {
          $('#mark-edit-button').hide();
        } else {
          $('#mark-edit-button').show();
        }

        $('#viewMarksModal').modal('show');
      }, error: function (err) {
        console.log(err);
      }
    })
  })

// TEACHER EDITS Exam Marks  .edit_exam_mark
$(document).ready(function () {
  $('.edit_exam_mark').on('click', function () {
    var exam_id = $(this).attr('data-id');
    var staff_role = $(this).attr('logged-in');
    $.ajax({
      url: '/api/get-exam-scores',
      type: 'POST',
      data: {
        exam_id: exam_id,
      }, dataType: 'JSON',
      success: function (data) {

          let view_mark = ``;
          for (let i=0; i < data.markList.length; i++) {
            // const pass_fail = data.markList[i].received_mark >= data.markList[i].cutoff_mark
            // let mark_status = pass_fail ? "Pass" : "Fail";

            let view_i = `<tr><th scope="row">${i+1}</th><td><label for="student_${data.markList[i].student_id}"><b>${data.markList[i].name}</b> (${data.markList[i].student_id})</label><input type="hidden" class="form-control" name="student_id_${i+1}" id="student_${i+1}" value="${data.markList[i].student_id}" /></td><td><input type="hidden" class="form-control" name="cutoff_mark" id="cutoff_mark" value="${data.markList[i].cutoff_mark}" /><input type="number" class="form-control" name="edit_exam_mark_${i+1}" id="exam_mark_${i+1}" value="${data.markList[i].received_mark}" placeholder="Enter Mark here" max='${data.markList[i].sub_outoff_marks}' /><td>${data.markList[i].subject_result}</td></tr>`
            view_mark += view_i;
          }

        $('.edit-exam-modal-body').html(function () {
          return (
            `<div class="row m-2">
            <h5>Total Students: <b>${data.markList.length}</b></h5><hr><input type="hidden" class="form-control" name="student_count" id="student_count" value="${data.markList.length}"/> </div>
            <div class="row markList_data m-2">
            <form action='../dashboard/exam-marks/edit/${exam_id}/${data.markList.length}?_method=PUT' method='POST'>
            <table class='text-center table table-light'>
            <thead><tr><th scope='col'>S.No</th><th width='200px'>Student Name</th><th width='200px'>Marks</th><th>Status</th></tr></thead>
            <tbody>${view_mark}</tbody>
            </table><div class="row m-2">
            <button id="edit_exam_mark_button" class="btn btn-secondary" type="submit" value="submit">Update Mark</button></div></form></div>`
          )
        })
        $('#editExamMarksModal').modal('show');
      }, error: function (err) {
        console.log(err);
      }
    })
  })
})

// HM releases ANNUAL EXAM MARK
$(document).ready(function () {
  $('.releaseExamMark').on('click', function () {
    var exam_id = $(this).attr('data-id');
    $.ajax({
      url: '/api/get-exam-data',
      type: 'POST',
      data: {
        exam_id: exam_id,
      }, dataType: 'JSON',
      success: function (data) {
        $('.release-marks-modal-body').html(function () {
          return (
            `<div class='container'><div class='row'><input type='hidden' class='form-control' name='exam_status_hidden' id='exam_status_hidden' value='${data.exam[0].exam_status}'/><p class='text-center mt-3 mb-3'><b>Would you like to RELEASE ANNUAL EXAM MARKS of ${data.exam[0].subject_name} for ${data.exam[0].class_std} STD - ${data.exam[0].medium} Medium ?</b></p></div><div class='justify-content-center row mb-3'><div class='row col-5 m-1'><a role='button' class='btn btn-secondary btn-block' data-bs-dismiss='modal'>Cancel</a></div><div class='row col-5 m-1'><a href='../dashboard/release-annual-marks/${data.exam[0].id}/${data.exam[0].subject_id}' role='button' class='btn btn-primary btn-block'><i class="fas fa-paper-plane"></i> Release Now</a></div></div></div>`
          )
        })
        $('#releaseMarksModal').modal('show');
      }, error: function (err) {
        console.log(err);
      }
    })
  })
})

// STUDENT SEEING HIS EXAM SCHEDULE - not working
$(document).on('click', '.view_exam_sched', function () {
  var student_id = $(this).attr('logged-in');
  var exam_master_id = $(this).attr('data-id');
  var class_sec = $(this).attr('class-sec');
  $.ajax({
    url: '/api/get-my-exam-schedule',
    type: 'POST',
    data: {
      student_id: student_id,
      exam_master_id: exam_master_id,
      class_sec: class_sec,
    }, dataType: 'JSON',
    success: function (data) {
      var exam_sched = "";
      for (let x = 0; x < data.scheduledExams.length; x++ ){
        let tr = `<tr><td>${x+1}</td><td>${data.scheduledExams[x].subject_name}</td><td>${data.scheduledExams[x].exam_date}</td><td>${data.scheduledExams[x].exam_duration}</td><td>${data.scheduledExams[x].exam_status}</td></tr>`
        exam_sched += tr;
      }

      $('.viewExamSched-modal-body').html(function () { 
        return (
          `<div class='m-2 border border-secondary border-rounded'><table class='table table-light text-center '>
          <thead><tr><th scope='col'>S.No</th><th scope='200px'>Subject</th><th scope='200px'>Exam Date & Time</th><th scope='200px'>Exam Duration</th><th scope='200px'>Status (Latest Updated)</th></tr></thead><tbody>${exam_sched}</tbody></table></div>`
        )
      })

      
      $('#viewExamSchedModal').modal('show');
    }, error: function (err) {
      console.log(err);
    }
  })
})

// STUDENT SEEING HIS MARK SHEET
// $(document).on('click', '.view_my_mark', function () {
//   var student_id = $(this).attr('logged-in');
//   var exam_master_id = $(this).attr('data-id');
//   var class_sec = $(this).attr('class-sec');
//   $.ajax({
//     url: '/api/get-my-exam-marks',
//     type: 'POST',
//     data: {
//       student_id: student_id,
//       exam_master_id: exam_master_id,
//       class_sec: class_sec,
//     }, dataType: 'JSON',
//     success: function (data) {
//       var mark_data = "";
//       let fail_count = 0;
//       let max_total = 0;
//       let secured_total = 0;
//       for (let s=0; s < data.markList[1].length; s++) {
//         let mark_index = data.markList[0].findIndex(obj => obj.subj_id == `${data.markList[1][s].id}`);
//         console.log(mark_index);
//         let received_mark = 'To be updated'
//         let subject_result = 'To be updated'
//         let final_result = "";
//         if(mark_index != '-1') {
//           received_mark = `${data.markList[0][mark_index].received_mark}`;
//           subject_result = `${data.markList[0][mark_index].received_mark}` > `${data.markList[0][mark_index].cutoff_mark}` ? 'Pass' : 'Fail'
//           subject_result == 'Fail' ? fail_count++ : fail_count;
//           max_total += data.markList[0][mark_index].sub_outoff_marks
//           secured_total += data.markList[0][mark_index].received_mark
//         } else {
//           received_mark;
//           subject_result;
//         }
//         let mark_row = `<tr>
//         <th scope="row">${s+1}</th>
//         <td>${data.markList[1][s].subject_name}</td>
//         <td>${data.markList[0][mark_index].sub_outoff_marks}</td>
//         <td>${data.markList[0][mark_index].cutoff_mark}</td>
//         <td>${received_mark}</td>
//         <td>${subject_result}</td>
//         </tr>`
//         mark_data += mark_row;
//       }

//       final_result = fail_count == 0 ? 'Pass' : 'Fail';
      
//       $('.view-myExamMarks-modal-body').html(function () {
//         return (
//           `<div class='card bg-info m-1 p-3'><div clas='card-body'><div class='row'><div class='col-6'><h5 class='display-6'>${data.markList[2][0].name}</h5><p>Date of Birth: ${data.markList[2][0].date_of_birth}</p></div><div class='col-6'><p class='display-6'>Your Result: ${final_result}</p><p>Academic Year: ${data.markList[2][0].academic_year}</p></div></div></div></div><div class='align-center mx-1'><table class='table table-dark text-center '>
//           <thead> <tr><th scope='col'>S.No</th><th scope='200px'>Subject</th><th scope='200px'>Max. Mark</th><th scope='200px'>Pass Mark</th><th scope='200px'>Secured Mark</th><th scope='200px'>Result</th></tr></thead><tbody>${mark_data}<tr class='bg-info text-white'><td>*</td><td>Total</td><td>${max_total}</td><td>-</td><td>${secured_total}</td><td>${final_result}</td></tr></tbody></table></div>`
//         )
//       })
//       $('#viewMyMarksModal').modal('show');
//     }, error: function (err) {
//       console.log(err);
//     }
//   })
// })