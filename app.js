const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mongoose = require("mongoose");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/listDB")




// schema
const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  }
});


const Item = new mongoose.model("Item", itemSchema)






app.get("/", function (req, res) {
  // res.render("list");

  Item.find({},(err,foundItems)=>{
    if(!err){
      res.render("list",{
        allItems  : foundItems
      })
      
    }else{
      console.log(err);
    }
  })

});

app.post("/", function (req, res) {
  console.log(req.body);

  const item = new Item({
    itemName : req.body.newItem
  })

  item.save((err)=>{
    if(!err){
      console.log("item added successfully");
      res.redirect("/")
    }else{
      console.log(err);
    }
  });

});

// the delete route
app.post("/delete", (req, res) => {});

// app.get("/:customListName",(req,res)=>{
//   console.log(req.params.customListName);
// })

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000");
});
