import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { LuLayoutDashboard } from "react-icons/lu";
import { GoSponsorTiers } from "react-icons/go";
import { AiOutlineNotification } from "react-icons/ai";
import { GoPeople } from "react-icons/go";
import { CiCalendarDate } from "react-icons/ci";
import { CiTextAlignLeft } from "react-icons/ci";
import { AiOutlineMessage } from "react-icons/ai";
import { useUser } from "@clerk/nextjs";
import { ADMIN_ROLES } from "@/constants/roles.constants";
import { LiaQuoteLeftSolid } from "react-icons/lia";
import { PiImagesSquareLight } from "react-icons/pi";
import { IconType } from "react-icons/lib";
import Image from "next/image";
import { RxExit } from "react-icons/rx";

export const ADMIN_SIDEBAR_ITEMS: {
  href: string;
  icon: IconType;
  label: string;
  adminOnly?: boolean;
}[] = [
  {
    href: "/admin",
    icon: LuLayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/admin/sponsors",
    icon: GoSponsorTiers,
    label: "Sponsors",
    adminOnly: true,
  },
  {
    href: "/admin/notices",
    icon: AiOutlineNotification,
    label: "Notices",
    adminOnly: true,
  },
  {
    href: "/admin/committee",
    icon: GoPeople,
    label: "Committee",
    adminOnly: true,
  },
  {
    href: "/admin/events",
    icon: CiCalendarDate,
    label: "Events",
    adminOnly: true,
  },
  {
    href: "/admin/blogs",
    icon: CiTextAlignLeft,
    label: "Blogs",
  },
  {
    href: "/admin/gallery",
    icon: PiImagesSquareLight,
    label: "Gallery",
    adminOnly: true,
  },
  {
    href: "/admin/contacts",
    icon: AiOutlineMessage,
    label: "Contacts",
    adminOnly: true,
  },
  {
    href: "/admin/testimonials",
    icon: LiaQuoteLeftSolid,
    label: "Testimonials",
    adminOnly: true,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  // extract the item.href from the pathname
  const path = pathname.split("/").slice(0, 3).join("/");
  return (
    <aside className="hidden shadow-2xl h-screen w-64 flex-col overflow-y-auto overflow-x-hidden rounded-tr-[90px] border-r bg-accent py-8 pl-5 lg:flex">
      <Link href="/admin" className="text-3xl font-bold text-foreground">
        <Image
          src="/logo.png"
          width={70}
          height={70}
          alt="ACES Logo"
          quality={100}
          className="ml-2"
        />
      </Link>
      <div className="mt-12 flex flex-1 flex-col justify-between">
        <nav className="ml-2 flex flex-col gap-1">
          {ADMIN_SIDEBAR_ITEMS.map(({ icon: Icon, ...item }) => {
            if (
              item.adminOnly &&
              !ADMIN_ROLES.includes(user?.publicMetadata.role as string)
            )
              return null;
            return (
              <Link href={item.href} className="space-y-3" key={item.href}>
                <div
                  className={twMerge(
                    "flex transform items-center rounded-l-full px-4 py-3 text-muted-foreground transition-colors duration-300 hover:bg-primary/10 hover:text-primary ",
                    item.href === path && "bg-primary/10 text-primary"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
        <Link
          href="/"
          className="flex items-center justify-center mt-5 hover:scale-105 transition-all"
        >
          <RxExit className="h-7 w-7 ml-auto mr-5 rotate-180" />
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
