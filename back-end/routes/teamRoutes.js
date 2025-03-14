const express = require('express');
const router = express.Router();

const teamController = require("../controllers/teamController");

// https://api.peerfeedback.betbet.website/teams/teamName?groupID=1&teamID=2
router.get("/teamName", teamController.getTeamName);

//https://api.peerfeedback.betbet.website/teams/users?teamID=2
router.get("/users", teamController.getUsersInTeam);

// https://api.peerfeedback.betbet.website/teams/groupid
router.get("/:groupId", teamController.getTeamsByGroupID);

// Create a new team
router.post("/createTeam", teamController.createTeam);

// Delete a team by ID
router.delete("/deleteTeam/:teamId/:groupId", teamController.deleteTeam); // Route for deleting a team

// https://api.peerfeedback.betbet.website/teams/updateTeamName
router.post("/updateTeamName", teamController.updateTeamName);

module.exports = router;
