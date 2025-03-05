const express = require('express');
const router = express.Router();

const groupController = require("../controllers/groupController");

//http://betbet.website/groups/getCreators?GroupId=2
router.get("/getCreators", groupController.getCreators)

//http://betbet.website/groups/(form id)
router.get("/:formId", groupController.getGroupsByFormId);

// http://betbet.website/groups/groupname/:groupID
router.get("/groupname/:groupID", groupController.getGroupNameByGroupID);

//http://betbet.website/groups/createGroup
router.post("/createGroup", groupController.createGroup);

// http://betbet.website/groups/updateGroup
router.post("/updateGroup", groupController.updateGroup);

// http://betbet.website/groups/getGroupIdByFormId/:FormID
router.get("/getGroupIdByFormId/:FormID", groupController.getGroupIdByFormId);

// http://betbet.website/groups/updateGroupName
router.post("/updateGroupName", groupController.updateGroupName);

//http://betbet.website/groups/createGroup
// router.post("/addUser", groupController.addUser);

module.exports = router;