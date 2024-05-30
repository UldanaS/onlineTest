import { RiDeleteBin6Line } from "react-icons/ri";
import '../../styles/Test.css'
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/md-light-indigo/theme.css'
import { toast } from "react-toastify";
import InformationIcons from '../../images/icons/informations.png'
import Management from '../../images/icons/management.png'
import FoodSafety from '../../images/food-safety.png'
import Oil from '../../images/oil.png'
import Chemistry from '../../images/chemistry.png'
import Mountain from '../../images/mountain.png'
import Tech from '../../images/tech.png'
import Product from '../../images/product.png'
import Auto from '../../images/auto.png'

const Test = () => {
    const [test, setTest] = useState([])
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    const [idDelete, setIdDelete] = useState()
    const [isTrue, setIsTrue] = useState(false)
    const [search, setSearch] = useState("")

    const getTest = () => {
		const token = localStorage.getItem("t_token")

		axios
			.get(`http://77.240.39.57/ai/quiz/admin?search=${search}`,{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
				setTest(result.data.result)
			})
			.catch(error => {
				console.log(error)
			})
	}

    const deleteTest = () => {
		const token = localStorage.getItem("t_token")

		axios
			.delete(`http://77.240.39.57/ai/quiz/${idDelete}`,{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
				console.log(result.data)
                setIsTrue(true)
                toast.success("Успешно удалился")

			})
			.catch(error => {
				console.log(error)
			})
	}

    useEffect(()=>{
        getTest()
    }, [isTrue, search])
    return(
        <div className="section">
            <div className='section__head'>
                <div className="search">
                    <input 
                        type="text"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        placeholder="Поиск"/>
                    <CiSearch className="search__icon"/>
                </div>
            </div>
            <div className="section__header">
                <h1>Группы образовательных программ</h1>
            </div>
            <div className="container">
                <div className='test__container'>
                    <div onClick={()=>navigate('/admin/test/is')} className="test_item">
                        <img src={InformationIcons} alt=""/>
                        <p>7М06136 - Информационные системы</p>
                    </div>
                    <div onClick={()=>navigate('/admin/test/management')} className="test_item">
                        <img src={Management} alt=""/>
                        <p>7M06137 - IT-менеджмент</p>
                    </div>
                    <div onClick={()=>navigate('/admin/test/chemistry')} className="test_item">
                        <img src={Chemistry} alt=""/>
                        <p>7М07138 - Химическая технология органических веществ</p>
                    </div>
                    <div onClick={()=>navigate('/admin/test/food-tech')} className="test_item">
                        <img src={Product} alt=""/>
                        <p>7М07239 - Технология продовольственных продуктов</p>
                    </div>
                    <div onClick={()=>navigate('/admin/test/food-safety')} className="test_item">
                        <img src={FoodSafety} alt=""/>
                        <p>7М07241- Пищевая безопасность</p>
                    </div>
                    <div onClick={()=>navigate('/admin/test/cons')} className="test_item">
                        <img src={Tech} alt=""/>
                        <p>7М07242 - Технология и конструирование изделий легкой промышленности</p>
                    </div>
                    <div onClick={()=>navigate('/admin/test/gor')} className="test_item">
                        <img src={Mountain} alt=""/>
                        <p>7М07252 - Горное дело</p>
                    </div>
                    <div onClick={()=>navigate('/admin/test/neft')} className="test_item">
                        <img src={Oil} alt=""/>
                        <p>7M07253 - Нефтегазовое дело</p>
                    </div>
                    <div onClick={()=>navigate('/admin/test/auto')} className="test_item">
                        <img src={Auto} alt=""/>
                        <p>6М070200 - Автоматизация и управление</p>
                    </div>
                </div>

            </div>
     
        </div>
    );
};

export default Test;