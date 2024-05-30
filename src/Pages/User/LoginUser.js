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

const LoginUser = () =>{
    const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmitClicked = (e) => {
		e.preventDefault()

		axios
			.post("http://77.240.39.57/ai/signin", {
				email,
				password,
			})
			.then(result => {
                console.log(result.data)
				const token = result.data.result
                if(result.data.metadata.additionalProp1 === '1'){
                    navigate("/user/login")
                    toast.error("Это аккаунт для админа")
                }
                if(result.data.metadata.additionalProp1 === '2'){
                    localStorage.setItem("t_token", token)
                    navigate("/user/test")
                    toast.success("Добро пожаловать в Online Test")
                }
			})
			.catch(error => {
				toast.error(error.response.data.errors[0].message)
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
        <form onSubmit={handleSubmitClicked} className="form">
                <div className="form__header">
                    <Favicon className="login__logo"/>
                    <h3>Вход для студентов</h3>
                </div>
                <div className="form_box">
                    <label className="form_label">Введите e-mail</label>
                    <div className="form__input">
                        <MdOutlineMail className="login__icon"/>
                        <input
                            className="input"
                            name="email"
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
                <div className="login__p">
                    <p onClick={()=> navigate('/user/auth')}>Регистрация</p>
                    <p onClick={()=>navigate('/user/forgot-password')}>Забыли пароль?</p>
                </div>
                <button className="button" type="submit">Войти</button>
                <div className="login__p auth__p">
                    <p onClick={()=> navigate('/admin/login')}>Вход для преподавателей</p>
                </div>
            </form>
    </div>)
};

export default LoginUser;