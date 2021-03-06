const express = require('express');

const Planet = require('./Planet');
const Character = require('../characters/Character');
const Specie = require('../species/Specie');

const router = express.Router();

router.route('/').get((req, res) => {
  Planet.find({})
    .then(planets => {
      res.status(200).json(planets);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.route('/:id').get((req, res) => {
  const { id } = req.params;

  const findCharacters = Character.find({ homeworld: id }).select({
    name: 1,
    _id: 0,
  });

  const findSpecies = Specie.find({ homeworld: id }).select({
    name: 1,
    _id: 0,
  });

  Promise.all([findCharacters, findSpecies])
    .then(data => {
      res.status(200).json({ characters: data[0], species: data[1] });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
