const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

router.post("/", userController.createUser);
router.get("/", userController.findAll);
router.get("/:email", userController.findUserByEmail);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
