const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favorSchema = new Schema({
  title:       { type: String, required: true },
  description: { type: String },

  reward:      [{ type: String }], // Optional and user-defined

  status: {
    type: String,
    enum: ['pending', 'completed', 'verified'],
    default: 'pending'
  },

  favorType: {
    type: String,
    enum: ['personal', 'public'],
    default: 'personal'
  },

  from: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Who owes
  to:   { type: Schema.Types.ObjectId, ref: 'User' }, // Optional recipient

  proofImage:      { type: String }, // Optional URL
  proofUploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },

  claimedBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Only for public favors
  claimedAt: { type: Date },

  requiredBy: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Favor', favorSchema);
