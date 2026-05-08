import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Orders within Nigeria are usually delivered within 3-7 working days, depending on your location. Once your order is shipped, we'll send you a tracking update so you can follow it every step of the way.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to selected countries. International delivery typically takes 7-14 working days. Shipping fees vary by destination and will be calculated at checkout.",
  },
  {
    question: "How do I take my measurements?",
    answer:
      "Use a soft measuring tape. Measure your bust, waist, and hips at their widest points. Compare with our size chart on each product page to find the best fit.",
  },
  {
    question: "How do I care for Ankara fabric?",
    answer:
      "Hand wash in cold water or use a gentle machine cycle. Avoid bleach and tumble drying. Iron on low heat while slightly damp for the best results.",
  },
  {
    question: "What if my size doesn't fit?",
    answer:
      "We offer free exchanges within 14 days of delivery. Contact our support team with your order number and we'll guide you through the process quickly.",
  },
  {
    question: "How do I know the right size to choose?",
    answer:
      "Each product page includes a detailed size guide with measurements. When in doubt, we recommend sizing up - especially for tailored and fitted styles.",
  },
];

export default function FAQ() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-10 sm:mb-14">
        <p className="text-sm italic text-gray-500 mb-2">FAQs</p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border rounded-xl px-4 sm:px-6 data-[state=open]:shadow-sm transition-shadow"
          >
            <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray-500 pb-4 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
