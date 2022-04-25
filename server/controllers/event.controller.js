const Event = require("../models/event.model");

module.exports = {
	createEvent: (req, res) => {
		const newEventObject = new Event(req.body);
		newEventObject.createdBy = req.jwtpayload.id;
		newEventObject
			.save()
			.then((event) => {
				return res.json(event);
			})
			.catch((err) => {
				return res.status(400).json(err);
			});
	},

	getAllEvents: (req, res) => {
		Event.find({})
			.populate("createdBy", "name")
			.then((events) => {
				res.json(events);
			})
			.catch((err) => {
				return res.status(400).json({ message: "Something went wrong finding all the events.", error: err });
			});
	},

	getOneEvent: (req, res) => {
		Event.find({ _id: req.params.id })
			.then((event) => {
				return res.json(event);
			})
			.catch((err) => {
				return res.status(400).json({ message: "Something went wrong finding that event.", error: err });
			});
	},

	updateOneEvent: (req, res) => {
		console.log(req.body);
		Event.findOneAndUpdate({ createdBy: req.jwtpayload.id, _id: req.params.id }, req.body, { new: true, runValidators: true })
			.then((event) => {
				return res.json(event);
			})
			.catch((err) => {
				return res.status(400).json({ message: "Something went wrong updating that event.", error: err });
			});
	},

	deleteOneEvent: (req, res) => {
		console.log(req.params.id);
		Event.deleteOne({ createdBy: req.jwtpayload.id, _id: req.params.id })
			.then((deleted) => {
				return res.json(deleted);
			})
			.catch((err) => {
				return res.status(400).json({ message: "Something went wrong deleting that event.", error: err });
			});
	},
};
