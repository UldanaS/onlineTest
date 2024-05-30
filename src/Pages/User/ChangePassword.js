import { useNavigate } from 'react-router-dom';
import '../../styles/Profile.css'
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios'

const ChangePassword = () => {
    const navigate = useNavigate()
    const [confirmPassword, setConfirmPassword] = useState("")
    const [password, setPassword] = useState("")

    const putChangePassword = () => {
		const token = localStorage.getItem("t_token")

		axios
			.post("http://77.240.39.57/ai/user/reset-password",{
                confirmPassword,
                password
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
    return(
        <div className="section">
            <div className="section__header">
                <h1>Мой профиль</h1>
            </div>
            <div className="container">
                <div className="profile__container">
                    <h4>Изменить пароль</h4>
                    <div className='profile__input'>
                    <div className="form__input">
                        <input
                            className="input"
                            type="password"
                            minLength={4}
                            maxLength={50}
                            placeholder="Введите новый пароль"
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="form__input">
                        <input
                            className="input"
                            type="password"
                            minLength={4}
                            maxLength={50}
                            placeholder="Повторить пароль"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    </div>
                    <div className='profile__buttons'>
                        <button onClick={()=>putChangePassword()} className='orange__button'>Изменить</button>
                        <button onClick={()=>navigate('/user/profile')} className='orange__button'>Назад</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;