import { AppProps } from 'next/app';
import Head from 'next/head';
import Header from 'components/header/header';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to Bot-Chat!</title>
      </Head>
      <div className="app">
        <Header />
        <main className="main-wrapper">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default CustomApp;
