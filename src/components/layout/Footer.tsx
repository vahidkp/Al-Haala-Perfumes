import Link from 'next/link'
import { Instagram, Facebook, Youtube, MessageCircle, Linkedin } from 'lucide-react'
import FooterNewsletter from './FooterNewsletter'

const footerColumns = [
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
    heading: 'About',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'News', href: '/news' },
      { label: 'Influencer Program', href: '/influencer' },
      { label: 'Careers', href: '/careers' },
      { label: 'Become a Distributor', href: '/distributor' },
    ],
  },
  {
    heading: 'Policies',
    links: [
      { label: 'Shipping Policy', href: '/shipping' },
      { label: 'Refund Policy', href: '/refunds' },
      { label: 'Terms and Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
]

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { label: 'YouTube', href: 'https://youtube.com', icon: Youtube },
  { label: 'WhatsApp', href: 'https://wa.me/', icon: MessageCircle },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

export default function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="container-ar pt-16 pb-10 lg:pt-20 lg:pb-12">
        {/* Brand + newsletter — top band */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 pb-10 lg:pb-12 mb-10 lg:mb-12 border-b border-forest-line">
          <div className="lg:max-w-sm">
            <Link href="/" className="block">
              <span className="font-display text-2xl md:text-3xl tracking-[0.24em] text-cream uppercase whitespace-nowrap">
                AR-RAHMANI
              </span>
              <p className="font-body text-[11px] tracking-widest uppercase text-cream/60 mt-2">
                Perfumes — UAE
              </p>
            </Link>
            <p className="font-body text-[13px] text-cream/70 leading-relaxed mt-5">
              A luxury perfume house crafting exquisite fragrances with elegance, sophistication, and a deep passion for perfumery — alongside a bespoke blending service for scents tailored entirely to you.
            </p>
          </div>

          <div className="lg:max-w-md w-full">
            <p className="font-body text-[11px] font-semibold tracking-widest uppercase text-cream mb-3">
              Newsletter
            </p>
            <p className="font-body text-[13px] text-cream/70 mb-4">
              Sign up to our newsletter to receive exclusive deals and more.
            </p>
            <FooterNewsletter />
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-body text-[11px] font-semibold tracking-widest uppercase text-cream mb-5">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-[13px] text-cream/70 hover:text-cream transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest-line">
        <div className="container-ar py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-[11px] text-cream/55 tracking-wide">
            © {new Date().getFullYear()} AR-RAHMANI Perfumes — UAE. All
            rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-cream/55 hover:text-cream transition-colors"
              >
                <Icon size={15} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
