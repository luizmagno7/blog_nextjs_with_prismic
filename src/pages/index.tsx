import { GetStaticProps } from 'next';
import { useState } from 'react';

import { getPrismicClient } from '../services/prismic';

import 'whatwg-fetch';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import { CardPost } from '../components/CardPost';
import PageTitle from '../components/PageTitle/index';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const { next_page, results: posts } = postsPagination;
  const [postList, setPostList] = useState(posts);
  const [nextPageLink, setNextPageLink] = useState(next_page);

  function handleMorePosts(next_page) {
    fetch(next_page)
      .then(response => response.json())
      .then(data => {
        const nextPosts = data.results;
        const nextLink = data.next_page;

        const postListModified = postList.concat(nextPosts);

        setPostList(postListModified);
        setNextPageLink(nextLink);
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      <main>
        <section className={styles.container}>
          <PageTitle>What's the new</PageTitle>

          <div className={styles.postList}>
            {
              postList.map((post: Post) => {
                return (
                  <article key={post.uid}>
                    <CardPost {...post} />
                  </article>
                )
              })
            }
          </div>

          {!!nextPageLink && <button className={styles.btnLoader} onClick={() => { handleMorePosts(nextPageLink) }}>Carregar mais posts</button>}
        </section>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType("posts", {
    pageSize: 1
  });

  const { next_page, results } = postsResponse;

  return {
    props: {
      postsPagination: {
        next_page,
        results
      }
    }
  }
};
