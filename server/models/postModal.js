import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    message: String,
    creator: String,
    file: String,
    tags: [String],
    likeCount: {
        type: Number,
        dfault: 0,
    },
    createdAt:{
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model("PostMessage", postSchema)

export default PostMessage;