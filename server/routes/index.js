const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// I believe that this will have been taken care of via the boiler plate I copied over from the mini app, but who knows. 

// serve up react front-end in production
// router.use((req, res) => {
//   res.sendFile(path.join(__dirname, '../../client/build/index.html'));
// });

module.exports = router;
