var mongoose = require('mongoose');// Setup schema
var channelSchema = mongoose.Schema({
    field1: {
        type: String,
        required: true
    },
    field2: {
        type: String,
        required: true
    },
    field3: {
        type: String,
        required: true
    },
    field4: {
        type: String,
        required: true
    },
    field5: {
        type: String,
        required: true
    },
    field6: {
        type: String,
        required: true
    },
    field7: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var Channel = module.exports = mongoose.model('channel', channelSchema); // Export Channel Model

module.exports.get = function (callback, limit) {
    Channel.find(callback).limit(limit);
}