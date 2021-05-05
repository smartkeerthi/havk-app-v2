import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    postUserName: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
        required: true
    },
    postLike: {
        type: Number,
        required: true
    },
    postComment: {
        type: Number,
        required: true
    },
    postText: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model('Posts', postSchema)

export default Post