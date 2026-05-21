import AccordionItem from '@/components/ui/AccordionItem'
import SectionHeader from '@/components/ui/SectionHeader'

const faqs = [
  {
    question: 'What is the refund policy?',
    answer:
      'We accept returns within 7 days of delivery if the product is unused, sealed, and in its original packaging. Contact us at info@arrahmani.com to initiate a return.',
  },
  {
    question: 'How long does it take until I get my order?',
    answer:
      'Orders are dispatched within 1–2 business days. Delivery takes 2–4 business days within the UAE. Express delivery options are available at checkout.',
  },
  {
    question: 'Do we ship internationally?',
    answer:
      'Yes, we ship worldwide. International delivery takes 7–14 business days. Customs and import duties are the responsibility of the recipient.',
  },
  {
    question: 'Will I receive tracking info?',
    answer:
      'Yes. Once your order is dispatched, you will receive an email and WhatsApp message with your tracking link and courier details.',
  },
  {
    question: 'I have a complaint about my order. What’s next?',
    answer:
      'Please reach out to us within 48 hours of delivery via WhatsApp or email with your order number and photos of the issue. We will resolve it promptly.',
  },
]

export default function FAQSection() {
  return (
    <section className="bg-cream pb-20 lg:pb-24">
      <div className="container-ar">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center mb-10">
            <SectionHeader heading="Frequently Asked Questions" align="center" />
          </div>
          <div>
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
