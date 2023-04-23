import {  useEffect, useState } from 'react';
import styles from './TaskModal.module.scss'
import Dropdown from '../../../UI/Dropdown/Dropdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { ref,  update } from 'firebase/database';
import { db } from '../../../../firebase';
import { ITask } from '../../../interface/interface';
import Checkbox from '../../../UI/Checkbox/Checkbox';
import  dots from '../../../assets/dots.png'
import Modal from '../../../UI/Modal/Modal';
interface ITaskModal {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    isOpen: boolean; 
    task: ITask;
    setDeleteTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    setEditTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    
}

const TaskModal = ({setIsOpen,isOpen,task,setDeleteTaskModalOpen,setEditTaskModalOpen}: ITaskModal) => {
    const {board,currentBoard}= useSelector((state: RootState) => state.board)
    const [currentColumnName,setCurrentColumnName] =useState(task.status)
    const [openMoreDialog, setOpenMoreDialog] =useState(false)
    useEffect(()=> {
        board.forEach((item,index)=> {
            if(item.id==currentBoard.id) {
                if(item.tasks) {
                    item.tasks.forEach((item,index)=> {
                        if(item.id==task.id) {
                            setCurrentColumnName(item.status)
                        }
                    })
                }
            }
        })
    },[board])
    const handleSubmit =async(id:string,bool:boolean)=> {
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
       
        try {
           
            await update(ref(db, `${currentBoard.id}/tasks/${taskId}/subtasks/${id}`), {
                isCompleted:bool
            });
            
            idBoard = 0;
            taskId=0
           
        } catch (error) {
           console.log(error)
        }

       
    }
    const changeStatus =async(name:string)=> {
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
        setCurrentColumnName(name)
        try {
            
            await update(ref(db, `${currentBoard.id}/tasks/${taskId}`), {
                status:name
            });
            
            setIsOpen(false)
             idBoard = 0;
             taskId=0
            
        } catch (error) {
            console.log(error)
        }
    }

    const openDeleteTask = ()=> {
        setOpenMoreDialog(false)
        setIsOpen(false)
        setDeleteTaskModalOpen(true)
    }

    const openEditTask =()=> {
        setOpenMoreDialog(false)
        setIsOpen(false)
        
        setEditTaskModalOpen(true)
    }
   
  return (
    <Modal open={isOpen}  setOpen={setIsOpen}>
            <div className={styles.modal_content} onClick={(e)=>e.stopPropagation()}>
                <button className={styles.more} onClick={()=>setOpenMoreDialog(!openMoreDialog)}>
                    <img src={dots} alt="dots" />
                </button>
                { openMoreDialog && <div className={styles.more_dialog}  >
                        <p className={styles.edit} onClick={openEditTask} >Edit Task</p>
                        <p className={styles.delete} onClick={openDeleteTask}>Delete Task</p>
                    </div>}
                <div className={styles.name}>{task.title}</div>
                <div className={styles.descr}>{task.description}</div>
                <div className={styles.input_wrapper}>
                    <p className={styles.title}>Subtask</p>
                    {task.subtasks?
                    task.subtasks.map((item,index)=> {
                    return  <Checkbox key={item.id} item={item}  handleSubmit={handleSubmit}/>
                    }):''}
                </div>
                <div className={styles.input_wrapper}>
                    <p className={styles.title}>Current status</p>
                   <Dropdown currentStatus={currentColumnName!} >
                    {board.map(item=> {
                        if(item.id ==currentBoard.id) {
                            if(item.columns) {
                                return item.columns.map((item)=> {
                                    return <p key={item.id} onClick={()=>changeStatus(item.name)}>{item.name}</p>
                                })
                            }
                        }
                    })}
                   </Dropdown>
                </div>
            </div>

    </Modal>
   
   
  )
}

export default TaskModal