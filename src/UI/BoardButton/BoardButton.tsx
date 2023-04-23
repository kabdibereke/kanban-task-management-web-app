import { IBoardButton } from "./BoardButton.props"
import styles from './BoardButton.module.scss'
import {ReactComponent as BoardIcon} from '../../assets/board_icon.svg'
import {ReactComponent as CloseEye} from '../../assets/eye-close.svg'
import cn from "classnames"
const BoardButton = ({children,create=false,className, active=false, hide=false, ...props}: IBoardButton) => {
  return (
   <button className={cn(styles.button, className, {
    [styles.btn]: create == false && active==false ,
    [styles.create]: create == true,
    [styles.hide]: hide == true,
    [styles.active]: active == true,
  })}
  {...props}>
    {!hide && <BoardIcon className={styles.icon}/>}
    {hide && <CloseEye className={styles.icon}/>}
    <p>
    {children}
    </p>
   </button>
  )
}

export default BoardButton