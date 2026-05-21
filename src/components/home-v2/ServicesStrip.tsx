import { Truck, ShieldCheck, Headphones, BadgePercent } from 'lucide-react'

const services = [
  { icon: Truck, title: 'Free Delivery', subtitle: 'On orders over AED 200' },
  { icon: BadgePercent, title: 'Free Shipping', subtitle: 'On all prepaid orders' },
  { icon: ShieldCheck, title: 'Secure Payments', subtitle: '100% protected checkout' },
  { icon: Headphones, title: 'Customer Service', subtitle: 'Reach us on WhatsApp' },
]

export default function ServicesStrip() {
  return (
    <section className="bg-white border-t border-b border-ink/10 py-10 lg:py-12">
      <div className="container-ar">
        <p className="text-center font-body text-[10px] tracking-[0.5em] uppercase text-ink-mute mb-6">
          When You Buy Online — Our Services
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="flex flex-col items-center text-center gap-2">
              <Icon size={26} strokeWidth={1.2} className="text-ink" />
              <p className="font-body text-[11px] font-semibold tracking-widest uppercase text-ink">
                {title}
              </p>
              <p className="font-body text-[11px] text-ink-mute leading-snug max-w-[180px]">
                {subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
