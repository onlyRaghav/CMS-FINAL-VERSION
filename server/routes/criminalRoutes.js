import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  getAllCriminals,
  getCriminalById,
  createCriminal,
  updateCriminal,
  deleteCriminal,
} from '../controllers/criminalController.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAllCriminals);

router.get('/:id', getCriminalById);

router.post('/', createCriminal);

router.put('/:id', updateCriminal);

router.delete('/:id', deleteCriminal);

export default router;
