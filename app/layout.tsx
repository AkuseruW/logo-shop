import './globals.css'
import { Providers } from './providers'
import { Toaster } from "@/components/ui/toaster"
import CookieConsent from '@/components/CookieConsent'


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
          <Toaster />
        </Providers>
        <CookieConsent />
      </body>
    </html>
  )
}
