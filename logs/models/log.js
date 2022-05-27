const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
      trim: true,
    },
    userDetail: {
      type: Object,
      required: true,
    },
    accessTime: {
      type: Number,
      required: true,
    },
    requestObject: {
      type: Object,
      required: true,
    },
    responseObject: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true },
);

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;
