const express = require("express");
const { updateUserInfo, updatePassword, getUsers, deleteUser, updateRole } = require("../controller/user");
const router = express.Router();
const {verify} = require('../middlewares/verify');

router.get("/getall", getUsers);

router.put("/user", verify, updateUserInfo);
router.put("/change-pass", verify, updatePassword);
router.delete("/delete-user", verify, deleteUser)
router.put("/change-role", verify, updateRole);

module.exports = router;
