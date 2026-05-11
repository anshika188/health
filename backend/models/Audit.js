const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  audit_name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  auditor: {
    type: String,
    required: true,
  },
  audit_date: {
    type: Date,
  },
  findings: {
    type: String,
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Low',
  },
  status: {
    type: String,
    enum: ['Completed', 'In-Progress', 'Scheduled'],
    default: 'Scheduled',
  },
  corrective_actions: {
    type: String,
  },
}, {
  timestamps: true,
});

const Audit = mongoose.model('Audit', auditSchema);
module.exports = Audit;
