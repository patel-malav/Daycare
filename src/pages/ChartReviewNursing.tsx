import LetterPage from "../components/ui/letter-page";
import PageHeader from "../components/ui/page-header";
import ClientInfo from "../components/ui/client-info";
import ContentEditable from "../components/ui/content-editable";
import TextareaAutoResize from "react-textarea-autosize";

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
  reportTitle:
    "Chart Review Quarterly Observations and Recommendations for Nursing",
  reportSubTitle: "Chart Review: Nursing",
  reportMonthlyTrend:
    "Consultant Pharmacist Monthly Facility Inspection Trend Report",
  date: new Date().toISOString(),
  consultantPharmacist: `
    Keyur K. Patel
    MS R.PH (NJ, NY, PA)
    Certified Consultant Pharmacist
  `,
};

export default function ChartReviewNursing() {
  const handleChange = (value: string, label: string) => {
    console.log("chart-review-nursing", label, value);
  };
  return (
    <>
      <div className="h-16 no-print"></div>
      <LetterPage header={<PageHeader data={pageHeaderData} />}>
        <ClientInfo data={clientInfoData} />
        <ContentEditable
          className="pt-4 self-center font-bold text-xl underline"
          label="report-title"
          defaultValue={data.reportTitle}
          onChange={handleChange}
        />
        <ContentEditable
          className="self-center font-bold text-xl underline"
          label="report-subtitle"
          defaultValue={data.reportSubTitle}
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
        <TextareaAutoResize
          className="mt-2 p-1 text-sm border bg-gray-200"
          placeholder="Enter nursing related comments"
          minRows={10}
        />
        <ContentEditable
          className="mt-8 pt-4 self-center font-bold text-xl underline"
          label="report-monthly-trend"
          defaultValue={data.reportMonthlyTrend}
          onChange={handleChange}
        />
      </LetterPage>
    </>
  );
}

function reportDate(date: string) {
  return Intl.DateTimeFormat("em", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}
