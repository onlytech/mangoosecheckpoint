var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PersonSchema = new Schema({
      name: {
        type: String,
        required: true
      },
      age : {
        type :  Number
     },
      created_at : {
        type :  Date,
        default: new Date()
     },
      updated_at : {
        type :  Date,
        default: null
     },
      deleted_at : {
        type :  Date,
        default: null
     },
      favoriteFoods: [
            { type: String}
        ]

});



module.exports = mongoose.model('Person', PersonSchema);



