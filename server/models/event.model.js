const axios = require("axios");
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
			streetAddress: {
				type: String,
				required: [true, "Event location is required."],
			},
			lat: {
				type: Number,
			},
			lng: {
				type: Number,
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
			required: [true, "Event date is required."],
		},
		category: {
			type: String,
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
				ref: "Interested",
			},
		],
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

eventSchema.pre("save", function (next) {
	console.log("in presave");
	let address = this.location;
	axios
		.get("https://maps.googleapis.com/maps/api/geocode/json", {
			params: {
				address: address,
				key: process.env.MAPS_API_KEY,
			},
		})
		.then((res) => {
			this.location.streetAddress = res.data.results[0].formatted_address;
			this.location.lat = res.data.results[0].geometry.location.lat;
			this.location.lng = res.data.results[0].geometry.location.lng;
			next();
		})
		.catch((err) => console.log(err));
});

eventSchema.virtual("url").get(function () {
	return "/events/" + this._id;
});

module.exports = mongoose.model("Event", eventSchema);
