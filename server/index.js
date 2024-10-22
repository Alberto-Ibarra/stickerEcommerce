const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const firebaseApp = require('./config/firebase');


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const stickerRoutes = require("./routes/stickerRoutes");
const userRoutes = require("./routes/userRoutes");

//MongoDB connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use("/", stickerRoutes);
app.use("/", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));