import React, {useState} from 'react';
import { Navbar, NavbarBrand, Dropdown, Button } from 'reactstrap';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUserLogOut } from '../../reducers/userSlice';
import { useHistory } from 'react-router-dom'

function NavBar() {

  const history = useHistory()

  const dispatch = useDispatch()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        dispatch(setUserLogOut())
        history.push('/')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
      <div>
        <Navbar color="dark" dark className="border-bottom border-1 border-light fixed-top">
          <NavbarBrand href="/" className="mr-auto fw-bold">HAVK</NavbarBrand>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <Button color="light" outline onClick={handleSignOut} >Logout</Button>
          </Dropdown>
        </Navbar>
      </div>
  )
}

export default NavBar
