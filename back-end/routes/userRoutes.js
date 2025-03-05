const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// keep me on the top please!
// https://api.peerfeedback.betbet.website/users/searchUser?email=user@rit.edu
router.get("/searchUser", userController.searchUser);

// https://api.peerfeedback.betbet.website/users/all
router.get("/all", userController.getAllUsers);

// https://api.peerfeedback.betbet.website/users/getCreatorPermissions?CreatorID=2&GroupID=1
router.get("/getCreatorPermissions", userController.getCreatorPermissions);

// https://api.peerfeedback.betbet.website/users/:groupId
router.get("/:groupId", userController.getUsersByGroupID);

// https://api.peerfeedback.betbet.website/users/username/:username
router.get("/username/:username", userController.getUserByUsername);

// https://api.peerfeedback.betbet.website/users/getCreators/:groupID
router.get("/getCreators/:groupID", userController.getCreators);

// https://api.peerfeedback.betbet.website/users/getCreators/:groupID
router.get("/getResponders/:groupID", userController.getResponders);

// https://api.peerfeedback.betbet.website/users/setCreatorPermissions
router.put("/setCreatorPermissions", userController.setCreatorPermissions)

// https://api.peerfeedback.betbet.website/users/addUser
router.post("/addUser", userController.addUser);

// https://api.peerfeedback.betbet.website/users/setCreator/:groupID
router.post("/setCreator/:groupID", userController.setCreator);

// https://api.peerfeedback.betbet.website/users/getResponder/:groupID
router.post("/setResponder/:groupID", userController.setResponder);

// https://api.peerfeedback.betbet.website/users/:username
router.delete("/:username", userController.deleteUser);

//https://api.peerfeedback.betbet.website/users/reviewer/(reviewer id)
router.get('/reviewer/:reviewerID', userController.getUserByReviewerID);

// https://api.peerfeedback.betbet.website/users/deleteFromGroup/:groupID/:userID
router.delete("/deleteFromGroup/:groupID/:userID", userController.deleteUserFromGroup);

// https://api.peerfeedback.betbet.website/getUserById/:UserID
router.post("/access-level", userController.updateUserAccessLevel);

// URL: https://api.peerfeedback.betbet.website/users/:userId
router.get("/users/:userId", userController.getUserById);

module.exports = router;
