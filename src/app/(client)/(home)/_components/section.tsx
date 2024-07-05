import React from "react";

type Props = {
  id: string;
  title: string;
  children: React.ReactNode;
};

const Section = ({ children, id, title }: Props) => {
  return (
    <div id={id} className="rounded-lg w-full py-5 md:py-8">
      <div className="flex flex-col gap-7 md:gap-12 items-center justify-center wrapper">
        <div className="flex flex-col items-center gap-2 justify-center ">
          <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
          <hr className="w-1/2" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Section;
