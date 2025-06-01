import NextTopLoader from "nextjs-toploader";

const NextjsTopLoader = () => {
  return (
    <NextTopLoader
      color="var(--primary)"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow="0 0 10px var(--primary),0 0 5px var(--primary)"
      zIndex={1600}
      showAtBottom={false}
    />
  );
};

export { NextjsTopLoader };
