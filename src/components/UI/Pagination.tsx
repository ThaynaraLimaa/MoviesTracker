import styles from './Pagination.module.css'
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PaginationProps {
    currentPage: number,
    hasNext: boolean
    onChangePage: (page: number) => void,
}

export default function Pagination({ currentPage, hasNext, onChangePage }: PaginationProps) {

    const handlePrevious = () => {
        if (currentPage >= 2) {
            onChangePage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (hasNext) {
            onChangePage(currentPage + 1)
        }
    }

    return (
        <div className={styles.paginationContainer}>
            <button onClick={handlePrevious} disabled={currentPage == 1}>{<FontAwesomeIcon icon={faArrowLeft} />}</button>
            <span className={styles.currentPage}>{currentPage}</span>
            <button onClick={handleNext} disabled={!hasNext}>{<FontAwesomeIcon icon={faArrowRight} />}</button>
        </div>
    )
}