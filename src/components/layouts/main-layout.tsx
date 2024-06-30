import React from "react";
type Props = {
  children: React.ReactNode;
  title: React.ReactNode;
};
const MailLayout = (props: Props) => {
  return (
    <div className="wrapper mt-9 sm:mt-12 lg:mt-16">
      <h1 className="text-2xl text-center sm:text-left sm:text-3xl xl:text-4xl font-semibold border-muted border-b-2">
        {props.title}
      </h1>
      {props.children}
    </div>
  );
};

export default MailLayout;
