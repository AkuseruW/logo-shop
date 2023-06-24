import './globals.css'
import CookieConsent from '@/components/CookieConsent'
import { Providers } from './providers'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
        <CookieConsent />
      </body>
    </html>
  )
}
