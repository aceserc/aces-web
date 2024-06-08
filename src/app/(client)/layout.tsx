import Header from "./_components/header";

type Props = {
  children: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-[70px] h-[200vh]">{children}</main>
    </div>
  );
};

export default ClientLayout;
