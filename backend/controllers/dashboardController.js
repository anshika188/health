const Compliance = require('../models/Compliance');
const Audit = require('../models/Audit');

const getDashboardStats = async (req, res) => {
  try {
    const totalCompliance = await Compliance.countDocuments();
    const passedAudits = await Audit.countDocuments({ status: 'Completed' });
    const failedAudits = await Compliance.countDocuments({ status: 'Non-Compliant' });
    const highRiskIssues = await Compliance.countDocuments({ risk_level: 'High' });

    // Compliance Score %
    const compliantCount = await Compliance.countDocuments({ status: 'Compliant' });
    const complianceScore = totalCompliance > 0 ? Math.round((compliantCount / totalCompliance) * 100) : 0;

    // Charts data using Aggregation
    const riskDistribution = await Compliance.aggregate([
      { $group: { _id: "$risk_level", count: { $sum: 1 } } },
      { $project: { risk_level: "$_id", count: 1, _id: 0 } }
    ]);

    const departmentScores = await Compliance.aggregate([
      {
        $group: {
          _id: "$department",
          total: { $sum: 1 },
          compliant: {
            $sum: { $cond: [{ $eq: ["$status", "Compliant"] }, 1, 0] }
          }
        }
      },
      { $project: { department: "$_id", total: 1, compliant: 1, _id: 0 } }
    ]);

    res.json({
      kpis: {
        totalCompliance,
        passedAudits,
        failedAudits,
        highRiskIssues,
        complianceScore,
      },
      charts: {
        riskDistribution,
        departmentScores,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };
