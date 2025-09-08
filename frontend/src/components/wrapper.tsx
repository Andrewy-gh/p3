import type { ReactNode } from "react";
export const Wrapper = (props: { children: ReactNode }) => {
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {props.children}
    </div>
  );
};
