Channel = require('../models/channelModel');            //Import Channel Model 

exports.showAllRecords = function (req, res, next) {   // Show All Records Function
    Channel.get(function (err, channels) {
        if (err) {
            res.send(err);
            res.status(404).json({
                status: '404',
                message: 'Failed to Retrieve Records'
            });
            next(err);
        } else {
            res.status(200).json({
                status: "success",
                message: "All Records Retrieved Successfully",
                data: channels
            });
            console.log("All Records Retrieved Successfully");
        }

    });
};

exports.createNewRecord = function (req, res, next) {   // POST New Data Set Function
    var channel = new Channel();

    channel.field1 = req.body.field1;
    channel.field2 = req.body.field2;
    channel.field3 = req.body.field3;
    channel.field4 = req.body.field4;
    channel.field5 = req.body.field5;
    channel.field6 = req.body.field6;
    channel.field7 = req.body.field7;

    channel.save(function (err) {                      // Save New Data Record and Check for Errors
        if (err) {
            res.status(404).json({
                staus: '404',
                message: 'Failed to Create New Record'
            });
            next(err);
        } else {
            res.status(201).json({
                message: 'New Record Created into the Channel',
                data: channel
            });
            console.log("New Record Created into the API");
        }
    });
};

exports.viewSingleData = function (req, res, next) {    //Show Data for Single Record Function
    Channel.findById(req.params.channel_id, function (err, channel) {
        if (err) {
            res.status(404).json({
                message: 'Error Fetching Record - No Matching Record Found',
                message: err
            });
            next(err);
        } else {
            res.status(200).json({
                message: 'Record Details are: ',
                data: channel
            });
            console.log("Requested Record Details");
        }
    });
};

exports.updateSingleData = function (req, res, next) {   //Update Recoord Information Function
    Channel.findById(req.params.channel_id, function (err, channel) {
        if (err) {
            res.send(err);
            next(err);
        } else {
            channel.field1 = req.body.field1;
            channel.field2 = req.body.field2;
            channel.field3 = req.body.field3;
            channel.field4 = req.body.field4;
            channel.field5 = req.body.field5;
            channel.field6 = req.body.field6;
            channel.field7 = req.body.field7;

            channel.save(function (err) {               // Save the Updated Field Records and Check for Errors
                if (err) {
                    res.status(400).json({
                        message: err
                    });
                    next(err);
                } else {
                    res.status(201).json({
                        status: "201",
                        message: "Successfully Updated Record no: " + req.params.channel_id,
                        data: channel
                    });
                    console.log("Updated Successfully Field Information");
                }

            });
        }
    });
};

exports.deleteSingleData = function (req, res, next) {  // Delete Record Function
    Channel.deleteOne({
        _id: req.params.channel_id
    }, function (err, channel) {
        if (err) {
            // res.send(err);
            res.status(404).json({
                message: 'Failed to Delete Record!! Record Could Not be Found'
            });
            next(err);
        } else {
            res.status(200).json({
                status: "success (200)",
                message: 'Successfully Deleted Record no: ' + req.params.channel_id
            });
            console.log("Deleted Successfully");
        }
    });
};