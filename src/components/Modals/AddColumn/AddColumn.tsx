import { useEffect, useState } from 'react';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import styles from './AddColumn.module.scss'
import Dropdown from '../../../UI/Dropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { ref, set } from 'firebase/database';
import { db } from '../../../../firebase';
import Modal from '../../../UI/Modal/Modal';
import { setCurrentBoard } from '../../../store/slice/slice';

interface IAddModalTask {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    isOpen: boolean;
}

const AddColumn = ({setIsOpen,isOpen}: IAddModalTask) => {
    const {board,currentBoard}= useSelector((state: RootState) => state.board)
    const [errorTitleInput, setErrorTitleInput]=useState(false)
    const [titleValue, setTitleValue] =useState('')
    const dispatch =useDispatch()
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
      
        if(errorTitleInput) {
            return  
        }
        let boardID = 0
        let lastColumnID= 0
        board.forEach((item,index)=> {
            if(item.id==currentBoard.id) {
                boardID=index
                if(item.columns) {
                    lastColumnID = item.columns.length
                }
            }
        })
      
        try {
            await set(ref(db, `${currentBoard.id}/columns/${lastColumnID}`), {
                id:lastColumnID,
                name: titleValue,
            });
            dispatch(setCurrentBoard(board[boardID]))
            boardID = 0
            lastColumnID= 0
            setIsOpen(false)

           
             
        } catch (error) {
           console.log(error)
        }
       
    }
  return (
    <Modal setOpen={setIsOpen} open={isOpen}>
        <div className={styles.modal_content}  onClick={(e)=>e.stopPropagation()}>
            <div className={styles.name}>Add Column</div>
            <div className={styles.input_wrapper}>
                <p className={styles.title}>Column Name</p>
                <input type="text"  onChange={handleChangeInputValue} className={errorTitleInput? styles.input_error: styles.input} placeholder='e.g. Take coffee break' />
                {errorTitleInput &&  <p className={styles.error_text}>Can’t be empty</p>}
            </div>
            <Button  width='all' onClick={handleSubmit}  className={styles.btn} >
            Create New Column
            </Button>
        </div>
    </Modal>
  )
}

export default AddColumn