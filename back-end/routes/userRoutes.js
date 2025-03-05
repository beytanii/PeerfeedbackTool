const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// keep me on the top please!
// http://api.peerfeedback.betbet.website/users/searchUser?email=user@rit.edu
router.get("/searchUser", userController.searchUser);

// http://api.peerfeedback.betbet.website/users/all
router.get("/all", userController.getAllUsers);

// http://api.peerfeedback.betbet.website/users/getCreatorPermissions?CreatorID=2&GroupID=1
router.get("/getCreatorPermissions", userController.getCreatorPermissions);

// http://api.peerfeedback.betbet.website/users/:groupId
router.get("/:groupId", userController.getUsersByGroupID);

// http://api.peerfeedback.betbet.website/users/username/:username
router.get("/username/:username", userController.getUserByUsername);

// http://api.peerfeedback.betbet.website/users/getCreators/:groupID
router.get("/getCreators/:groupID", userController.getCreators);

// http://api.peerfeedback.betbet.website/users/getCreators/:groupID
router.get("/getResponders/:groupID", userController.getResponders);

// http://api.peerfeedback.betbet.website/users/setCreatorPermissions
router.put("/setCreatorPermissions", userController.setCreatorPermissions)

// http://api.peerfeedback.betbet.website/users/addUser
router.post("/addUser", userController.addUser);

// http://api.peerfeedback.betbet.website/users/setCreator/:groupID
router.post("/setCreator/:groupID", userController.setCreator);

// http://api.peerfeedback.betbet.website/users/getResponder/:groupID
router.post("/setResponder/:groupID", userController.setResponder);

// http://api.peerfeedback.betbet.website/users/:username
router.delete("/:username", userController.deleteUser);

//http://api.peerfeedback.betbet.website/users/reviewer/(reviewer id)
router.get('/reviewer/:reviewerID', userController.getUserByReviewerID);

// http://api.peerfeedback.betbet.website/users/deleteFromGroup/:groupID/:userID
router.delete("/deleteFromGroup/:groupID/:userID", userController.deleteUserFromGroup);

// http://api.peerfeedback.betbet.website/getUserById/:UserID
router.post("/access-level", userController.updateUserAccessLevel);

// URL: http://api.peerfeedback.betbet.website/users/:userId
router.get("/users/:userId", userController.getUserById);

module.exports = router;
