import { AppProps } from 'next/app';
import Head from 'next/head';
import { Header } from '../components/Header';
import 'modern-normalize/modern-normalize.css';
import './styles.css';

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
