let express = require('express');
let passport = require('passport');
let router = express.Router();
const adminUserScript = require('./scripts/AdminUserScripts');
let jwt = require('jsonwebtoken');
let jwtConfig = require('../../config/jwtConfig');

router.get('/admin/dashboard',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetDashboard(req, res);
});
router.post('/admin/register', (req, res) => {
    adminUserScript.Register(req, res);
});

router.get('/admin/get/all-message', (req, res) => {
    adminUserScript.GetAllMessagess(req, res);
});
router.get('/admin/message', (req, res) => {
    adminUserScript.message(req, res);
});
router.post('/admin/add/message', (req, res) => {
    adminUserScript.CreateMessage(req, res);
});


router.get('/admin/reset-password',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetResetPassword(req, res);
});
router.post('/admin/add/reset-password',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.PostResetPassword(req, res);
});


router.get('/admin/logout',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetLogout(req, res);
});


router.get('/admin/get/access-account',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetAccountAccess(req, res);
});
router.post('/admin/add/access-account',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.CreateAccountAccess(req, res);
});

router.get('/admin/get/notice-board',isLoggedIn, isAdmin,(req, res) => {
    adminUserScript.GetNotesBoard(req, res);
});
router.post('/admin/add/notice-board',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.CreateNotesBoard(req, res);
});

router.get('/admin/get/class-time-table',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetClassTimeTable(req, res);
});
router.post('/admin/add/class-time-table',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.CreateClassTimeTable(req, res);
});

router.get('/admin/get/student',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetAddStudentPage(req, res);
});
router.get('/admin/get/all/students',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetAllStudents(req, res);
});
router.post('/admin/add/student',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.CreateStudent(req, res);
});


router.get('/admin/get/teacher',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetAddTeacherPage(req, res);
});
router.get('/admin/get/all/teachers',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetAllTeachers(req, res);
});
router.post('/admin/add/teacher',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.CreateTeacher(req, res);
});


router.get('/admin/get/parent',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetAddParentPage(req, res);
});
router.get('/admin/get/all/parents',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetAllParents(req, res);
});
router.post('/admin/add/parent',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.CreateParent(req, res);
});

router.get('/admin/get/expense',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetAddExpensePage(req, res);
});
router.get('/admin/get/all/fees-collection',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetAllFeeCollection(req, res);
});
router.get('/admin/get/all/expenses',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetAllExpenses(req, res);
});
router.post('/admin/add/expenses',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.CreateExpense(req, res);
});

router.get('/admin/get/class',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetAddClassPage(req, res);
});
router.get('/admin/get/all/class',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetAllClass(req, res);
});
router.post('/admin/add/class',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.CreateClass(req, res);
});

router.get('/admin/get/all/exam',isLoggedIn, isAdmin,(req, res) => {
    adminUserScript.GetAllExam(req, res);
});
router.post('/admin/add/exam',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.CreateExam(req, res);
});

router.get('/admin/get/all/exam-grade',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetAllExamGrade(req, res);
});
router.post('/admin/add/exam-grade',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.CreateExamGrade(req, res);
});


router.get('/admin/get/dmc-issue',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetDMCIssue(req, res);
});
router.get('/admin/get/dmc',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetAddDMCIssue(req, res);
});
router.post('/admin/post/dmc',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.CreateDMCIssue(req, res);
});




router.get('/admin/get/application-approval',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetApplicationApproval(req, res);
});
router.get('/admin/get/complaint', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.GetComplaint(req, res);
});


router.get('/admin/get/setting', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.GetSetting(req, res);
});
router.get('/admin/edit/get/setting/:id',isAdmin, isLoggedIn,(req, res) => {
    adminUserScript.GetEditSetting(req, res);
});
router.post('/admin/edit/setting/:id',isAdmin, isLoggedIn,(req, res) => {
    adminUserScript.PostEditSetting(req, res);
});
router.post('/admin/setting',isAdmin,(req, res) => {
    adminUserScript.CreateSetting(req, res);
});



router.get('/admin/get/hostel',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetHostel(req, res);
});
router.post('/admin/add/hostel',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.AddHostel(req, res);
});
router.get('/admin/get/transport', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.GetTransport(req, res);
});

router.get('/admin/get/all-books',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetAllBook(req, res);
});
router.get('/admin/add/books', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.GetAddBook(req, res);
});
router.post('/admin/add/post/books', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.PostAddBook(req, res);
});


router.get('/admin/get/assign/subject',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.GetAssignSubject(req, res);
});
router.post('/admin/post/assign/subject',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.CreateAssignSubject(req, res);
});

router.post('/admin/search/student',isLoggedIn,isAdmin, (req, res) => {
    adminUserScript.searchStudents(req, res);
});


router.get('/admin/edit/get/student/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.GetEditStudent(req, res);
});
router.post('/admin/edit/student/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.PostEditStudent(req, res);
});
router.get('/admin/delete/student/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.DeleteStudent(req, res);
});

router.get('/admin/edit/get/teacher/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.GetEditTeacher(req, res);
});
router.post('/admin/edit/teacher/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.PostEditTeacher(req, res);
});
router.get('/admin/delete/teacher/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.DeleteTeacher(req, res);
});


router.get('/admin/edit/get/parent/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.GetEditParent(req, res);
});
router.post('/admin/edit/parent/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.PostEditParent(req, res);
});
router.get('/admin/delete/parent/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.DeleteParent(req, res);
});

router.get('/admin/edit/get/expenses/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.GetEditExpenses(req, res);
});
router.post('/admin/edit/expenses/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.PostEditExpenses(req, res);
});
router.get('/admin/delete/expenses/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.DeleteExpenses(req, res);
});

router.get('/admin/edit/get/fee/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.GetEditFee(req, res);
});
router.post('/admin/edit/fee/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.PostEditFee(req, res);
});
router.get('/admin/delete/fee/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.DeleteFee(req, res);
});


router.get('/admin/edit/get/class/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.GetEditClass(req, res);
});
router.post('/admin/edit/class/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.PostEditClass(req, res);
});
router.get('/admin/delete/class/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.DeleteClass(req, res);
});


router.get('/admin/edit/get/class_time/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.GetEditClassTimeTable(req, res);
});
router.post('/admin/edit/class_time/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.PostEditClassTimeTable(req, res);
});
router.get('/admin/delete/class_time/:id', isLoggedIn,isAdmin,(req, res) => {
    adminUserScript.DeleteClassTimeTable(req, res);
});

router.get('/admin/forgot-password',(req, res) => {
    adminUserScript.GetForgotPassword(req, res);
});
router.post('/admin/add/forgot-password',(req, res) => {
    adminUserScript.CreateForgotPassword(req, res);
});



function isAdmin(req, res, next) {
    if (req.isAuthenticated()){
        if(req.user.roleId && req.user.roleId =='Admin'){
            return next();
        }
        else{
            return res.redirect('back');
        }
        
    }
        
    return res.redirect('/');
}



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    return res.redirect('/');
}


module.exports = router;


