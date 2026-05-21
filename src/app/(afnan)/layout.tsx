import AfnanAnnouncementBar from '@/components/home-v2/layout/AfnanAnnouncementBar'
import AfnanNavbar from '@/components/home-v2/layout/AfnanNavbar'
import AfnanFooter from '@/components/home-v2/layout/AfnanFooter'
import CartDrawer from '@/components/layout/CartDrawer'

export default function AfnanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AfnanAnnouncementBar />
      <AfnanNavbar />
      <main className="bg-white">{children}</main>
      <AfnanFooter />
      <CartDrawer />
    </>
  )
}
