const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const productRouter = require("./routes/Product.js")
const companyRouter = require("./routes/Company.js")
const userRouter = require("./routes/User.js")
const app = express()

app.use(express.json())
app.use(cors())

app.use("/",productRouter)
app.use("/companies",companyRouter)
app.use("/auth",userRouter)

mongoose.connect("mongodb+srv://emirglsn191:emirglsn191@cluster0.rabr2dw.mongodb.net/ecommerce?retryWrites=true&w=majority")

app.listen(3001, () => {
    console.log("Server connected succesfully to 3001 port");
})