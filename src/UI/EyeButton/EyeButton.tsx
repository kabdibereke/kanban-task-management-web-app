import eye from '../../assets/eye.svg'
import styles from './EyeButton.module.scss'

interface IEyeButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

const EyeButton = ({...props}:IEyeButton) => {
  return (
   <button className={styles.button} {...props}>
    <img src={eye} alt="eye" />
   </button>
  )
}

export default EyeButton