const API = {
  //auth
  login: "/api/auth/login",
  googleLogin: "/api/auth/google", //?token=${token}
  logout: "/api/auth/logout",
  user: "/api/auth/user",

  //skills
  skills: "/api/skills",

  //about
  about: "/api/about",

  //files
  file: "/api/file",

  //sponsor
  sponsor: "/api/sponsor",

  committee: "/api/committee",
  events: "/api/events",
  upcomingEvents: "/api/events/upcoming",
  notices: "/api/notices",
  blogs: "/api/blogs",
  contact: "/api/contact",
} as const;

export default API;
