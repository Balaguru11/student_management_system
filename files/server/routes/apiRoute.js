const express = require("express");
const apiRouter = express.Router();
const session = require("express-session");
const dbcon = require("../config/database");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const con = require("../config/database");

apiRouter.post('/delete-batch-by-id', (req, res) => {
  var getBatch = `SELECT * FROM school_batch_mgmt WHERE id = '${req.body.batch_id}'`;
  dbcon.query(getBatch, (err, batch) => {
    if(err) res.json({msg: 'error', err})
    else if (batch.length > 0) {
      res.json({msg: 'success', batch: batch})
    } else {
      res.json({msg: 'error', err })
    }
  })
})

apiRouter.post("/get-class-sections", (req, res) => {
  var getclassection =
    `SELECT clr.id, clr.class_section, batch.batch_name,  (clr.students_strength - clr.students_filled) AS seats_free FROM school_classroom AS clr INNER JOIN school_feestructure AS sfs ON sfs.id = clr.class_id INNER JOIN school_batch_mgmt AS batch ON batch.id = sfs.batch_id WHERE clr.class_id= "${req.body.class_id}" AND clr.students_strength - clr.students_filled != "0" AND clr.deleted_at IS NULL`;
  dbcon.query(getclassection, (err, rows) => {
    if (err) {
      res.json({ msg: "error" });
    } else {
      res.json({
        msg: "success",
        class_secs: rows,
      });
    }
  });
});

apiRouter.post("/get-class-fee", (req, res) => {
  var getclassfee =
    'SELECT * FROM school_feestructure WHERE id= "' + req.body.class_id + '"';
  dbcon.query(getclassfee, (err, row) => {
    if (err) {
      res.json({ msg: "error", err });
    } else {
      res.json({
        msg: "success",
        class_fee: row[0].actual_fee,
      });
    }
  });
});

apiRouter.post("/get-paid-amount", (req, res) => {
  var getPaidAmount = `SELECT paying_amount FROM school_student_admission WHERE student_id="${req.body.student_id}" AND academic_year="${req.body.academic_year}" AND class_medium="${req.body.class_id}"`;
  dbcon.query(getPaidAmount, (err, result) => {
    if (err) {
      res.json({ msg: "error", err });
    } else {
      let amountPaid = 0;
      for (let i = 0; i < result.length; i++) {
        amountPaid = amountPaid + result[i].paying_amount;
      }
      res.json({
        msg: "success",
        amount_earlier_paid: amountPaid,
      });
    }
  });
});

apiRouter.post("/get-student-data", (req, res) => {
  var getStudent = `SELECT name, mobile_number, email FROM school_student WHERE student_id='${req.body.stuId}'`;
  dbcon.query(getStudent, (err, data) => {
    if (err) {
      res.json({ msg: "error" });
    } else if (data.length == 1) {
      res.json({
        msg: "success",
        student_name: data[0].name,
        student_mobile: data[0].mobile_number,
        student_email: data[0].email,
      });
    } else {
      res.json({ msg: "error" });
    }
  });
});

// get academic years out of the student admission data to show dropdown in collect fee due form.
apiRouter.post('/get-academic-year-for-id', (req, res) => {
  var getAcademic = `SELECT academic_year FROM school_student_admission WHERE student_id = '${req.body.student_id}' AND deleted_at IS NULL`;
  dbcon.query(getAcademic, (err, academics) => {
    if(err) res.json({msg: 'error', err})
    else if (academics.length > 0){
      res.json({msg: 'success', academics: academics});
    } else {
      res.json({msg: 'success', academics: academics});
    }
  })
})
// student enrolled data
apiRouter.post("/get-student-enrollment-data", (req, res) => {
  var getStudent = `SELECT ssa.student_id, stu.name, stu.email, stu.mobile_number, ssa.id, ssa.paying_amount, batch.batch_name, ssa.actual_fee, sfs.class_std, sfs.medium, clr.class_section FROM school_student_admission AS ssa INNER JOIN school_feestructure AS sfs ON sfs.id = ssa.class_medium INNER JOIN school_batch_mgmt AS batch ON batch.id = sfs.batch_id INNER JOIN school_classroom AS clr ON clr.id = ssa.class_section INNER JOIN school_student AS stu ON stu.student_id = ssa.student_id WHERE ssa.student_id='${req.body.stuId}' AND ssa.academic_year = '${req.body.academicYear}'`;
  dbcon.query(getStudent, (err, data) => {
    if (err) {
      res.json({ msg: "error", err });
    } else if (data.length == 1) {
      res.json({
        msg: "success",
        admission_id: data[0].id,
        student_name: data[0].name,
        student_mobile: data[0].mobile_number,
        student_email: data[0].email,
        academic_year: data[0].academic_year,
        class_std: data[0].class_std,
        class_med: data[0].medium,
        class_sec: data[0].class_section,
        actual_fee: data[0].actual_fee,
        earlier_paid: data[0].paying_amount,
      });
    } else {
      res.json({ msg: "error", err });
    }
  });
});

