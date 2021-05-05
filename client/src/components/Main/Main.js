import React, { useEffect, useState } from 'react';
import './main.css'
import {FavoriteBorder, Comment} from '@material-ui/icons';
import axios from '../../Axios/axios'
import Avatar from 'react-avatar'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Input, Row, Col } from 'reactstrap';
import { IconButton } from '@material-ui/core';

function Main() {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }
    
    const [posts, setPosts] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {
        axios.get('/api/post')
            .then((res) => {
                setPosts(res.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    },[])

    const handleComment = (e) => {
        e.preventDefault()
        setComment('')
    }

    return (
        <div className="main">
            {
                posts.map((post) => (
                    <div className="Post" key={post._id}>
                        <div className="PostHeader">
                            <Avatar size="50" round={true} name={post.postUserName}/>
                            <p className="userName">{post.postUserName}</p>
                        </div>
                        <div className="PostBody">
                            <img src={post.postImage} alt="post"/>
                        </div>
                        <div className="PostFooter">
                            <div className="w-100 pl-3">
                                <p>{post.postText}</p>
                            </div>
                            <div className="w-100 d-flex align-items-center justify-content-evenly">
                                <div className="Likes">
                                    <IconButton  onClick={(e)=>{
                                        e.preventDefault()
                                        axios.post('/api/likePost',{
                                            postId: post._id,
                                            postLike: post.postLike
                                        })
                                    }}>
                                        <FavoriteBorder/>
                                    </IconButton>
                                    <h4>{post.postLike}</h4>
                                </div>
                                <div className="Comments">
                                    <IconButton onClick={toggleModal}>
                                        <Comment/>
                                    </IconButton>
                                    <h4>{post.postComment}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            <Modal isOpen={modal} toggle={toggleModal} className="modal-dialog-scrollable">
                <ModalHeader toggle={toggleModal}>Comments</ModalHeader>
                <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.                
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.                
                </ModalBody>
                <ModalFooter>
                    <Row className="w-100">
                        <Col md={9}>
                        <FormGroup>
                            <Input type="text" name="comment" placeholder="Enter your comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                        </FormGroup>
                        </Col>
                        <Col md={2}>
                        <Button color="success" onClick={handleComment}>Comment</Button>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Main
