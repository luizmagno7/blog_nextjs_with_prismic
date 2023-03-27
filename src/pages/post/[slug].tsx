import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useEffect, useState } from "react"
import { asHTML, asText } from '@prismicio/helpers';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

import PageTitle from './../../components/PageTitle/index';
import Banner from './../../components/Banner/index';
import PostDetails from '../../components/PostDetails';
import ReadingTime from '../../components/ReadingTime';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
      alt: string | null;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      };
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const { data: { title, banner, author, content }, first_publication_date } = post;
  const [textReading, setTextReading] = useState("");

  useEffect(() => {
    let postText = '';
    content.forEach((group, index) => {
      postText += group.heading;
      postText += group.body.text;
    })
  
    setTextReading(postText);
  }, [])

  return (
    <main>
      <Banner url={banner.url} alt={banner.alt} />
      <section className={styles.contentSection}>
        <PageTitle>{title}</PageTitle>

        <PostDetails {...{ first_publication_date, author }}>
          <ReadingTime html={textReading} />
        </PostDetails>
      </section>

      <article>
        {content.map((article) => {
          const {heading, body: { text }} = article;

          return (
            <>
              {!!heading && <h2>{ heading }</h2>}

              <div dangerouslySetInnerHTML={{ __html: text}}></div>
            </>
          )
        })}
      </article>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const { results: posts } = await prismic.getByType('posts');

  const paths = posts.map((post) => ({
    params: { slug: post.uid }
  }))

  return {
    paths: paths,
    fallback: false
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient({});
  const post = await prismic.getByUID('posts', String(slug), {});
  const { content } = post.data;

  post.data.content = content.map(({ heading, body }) => ({
    heading: heading || '',
    body: {
      text: asHTML(body),
    },
  }));

  return {
    props: {
      post
    }
  }
};