// get One student Profile data
apiRouter.post("/get-one-student-profile", (req, res) => {
  var getStudent = `SELECT * FROM school_student WHERE student_id='${req.body.student_id}'`;
  dbcon.query(getStudent, (err, data) => {
    if (err) {
      res.json({ msg: "error" });
    } else if (data.length == 1) {
      res.json({
        msg: "success",
        student: data,
      });
    } else {
      res.json({ msg: "error" });
    }
  });
});

// get One Staff Profile data
apiRouter.post("/get-one-staff-profile", (req, res) => {
  var getStaff = `SELECT * FROM school_staff WHERE staff_id='${req.body.staff_id}'`;
  dbcon.query(getStaff, (err, data) => {
    if (err) {
      res.json({ msg: "error" });
    } else if (data.length == 1) {
      res.json({
        msg: "success",
        staff: data,
      });
    } else {
      res.json({ msg: "error" });
    }
  });
});

// edit fee structure class-medium (GET)
apiRouter.post("/edit-class-medium-fee", (req, res) => {
  var getFeeData = `SELECT sfs.id, sfs.class_std, sfs.medium, sfs.actual_fee, batch.id AS batch_id, batch.batch_name FROM school_feestructure AS sfs INNER JOIN school_batch_mgmt AS batch ON batch.id = sfs.batch_id WHERE sfs.id='${req.body.class_medium_id}'`;

  dbcon.query(getFeeData, (err, data) => {
    if (err) {
      res.json({ msg: "error" });
    } else if (data.length == 1) {
      res.json({
        msg: "success",
        feeRow: data,
      });
    } else {
      res.json({ msg: "No Data found." });
    }
  });
});

// delete fee structure class-medium (GET)
apiRouter.post("/delete-class-medium-fee", (req, res) => {
  var classMedium = `SELECT * FROM school_feestructure WHERE id='${req.body.class_medium_id}'`;
  dbcon.query(classMedium, (err, sections) => {
    if (err) res.json({ msg: "error", err });
    else if (sections[0].count != 0) {
      res.json({
        msg: "success",
        sections: sections,
      });
    } else {
      res.json({ msg: "NO Data found", err });
    }
  });
});

// get EDIT USER ACCOUNT Modal for Admin and School
apiRouter.post("/get-edit-user-account", (req, res) => {
  var UserAccData = `SELECT sml.username, sml.email, sml.status, srol.role_name, sml.role_id_fk FROM school_main_login AS sml INNER JOIN school_role AS srol ON sml.role_id_fk = srol.id WHERE sml.id='${req.body.staff_id}'`;
  dbcon.query(UserAccData, (err, userData) => {
    if (err) res.json({ msg: "error", err });
    else if (userData.length >= 0) {
      res.json({ msg: "success", userData: userData });
    } else {
      res.json({ msg: "Profile not created yet." });
    }
  });
});

// GET Delete user account modal for school alone
apiRouter.post("/delete-user-account", (req, res) => {
  var userLoginData = `SELECT * FROM school_main_login WHERE id='${req.body.user_id}'`;
  dbcon.query(userLoginData, (err, userLogin) => {
    if (err) res.json({ msg: "error", err });
    else {
      res.json({ msg: "success", userLogin: userLogin });
    }
  });
});

