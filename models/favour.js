const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favourSchema = new Schema({
  title:       { type: String, required: true },
  description: { type: String },

  reward:[{ type: String }],

  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Verified'],
    default: 'Pending'
  },

  favourType: {
    type: String,
    enum: ['Personal', 'Public'],
    default: 'Personal'
  },

  isAnonymous: {
    type: Boolean,
    default: false
  },

  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return !this.isAnonymous;
    }
  },

  to:   { type: Schema.Types.ObjectId, ref: 'User' },

  proofImage:      { type: String },

  claimedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  claimedAt: { type: Date },

  requiredBy: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Favour', favourSchema);
