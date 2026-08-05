import altRouteIcon from "@/public/alt_route.svg";
import shoppingCartIcon from "@/public/shopping_cart.svg";
import therapyIcon from "@/public/physical_therapy.svg";
import approvalIcon from "@/public/approval.svg";
import accountCircleIcon from "@/public/account_circle.svg";
import cableIcon from "@/public/cable.svg";
import cloudUploadIcon from "@/public/cloud_upload.svg";

export const businesses = [
  {
    title: "Food Vendors",
    image: "/user1.jpg",
  },
  {
    title: "Beauty & Cosmetics",
    image: "/user2.jpg",
  },
  {
    title: "Fashion",
    image: "/user3.jpg",
  },
  {
    title: "Jewelry",
    image: "/user4.jpg",
  },
];

export const features = [
  {
    icon: altRouteIcon,
    title: "Stop switching between apps",
    description:
      "See all your WhatsApp messages and Instagram DMs in a single, mobile-friendly dashboard without feeling overwhelmed.",
  },
  {
    icon: shoppingCartIcon,
    title: "Never miss a sale while you sleep",
    description:
      "Train Akira with your FAQs, delivery prices, and policies to reduce customer response time to under 30 seconds.",
  },
  {
    icon: therapyIcon,
    title: "Recover lost customers effortlessly",
    description:
      "Automatically follow up with customers who stop responding after 24 hours, ensuring you never miss a sales opportunity.",
  },
  {
    icon: approvalIcon,
    title: "Seamless Human Handoff",
    description:
      "Akira detects when a customer needs human attention, allowing you to pause the AI, take over the conversation, and return control whenever you are ready.",
  },
];

export const steps = [
  {
    icon: accountCircleIcon,
    title: "Step 1",
    description:
      "Create your profile. Enter your business name, hours, and contact information.",
  },
  {
    icon: cableIcon,
    title: "Step 2",
    description:
      "Link your WhatsApp Business and Instagram securely via Meta's APIs, with no downloads needed.",
  },
  {
    icon: cloudUploadIcon,
    title: "Step 3",
    description:
      "Upload your FAQs. Give Akira your store policies and frequently used responses so it knows exactly how to talk to your customers.",
  },
];
