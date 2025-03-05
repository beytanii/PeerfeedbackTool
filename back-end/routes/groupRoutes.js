const express = require('express');
const router = express.Router();

const groupController = require("../controllers/groupController");

//https://api.peerfeedback.betbet.website/groups/getCreators?GroupId=2
router.get("/getCreators", groupController.getCreators)

//https://api.peerfeedback.betbet.website/groups/(form id)
router.get("/:formId", groupController.getGroupsByFormId);

// https://api.peerfeedback.betbet.website/groups/groupname/:groupID
router.get("/groupname/:groupID", groupController.getGroupNameByGroupID);

//https://api.peerfeedback.betbet.website/groups/createGroup
router.post("/createGroup", groupController.createGroup);

// https://api.peerfeedback.betbet.website/groups/updateGroup
router.post("/updateGroup", groupController.updateGroup);

// https://api.peerfeedback.betbet.website/groups/getGroupIdByFormId/:FormID
router.get("/getGroupIdByFormId/:FormID", groupController.getGroupIdByFormId);

// https://api.peerfeedback.betbet.website/groups/updateGroupName
router.post("/updateGroupName", groupController.updateGroupName);

//https://api.peerfeedback.betbet.website/groups/createGroup
// router.post("/addUser", groupController.addUser);

module.exports = router;