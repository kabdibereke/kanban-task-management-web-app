import { useDispatch, useSelector } from 'react-redux';
import Board from '../../components/Board/Board';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Layout.module.scss'
import { RootState } from '../../store/store';
import EyeButton from '../EyeButton/EyeButton';
import { setBoard, setCurrentBoard, setOpenSidebar } from '../../store/slice/slice';
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../firebase';
import ClipLoader from "react-spinners/ClipLoader";


const Layout = () => {
  const {openSidebar,currentBoard,board}= useSelector((state: RootState) => state.board)
  const dispatch = useDispatch()
  const [loading, setLoading] =useState(false)
  const [error, setError]= useState(false)
  
  useEffect(()=> {
    setLoading(true)
    try {
      onValue(ref(db), (snapshot) => {
        const data = snapshot.val()
        if (data !== null) {

          dispatch(setBoard(data))
          dispatch(setCurrentBoard(data[0]))
          setLoading(false)
        }
      });
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  },[])
  
  return (
   <div className={styles.layout}>
      <Sidebar className={openSidebar? styles.sidebar_active: styles.sidebar}/>
      <Header />
      {loading && <ClipLoader
      className={styles.loader}
      color="#635FC7"
      size={100}
    />}
 
      {board.length && <Board />}
      {!openSidebar &&  <EyeButton onClick={()=>dispatch(setOpenSidebar(true))}/>}
   </div>
  )
}

export default Layout