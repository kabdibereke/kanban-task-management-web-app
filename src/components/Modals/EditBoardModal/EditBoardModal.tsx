import { useEffect, useState } from 'react';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import styles from './EditBoardModal.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { ref, set, update } from 'firebase/database';
import { db } from '../../../../firebase';
import Modal from '../../../UI/Modal/Modal';
import { ITask } from '../../../interface/interface';
import { setCurrentBoard, setCurrentTasks } from '../../../store/slice/slice';

interface IAddModalTask {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    isOpen: boolean;
}

const EditBoardModal = ({setIsOpen,isOpen}: IAddModalTask) => {
    const {board,currentBoard, flag,currentTasks}= useSelector((state: RootState) => state.board)
    const dispatch =useDispatch()
    const [errorSubtaskInput, setErrorSubtaskInput]=useState(false)
    const [errorTitleInput, setErrorTitleInput]=useState(false)
   
    const [prevColumnsName,setPrevColumnsName]= useState(currentBoard.columns || [
        {
            id:'0',
            name:''
        },
    ] )
    const [titleValue, setTitleValue] =useState(currentBoard.name)
    const [subtasksInput, setSubtaskInput] =useState(currentBoard.columns || [
        {
            id:'0',
            name:''
        },
    ])

    useEffect(()=> {
        board.forEach((item,index)=> {
            if(item.id ==currentBoard.id) {
                setTitleValue(item.name)
                if(item.columns) {
                    setSubtaskInput(item.columns)
                    setPrevColumnsName(item.columns)
                }
               
            }
        })
       
      
    },[currentBoard])
    
   

  
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
        if(!titleValue) {
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
        let boardId=0;
        board.forEach((item,index)=> {
            if(item.id==currentBoard.id) {
                boardId=index
            }
        })
        let newArr:ITask[] =[]
        prevColumnsName.forEach((col,indexCol)=> {
            newArr  = currentTasks.map((item,index)=> {
                if(item.status==col.name) {
                    return {...item, status:subtasksInput[indexCol].name}
                }
                return item
            })
            
        })
        console.log(newArr)
        dispatch(setCurrentTasks(newArr))
        try {
            await update(ref(db, `${currentBoard.id}`), {
                id:currentBoard.id,
                columns:subtasksInput,
                name: titleValue,
                tasks:newArr
            });
           
            dispatch(setCurrentBoard(board[boardId]))
           
        } catch (error) {
           console.log(error)
        }
     
        
        boardId=0
    }
  return (
    <Modal setOpen={setIsOpen} open={isOpen}>
        <div className={styles.modal_content}  onClick={(e)=>e.stopPropagation()}>
            <div className={styles.name}>Edit Board</div>
            <div className={styles.input_wrapper}>
                <p className={styles.title}>Board Name</p>
                <input type="text" value={titleValue}  onChange={handleChangeInputValue} className={errorTitleInput? styles.input_error: styles.input} placeholder='e.g. Take coffee break' />
                {errorTitleInput &&  <p className={styles.error_text}>Can’t be empty</p>}
            </div>
            <div className={styles.input_wrapper}>
                <p className={styles.title}>Board Columns</p>
                {subtasksInput.map(item=> {
                return <Input key={item.id} title={item.name} id={item.id} deleteSub={deleteSub} editTitle={editTitle} setErrorSubtaskInput={setErrorSubtaskInput} subtasksInput={subtasksInput}/>
                })}
            </div>
            <Button appearence='white' width='all' onClick={addSub} >
            + Add New Column
            </Button>
            <Button  width='all' onClick={handleSubmit}  className={styles.btn} >
            Save Changes
            </Button>
        </div>
    </Modal>
  )
}

export default EditBoardModal