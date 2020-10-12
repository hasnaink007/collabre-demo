const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const PreferencesSchema = new Schema({
    meta_key: String,
    meta_value: String
});


const PreferencesModel = mongoose.model('preferenes', PreferencesSchema);

module.exports = PreferencesModel;