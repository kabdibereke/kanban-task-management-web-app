import {  useEffect, useState } from 'react';
import styles from './SidebarModal.module.scss'

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Modal from '../../../UI/Modal/Modal';
import BoardButton from '../../../UI/BoardButton/BoardButton';
import ThemeSwitcher from '../../../UI/ThemeSwitcher/ThemeSwitcher';
import { setCurrentBoard, setOpenSidebar } from '../../../store/slice/slice';
import AddNewBoard from '../AddNewBoard/AddNewBoard';
interface ITaskModal {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    isOpen: boolean; 
    
    
}

const SidebarModal = ({setIsOpen,isOpen}: ITaskModal) => {
    const {board,currentBoard}= useSelector((state: RootState) => state.board)
    const dispatch = useDispatch()
    const [addBoardModalOpen, setAddBoardModalOpen]=useState(false)

    

  return (
   <>
    <Modal open={isOpen}  setOpen={setIsOpen}>
            <div className={styles.modal_content} onClick={(e)=>e.stopPropagation()}>
            <div className={styles.sidebar} >
                <div className={styles.wrapper}>
                    <div className={styles.boards}>
                        <p className={styles.title}>ALL BOARDS ({board.length})</p>
                        <div className={styles.btns}>
                            {board.map((item,index)=> {
                                if(index!==0) {
                                    return <BoardButton  key={index} onClick={()=>dispatch(setCurrentBoard(item))} active={currentBoard.id==item.id} >
                                        {item.name}
                                    </BoardButton>
                                }
                            
                            })}
                        </div>
                        <BoardButton create  onClick={()=>setAddBoardModalOpen(true)}>
                            + Create New Board
                        </BoardButton>
                    </div>

                    <div className={styles.footer}>
                        <ThemeSwitcher/>
                    </div>
                </div>
                </div>
            </div>

    </Modal>
   <AddNewBoard  setIsOpen={setAddBoardModalOpen} isOpen={addBoardModalOpen}/>
   </>
   
  )
}

export default SidebarModal