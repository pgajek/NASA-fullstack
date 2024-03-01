const mongoose = require("mongoose");

export const planetsSchema = mongoose.Schema({
  keplerName: { type: String, required: true },
});
