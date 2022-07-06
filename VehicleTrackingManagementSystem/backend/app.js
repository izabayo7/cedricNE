const express = require("express");
const cors = require("cors");

const app = express();

// configure cors
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
    express.urlencoded({ extended: true })
);

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((err) => {
        console.log("Failed to connect to the database!", err);
        process.exit();
    });


app.get("/", (req, res) => {
    res.json({ message: "Welcome to Vehicle Tracking Management System." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/vehicle.routes")(app);
require("./app/routes/carOwner.routes")(app);
require("./app/routes/vehicleCarOwner.routes")(app);

module.exports = app;
