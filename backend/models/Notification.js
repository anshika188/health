const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Alert', 'Update', 'Action'],
    default: 'Update',
  },
  is_read: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
