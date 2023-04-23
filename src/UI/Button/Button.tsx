import { IButton } from "./Button.props"
import styles from './Button.module.scss'
import cn from "classnames"
const Button = ({children, appearence='blue', width='half', className,...props}: IButton) => {
  return (
   <button style={width=='all' ? {width:'100%'}: {width:'fit-content'}} className={cn(styles.button, className, {
    [styles.white]: appearence == 'white' ,
    [styles.red]: appearence == 'red' ,
  })}
  {...props}> 
    {children}
   </button>
  )
}

export default Button