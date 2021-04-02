const router = require("express").Router();
const indexController = require("../../controllers/user/index");

// For Auth
router.route("/store-ip-address").post(indexController.storeIPAddress);

module.exports = router;
