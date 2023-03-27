import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

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

  return (
    <>
      <main>
        <section className={styles.container}>
          <PageTitle>What's the new</PageTitle>

          <div className={styles.postList}>
            {
              posts.map((post: Post) => {
                return (
                  <article key={post.uid}>
                    <CardPost {...post} />
                  </article>
                )
              })
            }
          </div>
        </section>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType("posts");

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
