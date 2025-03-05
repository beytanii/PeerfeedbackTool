const express = require('express');
const router = express.Router();

const answersController = require("../controllers/answersController");

//https://api.peerfeedback.betbet.website/answers/responses/form?formID=1&userID=1
router.get("/responses/form", answersController.getResponsesFromUser);

//https://api.peerfeedback.betbet.website/answers/getuserevaluations/?formID=1&userID=1
router.get("/getuserevaluations", answersController.getEvaluationsOfUser);

//https://api.peerfeedback.betbet.website/assignments/incomplete?formID=2&reviewerID=1
router.get("/incomplete", answersController.checkIncompleteAssignments);

//https://api.peerfeedback.betbet.website/answers/responses/number?formID=2
router.get("/responses/number", answersController.getNumberOfResponses);

//https://api.peerfeedback.betbet.website/answers/insert
router.post("/insert", answersController.insertResponses);

//https://api.peerfeedback.betbet.website/answers/getAllAnswersByForm
router.post("/getAllAnswersByForm", answersController.getAllAnswersFromForm);

module.exports = router;