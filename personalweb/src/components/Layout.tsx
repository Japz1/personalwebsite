import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { DemoNotice } from './States'
import TargetCursor from './ui/TargetCursor'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-ink">
      <TargetCursor spinDuration={2} parallaxOn showLabel={false} />
      <Navbar />
      {children}
      <DemoNotice />
      <Footer />
    </div>
  )
}
