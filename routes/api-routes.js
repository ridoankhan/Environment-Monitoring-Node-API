let express = require('express');       
let router = express.Router();

router.get('/', function (req, res, next) {                      // Defining Message for route /api
    res.status(200).json({
        status: '200',
        message: 'Environment Monitoring Device route /api is working'
    });
    console.log('route /api is working');
});

var channelController = require('../controllers/channelController');    // Importing channelController

router.route('/channels')                      // Routing to Respective Functions in channelController                                        
    .get(channelController.showAllRecords)
    .post(channelController.createNewRecord);
    
router.route('/channel/:channel_id')
    .get(channelController.viewSingleData)
    .patch(channelController.updateSingleData)
    .put(channelController.updateSingleData)
    .delete(channelController.deleteSingleData);
    
module.exports = router;                                                