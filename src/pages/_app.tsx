import { AppProps } from 'next/app';
import '../styles/globals.scss';
import { Fragment } from 'react';
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Fragment>
      <Header />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp;
