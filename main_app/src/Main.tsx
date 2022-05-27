import React from "react";
// @ts-ignore
const Main2 = React.lazy(() => import("lib_remote/Main1"));

const Index: React.FC = () => {
  // useEffect(() => {
  //   const a = async () => {
  //     const O = await import("lib_remote/Main" as string);
  //     console.log(O);
  //   };
  //   a();
  // }, []);
  return (
    <div>
      我是消费者123
      <React.Suspense fallback="Loading Button">
        <Main2 />
      </React.Suspense>
    </div>
  );
};
export default <Index />;
