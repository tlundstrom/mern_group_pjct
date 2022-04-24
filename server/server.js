require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.MY_PORT;

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

require("./config/mongoose.config");

require("./routes/users.routes")(app);

require("./routes/interest.routes")(app);

app.listen(port, () => console.log(`Listening on port: ${process.env.MY_PORT}`));
