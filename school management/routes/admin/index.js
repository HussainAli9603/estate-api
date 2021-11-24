let express = require('express'),
    userRouter = require('./adminUser'),
    router = express.Router();


router.use(userRouter);

module.exports = router;