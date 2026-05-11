const express = require('express');
const {
  getAudits,
  createAudit,
  updateAudit,
  deleteAudit,
} = require('../controllers/auditController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getAudits)
  .post(protect, authorize('Admin', 'Auditor'), createAudit);

router.route('/:id')
  .put(protect, authorize('Admin', 'Auditor'), updateAudit)
  .delete(protect, authorize('Admin'), deleteAudit);

module.exports = router;
