import Footer from "@/components/reusable/footer";
import Header from "./_components/header";

type Props = {
  children: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-[70px] pb-20">{children}</main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
