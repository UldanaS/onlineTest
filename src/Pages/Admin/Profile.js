import { useNavigate } from 'react-router-dom';
import Ava from '../../images/icons/avaa.jpg'
import '../../styles/Profile.css'
import { useEffect, useState } from 'react';
import axios from 'axios'

const Profile = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const getProfileBy = () => {
		const token = localStorage.getItem("t_token")

		axios
			.get("http://77.240.39.57/ai/user/profile",{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
				setEmail(result.data.result.email)
                setFirstName(result.data.result.firstName)
                setLastName(result.data.result.lastName)
			})
			.catch(error => {
				console.log(error)
			})
	}

    useEffect(()=>{
        getProfileBy()
    }, [])

    return(
        <div className="section">
            <div className="section__header">
                <h1>Мой профиль</h1>
            </div>
            <div className="container">
                <div className="profile__container">
                    <h4>{firstName} {lastName}</h4>
                    <p>{email}</p>
                    <div className='profile__buttons'>
                        <button onClick={()=>navigate('/admin/profile/edit')} className='orange__button'>Изменить профиль</button>
                        <button onClick={()=>navigate('/admin/profile/password')} className='orange__button'>Изменить пароль</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;