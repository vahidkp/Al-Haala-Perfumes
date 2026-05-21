import Link from 'next/link'
import { Instagram, Facebook, Youtube, MessageCircle, Linkedin } from 'lucide-react'

const columns = [
  {
    heading: 'AR-Rahmani',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Influencer Program', href: '/influencer' },
      { label: 'News', href: '/news' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Become a Distributor', href: '/distributor' },
      { label: 'Careers', href: '/careers' },
      { label: 'Shipping Policy', href: '/shipping' },
      { label: 'Refund Policy', href: '/refunds' },
      { label: 'Terms and Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
  {
    heading: 'Customer Service',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Login / Sign Up', href: '/account' },
      { label: 'Sitemap', href: '/sitemap.xml' },
    ],
  },
  {
    heading: 'Shop',
    links: [
      { label: 'New Launches', href: '/collections?category=new' },
      { label: 'Perfumes for Men', href: '/collections?category=men' },
      { label: 'Perfumes for Women', href: '/collections?category=women' },
      { label: 'Unisex Perfumes', href: '/collections?category=unisex' },
      { label: 'Perfume Oil', href: '/collections?category=attar' },
    ],
  },
]

const socials = [
  { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { label: 'YouTube', href: 'https://youtube.com', icon: Youtube },
  { label: 'WhatsApp', href: 'https://wa.me/', icon: MessageCircle },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

export default function AfnanFooter() {
  return (
    <footer className="bg-[#0d1b3d] text-white">
      <div className="container-ar pt-16 pb-10 lg:pt-20 lg:pb-12">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-5">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-body text-[11px] font-semibold tracking-widest uppercase text-white mb-5">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-[13px] text-white/65 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Brand wordmark + socials */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link href="/home-v2" className="block">
              <span className="font-display text-2xl tracking-[0.24em] uppercase text-white whitespace-nowrap">
                AR-Rahmani
              </span>
              <p className="font-body text-[11px] tracking-widest uppercase text-white/60 mt-1">
                Perfumes — UAE
              </p>
            </Link>
            <p className="font-body text-[13px] text-white/65 leading-relaxed max-w-xs">
              Luxury Arabian fragrances and bespoke blends.
            </p>
            <div className="flex items-center gap-4 pt-1">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/70 hover:text-white transition"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-ar py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-[11px] text-white/55 tracking-wide">
            © {new Date().getFullYear()} AR-Rahmani Perfumes — UAE. All rights reserved.
          </p>
          <p className="font-body text-[11px] text-white/55 tracking-wide">
            Powered by AR-Rahmani Atelier
          </p>
        </div>
      </div>
    </footer>
  )
}
