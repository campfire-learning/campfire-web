import '../styles/globals.css'
import { Inter } from '@next/font/google'
import { ReactQueryWrapper } from '../components/query/ReactQueryWrapper'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Campfire</title>
        <meta name="description" content="Campfire, modern classroom management" />
        <link rel="icon" href="campfireLogo.ico" />
      </head>
      <body>
        <ReactQueryWrapper>
          {children}
        </ReactQueryWrapper>
        </body>
    </html>
  )
}
