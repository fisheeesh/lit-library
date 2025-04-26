/* eslint-disable react/prop-types */
import { cloneElement, createContext, useContext, useState } from "react"
import { createPortal } from "react-dom"
import useOutsideClick from "../../hooks/useOutsideClick"

const ModalContext = createContext()

export default function Modal({ children }) {
    const [openName, setOpenName] = useState('')
    const open = setOpenName
    const close = () => setOpenName('')

    return (
        <ModalContext.Provider value={{ openName, open, close }}>
            {children}
        </ModalContext.Provider>
    )
}

const Opens = ({ opens: openWindowName, children }) => {
    const { open } = useContext(ModalContext)
    return cloneElement(children, { onClick: () => open(openWindowName) })
}

const Window = ({ name, children }) => {
    const { openName, close } = useContext(ModalContext)
    const [isClosing, setIsClosing] = useState(false)

    const closeWithAnimation = () => {
        setIsClosing(true)
        setTimeout(() => {
            setIsClosing(false)
            close()
        }, 300)
    }

    const modalRef = useOutsideClick(() => {
        if (!isClosing) closeWithAnimation()
    })

    if (openName !== name && !isClosing) return null

    return createPortal(
        <div className={`fixed px-6 z-[100] inset-0 flex items-center bg-black justify-center drop-shadow-lg bg-opacity-50 backdrop-blur-xs transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
            <div
                ref={modalRef}
                // className={`p-6 bg-primary-900 shadow-lg w-[520px] transition-transform duration-300 ${isClosing ? 'animate-slideDown' : 'animate-slideUp'}`}>
                className={`transition-transform duration-300 ${isClosing ? 'animate-slideDown' : 'animate-slideUp'}`}>
                {cloneElement(children, { onCloseModal: closeWithAnimation })}
            </div>
        </div>, document.body)
}


Modal.Opens = Opens
Modal.Window = Window
