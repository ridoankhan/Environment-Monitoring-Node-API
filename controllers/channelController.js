//Import channel model
Channel = require('../models/channelModel'); 

// Get All Records Started
exports.index = function (req, res, next) {
    Channel.get(function (err, channels) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }else{
            res.status(200).json({
                status: "success",
                message: "All Records Retrieved Successfully",
                data: channels
            });
            //console.log("All Records Retrieved Successfully");
        }
        
    });
};
//Get All Records Ended


// POST New Data Set Started
exports.new = function (req, res, next) {
    var channel = new Channel();
    // channel.field1 = req.body.field1 ? req.body.field1 : "nai";
    channel.field1 = req.body.field1;
    channel.field2 = req.body.field2;
    channel.field3 = req.body.field3;
    channel.field4 = req.body.field4;
    channel.field5 = req.body.field5;
    channel.field6 = req.body.field6;
    channel.field7 = req.body.field7;

    // save the channel and check for errors
    channel.save(function (err) {
         if (err){
            res.json(err);
         } else {
            res.status(201).json({
                message: 'New Record Created into the Channel',
                data: channel
            });
            //console.log("New Record Created into the API");
         }   
    });
};// Handle view channel info


exports.view = function (req, res, next) {
    Channel.findById(req.params.channel_id, function (err, channel) {
        if (err)
            res.send(err);
        res.status(200).json({
            message: 'Record Details are: ',
            data: channel
        });
       // console.log("Requested Record Details");
    });
};// Handle update channel info

exports.update = function (req, res, next) {Channel.findById(req.params.channel_id, function (err, channel) {
        if (err)
        res.status(200).send(err);
        channel.field1 = req.body.filed1 ? req.body.field1 : channel.field1;
        //channel.field1 = req.body.field1;
        channel.field2 = req.body.field2;
        channel.field3 = req.body.field3;
        channel.field4 = req.body.field4;
        channel.field5 = req.body.field5;
        channel.field6 = req.body.field6;
        channel.field7 = req.body.field7;

        // save the channel and check for errors
        channel.save(function (err) {
            if (err){
                res.json(err);
                console.log(err);
            }  
            res.status(201).json({
                status: "201",
                message: "Successfully Updated Record no: " + req.params.channel_id,
                data: channel
            });
            //console.log("Updated Successfully Field Information");
        });
    });
};// Handle delete channel
exports.delete = function (req, res, next) {
    Channel.deleteOne({
        _id: req.params.channel_id
    }, function (err, channel) {
        if (err){
            res.send(err);
        }

        res.status(200).json({
        status: "success (200)",
        message: 'Successfully Deleted Record no: ' + req.params.channel_id
        });
      //  console.log("Deleted Successfully");

    });
};