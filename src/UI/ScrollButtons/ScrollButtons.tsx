import styles from './ScrollButtons.module.scss'
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
interface IScrollButtons extends Omit<
React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>,
"onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref"
> {
  side:'left' | 'right'
}

const ScrollButtons = ({side,...props}:IScrollButtons) => {
 
  return (
    <button className={side=='right'? styles.btnR: styles.btnL} {...props}>
      <Arrow/>
    </button>
  )
}

export default ScrollButtons