// CHECK IF THE WEEK SCHEDULE ALREADY ADDED FOR CLASS SECTION
apiRouter.post('/get-week-schedule-added', (req, res) => {
  var dupeWeekSched = `SELECT EXISTS (SELECT * FROM school_week_schedule WHERE day = '${req.body.day}' AND class_sec_id = '${req.body.class_sec_id}' AND deleted_at IS NULL) AS count`;
  dbcon.query(dupeWeekSched, (err, foundSched) => {
    if(err) res.json({msg: 'error', err});
    res.json({msg: 'success', foundNos: foundSched[0].count});
  })
})

// get Schedule Periods from schedule_template
apiRouter.post("/get-periods-from-schedule-template", (req, res) => {
  var periods = `SELECT * FROM school_schedule_template WHERE id='${req.body.schedule_temp_id}'; SELECT scs.subject_id, sub.subject_name, scs.classroom_id, scs.staff_id_assigned, ssf.name FROM school_class_subjects AS scs INNER JOIN school_subjects AS sub ON sub.id=scs.subject_id INNER JOIN school_main_login AS sml ON sml.id = scs.staff_id_assigned RIGHT JOIN school_staff AS ssf ON ssf.staff_id=scs.staff_id_assigned WHERE scs.classroom_id = '${req.body.class_sec_id}' AND scs.deleted_at IS NULL`;
  dbcon.query(periods, (err, periodNos) => {
    if (err) res.json({ msg: "error", err });
    else {
      res.json({
        msg: "success",
        periods: periodNos[0],
        subjects: periodNos[1],
      });
    }
  });
});

//get subjects associated with the class section to add schedule
apiRouter.post("/get-staff-assigned-to-subject", (req, res) => {
  var subjects = `SELECT scs.subject_id, subj.subject_name, scs.staff_id_assigned, scs.classroom_id, sst.name FROM school_class_subjects AS scs INNER JOIN school_subjects AS subj ON subj.id=scs.subject_id INNER JOIN school_staff AS sst ON sst.staff_id = scs.staff_id_assigned WHERE scs.classroom_id='${req.body.class_sec_id}' AND subj.id='${req.body.subject_id}' AND scs.deleted_at IS NULL`;

  dbcon.query(subjects, (err, staffNames) => {
    if (err) res.json({ msg: "error", err });
    else if (subjects.length > 0) {
      res.json({ msg: "success", staff: staffNames });
    } else {
      res.json({ msg: "error", err });
    }
  });
});

// insert query on focusout of period entries in week schedule
apiRouter.post('/insert-week-schedule-by-period', (req, res) => {
  let session = req.session;
  var checkData = `SELECT * FROM school_week_schedule WHERE school_id='${session.schoolId}' AND day='${req.body.day}' AND period_no = '${req.body.period_no}' AND period_staff_id='${req.body.staff}' AND deleted_at IS NULL`;
  dbcon.query(checkData, (err, dataFound) => {
    if(err) res.json({msg: 'error', err});
    else if(dataFound.length != 0){
      res.json({msg: 'success', text: 'Staff not available', dataFound: dataFound});
    } else {
      res.json({msg: 'error', text: 'Staff available', dataFound: dataFound});
    }
  })
})

// view Subject - Staff for a specific Week Schedule on View button click
apiRouter.post('/view-week-schedule-period-staff', (req, res) => {
  let session = req.session;
  var weekSchedFind = `SELECT week.day, week.period_no, week.period_subject_id, subj.subject_name, week.period_staff_id, staf.name FROM school_week_schedule AS week INNER JOIN school_subjects AS subj ON subj.id = week.period_subject_id INNER JOIN school_staff AS staf ON staf.staff_id = week.period_staff_id WHERE week.class_sec_id='${req.body.class_sec_id}' AND week.day = '${req.body.day_id}' AND week.school_id = '${session.schoolId}' AND week.schedule_tempid = '${req.body.sched_tempid}' ORDER BY ABS(week.period_no)`;
  dbcon.query(weekSchedFind, (err, schedule) => {
    if(err) res.json({msg: 'error', err});
    else if (schedule.length > 0){
      res.json({msg: 'success', schedule: schedule});
    } else {
      res.json({msg: 'success', schedule: schedule});
    }
  })
})

