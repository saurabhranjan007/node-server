const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EmployeeDataRecords = new Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    team: { type: String, required: true }, 
})

EmployeeDataRecords.set("toObject", { getters: true })
module.exports = mongoose.model("EmployeeData", EmployeeDataRecords)
