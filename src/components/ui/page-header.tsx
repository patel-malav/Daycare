// import { PointerEvent, ReactNode, useRef } from "react";
import ContentEditable from "./content-editable";

export type PageHeaderData = {
  companyName: string;
  mission: string;
  address: string;
  phoneNumber: string;
  email: string;
};

type Props = {
  data: PageHeaderData;
};

export default function PageHeader({ data }: Props) {
  const handleChange = (value: string, label: string) => {
    console.log(label, value);
  };

  return (
    <div className="flex w-full justify-between">
      <div>
        <ContentEditable
          label="company-name"
          className="font-extrabold font-serif text-xl"
          defaultValue={data.companyName}
          onChange={handleChange}
        />
        <ContentEditable
          label="mission"
          className="font-medium text-xs"
          defaultValue={data.mission}
          multiline
          onChange={handleChange}
        />
      </div>
      <div className="font-medium text-sm">
        <ContentEditable
          label="address"
          defaultValue={data.address}
          onChange={handleChange}
        />
        <ContentEditable
          label="phone-number"
          defaultValue={data.phoneNumber}
          onChange={handleChange}
        />
        <ContentEditable
          label="email"
          defaultValue={data.email}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

// function OverMe({ children }: { children: ReactNode }) {
//   const lastClickTimeRef = useRef(0);
//   const doubleClickDelay = 200;

//   const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
//     const currentTime = Date.now();

//     if (currentTime - lastClickTimeRef.current < doubleClickDelay) {
//       lastClickTimeRef.current = 0;
//     } else {
//       lastClickTimeRef.current = currentTime;
//     }
//   };

//   return (
//     <div className="contents" onPointerDown={handlePointerDown}>
//       {children}
//     </div>
//   );
// }
