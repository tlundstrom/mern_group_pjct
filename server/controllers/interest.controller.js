const Interest = require("../models/interest.model");

module.exports = {
	createInterest: (req, res) => {
		const newInterestObject = new Interest(req.body);

		newInterestObject.createdBy = req.jwtpayload.id;
		newInterestObject
			.save()
			.then((event) => {
				return res.json(event);
			})
			.catch((err) => {
				return res.status(400).json(err);
			});
	},

	getAllInterests: (req, res) => {
		Event.find({})
			.populate("createdBy", "name")
			.then((interest) => {
				res.json(interest);
			})
			.catch((err) => {
				return res.status(400).json({ message: "Something went wrong finding who is going to this event.", error: err });
			});
	},

	updateOneInterest: (req, res) => {
		console.log(req.body);
		Interest.findOneAndUpdate({ createdBy: req.jwtpayload.id, _id: req.params.id }, req.body, { new: true, runValidators: true })
			.then((interest) => {
				return res.json(interest);
			})
			.catch((err) => {
				return res.status(400).json({ message: "Something went wrong updating.", error: err });
			});
	},

	deleteOneInterest: (req, res) => {
		console.log(req.params.id);
		Interest.deleteOne({ createdBy: req.jwtpayload.id, _id: req.params.id })
			.then((deleted) => {
				return res.json(deleted);
			})
			.catch((err) => {
				return res.status(400).json({ message: "Something went wrong updating.", error: err });
			});
	},
};
