import { useRef, useState } from "react";
import ChartReviewNursing from "./pages/ChartReviewNursing";
import ChartReviewPrescription from "./pages/ChartReviewPrescription";
import MonthlyInspectionReport from "./pages/MonthlyInspectionReport";
import { useReactToPrint } from "react-to-print";
import { PrinterIcon } from "lucide-react";

const forms = {
  "form-1": (
    <>
      <MonthlyInspectionReport />
      <ChartReviewNursing />
    </>
  ),
  "form-2": <ChartReviewPrescription />,
};

function App() {
  const [selectedForm, setSelectedForm] = useState<"form-1" | "form-2">(
    "form-1"
  );

  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: "form-1",
  });

  return (
    <>
      <div className="py-2 flex flex-col w-full bg-amber-100 print:hidden">
        <div className="pr-2 flex justify-between">
          <h1 className="p-2 text-2xl font-bold">Ayaan Patel LLC</h1>
          <button
            className="h-12 px-4 flex gap-1 items-center text-base cursor-pointer rounded-lg bg-emerald-500 hover:bg-emerald-600 transition-colors"
            onPointerDown={() => handlePrint()}
          >
            <PrinterIcon className="mr-2 h-6 w-6" />
            Print PDF
          </button>
        </div>
        <p
          className="p-2 text-sm underline cursor-pointer select-none hover:bg-gray-100 hover:bg-blend-darken"
          onClick={() => setSelectedForm("form-1")}
        >
          Monthly Facility Inspection Report
        </p>
        <p
          className="p-2 text-sm underline cursor-pointer select-none hover:bg-gray-100 hover:bg-blend-darken"
          onClick={() => setSelectedForm("form-2")}
        >
          Chart Review: Therapeutic Prescriber Recommendation
        </p>
      </div>
      <div ref={contentRef}>{forms[selectedForm]}</div>
    </>
  );
}

export default App;
