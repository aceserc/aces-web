import { ICONS } from "@/assets/icons/svg-repo";

// aces contact links
export const CONTACT_LINKS = {
  discord: {
    type: "discord",
    href: "https://discord.gg/7ZS45YACRZ",
    icon: ICONS.discord,
  },
  facebook: {
    type: "facebook",
    href: "https://www.facebook.com/acesdharan/",
    icon: ICONS.facebook,
  },
  github: {
    type: "github",
    href: "https://github.com/aces-erc",
    icon: ICONS.github,
  },
  instagram: {
    type: "instagram",
    href: "https://www.instagram.com/aces_erc/",
    icon: ICONS.instagram,
  },
  email: {
    type: "email",
    href: "mailto:aces@ioepc.edu.np",
    icon: ICONS.email,
  },
  youtube: {
    type: "youtube",
    href: "https://www.youtube.com/channel/UCbWiVnH9XPE8aixz32MAA8A",
    icon: ICONS.youtube,
  },
  linkedin: {
    type: "linkedin",
    href: "https://www.linkedin.com/company/acesioe-pc",
    icon: ICONS.linkedin,
  },
} as const;

// developer contact links
export const DEVS_CONTACT_LINKS = {
  "@jrTilak": "https://thapatilak.com.np/",
  "@dev-sandip": "https://github.com/dev-sandip",
} as const;
