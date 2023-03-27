import React from "react";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import styles from "./PostDate.module.scss"

import { BiCalendarEvent } from "react-icons/bi";

type PostDateProps = {
    date: string;
}

const PostDate: React.FC<PostDateProps> = ({ date }) => {
    return (
        !!date &&
        <time className={styles.date} dateTime={format(new Date(date), 'dd/MM/yyyy')}>
            <BiCalendarEvent className={ styles["date--icon"] } />

            {
                format(new Date(date), "d MMM yyyy",
                    {
                        locale: ptBR,
                    }
                )
            }
        </time>

    );
}

export default PostDate;