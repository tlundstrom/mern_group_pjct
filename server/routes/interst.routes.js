const { authenticate } = require("../config/jwt.config");
const InterestController = require("../controllers/interest.controller");

module.exports = (app) => {
	app.post("/api/interests/create", InterestController.createInterest);
	app.get("/api/interests", InterestController.getAllInterests);
	app.put("/api/interests/:id", authenticate, InterestController.updateOneInterest);
	app.delete("/api/interests/:id", authenticate, InterestController.deleteOneInterest);
};
