import styles from './Input.module.scss'
import {ReactComponent as CloseIcon} from '../../assets/close.svg'
import { useEffect, useState } from 'react';
interface InputProps {
  deleteSub: (id: string) => void; 
  editTitle: (id: string, text: string) => void;
  id:string,
  setErrorSubtaskInput: React.Dispatch<React.SetStateAction<boolean>>
  title?:string,
  subtasksInput: any
}

const Input = ({deleteSub,editTitle,id,setErrorSubtaskInput,title,subtasksInput}:InputProps) => {
  const [inputValue, setInputValue]= useState(title || '')
  const [error,setError]= useState(false)
  const changeInputValue =(e: React.ChangeEvent<HTMLInputElement>)=> {
    setError(false)
    setInputValue(e.target.value)
    editTitle(id,e.target.value)
  }
  useEffect(()=> {
    if(!inputValue) {
      setError(true)
    }
    setErrorSubtaskInput(error)
  },[error,inputValue])
  return (
    <div className={styles.wrapper}>
        <input type="text" className={error? styles.input_error: styles.input} value={inputValue} onChange={changeInputValue} placeholder='e.g. Drink coffee & smile' />
       {error &&  <p className={styles.error_text}>Can’t be empty</p>}
       {subtasksInput? subtasksInput.length>1 && <button className={styles.btn} onClick={()=>deleteSub(id)}>
            <CloseIcon className={error ? styles.error :''}/>
        </button>:''}
    </div>
  )
}

export default Input