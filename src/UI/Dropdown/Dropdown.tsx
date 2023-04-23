import styles from './Dropdown.module.scss'
import {ReactComponent as ArrowIcon} from '../../assets/arrow.svg'
import {  useState } from 'react'

interface IDropdown {
  currentStatus: string,
  children:React.ReactNode
}

const Dropdown = ({currentStatus,children}: IDropdown) => {
  const [open, setOpen] =useState(false)
 
  return (
    <div className={styles.wrapper} onClick={()=>setOpen(!open)}>
        <div className={styles.title} >
            <p>{currentStatus}</p>
            <ArrowIcon className={open? styles.reverse:''}/>
        </div>
        {open && 
        <div className={styles.content} onClick={()=>setOpen(false)}>
        {children}
      </div>}
    </div>  
  )
}

export default Dropdown