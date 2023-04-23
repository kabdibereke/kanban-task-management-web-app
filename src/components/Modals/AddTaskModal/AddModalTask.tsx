import { useEffect, useState } from 'react';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import styles from './AddModalTask.module.scss'
import Dropdown from '../../../UI/Dropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { ref, set } from 'firebase/database';
import { db } from '../../../../firebase';
import Modal from '../../../UI/Modal/Modal';
import { setCurrentTasks, setFlag } from '../../../store/slice/slice';

interface IAddModalTask {
    setAddTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
    addTaskModal:boolean
}

const AddModalTask = ({setAddTaskModal,addTaskModal}: IAddModalTask) => {
    const {board,currentBoard,flag}= useSelector((state: RootState) => state.board)
    const dispatch =useDispatch()
    const [errorSubtaskInput, setErrorSubtaskInput]=useState(false)
    const [errorTitleInput, setErrorTitleInput]=useState(false)
    const [currentColumnName,setCurrentColumnName] =useState('')
    const [titleValue, setTitleValue] =useState('')
    const [descrValue, setDescrValue] =useState('')
     const [subtasksInput, setSubtaskInput] =useState([
        {
            id:'0',
            isCompleted:true,
            title:''
        },
        {
            id:'1',
            isCompleted:true,
            title:''
        },
    ])

    useEffect(()=> {
        board.map(item=> {
            if(item.id ==currentBoard.id) {
                if(item.columns) {
                    setCurrentColumnName(item.columns[0].name)
                }
            }
        })
    },[addTaskModal])

    const addSub =()=> {
        let id = 0
        if(subtasksInput.length!=0) {
            id= subtasksInput.length
        } 
        let newSub = {
            id:id.toString(),
            isCompleted:false,
            title:''
        }
        setSubtaskInput([...subtasksInput, newSub])
    }

    const editTitle= (id:string, text:string)=> {
        let newArr = subtasksInput.map(item=> {
            if(id==item.id) {
                return {...item, title:text }
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

        let idBoard = 0;
        let lastTaskID=0;
        board.forEach((item,index)=> {
            if(item.name==currentBoard.name) {
                idBoard=index
                if(item.tasks) {
                    lastTaskID= item.tasks.length
                }
            }
        })
        try {
            await set(ref(db, `${currentBoard.id}/tasks/${lastTaskID}`), {
                description: descrValue,
                id: new Date().getTime(),
                status: currentColumnName,
                title: titleValue,
                subtasks:subtasksInput
            });
           
            setCurrentColumnName('')
            setTitleValue('')
            setDescrValue('')
            setAddTaskModal(false)
           
        } catch (error) {
           console.log(error)
        }
    }
  return (
    <Modal setOpen={setAddTaskModal} open={addTaskModal}>
          <div className={styles.modal_content}  onClick={(e)=>e.stopPropagation()}>
            <div className={styles.name}>Add New Task</div>
                <div className={styles.input_wrapper}>
                    <p className={styles.title}>Title</p>
                    <input type="text"  onChange={handleChangeInputValue} className={errorTitleInput? styles.input_error: styles.input} placeholder='e.g. Take coffee break' />
                    {errorTitleInput &&  <p className={styles.error_text}>Can’t be empty</p>}
                </div>
                <div className={styles.input_wrapper}>
                    <p className={styles.title}>Description</p>
                    <textarea  onChange={(e)=> setDescrValue(e.target.value)} className={styles.textarea} placeholder='e.g. It’s always good to take a break'/>
                </div>
                <div className={styles.input_wrapper}>
                    <p className={styles.title}>Subtasks</p>
                   {subtasksInput.map(item=> {
                    return <Input key={item.id} id={item.id} deleteSub={deleteSub} editTitle={editTitle} setErrorSubtaskInput={setErrorSubtaskInput} subtasksInput={subtasksInput}/>
                   })}
                </div>
                <Button appearence='white' width='all' onClick={addSub} >
                + Add New Subtask
                </Button>
                <div className={styles.input_wrapper}>
                    <p className={styles.title}>Status</p>
                    <Dropdown currentStatus={currentColumnName!} >
                        {board.map(item=> {
                            if(item.name ==currentBoard.name) {
                                if(item.columns) {
                                    return item.columns.map((item)=> {
                                        
                                        return <p key={item.id} onClick={()=>setCurrentColumnName(item.name)}>{item.name}</p>
                                    })
                                }
                            }
                        })}
                   </Dropdown>
                </div>
                <Button  width='all' onClick={handleSubmit} >
                Create Task
                </Button>
        </div>
    </Modal>
  )
}

export default AddModalTask