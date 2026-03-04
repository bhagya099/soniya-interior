import IMAGES from "../image/img";

const projects = [
  {
    id: 1,
    title: "Modern Living Room",
    description: "A bright modern living room with neutral palette and layered textures.",
    image: IMAGES.Project_pics[0],
    images: [IMAGES.Project_pics[0], IMAGES.Project_pics[5], IMAGES.Project_pics[3]],
    category: "Residential",
  },
  {
    id: 2,
    title: "Elegant Dining Space",
    description: "Custom joinery and ambient lighting to elevate dining experiences.",
    image: IMAGES.Project_pics[1],
    images: [IMAGES.Project_pics[1], IMAGES.Project_pics[2], IMAGES.Project_pics[4]],
    category: "Residential",
  },
  {
    id: 3,
    title: "Compact Kitchen Remodel",
    description: "Functional layout and durable finishes for small-footprint kitchens.",
    image: IMAGES.Project_pics[2],
    images: [IMAGES.Project_pics[2], IMAGES.Project_pics[8] || IMAGES.Project_pics[0]],
    category: "Residential",
  },
  {
    id: 4,
    title: "Office Interior",
    description: "Collaborative office with flexible seating and natural light.",
    image: IMAGES.Project_pics[3],
    images: [IMAGES.Project_pics[3], IMAGES.Project_pics[9] || IMAGES.Project_pics[1]],
    category: "Commercial",
  },
  {
    id: 5,
    title: "Bathroom Update",
    description: "Spa-like bathroom with clean lines and modern fixtures.",
    image: IMAGES.Project_pics[4],
    images: [IMAGES.Project_pics[4], IMAGES.Project_pics[11] || IMAGES.Project_pics[2]],
    category: "Residential",
  },
  {
    id: 6,
    title: "Bedroom Retreat",
    description: "A calm, layered bedroom with soft textiles and warm tones.",
    image: IMAGES.Project_pics[5],
    images: [IMAGES.Project_pics[5], IMAGES.Project_pics[6] || IMAGES.Project_pics[0]],
    category: "Residential",
  },
];

export default projects;
