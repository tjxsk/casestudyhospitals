const express = require('express');
const fs = require('fs');




const router = new express.Router();
router.use(express.json());

// console.log(__dirname);





// get operation
router.get('/home', (req, res) => {
    fs.readFile('./hospitaldetails.json', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        var hospitals = JSON.parse(data);
        res.json(hospitals);
    });
});

//post operation

router.post('/add', (req, res) => {
    var newhospital = req.body;
    fs.readFile('./hospitaldetails.json', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        var hospitals = JSON.parse(data);
        hospitals.push(newhospital);
        fs.writeFile('./hospitaldetails.json', JSON.stringify(hospitals), (err) => {
            if (err) {
                console.error(err);
            }
            // res.json(hospitals);
        });
    });
    
    res.send('added successfull');
});

//put  operation

router.put('/edit', (req, res) => {
    var hospitalName = req.params.name;
    var updatedDetail = req.body;
    fs.readFile('./hospitaldetails.json', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        var hospitals = JSON.parse(data);
        var index = hospitals.findIndex(hospital => hospital.name === hospitalName);
        if (index !== -1) {
            hospitals[index] = updatedDetail;
            fs.writeFile('./hospitaldetails.json', JSON.stringify(hospitals), (err) => {
                if (err) {
                    console.error(err);
                }
                res.json(hospitals);
                });
        }
    });

});

// //Delete operation

router.delete('/remove', (req, res) => {
    var hospitalName = req.params.name;
    fs.readFile('./hospitaldetails.json',(err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        var hospitals = JSON.parse(data);
            hospitals.pop();
            fs.writeFile('./hospitaldetails.json', JSON.stringify(hospitals), (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                res.json(hospitals);
            });
    });
});


module.exports = router;

