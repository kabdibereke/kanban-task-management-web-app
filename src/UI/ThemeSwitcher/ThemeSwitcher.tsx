import { useEffect, useState } from "react"
import  moon   from '../../assets/dark.svg'
import  sun   from "../../assets/light.svg"
import styles from './ThemeSwitcher.module.scss'



const ThemeSwitcher = () => {
    //@ts-ignore
    const [isDark, setIsDark] =useState(false)
    const themeIcon = isDark? 'dark': 'light'
   
    useEffect(()=> {
      if(localStorage.getItem('theme')===null) {
        localStorage.setItem('theme', JSON.stringify(isDark))
      }
      if(localStorage.getItem('theme')!==null) {
        //@ts-ignore
        setIsDark(JSON.parse(localStorage.getItem('theme')))
      }
    },[])

    useEffect(()=> {
        document.body.setAttribute('data-theme' , isDark? 'dark': 'light')
    }, [isDark])

    const themeSwitcher =()=> {
      setIsDark(!isDark)
      localStorage.setItem('theme', JSON.stringify(!isDark))
    }
  return (
    <div className={styles.wrapper}>
        <div className={styles.toggle} >
         <img src={sun} alt="dsf" />
         <button
        className={styles.toggleButton}
        data-active-theme={themeIcon}
        
        onClick={themeSwitcher}
        ></button>
          <img src={moon} alt="dsf" />
       
     </div>
    </div>
  )
}

export default ThemeSwitcher