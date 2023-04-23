import styles from './Sidebar.module.scss'
import {ReactComponent as Logo} from '../../assets/logo.svg'
import cn from "classnames"
import BoardButton from '../../UI/BoardButton/BoardButton'
import { ISidebar } from './Sidebar.props'

import { useDispatch, useSelector} from 'react-redux'
import { setCurrentBoard, setOpenSidebar } from '../../store/slice/slice'
import { RootState } from '../../store/store'
import { useState } from 'react'
import AddNewBoard from '../Modals/AddNewBoard/AddNewBoard'
import ThemeSwitcher from '../../UI/ThemeSwitcher/ThemeSwitcher'

const Sidebar = ({className}:ISidebar) => { 
    const [addBoardModalOpen, setAddBoardModalOpen]=useState(false)
    const {board, currentBoard}= useSelector((state: RootState) => state.board)
    const dispatch = useDispatch()
   
  return (
   <>
    <div className={cn(styles.sidebar, className,)} >
      <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Logo className={styles.logoIcon}/>
          </div>

          <div className={styles.boards}>
              <p className={styles.title}>ALL BOARDS ({board.length})</p>
              <div className={styles.btns}>
                {board.map((item,index)=> {
                  
                  return <BoardButton  key={index} onClick={()=>dispatch(setCurrentBoard(item))} active={currentBoard.id==item.id} >
                            {item.name}
                      </BoardButton>
                })}
              </div>
              <BoardButton create  onClick={()=>setAddBoardModalOpen(true)}>
                  + Create New Board
              </BoardButton>
          </div>

          <div className={styles.footer}>
              <ThemeSwitcher/>
              <BoardButton hide onClick={()=>dispatch(setOpenSidebar(false))} >
                  Hide Sidebar
              </BoardButton>
          </div>
      </div>
    </div>
    <AddNewBoard  setIsOpen={setAddBoardModalOpen} isOpen={addBoardModalOpen}/>
   </>
  )
}

export default Sidebar