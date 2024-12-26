const express = require("express")
const mongoose = require("mongoose")
require("dotenv") .config()
const cors = require("cors")

const app = express()

const PORT = process. env. PORT | 5000

const routes=require("./Routes/TaskRoute");


const signUpRoutes=require("./Routes/SingUpRoute");

const jobofferRoutes=require("./Routes/JobooferRoute");

const signInRoute = require("./Routes/SingInRoute");
const DiplomaRoute = require("./Routes/DiplomaRoute");
const LanguageRoute = require("./Routes/LanguagesRoute");
const ExperienceRoute = require("./Routes/ExperiencesRoute");
const CondidateRoute = require("./Routes/CondidateRoute");


app.use(express. json());

app.use(cors()); 

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
};

connectDB();

app.use("/login", signInRoute);
app.use("/joboffer", jobofferRoutes);
app.use("/api", routes);
app.use("/user", signUpRoutes);
app.use("/diploma", DiplomaRoute);
app.use("/language", LanguageRoute);
app.use("/Experience", ExperienceRoute);
app.use("/Condidate", CondidateRoute);

app. listen(PORT, () => console. log(`Listening at ${PORT}`)); 
                                 