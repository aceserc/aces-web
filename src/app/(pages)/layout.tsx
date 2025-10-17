import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ReactScan } from "@/components/react-scan";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

type Props = {
  children: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
  return (
    <div className="w-full">
      <Header />
      <main>
        {children}
        {process.env.NODE_ENV === "development" && <ReactScan />}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ClientLayout;
