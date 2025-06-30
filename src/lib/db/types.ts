export type Committee = {
  name: string;
  role: string;
  avatar?: string;
  committee: string;
  weight: number;
  mail?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  external_link?: string | null;
  id: string;
  body: string;
};

export type Event = {
  title: string;
  location?: string;
  registration_url?: string;
  duration?: string;
  event_date?: string;
  slug: string;
  cover_image?: string;
  created_at?: string;
  id: string;
  body: string;
};

export type Gallery = {
  tag: string;
  created_at: string;
  images: string[];
};

export type Notice = {
  title: string;
  slug: string;
  cover_image?: string;
  created_date: string;
  id: string;
  body: string;
};

export type Sponsor = {
  name: string;
  website: string;
  logo: string;
};

export type Testimonial = {
  name: string;
  role: string;
  contact: string;
  avatar: string;
  id: string;
  body: string;
};

export type Training = {
  title: string;
  id: string;
  description?: string;
  created_at: string;
  slug: string;
  cover_image?: string;
  duration?: string;
  body: string;
};
