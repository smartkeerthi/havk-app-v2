import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import NavBar from '../Navbar/Navbar'
import BottomNav from '../Sidebar/BottomNav'
import Sidebar from '../Sidebar/Sidebar'
import axios from '../../Axios/axios'
import { Chat } from '@material-ui/icons'
import { Button } from 'reactstrap'

function Friends() {

    const [chats, setChats] = useState([])

    useEffect(() => {
        axios.get('/api/getUser')
            .then((res) => {
                setChats(res.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    },[])

    return (
        <div>
            <div className="bg-dark">
                <NavBar />
                <div className="app">
                    <div className="appBody pt-5 bg-dark">
                        <div className="main addFriendsContainer">
                            {
                                chats.map((chat) => (
                                    <div className="friendContainer"  key={chat._id}>
                                        <Avatar className="friendProfile" src={chat.userProfile}/>
                                        <div className="friendDetails">
                                            <h3>{chat.userName}</h3>
                                            <h4>{chat.userEmail}</h4>
                                        </div>
                                        <Button className="ml-5" color="success" outline>
                                            <Chat/> Chat
                                        </Button>
                                    </div>
                                ))
                            }
                        </div>
                        <Sidebar/>
                    </div>
                </div>
            </div>
            <BottomNav/>
        </div>
    )
}

export default Friends
