import React, { ReactNode } from 'react';
import styles from "./PostDetails.module.scss"

import PostDate from '../PostDate'
import PostAuthor from '../PostAuthor';

type PostDetailsProps = {
    first_publication_date: string | null;
    author: string;
    children: ReactNode
}

const PostDetails: React.FC<PostDetailsProps> = ({ first_publication_date, author, children }) => {
    return (
        <div className={styles.contentDetails}>
            <PostDate date={first_publication_date} />

            <PostAuthor author={ author }/>

            { children }
        </div>
    )
}

export default PostDetails