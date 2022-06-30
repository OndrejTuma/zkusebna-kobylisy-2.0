import type { AppProps } from 'next/app'
import PicassoProvider from '@toptal/picasso-provider'

import 'Styles/globals.css'
import 'Styles/react-big-calendar.css'

function ZkusebnaKobylisy({ Component, pageProps }: AppProps) {
  return (
    <PicassoProvider
      loadFavicon={false}
      fixViewport={false}
      loadFonts={false}
      disableClassNamePrefix
    >
      <Component {...pageProps} />
    </PicassoProvider>
  )
}

export default ZkusebnaKobylisy
