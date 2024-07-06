import Footer from "@/components/reusable/footer";
import Header from "./_components/header";
import ScrollTopTop from "@/components/reusable/scroll-top-top";

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
      <ScrollTopTop />
    </div>
  );
};

export default ClientLayout;
