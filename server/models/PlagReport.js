const mongoose = require('mongoose')

const PlagReportSchema = new mongoose.Schema({
	report:[mongoose.Schema.Types.Mixed]
});

const PlagReport = mongoose.model('plag_report',PlagReportSchema)
module.exports = PlagReport