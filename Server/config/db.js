import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log('Mongo Db connected')
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }
}

export default connectDb