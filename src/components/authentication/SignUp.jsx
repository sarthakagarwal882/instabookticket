import './SignUpStyles.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Spinner from '../Spinner/Spinner';
import { useDispatch } from 'react-redux';
import { login } from '../../Store/slice/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backend_ref from '../BackendRef';
import Cookies from 'js-cookie';
const SignUp = () => {
    const dispatch = useDispatch()
    const [regState, setRegState] = useState('true')
    const navigateTo = useNavigate();
    const [cfPassColor, setCfPassColor] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        email: "",
        ph_no: "",
        username: "",
        password: "",
    });
    const [gender, setGender] = useState({
        male: false,
        female: false,
    })



    function handleSubmit(e) {
        e.preventDefault();
        try {
            if (cfPassColor === "" || cfPassColor === "red") {
                toast('Passwords do not match!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            else {
                setRegState();
                sendData();
            }
        }
        catch (e) {
            null
        }
    }


    async function sendData() {
        const check = await axios.post(backend_ref + "/register", { formData });
        // console.log(check);
        if (check.data.data) {
            Cookies.set('instaBookCredentials', JSON.stringify({ token: check.data.token }), { expires: 30 })
            // console.log('cookie- '+Cookies.get('instaBookCredentials'));
            dispatch(login(check.data))
            navigateTo('/');
        }
        else if (check.data === false) {
            setRegState('true')
            alert("username already taken");
        }
    }


    function handleChange(event) {
        const { value, name } = event.target;
        setFormData((prevValue) => {
            return ({
                ...prevValue,
                [name]: value
            }
            );
        });
    }
    function handleCheck(event) {
        setFormData((prevValue) => {
            return ({
                ...prevValue,
                gender: event.target.name
            })
        }
        )
        setGender(() => {
            if (event.target.name === "male")
                return ({
                    male: true,
                    female: false,
                })
            if (event.target.name === "female")
                return ({
                    male: false,
                    female: true,
                })

        })
    }
    function checkPass(event) {
        const value = event.target.value;
        const bool = value === formData.password;
        if (value === "")
            setCfPassColor("");
        else
            setCfPassColor(
                (bool ? "green" : "red")
            );
    }
    function cfSetColor() {
        if (cfPassColor === 'green')
            return (
                'i-signup-div cf-check-pass')
        else if (cfPassColor === 'red')
            return ('i-signup-div cf-check-fail')
    }

    return (

        <div className='wrapper'>
            <div className='signup'>
                <h1 >InstaBook</h1>
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <div className='inp-dual'>
                        <div className='i-signup-div'>
                            <input onChange={handleChange} name="name" type="text" placeholder="Name" value={formData.fname} required />
                        </div>
                    </div>
                    <div className='i-signup-div gender'>
                        <h3>Gender</h3>
                        <div className='gender-div'>
                            <div>
                                <label htmlFor="">Male</label>
                                <input type='checkbox' name="male" onChange={handleCheck} checked={gender.male} />
                            </div>
                            <div>
                                <label htmlFor="">Female</label>
                                <input type="checkbox" name="female" onChange={handleCheck} checked={gender.female} />
                            </div>

                        </div>
                    </div>
                    <div className='i-signup-div'>
                        <input onChange={handleChange} name="email" type="email" placeholder="Email" value={formData.email} required />
                    </div>
                    <div className='inp-dual'>
                        <div className='i-signup-div'>
                            <input onChange={handleChange} name="ph_no" type="tel" placeholder="Phone number" value={formData.ph_no} required />
                        </div>
                        <div className='i-signup-div'>
                            <input onChange={handleChange} name="username" type="text" placeholder="username" value={formData.username} required />
                        </div>
                    </div>
                    <div className='inp-dual'>
                        <div className='i-signup-div'>
                            <input onChange={handleChange} name="password" type="password" placeholder="Password" value={formData.password} required />
                        </div>
                        <div className={(cfPassColor === '') ? 'i-signup-div' : cfSetColor()}>
                            <input onChange={checkPass} name="cf_password" type="password" placeholder="Confirm password" value={formData.cf_password} required />
                        </div>
                    </div>
                    {(regState) ?
                        <button type="submit" className='btn-register'>Register</button>
                        :
                        <Spinner></Spinner>
                    }
                </form>
                <Link to="/login"><button>Already have an account? Log in!</button></Link>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;