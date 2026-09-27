/** @format */

import {
  homeLayout,
  userIcon,
  bellIcon,
  reportIcon,
  serviceIcon,
  queryIcon,
  termIcon,
  privacyIcon,
  faqIcon,
} from "../assest";

export const sidebarLinks = [
  {
    link: "/dashboard",
    title: "Dashboard",
    img: homeLayout,
    icon: "fa-solid fa-table-cells-large",
  },
  {
    link: "/users",
    title: "Users",
    img: userIcon,
    icon: "fa-solid fa-users",
  },
  {
    link: "/notification",
    title: "Notification",
    img: bellIcon,
    icon: "fa-regular fa-bell",
  },
  {
    link: "/report",
    title: "Report",
    img: reportIcon,
    icon: "fa-regular fa-flag",
  },
  {
    link: "/help-support",
    title: "Help & Support",
    img: serviceIcon,
    icon: "fa-solid fa-headset",
  },
  {
    link: "/query",
    title: "Query",
    img: queryIcon,
    icon: "fa-solid fa-magnifying-glass",
  },
  {
    link: "/terms-condition",
    title: "Terms & Condition",
    img: termIcon,
    icon: "fa-regular fa-file-lines",
  },
  {
    link: "/privacy-policy",
    title: "Privacy Policy",
    img: privacyIcon,
    icon: "fa-solid fa-shield-halved",
  },
  {
    link: "/faq",
    title: "FAQ",
    img: faqIcon,
    icon: "fa-regular fa-circle-question",
  },
];
