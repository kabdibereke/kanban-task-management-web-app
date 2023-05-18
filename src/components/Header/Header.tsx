import styles from './Header.module.scss'
import {ReactComponent as Logo}from '../../assets/logo.svg'
import {ReactComponent as Logo2}from '../../assets/logo2.svg'
import {ReactComponent as Arrow}from '../../assets/arrow.svg'
import Button from '../../UI/Button/Button'
import  dots from '../../assets/dots.png'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useEffect, useState } from 'react'
import AddModalTask from '../Modals/AddTaskModal/AddModalTask'
import DeleteBoardModal from '../Modals/DeleteBoardModal/DeleteBoardModal'
import EditBoardModal from '../Modals/EditBoardModal/EditBoardModal'
import Sidebar from '../Sidebar/Sidebar'
import SidebarModal from '../Modals/SidebarModal/SidebarModal'
import { setCurrentBoard } from '../../store/slice/slice'
import { db } from '../../../firebase'

const Header = () => {
    const {openSidebar,currentBoard,board}= useSelector((state: RootState) => state.board)
    const [addTaskModal, setAddTaskModal]=useState(false)
    const [openMoreDialog, setOpenMoreDialog] =useState(false)
    const [deleteBoardModalOpen, setDeleteBoardModalOpen]=useState(false)
    const [editBoardModalOpen, setEditBoardModalOpen]=useState(false)
    const [openSidebarModal, setOpenSidebarModal] =useState(false)

    const dispatch =useDispatch()
    useEffect(()=> {
        document.body.addEventListener('click',()=> {
            setOpenMoreDialog(false)
        })
       return  (
        document.body.removeEventListener('click',()=> {
            setOpenMoreDialog(false)
        })
       )
    },[])



    const openDeleteModal =()=> {
        setOpenMoreDialog(false)
        setDeleteBoardModalOpen(true)
    }
    const openBoardModal =()=> {
        setOpenMoreDialog(false)
        setEditBoardModalOpen(true)
    }
   
  return (
    <>
    <header className={styles.header}>
        <div className='container'>
           <div className={styles.wrapper}>
                <div className={styles.logo_wrapper}>
                    <div className={styles.logo} >
                        <Logo className={styles.logoIcon}/>
                    </div>
                    <div className={styles.logo2} >
                        <Logo2 className={styles.logoIcon}/>
                    </div>
                    {board.map(item=> {
                        if(item.id==currentBoard.id) {
                            return <h1 key={item.id} className={ openSidebar? styles.name_board_active: styles.name_board}>
                            {item.name}
                            </h1>
                        }
                    })}
                    {board.map(item=> {
                        if(item.id==currentBoard.id) {
                            return  <button className={styles.btn} onClick={()=>setOpenSidebarModal(true)}>
                                {item.name}
                                <Arrow/>
                                </button>
                        }
                    })}
                   
                </div>
                <div className={styles.btns} onClick={(e)=>e.stopPropagation()} >
                    <Button onClick={()=>setAddTaskModal(true)} className={styles.desktop}>
                        +Add New Task
                    </Button>
                    <Button onClick={()=>setAddTaskModal(true)} className={styles.mobile}>
                        +
                    </Button>
                    <button className={styles.more} onClick={()=>setOpenMoreDialog(!openMoreDialog)}>
                        <img src={dots} alt="dots" />
                    </button>
                    { openMoreDialog && <div className={styles.more_dialog}  >
                        <p className={styles.edit} onClick={openBoardModal}>Edit Board</p>
                        <p className={styles.delete}  onClick={openDeleteModal} >Delete Board</p>
                    </div>}
                </div>
           </div>
        </div>
    </header>   
    <AddModalTask addTaskModal={addTaskModal} setAddTaskModal={setAddTaskModal}/>
    <DeleteBoardModal isOpen={deleteBoardModalOpen} setIsOpen={setDeleteBoardModalOpen}/>
    <EditBoardModal isOpen={editBoardModalOpen} setIsOpen={setEditBoardModalOpen}/>
    <SidebarModal isOpen={openSidebarModal} setIsOpen={setOpenSidebarModal} />
    </>
  )
}

export default Header