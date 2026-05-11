const express = require('express');
const {
  getComplianceRecords,
  createComplianceRecord,
  updateComplianceRecord,
  deleteComplianceRecord,
} = require('../controllers/complianceController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getComplianceRecords)
  .post(protect, authorize('Admin', 'Auditor'), createComplianceRecord);

router.route('/:id')
  .put(protect, authorize('Admin', 'Auditor'), updateComplianceRecord)
  .delete(protect, authorize('Admin'), deleteComplianceRecord);

module.exports = router;
