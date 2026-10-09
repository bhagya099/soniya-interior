/**
 * Client testimonials for the Home page slider.
 *
 * To add one, append { quote, name } below. Entries whose quote is "TODO"
 * are placeholders and are not shown on the site.
 */
// TODO: replace with real client quotes (with their permission) before launch
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
  { quote: "TODO", name: "TODO" },
  { quote: "TODO", name: "TODO" },
  { quote: "TODO", name: "TODO" },
];

export default testimonials.filter((t) => t.quote.trim() !== "TODO");
