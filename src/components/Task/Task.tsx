import { useState } from 'react';
import { ITask } from '../../interface/interface';
import styles from './Task.module.scss'
import TaskModal from '../Modals/TaskModal/TaskModal';
import DeleteTaskModal from '../Modals/DeleteTaskModal/DeleteTaskModal';
import EditModalTask from '../Modals/EditTaskModal/EditModalTask';


interface TaskProps {
  item: ITask; 

}

const Task = ({item}:TaskProps) => {
  const [taskModalOpen, setTaskModalOpen] =useState(false)
  const [deleteTaskModalOpen, setDeleteTaskModalOpen] =useState(false)
  const [editTaskModalOpen, setEditTaskModalOpen] =useState(false)
  return (
   <>
    <div className={styles.wrapper} onClick={()=>setTaskModalOpen(true)}>
        <div className={styles.title}>
        {item.title}
        </div>
        <div className={styles.subtitle}>{item.subtasks? item.subtasks.filter(item=>item.isCompleted).length:0} of {item.subtasks? item.subtasks.length:0} substasks</div>
    </div>
    <TaskModal setIsOpen={setTaskModalOpen} isOpen={taskModalOpen} task={item} setDeleteTaskModalOpen={setDeleteTaskModalOpen} setEditTaskModalOpen={setEditTaskModalOpen} />
    <DeleteTaskModal setIsOpen={setDeleteTaskModalOpen} isOpen={deleteTaskModalOpen} task={item}/>
    <EditModalTask setIsOpen={setEditTaskModalOpen} isOpen={editTaskModalOpen} task={item}/>
   </>
  )
}

export default Task