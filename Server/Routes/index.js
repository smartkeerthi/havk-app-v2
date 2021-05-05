import express from 'express'
import Post from '../Models/postModel.js'
import User from '../Models/userModel.js'
const router = express.Router()



router.get('/post', (req, res) => {
    Post.find()
        .sort({createdAt: -1})
        .then((posts) => res.json(posts))
        .catch((err) => res.json(err.message))
})

router.get('/userpost/:userName', (req, res) => {
    Post.find({"postUserName": req.params.userName})
        .then((userPost) => {
            res.json(userPost)
        })
        .catch((err) => {
            console.log(err.message)
        })
})

router.post('/post', (req, res) => {
    const newPost = new Post({
        postUserName: req.body.postUserName,
        postImage: req.body.postImage,
        postLike: req.body.postLike,
        postComment: req.body.postComment,
        postText: req.body.postText
    });

    newPost.save()
        .then(post => res.json(post))
})


router.post('/addUser', (req, res) => {
    const userdetails = User.find({"userEmail": req.body.userEmail})
        .then((user) => {
            const useremail = user? (user[0].userEmail) : ('')
            return useremail
        })
        .catch((err) => res.json(err.message))

    const useremail = async() => {
        const email = await userdetails

        if (req.body.userEmail != email) {
            const newUser = new User({
                userName: req.body.userName,
                userEmail: req.body.userEmail,
                userProfile: req.body.userProfile
            });
    
            newUser.save()
                .then(user => res.json(user))
                .catch((err) => res.json(err.message))
        }
        else{
            res.json("email exists")
        }
        return email
    }

    useremail()
})

router.get('/getUser', (req, res) => {
    User.find()
        .then((user) => res.json(user))
        .catch((err) => res.json(err.message))
})

router.post('/likePost', (req, res) => {
    Post.findOneAndUpdate({"_id": req.body.postId}, {"postLike": req.body.postLike + 1})
        .then(() => {
            console.log("postLiked")
        })
})

router.post('/commentPost', (req, res) => {
    Post.findByIdAndUpdate({"_id": req.body.postId}, {"postComment": req.body.postComment + 1})
        .then(() => {
            console.log("post commented")
        })
})

export default router