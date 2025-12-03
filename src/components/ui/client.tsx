"use client";
type Props = {
  children: React.ReactNode;
};

const Client = (props: Props) => {
  return <>{props.children}</>;
};

export { Client };
