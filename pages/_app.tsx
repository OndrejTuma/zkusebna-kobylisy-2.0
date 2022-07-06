import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import createEmotionCache from 'Styles/createEmotionCache'

import 'Styles/globals.css'
import 'Styles/react-big-calendar.css'
import theme from 'Styles/theme'

interface ZkusebnaKobylisyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache()

function ZkusebnaKobylisy({ Component, pageProps, emotionCache = clientSideEmotionCache }: ZkusebnaKobylisyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width"/>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline/>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default ZkusebnaKobylisy
