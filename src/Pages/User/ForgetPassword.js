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

const ForgetPassword = () =>{
    const [email, setEmail] = useState("")

    const navigate = useNavigate()

    const handleSubmitClicked = (e) => {
		e.preventDefault()
        const formDate = new FormData();
        formDate.append("email", email);
		axios
			.post("http://77.240.39.57/ai/forgot-password", formDate)
			.then(result => {
                navigate("/user/login")
                toast.success("Успешно отправился")
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
                    <h3>Востaновление пароля</h3>
                </div>
                <p className="forgot__label">Пожалуйста, введите ваш email ниже. На указанный email придет пароль для восстановления пароля.</p>
                <div className="form_box">
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
                <div className="login__p auth__p">
                    <p onClick={()=> navigate('/user/login')}>Вход</p>
                </div>
                <button className="button" type="submit">Отправить</button>
            </form>
    </div>)
};

export default ForgetPassword;