let express = require('express'),
    userRouter = require('./user'),
//    
    router = express.Router();


router.use(userRouter);

module.exports = router;