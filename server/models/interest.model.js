const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interestSchema = new Schema(
	{
		going: {
			type: Boolean,
			required: [true, "Something went wrong..."],
		},
		event: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Interest", interestSchema);
