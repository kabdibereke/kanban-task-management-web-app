import { useEffect, useState } from 'react';
import Button from '../../../UI/Button/Button';
import styles from './DeleteTaskModal.module.scss'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { ref, remove, set, update } from 'firebase/database';
import { db } from '../../../../firebase';

import { ITask } from '../../../interface/interface';
import Modal from '../../../UI/Modal/Modal';
interface ITaskModal {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    isOpen: boolean; 
    task: ITask;
}

const DeleteTaskModal = ({setIsOpen,isOpen,task}: ITaskModal) => {
    const {board,currentBoard}= useSelector((state: RootState) => state.board)
    const [allTask, setAllTask] =useState<ITask[]>([])
    useEffect(()=> {
        let idBoard = 0;
       
        board.forEach((item,index)=> {
            if(item.id==currentBoard.id) {
                idBoard=index
                if(item.tasks) {  
                    setAllTask(item.tasks)
                }
            }
        })
    },[board])
    const handleSubmit =async()=> {
        let idBoard = 0;
        let taskId=0
       
        board.forEach((item,index)=> {
            if(item.id==currentBoard.id) {
                idBoard=index
                if(item.tasks) {  
                    
                    item.tasks.forEach((item,index)=> {
                        if(item.id==task.id) {
                            taskId=index
                        }
                    })
                }
            }
        })
        let newArr:ITask[] = allTask.filter((item,index)=> {
            if(index!=taskId) {
                return item
            }
        })
        setAllTask(newArr)
        try {
            await update(ref(db, `${currentBoard.id}`),{
                tasks:newArr
            } );
            
            idBoard = 0;
            taskId=0
           
        } catch (error) {
           console.log(error)
        }

       
    }
    

   
  return (
    <Modal open={isOpen}  setOpen={setIsOpen}>
        <div className={styles.modal_content} onClick={(e)=>e.stopPropagation()}>

            <div className={styles.name}>Delete this task?</div>
            <div className={styles.descr}>{`Are you sure you want to delete the ‘${task.title}’ task and its subtasks? This action cannot be reversed.`}</div>
            <div className={styles.btns}>
                <Button className={styles.btn} appearence='red' onClick={handleSubmit}> 
                    Delete  
                </Button>
                <Button className={styles.btn} appearence='white'> 
                   Cancel 
                </Button>
            </div>
        </div>

    </Modal>
   
   
  )
}

export default DeleteTaskModal