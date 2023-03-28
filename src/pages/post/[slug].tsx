import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useMemo } from "react"
import { asHTML, asText } from '@prismicio/helpers';

import { v4 as uuidv4 } from 'uuid';

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
  //const [textReading, setTextReading] = useState("");

  const uniqueKey = uuidv4();

  const textReading = useMemo(() => {
    return content.reduce((acc, { heading, body }, index) => {
      return acc + heading + body.text;
    }, '');
  }, [content]);

  // memo(() => {
  //   let postText = '';
  //   content.forEach((group, index) => {
  //     postText += group.heading;
  //     postText += group.body.text;
  //   })

  //   setTextReading(postText);
  // }, [])

  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  return (
    <main>
      <Banner url={banner.url} alt={banner.alt} />
      <section className={styles.contentSection}>
        <PageTitle>{title}</PageTitle>

        <PostDetails {...{ first_publication_date, author }}>
          <ReadingTime html={textReading} />
        </PostDetails>
      </section>

      <article key={uniqueKey} className={styles.articleContent}>
        {content.map((article, index) => {
          const { heading, body: { text } } = article;

          const contentId = uuidv4();

          return (
            <React.Fragment key={`content-${index}-${contentId}`}>
              {!!heading && <h2 key={`heading-${index}-${contentId}`}>{heading}</h2>}

              <div key={`content-${index}-${contentId}`} dangerouslySetInnerHTML={{ __html: text }}></div>
            </React.Fragment>
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
    fallback: true
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