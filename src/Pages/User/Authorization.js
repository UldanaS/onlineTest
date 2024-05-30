import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { MdOutlineMail } from "react-icons/md";
import '../../styles/Login.css'
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import {ReactComponent as Favicon} from '../../images/icons/logo.svg'
import {ReactComponent as Rectangle} from '../../images/icons/Rectangle_1.svg'
import {ReactComponent as RectangleSmall} from '../../images/icons/Rectangle.svg'
import { RiLock2Line } from "react-icons/ri";
import { MdOutlinePersonOutline } from "react-icons/md";

const Authorization = () =>{
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmitClicked = (e) => {
		e.preventDefault()

		axios
			.post("http://77.240.39.57/ai/signup", {
                firstName,
                lastName,
				email,
				password,
                "roleId" : 2,
			})
			.then(result => {
                navigate("/user/login")
                toast.success("Успешно зарегистрировался")
			})
			.catch(error => {
				toast.error(error.response.data.errors[0].code)
			})
	}

    useEffect(() => {
		const token_ = localStorage.getItem("t_token")

		if (token_) {
			navigate("/user/test")
		}
	}, [navigate])

    return(
    <div className="login">
        <Rectangle className="rectangle"/>
        <RectangleSmall className="rectangle_2"/>
        <form onSubmit={handleSubmitClicked} className="form form__auth">
                <div className="form__header">
                    <Favicon className="login__logo"/>
                    <h3>Регистрация</h3>
                </div>
                <div className="form_box">
                    <label className="form_label">Введите имя</label>
                    <div className="form__input">
                        <MdOutlinePersonOutline className="login__icon"/>
                        <input
                            className="input"
                            type="text"
                            minLength={4}
                            maxLength={50}
                            placeholder="Имя"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form_box">
                    <label className="form_label">Введите фамилию</label>
                    <div className="form__input">
                        <MdOutlinePersonOutline className="login__icon"/>
                        <input
                            className="input"
                            type="text"
                            minLength={4}
                            maxLength={50}
                            placeholder="Фамилия"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form_box">
                    <label className="form_label">Введите e-mail</label>
                    <div className="form__input">
                        <MdOutlineMail className="login__icon"/>
                        <input
                            className="input"
                            type="email"
                            minLength={4}
                            maxLength={50}
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form_box">
                    <label for="password" className="form-label">Введите пароль</label>
                    <div className="form__input">
                        <RiLock2Line className="login__icon"/>
                        <input className="input"
                            name="password"
                            type="password"
                            minLength={4}
                            maxLength={50}
                            placeholder="Пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="auth__p login__p">
                    <p onClick={()=> navigate('/user/login')}>Уже есть аккаунт? Войти</p>
                </div>
                <button className="button" type="submit">Создать аккаунт</button>
            </form>
    </div>)
};

export default Authorization;