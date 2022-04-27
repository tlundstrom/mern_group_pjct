const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interestSchema = new Schema(
	{
		interested: {
			type: Boolean,
		},
		going: {
			type: Boolean,
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
<<<<<<< HEAD
module.exports = mongoose.model("Interest", interestSchema);
=======


module.exports = mongoose.model("Interested", interestSchema);

>>>>>>> b2ec7478d924d18d26930069c929a8fa6bfa68e6
