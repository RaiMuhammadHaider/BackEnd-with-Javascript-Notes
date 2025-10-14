import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({
Video : {
    type : String,
    rquired : true,
},
thumbnail : {
    required : true,
    type : String,
},
title : {
    type : String ,
    required : true
},
description : {
    type: String,
    required : true,
},
duration : {
    type : Number, 
    required : true
},
views : {
    type : Number , 
    default : 0
},
isPublish : {
    type : Boolean,
    default : true
},
owner : {
    type : Schema.Types.ObjectId,
    ref : "User"
}

}, {timestamps : true})
videoSchema.plugin(mongooseAggregatePaginate)
export const Videos = mongoose.model("Video" , videoSchema )