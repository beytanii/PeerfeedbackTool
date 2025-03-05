const express = require('express');
const router = express.Router();

const formController = require('../controllers/formController');

// http://betbet.website/forms/user/{userID}
router.get("/user/:userId", formController.getFormsByUserID);

// http://betbet.website/forms/creator/{creatorIDHERE}
router.get("/creator/:creatorId", formController.getFormsByCreatorID);  

// http://betbet.website/forms/insert
router.post("/insert", formController.insertForm);

// http://betbet.website/forms/id/{formIDHERE}
router.get('/id/:formID', formController.getFormByID);

// http://betbet.website/forms/updateForm
router.put('/updateForm', formController.updateForm);

// http://betbet.website/forms/delete
router.delete('/delete', formController.deleteForm)

router.get('/edit/:groupId/:userId', formController.getEditForm);
router.put('/edit/', formController.setEditForm);
router.get('/:formID/assigned', formController.getAssignedDate);
router.get('/:formID/deadline', formController.getDeadlineDate);

// http://betbet.website/forms/delete
router.post('/markFormAsCompleted', formController.markFormAsCompleted);

module.exports = router;