import { Avatar } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React, {useEffect, useState} from 'react'
import { Button } from 'reactstrap'
import NavBar from '../Navbar/Navbar'
import BottomNav from '../Sidebar/BottomNav'
import Sidebar from '../Sidebar/Sidebar'
import './addFriends.css'
import axios from '../../Axios/axios'

function AddFriends() {

    const [inputSearch, setInputSearch] = useState('');
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        axios.get('/api/getUser')
            .then((res) => {
                setFriends(res.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    },[])

    const handleAddFriend = (e) => {
        e.preventDefault();
        setInputSearch('')
    }

    return (
        <div>
            <div className="bg-dark">
                <NavBar />
                <div className="app">
                    <div className="pt-5 appBody bg-dark">
                        <div className="main addFriendsContainer">
                            <div className="searchContainer">
                                <Search/>
                                <form className="form">
                                    <input className="search" placeholder="Enter the name to search" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} />
                                    <Button type="submit" color="success" onClick={handleAddFriend}>Go</Button>
                                </form>
                            </div>
                            <div className="listOfAllNames">
                            {
                                friends.map((friend) => (
                                    <div className="friendContainer"  key={friend._id}>
                                        <Avatar className="friendProfile" src={friend.userProfile}/>
                                        <div className="friendDetails">
                                            <h3>{friend.userName}</h3>
                                            <h4>{friend.userEmail}</h4>
                                        </div>
                                    </div>
                                ))
                            }
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

export default AddFriends
