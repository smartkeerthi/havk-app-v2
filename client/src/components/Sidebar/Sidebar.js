import React from 'react'
import './sidebar.css'
import { Avatar} from '@material-ui/core'
import { Chat, Dashboard, Home, PeopleAlt } from '@material-ui/icons'
import BottomNav from './BottomNav'
import { useSelector } from 'react-redux';
import { selectUserEmail, selectUserName, selectUserProfilePic } from '../../reducers/userSlice';

function Sidebar() {

    const userName = useSelector(selectUserName)
    const userEmail = useSelector(selectUserEmail)
    const userProfilePic = useSelector(selectUserProfilePic)

    return (
        <>
            <div className="sidebar">
                <div className="sidebarHeader">
                    <Avatar src={userProfilePic} className="userAvatar" />
                    <div>
                        <h4 className="user">{userName}</h4>
                        <h5 className="user">{userEmail}</h5>
                    </div>
                </div>
                <div className="sidebarLinks">
                    <div className="link">
                        <Home/>
                        <a href="/" className="linkText">Home</a>
                    </div>
                    <div className="link">
                        <Dashboard/>
                        <a href="/dashboard" className="linkText">Dashboard</a>
                    </div>
                    <div className="link">
                        <PeopleAlt/>
                        <a href="/search-friends" className="linkText">Friends</a>
                    </div>
                    <div className="link">
                        <Chat/>
                        <a href="/chat" className="linkText">Chats</a>
                    </div>
                </div>
            </div>
            <BottomNav/>
        </>
    )
}

export default Sidebar
