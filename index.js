const express = require("express");
const cors = require("cors");

const app = express();
// prom client is used to collect the metrics of server
const client = require("prom-client")
const responseTime  = require("response-time")

app.use(express.json());
app.use(cors({
  origin: "*",  // Allows requests from any origin
  methods: "*", // Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
  allowedHeaders: "*", // Allows all headers
  credentials: true, // Optional: Enable cookies with cross-origin requests (if needed)
}));

// Connection
const connectToDB = require("./config/connection");

connectToDB();

//collection of default mertices
const collectDefaultMetrics  = client.collectDefaultMetrics;
collectDefaultMetrics({register : client.register})
const reqResTime = new client.Histogram({
    name : "http_express_req_res_time",
    help : "This tells how much time is taken by req and res",
    labelNames : ["method", "route", "status_code"],
    buckets: [1,50,100,200,400,500,800,1000,2000],
});
const totalReqCounter =  new client.Counter({
    name: 'total_req',
    help: 'Tells total requests'
});
app.use(
    responseTime((req,res,time) =>{
        reqResTime
        .labels({
            method: req.method,
            route: req.url,
            status_code: res.statusCode,
        })
        .observe(time);
    })
);
app.use(responseTime((req, res, time) => {
    if (req.url !== '/metrics') {
        totalReqCounter.inc();
        reqResTime
            .labels({
                method: req.method,
                route: req.url,
                status_code: res.statusCode,
            })
            .observe(time);
    }
}));

// Register Route
const {registerRoute} = require("./routes/registerRoute");
const {loginRoute} = require("./routes/loginRoute");
const policyRouter = require("./routes/policyRoute");
const userRouter = require("./routes/userRoutes");
const userPolicyRouter = require("./routes/userPolicyRoutes");
const claimRouter = require("./routes/claimRoute");
const {authenticateToken} = require("./middlewares/authenticateToken");
const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./openapi.json');

app.get("/", (req,res) => {
    res.status(200).json({message : "CLAIM MANAGEMENT SYSTEM"});
});

//metrics
app.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
});

app.post("/api/register", registerRoute);
app.post("/api/login", loginRoute);

app.use("/api/users", authenticateToken, userRouter);
app.use("/api/policy", authenticateToken, policyRouter);
app.use("/api/user/policy", authenticateToken, userPolicyRouter);
app.use("/api/claim", authenticateToken, claimRouter);

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerJson));

// Global Error Handler
app.use((err,req,res,next) => {
    res.status(404).json({message : `An unexpected Error Occurred : ${err}`});
})


app.listen(3001, () => {
    console.log(`Server is running at port http://localhost:3001`);
});
// const express = require("express");
// const cors = require("cors");
// const app = express();

// app.get("/", (req,res) => {
//     res.status(200).json({message : "Stateful CMS"});
// })

// // Connection
// const connetToDB = require("./config/connection");

// connetToDB();



// app.listen(3001,() => {
//     console.log(`Server is running at http://localhost:3001`);
// })
