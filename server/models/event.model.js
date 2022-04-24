import axios from "axios";
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
			required: [true, "Event date is required."],
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
	let streetAddress = this.location;
	axios
		.get("https://maps.googleapis.com/maps/api/geocode/json", {
			params: {
				address: streetAddress,
				key: process.env.MAPS_API_KEY,
			},
		})
		.then((res) => {
			this.location = res.data.results[0].geometry.location;
			next();
		})
		.catch((err) => console.log(err));
});

eventSchema.post("find", function (next) {
	console.log("in postfind");
	let latlng = this.location;
	axios
		.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.lat},${latlng.lng}&key=${process.env.MAPS_API_KEY}`, {})
		.then((res) => {
			this.location = res.data.results[0].formatted_address;
			next();
		})
		.catch((err) => console.log(err));
});

eventSchema.virtual("url").get(function () {
	return "/events/" + this._id;
});

module.exports = mongoose.model("Event", eventSchema);
