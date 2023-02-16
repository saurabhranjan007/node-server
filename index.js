const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require("cors");

const EmployeeData = require('./models/employee')

const app = express()
app.use(express.json())
app.use(bodyParser.json());
app.use(cors()); 


mongoose.connect('mongodb+srv://nodeuser:nodeuser@cluster0.dfhaetf.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
})

// ------------ CREATE --------
app.get('/employee/add', async(req, res) => {

    console.log("Inside <CREATE>");

    try {
        const employee = new EmployeeData({ 
            name: "Saurabh Ranjan",
            department: "Full Stack Development",
            team: "Custom Dev"
        })
        await employee.save()
        
        res.send(employee)

    } catch (error) {
        res.send("Error in creating data")
    }
    
})

// -------- GET ---------
app.get('/employee/get', async(req, res) => {

    console.log('Inside <GET>');

    try {
        const employee_data = await EmployeeData.find().exec()
        console.log('Employee Data', employee_data);
        res.send(employee_data)
        
    } catch (error) {
        console.log("Error in creating Employee Record", error);
    }

})

// -------- UPDATE ---------- 
app.post('/employee/update', async(req, res) => {

    console.log("Inside <UPDATE>. Body ", req.body);

    if(!req.body) return

    try {
        const updateDoc = await EmployeeData.updateOne({ _id: req.body.id }, {
            $set: {
                name: req.body.name,
                department: req.body.department, 
                team: req.body.team
            }
        })
        console.log('updated doc ', updateDoc);

        res.send(updateDoc)

    } catch (error) {
        console.log("Error in updating doc ", error);
        res.send(error)
    }

})

// -------------------- DELETE ---------------
app.post('/employee/delete', async(req, res) => {

    console.log("Inside <DELETE>, del id - ", req.body);

    if(!req.body.id) return 

    try {
        const delData = await EmployeeData.deleteOne({ _id: req.body.id }).exec(); 
        console.log('deleted ', delData);
        res.send(delData)

    } catch (error) {
        console.log("Error in deleting data ", error);
        res.send(error)
    }

})

// -------------->> 
app.listen(3001, async(req, res) => 
    console.log('App is running at 3001')
); 
