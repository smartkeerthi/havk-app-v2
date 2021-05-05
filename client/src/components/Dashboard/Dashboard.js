import { Avatar } from '@material-ui/core'
import axios from '../../Axios/axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardImg, CardText, FormGroup } from 'reactstrap'
import { storage } from '../../firebase'
import { selectUserEmail, selectUserName, selectUserProfilePic } from '../../reducers/userSlice'
import NavBar from '../Navbar/Navbar'
import BottomNav from '../Sidebar/BottomNav'
import Sidebar from '../Sidebar/Sidebar'
import './dashboard.css'
import Loading from '../../Loading'

function Dashboard() {
    const [postImage, setPostImage] = useState('')
    const [caption, setCaption] = useState('')
    const [userPosts, setUserPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const userName = useSelector(selectUserName)
    const userEmail = useSelector(selectUserEmail)
    const userProfilePic = useSelector(selectUserProfilePic)

    useEffect(() => {
        axios.get(`/api/userpost/${userName}`)
            .then((userPost) => {
                setUserPosts(userPost.data)
            })
    },[userName])

    const handleUpload = () => {
        setIsLoading(true)
        const uploadImg = storage.ref(`posts/${userEmail}/${postImage.name}`).put(postImage)

        uploadImg.on(
            "state_changed",
            () => {
                storage
                    .ref(`posts/${userEmail}`)
                    .child(postImage.name)
                    .getDownloadURL()
                    .then((url) => {
                        axios.post('/api/post',{
                            postUserName: userName,
                            postImage: url,
                            postLike: 0,
                            postComment: 0,
                            postText: caption
                        })
                        .then(()=>{
                            console.log("success")
                            setPostImage('')
                            setCaption('')
                            setIsLoading(false)
                        })
                        .catch((err) => console.log(err.message))
                    })
                    .catch((error) => {
                        console.log(error.message)
                    })
            }
        )
    }

    return (
        <div>
            {
                isLoading ? (
                    <Loading text="Uploading"/>
                ) : ('')
            }
            <div className="bg-dark">
                <NavBar />
                <div className="app">
                    <div className="pt-5 appBody bg-dark">
                        <div className="main">
                            <div className="dashboardTop">
                                <div className="userDetails">
                                    <Avatar className="userProfile" src={userProfilePic}/>
                                    <h3>{userName}</h3>
                                    <h4>{userEmail}</h4>
                                </div>
                            </div>
                            <div className="dashboardUpload">
                                <FormGroup className="w-75">
                                    <div className="input-group mt-5">
                                        <input type="file" onChange={(e)=>setPostImage(e.target.files[0])} className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
                                    </div>
                                    <div className="input-group mt-2">
                                        <span className="input-group-text">Caption</span>
                                        <textarea className="form-control" value={caption} onChange={(e)=>setCaption(e.target.value)} aria-label="With textarea"></textarea>
                                    </div>
                                    <div className="input-group mt-2">
                                        <button onClick={handleUpload} className="btn btn-success text-white w-100" type="button">Submit</button>
                                    </div>
                                </FormGroup>
                            </div>
                            <div className="container pl-5">
                                <div className="row row-cols-3">
                                    {
                                        userPosts.map((posts) => (
                                            <div className="col" key={posts._id}>
                                                <Card>
                                                    <CardImg top width="100%" src={posts.postImage} alt="Card image cap" />
                                                    <CardBody>
                                                    <CardText>{posts.postText}</CardText>
                                                    <CardText>
                                                        <small className="text-muted">{posts.createdAt}</small>
                                                    </CardText>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <Sidebar/>
                    </div>
                </div>
            </div>
            <BottomNav/>
        </div>
    )
}

export default Dashboard
