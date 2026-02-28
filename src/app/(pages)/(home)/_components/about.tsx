import { WHAT_WE_DO } from "@/constants/about";

const About = () => {
  return (
    <section
      id="about"
      className="container flex flex-col py-16 sm:py-24 items-center gap-3 justify-center"
    >
      <span className="text-center text-muted-foreground text-sm font-medium uppercase tracking-widest">
        About
      </span>
      <h3 className="text-center text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight">
        What we do?
      </h3>
      <p className="text-center text-sm sm:text-base max-w-xl text-muted-foreground mt-2 leading-relaxed">
        At ACES, IOE Purwanchal Campus, Dharan, we provide training, organize
        competitions, host podcasts, and conduct an annual Techfest to support
        the development of Computer Engineering students.
      </p>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {WHAT_WE_DO.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-start bg-card p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
          >
            <div className="p-2.5 rounded-lg bg-accent mb-5 transition-colors duration-300 group-hover:bg-primary/10">
              <item.icon className="h-5 w-5 text-accent-foreground group-hover:text-primary transition-colors duration-300" />
            </div>
            <h4 className="text-base font-semibold mb-2">{item.title}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export { About };
