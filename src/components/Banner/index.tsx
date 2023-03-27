import React from "react";

import styles from "./Banner.module.scss"

type BannerProps = {
    url: string;
    alt: string | null;
}

const Banner: React.FC<BannerProps> = ({ url, alt }) => {
    return (
        <div className={styles.container}>
            <picture>
                <img src={url} alt={alt} />
            </picture>
        </div>
    )
}

export default Banner;