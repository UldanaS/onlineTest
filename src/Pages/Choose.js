import {ReactComponent as Favicon} from '../images/icons/logo.svg'
import {ReactComponent as Rectangle} from '../images/icons/Rectangle_1.svg'
import {ReactComponent as RectangleSmall} from '../images/icons/Rectangle.svg'
import { useNavigate } from 'react-router-dom';

const Choose = () => {
    const navigate = useNavigate()
    return (
        <div className="login">
        <Rectangle className="rectangle"/>
        <RectangleSmall className="rectangle_2"/>
        <div className="form">
                <div className="form__header">
                    <Favicon className="login__logo"/>
                    <h3>Добро пожаловать в <p className='p__blue'>Online Test</p></h3>
                </div>
                <div className='sign_in'>
                    <p onClick={()=>navigate('/user/login')}>Вход для студентов</p>
                    <p onClick={()=>navigate('/admin/login')}>Вход для преподователей</p>
                </div>
        </div>

        </div>
    );
};

export default Choose;