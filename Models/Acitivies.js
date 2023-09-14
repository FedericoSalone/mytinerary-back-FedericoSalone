import mongoose from "mongoose"

const activitiesSchema = mongoose.Schema({
    activities:{
        firstActivity:{type:{title:{type:String, required:true}, image:{type:String, required:true}}, required:true},
        secondActivity:{type:{title:{type:String, required:true}, image:{type:String, required:true}}, required:true},
        thirdActivity:{type:{title:{type:String, required:true}, image:{type:String, required:true}}, required:true},
    },
    itineraryRelated:{type: mongoose.Types.ObjectId, ref:"itinerary", required:true}

})

const Activities = mongoose.model("activity",activitiesSchema)

export default Activities