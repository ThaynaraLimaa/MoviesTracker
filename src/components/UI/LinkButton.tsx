import { ReactNode } from 'react'
import styles from './LinkButton.module.css'
import { Link } from 'react-router-dom'

interface ButtonProps {
    children: ReactNode,
    to: string
}

export default function LinkButton({children, to}: ButtonProps) {

    return (
       <Link to={to} className={styles.linkButton}>
            {children}
       </Link>
    )
}