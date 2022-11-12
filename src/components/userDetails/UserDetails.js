import React, { useEffect, useState } from 'react';
import './UserDetails.css';
import Cookies from 'js-cookie';
import { axiosInstance } from '../../config';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserDetails = ({ setLoginUser }) => {
    const [loggedInUser, setLoggedInUser] = useState(Cookies.get('user'));
    const navigate = useNavigate();
    const [userUpdates, setUserUpdates] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        number: "",
        password: ""
    });

    const updateUser = async (data) => {
        const res = await axiosInstance.put(`/update/${loggedInUser}`, data, { headers: { Token: Cookies.get('jwt') } })
            .catch((err) => {
                window.alert(err.response.data.message);
            })
        if (res.status === 200) {
            window.alert("Saved");
            setLoggedInUser(res.data.data._id);
        };
    }

    const saveChanges = () => {
        const updateUserData = { ...userUpdates }
        updateUser(updateUserData);
    };

    const handleChange = ({ target: { name, value } }) => {
        setUserUpdates({ ...userUpdates, [name]: value })
    };
    const users = async () => {
        const res = await axiosInstance.get(`/profile/${loggedInUser}`, { headers: { Token: Cookies.get('jwt') } })
            .catch((err) => {
                window.alert(err.response.data.message);
                Cookies.remove('user');
                Cookies.remove('jwt');
                setLoginUser(null);
                navigate('/');
            })
        if (res.status === 200) setUserUpdates(res.data.data);
    }

    useEffect(() => {
        users()
    }, [loggedInUser])

    const style = {
        color: 'red',
        backgroundColor: 'rgb(236, 223, 223)',
        width: '150px',
        padding: '5px 15px',
        borderRadius: '10px',

    }
    return (
        <div className='user_details_container'>
            {
                userUpdates && <div className='details_container'>
                    <h1>Welcome {userUpdates.firstName} {userUpdates.lastName}</h1>
                    <div className='other_details_container'>
                        <p>First Name: <TextField variant='standard' name='firstName' value={userUpdates.firstName} style={style} onChange={handleChange} /></p>
                        <p>Last Name: <TextField variant='standard' name='lastName' value={userUpdates.lastName} style={style} onChange={handleChange} /></p>
                        <p>userName: <TextField variant='standard' name='userName' value={userUpdates.userName} style={style} onChange={handleChange} /></p>
                        <p>Number: <TextField variant='standard' name='number' value={userUpdates.number} style={style} onChange={handleChange} /></p>
                        <p>Email: <TextField variant='standard' name='email' value={userUpdates.email} style={style} onChange={handleChange} /></p>
                        <p>Password: <TextField variant='standard' name='password' style={style} onChange={handleChange} /></p>
                        <br />
                        <Button variant="outlined" style={{ backgroundColor: 'rgb(28, 23, 23)', color: 'white', fontSize: 'large' }} onClick={saveChanges}>Save Changes</Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserDetails