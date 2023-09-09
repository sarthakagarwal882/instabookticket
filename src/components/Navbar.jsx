import { useState } from "react";
import { BiSearch } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import './NavbarStyles.css'
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
const Navbar = () => {
    // console.log(useSelector((userInfo) => { return (userInfo.user.data) }));
    const navigateTo = useNavigate()
    const state = useSelector((userInfo) => { return (userInfo.user.data) })
    const [searchText, setSearchText] = useState("")
    console.log(state);


    // function handleSearchChange(data) {
    //     setSearchText(data.target.value);
    // }
    // async function handleFormSubmit(e) {
    //     e.preventDefault();
    //     navigateTo('/search?query=' + searchText)
    // }


    function setProfileImg() {
        if (state.gender === 'male')
            return ('profile-img-male')
        else if (state.gender === 'female')
            return ('profile-img-female')
        else
            return ('profile-img-female')
    }
    return (
        <div className="navbar" >
            <Link to='/'>
                <h1><span>I</span>nsta<span>B</span>ook</h1>
            </Link>
            {/* <div className="nav-search">
                <form onSubmit={handleFormSubmit}>
                    <input type="text" placeholder="Movies, TV shows, Person" onChange={handleSearchChange} value={searchText} />
                    <button type="submit"><BiSearch /></button>
                </form>
            </div> */}

            {('username' in state) ?
                <div className="nav-rt">
                    <div className="nav-create-event">
                        <Link to="/">
                            <span>
                                <AiOutlinePlus />
                                <p>Create Event</p>
                            </span>
                        </Link>
                    </div>
                    <div className="profile-div">
                        <p>{state.username}</p>
                        <span className={setProfileImg()}></span>
                    </div>
                </div>
                :
                <div className="nav-auth">
                    <Link to="/login">
                        <div>
                            <span>Login</span>
                        </div>
                    </Link>
                    <Link to="/register">
                        <div>
                            <span>Signup</span>
                        </div>
                    </Link>
                </div>
            }
        </div>
    );
};
export default Navbar;