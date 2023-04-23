import {Dialog, Transition} from '@headlessui/react'
import {Fragment, ReactElement, useRef} from 'react'
import styles from './Modal.module.scss'

interface ModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    children: ReactElement

}

export default function Modal({open, setOpen, children}: ModalProps) {
    const cancelButtonRef = useRef(null)
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className={styles.s14} initialFocus={cancelButtonRef} onClose={()=>{setOpen(false)}}>
                <Transition.Child
                    as={Fragment}
                    enter={styles.s2}
                    enterFrom={styles.s3}
                    enterTo={styles.s4}
                    leave={styles.s5}
                    leaveFrom={styles.s4}
                    leaveTo={styles.s5}
                >
                    <div className={styles.s15} />
                </Transition.Child>

                <div className={styles.s6}>
                    <div className={styles.s7}>
                        <Transition.Child
                            as={Fragment}
                            enter={styles.s2}
                            enterFrom={styles.s8}
                            enterTo={styles.s9}
                            leave={styles.s10}
                            leaveFrom={styles.s11}
                            leaveTo={styles.s12}
                        >
                            <Dialog.Panel className={styles.s13}>
                            {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}