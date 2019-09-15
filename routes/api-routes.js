//Initialize express router
let express = require('express');
let router = express.Router();// Set default API response
router.get('/', function (req, res, next) {
    
    res.status(200).json({
        status: 'route /api is working',
        message: 'Environment Monitoring Device',
    });
    console.log('route /api is working');
});

// Import channel controller

var channelController = require('../controllers/channelController');

// channel routes
router.route('/channels')
    .get(channelController.index)
    .post(channelController.new);
    
router.route('/channel/:channel_id')
    .get(channelController.view)
    .patch(channelController.update)
    .put(channelController.update)
    .delete(channelController.delete);// Export API routes
    
module.exports = router;