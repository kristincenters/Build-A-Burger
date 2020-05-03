var express = require("express");

var router = express.Router();

var cat = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    cat.all(function (data) {
        var hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burger", function (req, res) {
    cat.create(["name", "Devoured"], [req.body.name, req.body.devoured], function (result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

router.put("/api/burger/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    cat.update(
        {
            devoured: req.body.devoured
        },
        condition,
        function (result) {
            if (result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();

        }
    );
});

module.exports = router;