// edit Week schedule from View list
apiRouter.post('/edit-week-schedule-preiods', (req, res) => {
  let session = req.session;
  var editSched = `SELECT * FROM school_schedule_template WHERE id='${req.body.sched_temp_id}'; SELECT scs.subject_id, sub.subject_name, scs.classroom_id, sfs.class_std, sfs.medium, clr.class_section, scs.staff_id_assigned, ssf.name FROM school_class_subjects AS scs INNER JOIN school_subjects AS sub ON sub.id=scs.subject_id INNER JOIN school_classroom AS clr ON clr.id = scs.classroom_id INNER JOIN school_feestructure AS sfs ON sfs.id = clr.class_id INNER JOIN school_staff AS ssf ON ssf.staff_id=scs.staff_id_assigned WHERE scs.classroom_id = '${req.body.class_sec_id}'; SELECT week.day, week.period_no, week.period_subject_id, subj.subject_name, week.period_staff_id, staf.name FROM school_week_schedule AS week INNER JOIN school_subjects AS subj ON subj.id = week.period_subject_id INNER JOIN school_staff AS staf ON staf.staff_id = week.period_staff_id WHERE week.class_sec_id='${req.body.class_sec_id}' AND week.day = '${req.body.day_id}' AND week.school_id = '${session.schoolId}' AND week.schedule_tempid = '${req.body.sched_temp_id}' ORDER BY ABS(week.period_no)`;
  dbcon.query(editSched, (err, scheduleData) => {
    if(err) res.json({msg: 'error', err})
    res.json({msg: 'success', scheduleData: scheduleData});
  })
})

// delete week shcdule for a class section 
apiRouter.post('/delete-week-schedule-preiods', (req, res) => {
  var deleteSched = `SELECT week.day, clr.class_Section, sfs.class_std, sfs.medium FROM school_week_schedule AS week INNER JOIN school_classroom AS clr ON clr.id = week.class_sec_id INNER JOIN school_feestructure AS sfs ON sfs.id = clr.class_id WHERE week.day='${req.body.day_id_d}' AND week.class_sec_id='${req.body.class_sec_id_d}'`;
  dbcon.query(deleteSched, (err, selectedOne) => {
    if(err) res.json({msg: 'error', err});
    else if (selectedOne.length > 0) {
      res.json({msg: 'success', selectedOne: selectedOne});
    } else {
      res.json({msg: 'error', err});
    }
  })
})

// OPEN EDIT MODAL for class section
apiRouter.post("/edit-class-section", (req, res) => {
  var classSec = `SELECT clr.id AS classsec_id, clr.class_id AS std_id, sfs.class_std, sfs.medium, clr.class_section, clr.students_strength FROM school_classroom AS clr INNER JOIN school_feestructure AS sfs ON sfs.id=clr.class_id WHERE clr.id='${req.body.section_id}'`;
  dbcon.query(classSec, (err, sectionData) => {
    if (err) res.json({ msg: "error", err });
    else if (sectionData.length > 0) {
      res.json({ msg: "success", sectionData: sectionData });
    } else {
      res.json({ msg: "error", err });
    }
  });
});

// open Delete modal for class section
apiRouter.post("/delete-class-section", (req, res) => {
  var deleteModalData = `SELECT clr.id, sfs.class_std, sfs.medium, clr.class_section FROM school_classroom AS clr INNER JOIN school_feestructure AS sfs ON sfs.id=clr.class_id WHERE clr.id='${req.body.section_id}'`;
  dbcon.query(deleteModalData, (err, secData) => {
    if (err) res.json({ msg: "error", err });
    else if (secData.length > 0) {
      res.json({ msg: "success", secData: secData });
    } else {
      res.json({ msg: "error", err });
    }
  });
});

