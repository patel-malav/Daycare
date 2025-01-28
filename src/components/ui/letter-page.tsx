import type { PropsWithChildren, ReactNode } from "react";

type Props = {
  header: ReactNode | undefined;
};

export default function LetterPage({
  children,
  header,
}: PropsWithChildren<Props>) {
  return (
    <div className="w-[8.5in] h-[11in] max-h-[11in] py-6 px-12 flex flex-col not-print:shadow-md bg-white break-after-page">
      {header}
      <div className="h-1"></div>
      {children}
    </div>
  );
}
