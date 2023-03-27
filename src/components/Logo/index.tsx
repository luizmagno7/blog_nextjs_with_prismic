import styles from './logo.module.scss'

export const Logo = function() {
    return (
        <svg className={styles.logo} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="20" width="60" height="60" fill="#FF8576"/>
            <rect x="60" y="60" width="60" height="60" fill="#7E74D2"/>
        </svg>
    )

}