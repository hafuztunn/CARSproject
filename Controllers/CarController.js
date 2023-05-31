const Car = require('../models/Car');


const addCar = (req, res) => {
    const newCar = new Car({
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      price: req.body.price,
      carType: req.body.carType,
      engine: req.body.engine,
      engineType: req.body.engineType,
      images: req.body.images,
      description: req.body.description,
    });
  
    newCar.save()
      .then(() => {
        res.status(201).json({"Success":true, 'Message': 'Car added successfully'});
      })
      .catch(err => {
        res.status(400).json({"Success":false, 'Message': 'Error adding car', 'Error': err.message });
      });
  };


let getAllMakesAndModels = (req, res) => {
    Car.find().select('make model')
        .then(cars => {
            res.status(200).json({ "Success": true, cars });
        })
        .catch(err => {
            res.status(400).json({ "Success": false, 'Message': 'Getting cars failed' });
        });
}


let getCarByMake = (req, res) => {
    const make = req.params.make;
    console.log(make)
    
    Car.find({ make : make })
        .select('make model year')
        .then(car => {
            if (car) {
                res.status(200).json({ "Success": true, car });
            } else {
                res.status(404).json({ "Success": false, 'Message': 'Car not found' });
                
            }
        })
        .catch(err => {
            res.status(400).json({ "Success": false, 'Message': 'Getting car failed' });
        });
}


let getCarByMakeModelYear = (req, res) => {
    const make = req.params.make
    const model = req.params.model
    const year = req.params.year
    console.log(req.body.model)
    Car.findOne({ make, model, year })
        .then(car => {
            if (car) {
                res.status(200).json({ "Success": true, car });
            } else {
                res.status(404).json({ "Success": false, 'Message': 'Car not found' });
                
            }
        })
        .catch(err => {
            res.status(400).json({ "Success": false, 'Message': 'Getting car failed' });
        });
}


let getCarsByDescription = (req, res) => {
    const keyword = req.params.keyword;
    console.log("your key",keyword)

    Car.find({ description: { $regex: keyword, $options: 'i' } })
        .then(cars => {
            if (cars.length > 0) {
                res.status(200).json({ "Success": true, cars });
            } else {
                res.status(404).json({ "Success": false, 'Message': 'No cars found' });
            }
        })
        .catch(err => {
            res.status(400).json({ "Success": false, 'Message': 'Getting cars failed' });
        });
}

module.exports = {
    getCarByMake,
    getAllMakesAndModels,
    getCarByMakeModelYear,
    getCarsByDescription,
    addCar
}
