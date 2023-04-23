import { useState } from 'react'
import styles from './Checkbox.module.scss'
import checkIcon from '../../assets/check.svg'
import { ISubtask } from '../../interface/interface'
type ICheckbox = {
    item: ISubtask
    handleSubmit: (id: string, bool: boolean) => Promise<void>
}

const Checkbox = ({item,handleSubmit}:ICheckbox) => {
    const [check, setCheck]= useState(item.isCompleted)
    
    const changeCheck =()=> {
        setCheck(!check)
        handleSubmit(item.id,!check)
    }

  return (
    <div className={check? styles.wrapper_active: styles.wrapper} onClick={changeCheck}>
        <div className={check? styles.checkbox_active : styles.checkbox} onClick={changeCheck}>
            {check && <img src={checkIcon} alt="checkIcon" />}
        </div>
        <p className={check? styles.title_active: styles.title}>{item.title}</p>
    </div>
  )
}

export default Checkbox