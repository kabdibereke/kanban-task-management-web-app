import { useDispatch, useSelector } from 'react-redux'
import Column from '../Column/Column'
import styles from './Board.module.scss'
import { RootState } from '../../store/store'
import AddColumn from '../Modals/AddColumn/AddColumn'
import { useEffect, useRef, useState } from 'react'
import { setCurrentTasks } from '../../store/slice/slice'
import ScrollButtons from '../../UI/ScrollButtons/ScrollButtons'



const Board = () => {
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  const {openSidebar,board, currentBoard}= useSelector((state: RootState) => state.board)
  const dispatch= useDispatch()
  const [addColumnModalOpen, setAddColumnModalOpen] =useState(false)
  useEffect(()=> {
    board.forEach((item,index)=> {
      if(item.id==currentBoard.id) {
        dispatch(setCurrentTasks(board[index].tasks))
      }
    })
   
  },[board,currentBoard])
  const slide = (shift:number) => {
    //@ts-ignore
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
         //@ts-ignore
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
         //@ts-ignore
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  const scrollCheck = () => {
     //@ts-ignore
    setscrollX(scrl.current.scrollLeft);
    if (
       //@ts-ignore
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
       //@ts-ignore
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  return (
    <>
    <ScrollButtons side='left' onClick={() => slide(-50)}/>
    <ScrollButtons side='right'  onClick={() => slide(+50)}/>
    <div className={openSidebar ?styles.board_active :styles.board} ref={scrl} onScroll={scrollCheck}>
   


        <div className={styles.wrapper}>
           {board.map((item)=> {
            if(item.id ==currentBoard.id) {
              if(item.columns) {
                 return   item.columns.map((item,index)=> {
                  return <Column key={index} nameColumn={item.name}/>
                })
              }
              
            }
          
        
           })}
           <div className={styles.new_column} onClick={()=>setAddColumnModalOpen(true)}> 
                <p className={styles.title}>+ New Column</p>
           </div>
        </div>
       
    </div>
    <AddColumn isOpen={addColumnModalOpen} setIsOpen={setAddColumnModalOpen}/>
    </>
  )
}

export default Board