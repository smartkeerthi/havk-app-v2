import { IconButton } from '@material-ui/core'
import { Chat, Dashboard, Home, PeopleAlt } from '@material-ui/icons'
import React from 'react'
import './sidebar.css'

function BottomNav() {
    return (
        <div>
            <div className="BottomNav bg-dark">
                <IconButton href="/search-friends">
                    <PeopleAlt/>
                </IconButton>
                <IconButton href="/">
                    <Home/>
                </IconButton>
                <IconButton href="/dashboard">
                    <Dashboard/>
                </IconButton>
                <IconButton href="/chat">
                    <Chat/>
                </IconButton>
            </div>
        </div>
    )
}

export default BottomNav
