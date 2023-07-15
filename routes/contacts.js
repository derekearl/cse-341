const express = require('express');

const proContacts = require('../controllers/contacts');

const router = express.Router();

// GET /feed/posts
router.get('/', proContacts.getAll);

router.get('/:id', proContacts.getSingle);
// localhost:8080/professional/
router.post('/', proContacts.createContact);

router.put('/:id', proContacts.changeContact);

router.delete('/:id', proContacts.deleteContact);

module.exports = router;