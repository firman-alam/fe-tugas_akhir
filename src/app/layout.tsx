import Nav from '@/components/Nav'
import './globals.css'
import { AuthProvider } from '@/app/utils/AuthContext'
import { Providers } from '@/lib/provider'

export const metadata = {
  title: 'Sentimen Analisis Web App',
  description: 'Created by Al Adiat Firman Alamsyah',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <AuthProvider>
        <html lang='en'>
          <body className='font-mabry_pro thin-scroll overflow-y-scroll'>
            <Nav />
            <main>{children}</main>
          </body>
        </html>
      </AuthProvider>
    </Providers>
  )
}
