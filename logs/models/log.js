const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
      trim: true,
    },
    user_detail: {
      type: Object,
      required: true,
    },
    api_access_time: {
      type: Number,
      required: true,
    },
    request_object: {
      type: Object,
      required: true,
    },
    response_object: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true },
);

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;
