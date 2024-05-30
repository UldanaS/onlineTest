import { RiDeleteBin6Line } from "react-icons/ri";
import '../../styles/Test.css'
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/md-light-indigo/theme.css'
import { toast } from "react-toastify";

const Speciality = () => {
    const [test, setTest] = useState([])
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    const [idDelete, setIdDelete] = useState()
    const [isTrue, setIsTrue] = useState(false)
    const [search, setSearch] = useState("")
    const {specialId} = useParams()
    const [specialName, setSpecialName] = useState("")
    const [testBy, setTestBy]= useState([])

    const getSpecial = () => {
        if(specialId==="is"){
            setSpecialName("7М06136 - Информационные системы")
        }else if(specialId==="management"){
            setSpecialName("7M06137 - IT-менеджмент")
        }else if(specialId==="chemistry"){
            setSpecialName("7М07138 - Химическая технология органических веществ")
        }
        else if(specialId==="food-safety"){
            setSpecialName("7М07241- Пищевая безопасность")
        }else if(specialId==="food-tech"){
            setSpecialName("7М07239 - Технология продовольственных продуктов")
        }else if(specialId==="cons"){
            setSpecialName("7М07242 - Технология и конструирование изделий легкой промышленности")
        }else if(specialId==="gor"){
            setSpecialName("7М07252 - Горное дело")
        }else if(specialId==="neft"){
            setSpecialName("7M07253 - Нефтегазовое дело")
        }else if(specialId==="auto"){
            setSpecialName("6М070200 - Автоматизация и управление")
        }
    }

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

    const setArrayFunction = (e) => {
        
       
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
        getSpecial()
        getTest()
        console.log(specialId)
    },[isTrue, search])

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
                <h2>{specialName}</h2>
                <button onClick={()=>navigate(`/admin/test/${specialId}/add-test`)} className='orange__button'>Создать тест</button>
            </div>
            <div className="container">
                {test.filter(e=>e.speciality===specialId).length === 0 ? "У вас пока нет теста, создайте его." : 
                <div className='test__container'>
                    {test.filter(e=>e.speciality===specialId).map(e=>(
                    <div key={e.id} className='test__item'>
                        <h3 onClick={()=>navigate(`/admin/test/${specialId}/${e.id}`)}>{e.title}</h3>
                        <p onClick={()=>navigate(`/admin/test/${specialId}/${e.id}`)}>{e.countOfQuestion} вопросов</p>
                        <div className="test__icons">
                            <RiDeleteBin6Line onClick={()=>{setIdDelete(e.id); setVisible(true)}}/>
                        </div>
                    </div>
                    ))}
                </div>
                }
            </div>
            <ConfirmDialog visible={visible} 
                    onHide={() => setVisible(false)} 
                    header="Удалить этот тест?" 
                    reject={()=>setVisible(false)} 
                    accept={() => deleteTest()}
                    acceptLabel="Удалить"
                    rejectLabel="Отмена"
                />
        </div>
    );
};

export default Speciality;