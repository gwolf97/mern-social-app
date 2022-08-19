import mongoose from "mongoose"

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
    createdAt:{
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model("PostMessage", postSchema)

export default PostMessage;