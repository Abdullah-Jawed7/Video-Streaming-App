import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
    videoFile:{
        type:String, // cloudinary Url
        required:true,
    },
    thumbnail:{
        type:String, // cloudinary Url
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    duration:{
        type:Number, // from cloudinary details
        required:true
    },
    views:{
        type:Number, 
        default: 0 
    },
    views:{
        type:Boolean, 
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps: true
})

// plugin is an mongo db hook
videoSchema.plugin(mongooseAggregatePaginate)
export const Video  = mongoose.model("video",videoSchema)