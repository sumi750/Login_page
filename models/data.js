const mongoose = require("mongoose");

main().then(()=>{
    console.log("connection succefull");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/login")
}

const dataSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
});

const Collection = new mongoose.model("Collection", dataSchema);
module.exports = Collection;