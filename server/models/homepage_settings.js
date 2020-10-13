const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const HomepageSettingsSchema = new Schema({
    sections: [Schema.Types.Mixed],
    name:String
});


const HomepageSettings = mongoose.model('homepage_settings', HomepageSettingsSchema);

module.exports = HomepageSettings;