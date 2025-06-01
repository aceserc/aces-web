import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Footer } from "./_components/footer";
import Header from "./_components/header";

type Props = {
  children: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-[70px] pb-20 min-h-[calc(100vh-60px)]">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ClientLayout;