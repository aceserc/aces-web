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

  notice: "/api/notice",
  committee: "/api/committee",
  events: "/api/events",
  upcomingEvents: "/api/events/upcoming",
} as const;

export default API;
