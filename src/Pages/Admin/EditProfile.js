import { useNavigate } from 'react-router-dom';
import '../../styles/Profile.css'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
 
const EditProfile = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const postProfileBy = () => {
		const token = localStorage.getItem("t_token")

		axios
			.put("http://77.240.39.57/ai/user/profile",{
                firstName,
                lastName,
                email,
                "roleId": 1
            },{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
				navigate('/admin/profile')
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
                        <button onClick={()=>postProfileBy()} className='orange__button'>Изменить</button>
                        <button onClick={()=>navigate('/admin/profile')} className='orange__button'>Назад</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;