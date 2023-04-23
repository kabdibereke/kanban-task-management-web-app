import { useSelector } from 'react-redux';
import { ITask } from '../../interface/interface';
import Task from '../Task/Task'
import styles from './Column.module.scss'
import { RootState } from '../../store/store';

interface IColumn  {
  nameColumn: string;
  index: number;
}

const Column = ({nameColumn,index}: IColumn) => {
  const {openSidebar,board, currentBoard}= useSelector((state: RootState) => state.board)
  return (
   <>
   <div className={styles.wrapper}>
        
        <h2 className={styles.title}>{nameColumn}</h2>
        {board.map((item)=> {
            if(item.id ==currentBoard.id) {
              if(item.tasks) {
                 return   item.tasks.map((item,index)=> {
                    if(item.status==nameColumn) {
                      if(index!==0){
                        return <Task key={item.id} item={item}/>
                      }
                    }
                })
              }
              
            }
          
        
           })}

        
    </div>
   </>
  )
}

export default Column