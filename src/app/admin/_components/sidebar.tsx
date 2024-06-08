import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { LuLayoutDashboard } from "react-icons/lu";

export const ADMIN_SIDEBAR_ITEMS = [
  {
    href: "/admin",
    icon: LuLayoutDashboard,
    label: "Dashboard",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden shadow-2xl h-screen w-64 flex-col overflow-y-auto overflow-x-hidden rounded-tr-[90px] border-r bg-accent py-8 pl-5 lg:flex">
      <Link href="/admin" className="text-3xl font-bold text-foreground">
        Admin
      </Link>
      <div className="mt-12 flex flex-1 flex-col justify-between">
        <nav className="ml-2 flex flex-col gap-1">
          {ADMIN_SIDEBAR_ITEMS.map(({ icon: Icon, ...item }) => (
            <Link href={item.href} className="space-y-3" key={item.href}>
              <div
                className={twMerge(
                  "flex transform items-center rounded-l-full px-4 py-3 text-muted-foreground transition-colors duration-300 hover:bg-primary/10 hover:text-primary ",
                  item.href === pathname && "bg-primary/10 text-primary"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
