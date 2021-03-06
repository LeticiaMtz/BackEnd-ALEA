const alert = require('../models/Alert');
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');


const alertController = {};


// /GET all alert
alertController.getAlerts = async(req, res) => {
        const alerts = await alert.find();
        res.json(alerts);
    }
    // /GET only one alert
alertController.getAlert = async(req, res) => {
    const getAle = await alert.findById(req.params.id);
    res.json(getAle);
}

let hoy = new Date();
let dd = hoy.getDate();
let mm = hoy.getMonth();
let yyyy = hoy.getFullYear();
let hr = hoy.getHours();
let min = hoy.getMinutes();

let datecreacion = dd + '/' + mm + '/' + yyyy;
let dateactual = dd + '/' + mm + '/' + yyyy;

if (datecreacion != dateactual && dd > 5) {
    status = "La alerta se encuentra pendiente";
}

if (datecreacion != dateactual && dd < 5) {
    status = "Alerta activa";
}
if (datecreacion != dateactual && dd > 10) {
    status = "Alerta sin seguimiento";
}
// /POST new alert
alertController.createAlert = async(req, res) => {
        const newAlert = new alert(req.body);
        await newAlert.save();
        res.json({
            status: "Alert saved"
        });
    }
    // /PUT update alert
alertController.editAlert = async(req, res) => {
    const { id } = req.params;
    const oneAlert = {
        matricula: req.params.matricula,
        nombre_alumno: req.params.nombre_alumno,
        programa_educativo: req.params.programa_educativo,
        incidencia: req.params.incidencia,
        seguimiento: req.params.seguimiento,
        fecha: req.params.fecha
    };
    await alert.findByIdAndUpdate(id, { $set: oneAlert }, { new: true });
    res.json({
        status: "Alert Updated"
    })
}

// /DELETE alert
alertController.deleteAlert = async(req, res) => {
    await alert.findByIdAndRemove(req.params.id);
    res.json({
        status: "Alert Deleted"
    })
}

module.exports = alertController;