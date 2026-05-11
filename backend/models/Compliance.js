const mongoose = require('mongoose');

const complianceSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  regulation_type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Compliant', 'Non-Compliant', 'Pending', 'In-Review'],
    default: 'Pending',
  },
  risk_level: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Low',
  },
  last_audit_date: {
    type: Date,
  },
  assigned_officer: {
    type: String,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

const Compliance = mongoose.model('Compliance', complianceSchema);
module.exports = Compliance;
