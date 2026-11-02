import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { DemoNotice } from './States'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-ink">
      <Navbar />
      {children}
      <DemoNotice />
      <Footer />
    </div>
  )
}
