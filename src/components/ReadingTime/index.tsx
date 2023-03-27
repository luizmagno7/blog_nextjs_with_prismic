import React from 'react';
import { BiTime } from "react-icons/bi";
import readingTime from 'reading-time';

import styles from "./ReadingTime.module.scss"

type ReadingTimeProps = {
    html: string | null
}

const ReadingTime: React.FC<ReadingTimeProps> = ({ html }) => {
    const readingInfos = readingTime(html);

    const time = Math.ceil(readingInfos.minutes);

    return (
        <em className={styles.time}>
            <BiTime className={ styles['time--icon'] } />

            { time } minutos <small>(tempo de leitura)</small>
        </em>
    )
}

export default ReadingTime;