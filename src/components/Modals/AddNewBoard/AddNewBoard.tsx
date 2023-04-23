import { useEffect, useState } from 'react';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import styles from './AddNewBoard.module.scss'
import Dropdown from '../../../UI/Dropdown/Dropdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { ref, set } from 'firebase/database';
import { db } from '../../../../firebase';
import Modal from '../../../UI/Modal/Modal';

interface IAddModalTask {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    isOpen: boolean;
}

const AddNewBoard = ({setIsOpen,isOpen}: IAddModalTask) => {
    const {board,currentBoard}= useSelector((state: RootState) => state.board)
    const [errorSubtaskInput, setErrorSubtaskInput]=useState(false)
    const [errorTitleInput, setErrorTitleInput]=useState(false)
    const [currentColumnName,setCurrentColumnName] =useState('')
    const [titleValue, setTitleValue] =useState('')
   const [subtasksInput, setSubtaskInput] =useState([
        {
            id:'0',
            name:''
        },
    ])

    const addSub =()=> {
        let id = 0
        if(subtasksInput.length!=0) {
            id= subtasksInput.length
        } 
        let newSub = {
            id:id.toString(),
            name:''
        }
        setSubtaskInput([...subtasksInput, newSub])
    }

    const editTitle= (id:string, text:string)=> {
        let newArr = subtasksInput.map(item=> {
            if(id==item.id) {
                return {...item, name:text }
            }
            return item
        })

        setSubtaskInput(newArr)
    }
    const deleteSub =(id:string)=> {
       let newArr = subtasksInput.filter(item=> item.id!==id)
       setSubtaskInput(newArr)
    }

    const handleChangeInputValue =(e: React.ChangeEvent<HTMLInputElement>)=> {
       
        setErrorTitleInput(false)
        setTitleValue(e.target.value)
    }

    useEffect(()=> {
        if(titleValue.length==0) {
            setErrorTitleInput(true)
        }else {
            setErrorTitleInput(false)
        }
    },[titleValue])
    const handleSubmit =async()=> {
        if(errorSubtaskInput) {
           return 
        }
        if(errorTitleInput) {
            return  
        }

        let id = new Date().getTime()
        try {
            await set(ref(db, `${id}`), {
                id:id,
                name: titleValue,
                columns:subtasksInput,
                tasks: [
                    {
                        "id":"0",
                        "title": "Build UI for onboarding flow",
                        "description": "",
                        "status": "Todo",
                        "subtasks": [
                          {
                            "id":"1",
                            "title": "Sign up page",
                            "isCompleted": true
                          },
                          {
                            "id":"2",
                            "title": "Sign in page",
                            "isCompleted": false
                          },
                          {
                            "id":"3",
                            "title": "Welcome page",
                            "isCompleted": false
                          }
                        ]
                      },
                ]
            });
           
            
           
        } catch (error) {
           console.log(error)
        }
    }
  return (
    <Modal setOpen={setIsOpen} open={isOpen}>
        <div className={styles.modal_content}  onClick={(e)=>e.stopPropagation()}>
            <div className={styles.name}>Add New Board</div>
            <div className={styles.input_wrapper}>
                <p className={styles.title}>Board Name</p>
                <input type="text"  onChange={handleChangeInputValue} className={errorTitleInput? styles.input_error: styles.input} placeholder='e.g. Take coffee break' />
                {errorTitleInput &&  <p className={styles.error_text}>Can’t be empty</p>}
            </div>
            <div className={styles.input_wrapper}>
                <p className={styles.title}>Board Columns</p>
                {subtasksInput.map(item=> {
                return <Input key={item.id} id={item.id} deleteSub={deleteSub} editTitle={editTitle} setErrorSubtaskInput={setErrorSubtaskInput} subtasksInput={subtasksInput}/>
                })}
            </div>
            <Button appearence='white' width='all' onClick={addSub} >
            + Add New Column
            </Button>
            <Button  width='all' onClick={handleSubmit}  className={styles.btn} >
            Create New Board
            </Button>
        </div>
    </Modal>
  )
}

export default AddNewBoard