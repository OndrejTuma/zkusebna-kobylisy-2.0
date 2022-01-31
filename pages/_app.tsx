import type { AppProps } from 'next/app'
import Provider from '@toptal/picasso-provider'

import 'Styles/globals.css'
import 'Styles/react-big-calendar.css'

function ZkusebnaKobylisy({ Component, pageProps }: AppProps) {
  return (
    <Provider loadFavicon={false} fixViewport={false}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default ZkusebnaKobylisy
