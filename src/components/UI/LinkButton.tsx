import { ReactNode } from 'react'
import styles from './LinkButton.module.css'
import { Link } from 'react-router-dom'

interface ButtonProps {
    children: ReactNode,
    to: string,
    role: 'primary' | 'secondary'
}

export default function LinkButton({children, to, role}: ButtonProps) {
    const styleName = role == 'primary' ? styles.primaryButton : styles.secondaryButton

    return (
       <Link to={to} className={styleName}>
            {children}
       </Link>
    )
}