import React from "react";
import Link, { LinkProps } from 'next/link';

import Image from 'next/image';

import styles from './cardPost.module.scss'
import { format } from "date-fns";

interface Post {
    uid?: string;
    first_publication_date: string | null;
    data: {
        title: string;
        subtitle: string;
        author: string;
        banner?: {
            url: string;
        };
    };
}

export const CardPost: React.FC<Post> = ( post ) => {
    const { uid: postSlug, first_publication_date: createdAt, data: { title, subtitle, author, banner: { url: bannerUrl }} } = post

    return (
        <>
            <Link href={`/post/${postSlug}`}>
                <a className={styles.card}>
                    
                    <h2>{title}</h2>
                    <time dateTime={format(new Date(createdAt), 'dd/MM/yyyy')}>{format(new Date(createdAt), 'dd/MM/yyyy') }</time>
                    <p>{subtitle}</p>
                
                </a>
            </Link>
        </>
    );
}