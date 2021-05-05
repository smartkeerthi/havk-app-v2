import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userProfile: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('user', userSchema)

export default User