require ("dotenv").config({path: "./config/.env"});
require("./config/database");

const express = require("express");

const bodyparser = require ("body-parser");
const fileupload = require("express-fileupload")
const app = express();


//la declaration variables des routes
const appointmentRoutes = require ("./Routes/Appointment.Routes");
const userRoutes = require("./Routes/User.Routes");
const authRoutes = require("./Routes/Auth.Routes");
const doctorRoutes = require("./Routes/Doctor.Routes")
const paramerterRoutes = require ("./Routes/Parameter.Routes");

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));
app.use(fileupload());

// listes de declaration de routes
app.use('/appointment', appointmentRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/doctor', doctorRoutes);
app.use("/params", paramerterRoutes)

app.listen(process.env.PORT, () => {
    console.log("Server is running on port ", process.env.PORT);
});