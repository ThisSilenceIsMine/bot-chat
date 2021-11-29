import 'modern-normalize/modern-normalize.css';
import './styles.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Header } from '../components/Header';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to Bot-Chat!</title>
      </Head>
      <div className="app">
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default CustomApp;
