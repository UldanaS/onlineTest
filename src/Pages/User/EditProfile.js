import { useNavigate } from 'react-router-dom';
import '../../styles/Profile.css'
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios'

const EditProfile = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const putProfileBy = () => {
		const token = localStorage.getItem("t_token")

		axios
			.put("http://77.240.39.57/ai/user/profile",{
                firstName,
                lastName,
                email,
                "roleId": 2
            },{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
				navigate('/user/profile')
                toast.success('Успешно изменился')
			})
			.catch(error => {
				console.log(error)
			})
	}

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
                    <h4>Изменить личные данные</h4>
                    <div className='profile__input'>
                    <div className="form__input">
                        <input
                            className="input"
                            type="text"
                            minLength={4}
                            maxLength={50}
                            placeholder="Имя"
                            value={firstName}
                            onChange={(e)=>setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="form__input">
                        <input
                            className="input"
                            type="text"
                            minLength={4}
                            maxLength={50}
                            placeholder="Фамилия"
                            value={lastName}
                            onChange={(e)=>setLastName(e.target.value)}
                        />
                    </div>
                    <div className="form__input">
                        <input
                            className="input"
                            type="email"
                            minLength={4}
                            maxLength={50}
                            placeholder="Email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    </div>
                    <div className='profile__buttons'>
                        <button onClick={()=>putProfileBy()} className='orange__button'>Изменить</button>
                        <button onClick={()=>navigate('/user/profile')} className='orange__button'>Назад</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;