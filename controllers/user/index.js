const firebase = require("../../database/FirebaseConfig");
const error = require("../../utils/errors");

// Global Variables
// 1. Initialize the Firestore
const db = firebase.firestore();
// 2. Create Auth reference
const ipAddressRef = db.collection("ip-addresses");

// Store IP Address
exports.storeIPAddress = async (req, res) => {
  const { ipAddress, location, timeZone, isp } = req.body;

  // 0. Check if user has submitted correct data
  if (!ipAddress) {
    res.status(400).json({
      status: "Fail",
      message: error.errorMessages.nullIpAddress,
    });
    return;
  }

  if (!location) {
    res.status(400).json({
      status: "Fail",
      message: error.errorMessages.nullLocation,
    });
    return;
  }

  if (!timeZone) {
    res.status(400).json({
      status: "Fail",
      message: error.errorMessages.nullTimeZone,
    });
    return;
  }

  if (!isp) {
    res.status(400).json({
      status: "Fail",
      message: error.errorMessages.nullISP,
    });
    return;
  }

  await ipAddressRef.add({
    ipAddress,
    location,
    timeZone,
    isp,
  });

  // 3. Send the user data
  res.status(200).json({
    status: "Success",
    message: "Your IP Address has been stored",
  });
};
