const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Obtener todos los servicios
router.get('/', async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

// Crear un nuevo servicio
router.post('/', async (req, res) => {
  const service = new Service(req.body);
  await service.save();
  res.status(201).json(service);
});

// Actualizar un servicio
router.put('/:id', async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(service);
});

// Eliminar un servicio
router.delete('/:id', async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
