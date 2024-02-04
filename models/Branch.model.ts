const mongoose = require('mongoose');

module.exports = mongoose.model('branch', {
    branchCode: {type:String},
    branchName: {type:String},
    isActive: {type:Boolean, default:true},
    audit: [{
        userId: {type:String},
        auditedOn: {type:Date, default:Date.now}
    }]  
}, 'branches') 