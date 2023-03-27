import React from "react";
import { BiUser } from "react-icons/bi"

import styles from "./PostAuthor.module.scss"

type PostAuthorProps = {
    author: string;
}

const PostAuthor: React.FC<PostAuthorProps> = ({ author }) => {
    return (
        <span className={styles.author}>
            <BiUser className={ styles["author--icon"] } />

            { author }
        </span>
    )
}

export default PostAuthor;