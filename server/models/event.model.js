const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
	{
		name: {
			type: String,
			minlength: [2, "The event's name must be at least 2 characters."],
			required: [true, "Event name is required."],
		},
		location: {
			lat: {
				type: Number,
				required: [true, "Event location is required."],
			},
			lng: {
				type: Number,
				required: [true, "Event location is required."],
			},
		},
		img: {
			type: String,
		},
		time: {
			type: String,
			required: [true, "Event time is required."],
		},
		date: {
			type: String,
			required: [true, "Event date is required."],
		},
		info: {
			type: String,
			required: [true, "Event info is required."],
		},
		interested: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Interested",
			},
		],
		going: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Going",
			},
		],
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

eventSchema.virtual("url").get(function () {
	return "/events/" + this._id;
});

module.exports = mongoose.model("Event", eventSchema);
