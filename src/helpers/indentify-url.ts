const identifyUrl = (url: string): { href: string; type: string } => {
  if (/^\+?\d{10,15}$/.test(url)) {
    return { href: `tel:${url}`, type: "tel" };
  } else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(url)) {
    return { href: `mailto:${url}`, type: "email" };
  }
  // if url identify top platforms like facebook, twitter, linkedin, instagram, github, youtube
  const platforms = ["facebook", "twitter", "linkedin", "instagram", "github"];
  const platform = platforms.find((p) => url.includes(`${p}.com`));
  if (platform) {
    return { href: url, type: platform };
  }
  return { href: url, type: "external" };
};

export default identifyUrl;