// OPEN EDIT MODAL for Subject Class Staff Mapping section
apiRouter.post("/edit-subclassstaff-mapping", (req, res) => {
  let session = req.session;
  var mapFetch = `SELECT map.id, subj.id AS subject_id, subj.subject_name, sml.id AS prim_id, sml.username AS primary_staff, sml2.username AS secondary_staff, sml2.id AS sec_id, clr.id AS classsec_id, clr.class_section, sfs.class_std, sfs.medium FROM school_class_subjects AS map 
  INNER JOIN school_classroom AS clr ON clr.id=map.classroom_id
  INNER JOIN school_feestructure AS sfs ON sfs.id=clr.class_id 
  INNER JOIN school_subjects AS subj ON subj.id=map.subject_id INNER JOIN school_main_login AS sml ON sml.id=map.staff_id_assigned 
  INNER JOIN school_main_login AS sml2 ON sml2.id=map.secondary_staff_assigned WHERE map.id='${req.body.mapping_id}' AND map.school_id='${session.schoolId}'; SELECT * FROM school_main_login WHERE school_id = '${session.schoolId}' AND role_id_fk='8' AND status='Active' AND deleted_at IS NULL`;
  dbcon.query(mapFetch, (err, mapData) => {
    if (err) res.json({ msg: "error", err });
    else {
      res.json({ msg: "success", mapData: mapData });
    }
  });
});

// for mapping edit modal, secondary jq
apiRouter.post("/get-staff-subject-from-class-sec", (req, res) => {
  var subStaff = `SELECT clr.id, sfs.class_std, sfs.medium, clr.class_section FROM school_classroom AS clr INNER JOIN school_feestructure AS sfs ON sfs.id = clr.class_id 
  WHERE clr.school_id = '${req.body.school_id}'`;

  dbcon.query(subStaff, (err, classDrop) => {
    if (err) res.json({ msg: "error", err });
    else if (classDrop.length > 0) {
      res.json({ msg: "success", classDrop: classDrop });
    } else {
      res.json({ msg: "No data found", classDrop: classDrop });
    }
  });
});

// Open delete Modal for mapping
apiRouter.post("/delete-mapping", (req, res) => {
  var deleteModalData = `SELECT map.school_id, map.id, subj.id AS subject_id, subj.subject_name, staf.name, staf.staff_id, clr.id AS classsec_id, clr.class_section, sfs.class_std, sfs.medium FROM school_class_subjects AS map INNER JOIN school_subjects AS subj ON subj.id=map.subject_id INNER JOIN school_staff AS staf ON staf.staff_id = map.staff_id_assigned INNER JOIN school_classroom AS clr ON clr.id=map.classroom_id INNER JOIN school_feestructure AS sfs ON sfs.id=clr.class_id WHERE map.id='${req.body.map_id}'`;

  dbcon.query(deleteModalData, (err, mappedData) => {
    if (err) res.json({ msg: "error", err });
    else if (mappedData.length > 0) {
      res.json({ msg: "success", mappedData: mappedData });
    } else {
      res.json({ msg: "error here", mappedData: mappedData });
    }
  });
});

// get Parent account data -used in edit & delete jqueries
apiRouter.post('/get-parent-account-data', (req, res) => {
  var findParent = `SELECT * FROM school_main_login WHERE id='${req.body.parent_id}' AND role_id_fk='5'`;
  dbcon.query(findParent, (err, parData) => {
    if(err) res.json({msg: 'error', err})
    else if(parData.length != 0) {
      res.json({msg: 'success', parData: parData});
    } else {
      res.json({msg: 'zero', text: 'No Parent account found.'});
    }
  })
})

