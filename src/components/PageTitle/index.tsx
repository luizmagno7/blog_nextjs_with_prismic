import React from 'react';
import styles from './pageTitle.module.scss';

type PageTitleProps = {
    children: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
    return (
        <h1 className={styles.heading}>{ children }</h1>
    )
}

export default PageTitle;