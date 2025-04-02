const express = require('express');
const urlroute = require("./routes/url")
const path = require('path');
const staticroute = require('./routes/staticrouter')
const userroute = require('./routes/user');
const cookie = require('cookie-parser');
const app = express();
const { connectToMongo } = require("./connection");
const { checkuserloggenin, checkauth } = require('./middlewares/auth');

connectToMongo("mongodb://127.0.0.1:27017/urlshortner")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookie());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/url", checkuserloggenin, urlroute);
app.use("/", checkauth, staticroute);
app.use("/user", userroute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
