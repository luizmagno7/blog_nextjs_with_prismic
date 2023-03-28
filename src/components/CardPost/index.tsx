import React from "react";
import Link, { LinkProps } from 'next/link';

import Image from 'next/image';

import styles from './cardPost.module.scss'
import { format } from "date-fns";
import PostDate from "../PostDate";
import PostAuthor from "../PostAuthor";

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
    const { uid: postSlug, first_publication_date: createdAt, data: { title, subtitle, author } } = post

    return (
        <>
            <Link href={`/post/${postSlug}`}>
                <a className={styles.card}>
                    
                    <h2>{title}</h2>
                    <PostDate date={createdAt} /> <PostAuthor author={author} />
                    <p>{subtitle}</p>
                
                </a>
            </Link>
        </>
    );
}