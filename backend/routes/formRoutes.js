import express from 'express';
import { submitForm } from '../controllers/formController.js';

const router = express.Router();

// POST endpoint for form submission
router.post('/submit', submitForm);

export default router;

