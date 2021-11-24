let express = require('express'),
    userRouter = require('./user')
    parentsRouter = require('./parents')
    studentsRouter = require('./students')
    teachersRouter = require('./teachers')

    router = express.Router();


router.use(userRouter);
router.use(parentsRouter);
router.use(studentsRouter);
router.use(teachersRouter);

module.exports = router;