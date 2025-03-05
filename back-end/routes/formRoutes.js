const express = require('express');
const router = express.Router();

const formController = require('../controllers/formController');

// https://api.peerfeedback.betbet.website/forms/user/{userID}
router.get("/user/:userId", formController.getFormsByUserID);

// https://api.peerfeedback.betbet.website/forms/creator/{creatorIDHERE}
router.get("/creator/:creatorId", formController.getFormsByCreatorID);  

// https://api.peerfeedback.betbet.website/forms/insert
router.post("/insert", formController.insertForm);

// https://api.peerfeedback.betbet.website/forms/id/{formIDHERE}
router.get('/id/:formID', formController.getFormByID);

// https://api.peerfeedback.betbet.website/forms/updateForm
router.put('/updateForm', formController.updateForm);

// https://api.peerfeedback.betbet.website/forms/delete
router.delete('/delete', formController.deleteForm)

router.get('/edit/:groupId/:userId', formController.getEditForm);
router.put('/edit/', formController.setEditForm);
router.get('/:formID/assigned', formController.getAssignedDate);
router.get('/:formID/deadline', formController.getDeadlineDate);

// https://api.peerfeedback.betbet.website/forms/delete
router.post('/markFormAsCompleted', formController.markFormAsCompleted);

module.exports = router;