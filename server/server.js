require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.MY_PORT;

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
//comment
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(express.json());

require("./config/mongoose.config");

require("./routes/users.routes")(app);

require("./routes/events.routes")(app);

require("./routes/interest.routes")(app);

app.listen(port, () => console.log(`Listening on port: ${process.env.MY_PORT}`));
