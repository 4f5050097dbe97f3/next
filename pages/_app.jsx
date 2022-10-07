import '../styles/globals.css';
import Head from 'next/head';
import React from 'react';

import { GlobalState } from '../store';

function MyApp({ Component, pageProps }) {


  return (
    <React.Fragment>
      <Head>
        <title>Tic Tac Toe</title>
        <meta name="author" content="龐昊" />
      </Head>

      <GlobalState>
        <Component {...pageProps} />
      </GlobalState>
    </React.Fragment>
  )
}

export default MyApp
