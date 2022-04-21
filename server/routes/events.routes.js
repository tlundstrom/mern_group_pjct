const { authenticate } = require("../config/jwt.config");
const EventController = require("../controllers/event.controller");

module.exports = (app) => {
	app.post("/api/events/create", EventController.createEvent);
	app.get("/api/events", EventController.getAllEvents);
	app.get("/api/events/:id", EventController.getOneEvent);
	app.put("/api/events/:id", authenticate, EventController.updateOneEvent);
	app.delete("/api/events/:id", authenticate, EventController.deleteOneEvent);
};