// get parent account data and mapped date
apiRouter.post('/get-parent-account-mapped-data', (req, res) => {
  let session = req.session;
var parentMapData = `SELECT * FROM school_main_login WHERE id='${req.body.parent_id}' AND role_id_fk='5'; SELECT stu.school_id, spam.ml_student_id, stu.name AS student_name FROM school_parent_student_map AS spam INNER JOIN school_student AS stu ON stu.student_id = spam.ml_student_id WHERE spam.parent_id='${req.body.parent_id}' AND spam.deleted_at IS NULL; SELECT stu.school_id, stu.name AS student_name, stu.student_id FROM school_student AS stu INNER JOIN school_main_login AS sml ON sml.id = stu.student_id WHERE sml.school_id='${session.schoolId}' AND sml.status='Active' AND sml.deleted_at IS NULL AND sml.role_id_fk = '1'`;
  dbcon.query(parentMapData, (err, parMapData) => {
    if(err) res.json({msg: 'error', err});
    else if(parMapData[0].length != 0){
      res.json({msg: 'success', parMapData: parMapData});
    } else {
      res.json({msg: 'zero', text: 'Not a Parent account'});
    }
  })
})

// get EDIT Student ACCOUNT Modal for Admin and School
apiRouter.post("/get-edit-Student-account", (req, res) => {
  var StudAccData = `SELECT * FROM school_main_login WHERE id='${req.body.student_id}'`;
  dbcon.query(StudAccData, (err, studData) => {
    if (err) res.json({ msg: "error", err });
    else if (studData.length != 0) {
      res.json({ msg: "success", studData: studData });
    } else {
      res.json({ msg: "Profile not created yet." });
    }
  });
});

// GET Delete Student account modal for school alone
apiRouter.post("/delete-student-account", (req, res) => {
  var studLoginData = `SELECT * FROM school_main_login WHERE id='${req.body.student_id}'`;
  dbcon.query(studLoginData, (err, studLogin) => {
    if (err) res.json({ msg: "error", err });
    else if(studLogin.length != 0 ){
      res.json({ msg: "success", studLogin: studLogin });
    }
    else {
      res.json({ msg: "error", err });
    }
  });
});

// get schedule template data
apiRouter.post('/get-schedule-template-data', (req, res) => {
  var schedTempData = `SELECT * FROM school_schedule_template WHERE id='${req.body.sched_tempid}'`;
  dbcon.query(schedTempData, (err, tempData) => {
    if(err) res.json({msg: 'error', err});
    else if (tempData.length != 0){
      res.json({msg: 'success', tempData: tempData});
    } else {
      res.json({msg: 'zero', text: 'No Data found.'});
    }
  })
})

// Individual student's Fee due collection record - for school 
apiRouter.post('/get-due-collection-records', (req, res) => {
  var feeDueData = `SELECT stu.name, sfs.class_std, sfs.medium, clr.class_section, ssa.academic_year, ssa.actual_fee, ssa.paying_amount, ssa.payment_status, ssa.payment_mode AS admi_payment_mode, ssa.created_at AS admission_date, due.currently_paying, due.payment_mode, due.due_status, due.created_at AS duepaid_date FROM school_student_admission AS ssa 
  INNER JOIN school_classroom AS clr ON clr.id=ssa.class_section 
  INNER JOIN school_feestructure AS sfs ON sfs.id=clr.class_id 
  LEFT JOIN school_student_feedue AS due ON due.admission_id=ssa.id 
  INNER JOIN school_student AS stu ON stu.student_id = ssa.student_id WHERE ssa.id='${req.body.admission_id}' AND ssa.student_id='${req.body.student_id}'`;
  dbcon.query(feeDueData, (err, feeDueRows) => {
    if(err) res.json({msg: 'error', err});
    res.json({msg: 'success', feeDueRows: feeDueRows});
  })
})

// student asking doubt to his / her staff - modal open
apiRouter.post('/student-ask-doubt', (req, res) => {
  var staffData = `SELECT * FROM school_staff WHERE staff_id='${req.body.staff_selected}'`;
  dbcon.query(staffData, (err, staff) => {
    if(err) res.json({msg: 'error', err})
    res.json({msg: 'success', staff: staff});
  })
})

