const express = require('express');
const router = express.Router();
const Cars = require('./models/cars');

// fetches all cars

router.get("/cars", async (req, res) => {
  try {
  const cars = await Cars.find();
    res.send(cars)
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
})

// adds a new car

router.post('/cars', async (req, res) => {
  const cars = new Cars({
    brand: req.body.brand,
    model: req.body.model,
    color: req.body.color,
    year: req.body.year
  })

  try {
    const newCar = await cars.save();
    res.status(201).json({ newCar })
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
})

// deletes a car

router.delete("/cars", async (req, res) => {
const _id = (req.body._id);

  await Cars.deleteOne({ _id:_id }, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    else {
      res.status(200).json(result);
    }
  });
})

// edits a car

router.put('/cars/:id', async ( req, res) => {
  await Cars.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true}, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }
    else {
      res.status(200).json({ result })
    }
  })
})

module.exports = router;