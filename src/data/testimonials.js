/**
 * Client testimonials for the Home page slider.
 *
 * To add one, append { quote, name } below. Entries whose quote is "TODO"
 * are placeholders and are not shown on the site.
 */
const testimonials = [
  {
    quote:
      "Every corner of our home was thoughtfully designed, making excellent use of the available space while maintaining a modern and elegant look. The quality of materials, craftsmanship, and finishing exceeded our expectations.",
    name: "Mr. & Mrs. Kulkarni, Pune",
  },
  {
    quote: "Everyone praises the interior during puja. We are so happy with the end product.",
    name: "Mr. & Mrs. Deshpande, Pune",
  },
  { quote: "Working with Sparkle Design Studio was a wonderful experience! ✨ Soniya understood our preferences perfectly and transformed our space into something beautiful, elegant, and functional. Her attention to detail, choice of colours, fabrics, and décor made all the difference. Truly happy with the outcome and would definitely recommend her to anyone looking for beautiful interiors! 🤍", name: "Mr. Gaurav Mishra, Pune" },
  { quote: "TODO", name: "TODO" },
  { quote: "TODO", name: "TODO" },
];

export default testimonials.filter((t) => t.quote.trim() !== "TODO");
