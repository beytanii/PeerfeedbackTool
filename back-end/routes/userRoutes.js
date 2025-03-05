const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// keep me on the top please!
// http://betbet.website/users/searchUser?email=user@rit.edu
router.get("/searchUser", userController.searchUser);

// http://betbet.website/users/all
router.get("/all", userController.getAllUsers);

// http://betbet.website/users/getCreatorPermissions?CreatorID=2&GroupID=1
router.get("/getCreatorPermissions", userController.getCreatorPermissions);

// http://betbet.website/users/:groupId
router.get("/:groupId", userController.getUsersByGroupID);

// http://betbet.website/users/username/:username
router.get("/username/:username", userController.getUserByUsername);

// http://betbet.website/users/getCreators/:groupID
router.get("/getCreators/:groupID", userController.getCreators);

// http://betbet.website/users/getCreators/:groupID
router.get("/getResponders/:groupID", userController.getResponders);

// http://betbet.website/users/setCreatorPermissions
router.put("/setCreatorPermissions", userController.setCreatorPermissions)

// http://betbet.website/users/addUser
router.post("/addUser", userController.addUser);

// http://betbet.website/users/setCreator/:groupID
router.post("/setCreator/:groupID", userController.setCreator);

// http://betbet.website/users/getResponder/:groupID
router.post("/setResponder/:groupID", userController.setResponder);

// http://betbet.website/users/:username
router.delete("/:username", userController.deleteUser);

//http://betbet.website/users/reviewer/(reviewer id)
router.get('/reviewer/:reviewerID', userController.getUserByReviewerID);

// http://betbet.website/users/deleteFromGroup/:groupID/:userID
router.delete("/deleteFromGroup/:groupID/:userID", userController.deleteUserFromGroup);

// http://betbet.website/getUserById/:UserID
router.post("/access-level", userController.updateUserAccessLevel);

// URL: http://betbet.website/users/:userId
router.get("/users/:userId", userController.getUserById);

module.exports = router;
