import Button from '../../../UI/Button/Button';
import styles from './DeleteBoardModal.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { ref, remove} from 'firebase/database';
import { db } from '../../../../firebase';
import Modal from '../../../UI/Modal/Modal';
import { setCurrentBoard } from '../../../store/slice/slice';
import { useState } from 'react';
import { IBoard } from '../../../interface/interface';
interface IBoardModal {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    isOpen: boolean; 

}

const DeleteBoardModal = ({setIsOpen,isOpen}: IBoardModal) => {
    const {board,currentBoard}= useSelector((state: RootState) => state.board)
    const [newBoard,setNewBoard]= useState<IBoard[]>([])
    const dispatch = useDispatch()
    const handleSubmit =async()=> {
        
        try {
            await remove(ref(db, `${currentBoard.id}`));
            
           
            
           
        } catch (error) {
           console.log(error)
        }
        dispatch(setCurrentBoard(board[1]))
        setIsOpen(false)
    }
    

   
  return (
    <Modal open={isOpen}  setOpen={setIsOpen}>
        <div className={styles.modal_content} onClick={(e)=>e.stopPropagation()}>

            <div className={styles.name}>Delete this board?</div>
            <div className={styles.descr}>{`Are you sure you want to delete the ‘${currentBoard.name}’ board? This action will remove all columns and tasks and cannot be reversed.`}</div>
            <div className={styles.btns}>
                <Button className={styles.btn} appearence='red' onClick={handleSubmit}> 
                    Delete  
                </Button>
                <Button className={styles.btn} appearence='white' onClick={()=>setIsOpen(false)}> 
                   Cancel 
                </Button>
            </div>
        </div>

    </Modal>
   
   
  )
}

export default DeleteBoardModal