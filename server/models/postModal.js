import mongoose from "mongoose"

const commentSchema = mongoose.Schema({
    name:{type:String, required:true},
    comment:{type:String, required:true},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
},{
    timestamps:true
})

const postSchema = mongoose.Schema({
    message: String,
    name: String,
    creator: String,
    file: String,
    tags: [String],
    likes: {
        type: [String],
        dfault: [],
    },
    comments:[commentSchema],
    numComments: {
        type: Number,
        default: 0
    },
    createdAt:{
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model("PostMessage", postSchema)

export default PostMessage;