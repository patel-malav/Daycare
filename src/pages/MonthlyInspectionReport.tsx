import PageHeader from "../components/ui/page-header";
import LetterPage from "../components/ui/letter-page";
import { getAllChecklists } from "../data/checklist";
import ClientInfo from "../components/ui/client-info";
import ContentEditable from "../components/ui/content-editable";
import InspectionChecklist from "../components/InspectionChecklist";
import CompliancePercentage from "../components/CompliancePercentage";
import { useState } from "react";

const pageHeaderData = {
  companyName: "Ayaan Patel LLC",
  mission: `
    Improving health through personalized care.
    Trusted medication services.
    Unwavering support for our patients' well-being.
  `,
  address: `
    11 Prince Rd
    Parsippany, NJ 07054
  `,
  phoneNumber: `(862) 686-7436`,
  email: `keyurpatel2004@gmail.com`,
};

const clientInfoData = {
  companyName: `Param Adult Daycare`,
  address: `60 E. Hanover Avenue, Morris Plains, NJ 07950`,
  attention: [
    `Bhruna Amin, Administrator`,
    `Rupal Babaria, Director of Nursing`,
  ],
};

const data = {
  reportTitle: "Consultant Pharmacist Monthly Facility Inspection Report",
  date: new Date().toISOString(),
  consultantPharmacist: `
    Keyur K. Patel
    MS R.PH (NJ, NY, PA)
    Certified Consultant Pharmacist
  `,
};

// type Props = {};
export default function MonthlyInspectionReport() {
  const checklists = getAllChecklists();
  const totalActionItemsCount = checklists.reduce(
    (acc, { actionItems: items }) => acc + items.length,
    0
  );

  const [approvedCountMap, setApprovedCountMap] = useState(() => {
    const approvedCountPerList = checklists.map((checklist) => [
      checklist.id,
      checklist.actionItems.reduce(
        (acc, { outcome }) => (outcome === "yes" ? acc + 1 : acc),
        0
      ),
    ]);
    return new Map(approvedCountPerList as [string, number][]);
  });

  const handleChange = (value: string, label: string) => {
    console.log("monthly-inspection-report", label, value);
  };

  const handleReportTitleDateChange = (value: string, label: string) => {
    console.log("monthly-inspection-report", label, value);
  };

  const handleApprovalCountChange = (count: number, id: string) => {
    setApprovedCountMap(new Map(approvedCountMap).set(id, count));
  };

  return (
    <>
      <div className="h-16 print:hidden"></div>
      <LetterPage header={<PageHeader data={pageHeaderData} />}>
        <ClientInfo data={clientInfoData} />
        <p className="pt-4 self-center font-bold text-xl underline">
          <ContentEditable
            inlineElement
            label="report-title"
            defaultValue={data.reportTitle}
            onChange={handleChange}
          />
          <span> </span>
          <ContentEditable
            inlineElement
            label="report-title-date"
            defaultValue={reportTitleDate(data.date)}
            onChange={handleReportTitleDateChange}
          />
        </p>
        <ContentEditable
          className="self-center font-bold text-md"
          label="report-subtitle"
          defaultValue={clientInfoData.address}
          onChange={handleChange}
        />
        <div className="flex justify-between">
          <ContentEditable
            className="font-medium text-sm italic"
            label="consultant-pharmacist"
            defaultValue={data.consultantPharmacist}
            onChange={handleChange}
          />
          <ContentEditable
            className="self-center font-medium text-sm italic"
            label="report-date"
            defaultValue={reportDate(data.date)}
            onChange={handleChange}
          />
        </div>
        <CompliancePercentage
          approvedCountMap={approvedCountMap}
          total={totalActionItemsCount}
        />
        <InspectionChecklist
          key={checklists[0].id}
          data={checklists[0]}
          mode="edit"
          onApprovalCountChange={handleApprovalCountChange}
        />
      </LetterPage>
      <div className="h-16 print:hidden"></div>
      <LetterPage header={<PageHeader data={pageHeaderData} />}>
        <InspectionChecklist
          key={checklists[1].id}
          data={checklists[1]}
          mode="edit"
          onApprovalCountChange={handleApprovalCountChange}
        />
        <InspectionChecklist
          key={checklists[2].id}
          data={checklists[2]}
          mode="edit"
          onApprovalCountChange={handleApprovalCountChange}
        />
      </LetterPage>
    </>
  );
}

function reportTitleDate(date: string) {
  return Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function reportDate(date: string) {
  return Intl.DateTimeFormat("em", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}
