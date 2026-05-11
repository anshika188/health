const Audit = require('../models/Audit');

const getAudits = async (req, res) => {
  try {
    const audits = await Audit.find();
    res.json(audits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAudit = async (req, res) => {
  try {
    const audit = await Audit.create(req.body);
    res.status(201).json(audit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAudit = async (req, res) => {
  try {
    const audit = await Audit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (audit) {
      res.json(audit);
    } else {
      res.status(404).json({ message: 'Audit not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAudit = async (req, res) => {
  try {
    const audit = await Audit.findByIdAndDelete(req.params.id);
    if (audit) {
      res.json({ message: 'Audit removed' });
    } else {
      res.status(404).json({ message: 'Audit not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAudits,
  createAudit,
  updateAudit,
  deleteAudit,
};
