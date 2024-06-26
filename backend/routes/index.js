const express = require("express");
const router = express.Router();
const userRoute = require("./user.Route");
const adminRoute = require("./adminRoute");
const employeeRoute = require("./employeeRoute");
const candidateRoute = require("./candidateRoute");
const expenseRoute = require("./expenseRoute");
const helpCenterRoute = require("./helpCenterRoute");
const consultancyRoute = require("./consultancyRoute");


router.use("/user", userRoute);
router.use("/admin", adminRoute);
router.use("/employee", employeeRoute);
router.use("/candidate", candidateRoute);
router.use("/expense", expenseRoute);
router.use("/help-center", helpCenterRoute);
router.use("/consultancy", consultancyRoute);

module.exports = router;
