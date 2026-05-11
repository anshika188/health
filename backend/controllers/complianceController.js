const Compliance = require('../models/Compliance');

const getComplianceRecords = async (req, res) => {
  try {
    const records = await Compliance.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createComplianceRecord = async (req, res) => {
  try {
    const record = await Compliance.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateComplianceRecord = async (req, res) => {
  try {
    const record = await Compliance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteComplianceRecord = async (req, res) => {
  try {
    const record = await Compliance.findByIdAndDelete(req.params.id);
    if (record) {
      res.json({ message: 'Record removed' });
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getComplianceRecords,
  createComplianceRecord,
  updateComplianceRecord,
  deleteComplianceRecord,
};
