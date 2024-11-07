import LinkButton from '../../components/UI/LinkButton';
import styles from './NotFound.module.css'

export default function NotFound() {
    return (
        <main className={styles.notFoundContainer}>
            <h1>404 - Not Found</h1>
            <p>Ops, we can't find the page you are looking for :(</p>
            <LinkButton to='/'>Go back home</LinkButton>
        </main>
    )
}