// student / staff seeing doubt thread
apiRouter.post('/see-doubt-threads', (req, res) => {
  let session = req.session;
  let logged = session.student_id || session.staff_id;
  var doubtThread = `SELECT sdt.message, sdt.message_by, sml.role_id_fk, stu.name AS stu_name, staf.name AS staff_name, sdt.id AS thread_id FROM school_doubt_thread AS sdt LEFT JOIN school_staff AS staf ON staf.staff_id = sdt.message_by LEFT JOIN school_student AS stu ON stu.student_id = sdt.message_by LEFT JOIN school_main_login AS sml ON sml.id = sdt.message_by WHERE doubt_ref_id='${req.body.doubt_ref}' AND sdt.deleted_at IS NULL ORDER BY sdt.id ASC; UPDATE school_doubt_thread SET view_status = 'read' WHERE doubt_ref_id='${req.body.doubt_ref}' AND message_by != ${logged}`;
  dbcon.query(doubtThread, (err, threadMsg) => {
    if(err) res.json({msg: 'error', err});
    res.json({msg: 'success', threadMsg: threadMsg[0], seen: threadMsg[1] });
  })
})

// Add Exam - get subjects assigned to the class sec
apiRouter.post('/get-subjects-from-exam-class', (req, res) => {
  let session = req.session;
  let school = session.schoolId || session.school_id;
  var subjectList = `SELECT sfs.id, sfs.class_std, sfs.medium, batch.batch_name FROM school_feestructure AS sfs INNER JOIN school_batch_mgmt AS batch ON batch.id = sfs.batch_id WHERE sfs.id IN (${req.body.exam_std}) AND sfs.deleted_at IS NULL AND sfs.school_id = '${school}' ORDER BY ABS(sfs.class_std);
  
  SELECT sfs.id AS std_id, sfs.class_std, sfs.medium, clr.id AS sec_id, clr.class_section, subj.id AS subject_id, subj.subject_name, subj.deleted_at FROM school_feestructure AS sfs INNER JOIN school_classroom AS clr ON clr.class_id = sfs.id INNER JOIN school_class_subjects AS scs ON scs.classroom_id = clr.id AND scs.deleted_at IS NULL INNER JOIN school_subjects AS subj ON subj.id = scs.subject_id WHERE sfs.id IN (${req.body.exam_std}) AND subj.deleted_at IS NULL AND sfs.school_id = '${school}'`;

  dbcon.query(subjectList, (err, subjects) => {
    if(err){
      res.json({msg: 'error', err})
    } else if (subjects.length != 0){
      res.json({msg: 'success', std: subjects[0], subjects: subjects[1]})
    } else {
      res.json({msg: 'error', std: subjects[0], subjects: subjects[1]})
    }
  })
})

apiRouter.post('/get-exam-data', (req, res) => {
  var getExamData = `SELECT exam.id, exam.exam_name, sfs.class_std, sfs.medium, clr.class_section, exam.exam_type, subj.id AS subject_id, subj.subject_name, DATE_FORMAT(exam.exam_date, '%d-%c-%Y %H:%i') AS exam_date, exam.exam_duration, exam.sub_outoff_marks, exam.cutoff_mark, exam.exam_status FROM school_exams AS exam INNER JOIN school_classroom AS clr ON clr.id = exam.exam_conducted_class_sec INNER JOIN school_feestructure AS sfs ON sfs.id = clr.class_id INNER JOIN school_subjects AS subj ON subj.id = exam.subject_id WHERE exam.id = '${req.body.exam_id}'`;
  dbcon.query(getExamData, (err, exam) => {
    if(err) {
      res.json({msg: 'error', err});
    } else {
      res.json({msg: 'success', exam: exam});
    }
  })
})

// Teacher and HM Views Exam Marks
apiRouter.post('/get-exam-scores', (req, res) => {
  var getMarks = `SELECT sem.student_id, sem.received_mark, stu.name, xam.cutoff_mark, xam.sub_outoff_marks FROM school_exams_marks AS sem INNER JOIN school_student AS stu ON stu.student_id = sem.student_id INNER JOIN school_exams AS xam ON xam.id = sem.exam_id WHERE sem.exam_id = '${req.body.exam_id}' AND sem.deleted_at IS NULL`;
  dbcon.query(getMarks, (err, markList) => {
    if(err) {
      res.json({msg: 'error', err});
    } else {
      res.json({msg: 'success', markList: markList});
    }
  })
})







module.exports = apiRouter;
