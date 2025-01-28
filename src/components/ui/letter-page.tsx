import type { PropsWithChildren, ReactNode } from "react";

type Props = {
  header: ReactNode | undefined;
};

export default function LetterPage({
  children,
  header,
}: PropsWithChildren<Props>) {
  return (
    <div className="w-[8.5in] min-h-[11in] py-6 px-12 flex flex-col shadow-md bg-white">
      {header}
      <div className="h-1"></div>
      {children}
    </div>
  );
}
