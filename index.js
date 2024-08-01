const express = require("express");
const app=express()
const cors=require('cors')
//importing model here 

const Data=require("./models/data.model.js");
const mongoose=require ("mongoose");

app.use(cors())
//middleware

app.use(express.json())
app.use(express.urlencoded({extended :false}))


//fetching Data

app.get("/",(req,res)=>{    
  res.send("hello");
});


//fetch data at route /data

app.get("/api/data",async(req,res)=>{
  try{
      const info =await Data.find({});
      res.status(200).json(info);

  }catch(error){
    res.status(500).json({message:error.message});
  }
});


//fetching by id


app.get("/api/data/:id",async(req,res)=>{
  try{
      const {id}=req.params;
      const info =await Data.findById(id);
      res.status(200).json(info);

  }catch(error){
    res.status(500).json({message:error.message});
  }
});


//posting data


app.post("/api/data", async (req, res) => {
  try {
    const { mobile, mail } = req.body;

    // Validate mobile number
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    // Validate email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Check if a record with the same mobile number or email already exists
    const mob = await Data.findOne({ mobile });
    const mailExists = await Data.findOne({ mail });

    if (mob || mailExists) {
      return res.status(400).json({ message: "Mobile number or email already used" });
    }

    // Create a new record if no duplicate is found
    const info = await Data.create(req.body);
    res.status(200).json({ message: "Registered successfully", data: info });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//update data

app.put("/api/data/:id",async(req,res)=>{
  try{
    const {id}=req.params;
    const info =await Data.findByIdAndUpdate(id,req.body);
    if(!info){
      return res.status(400).json({message:"product not found"})
    }
    const updatedinfo=await Data.findById(id);
    res.status(200).json(updatedinfo);
  }catch(error){
    res.status(500).json({message:error.message})
  }
})



//delete

app.delete("/api/data/:id",async(req,res)=>{
  try{
      const {id}=req.params;
      const info =await Data.findByIdAndDelete(id);
      if(!info){
        return res.status(404).json({message:"id not found"});
      }
      res.status(200).json({message:"info deleted"});

  }catch(error){
    res.status(500).json({message:error.message});
  }
});



mongoose.connect("mongodb+srv://dheerajmande:VRBqxG9xMIugkVCO@backenddata.zb5r08s.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BACKENDDATA")
.then(()=>{
  console.log("DataBase Connected");
  app.listen(3000,()=>{
    console.log("server running");
  })
})
.catch(()=>{
  console.log("Connection Failed !")
})
