import LetterPage from "../components/ui/letter-page";
import ClientInfo from "../components/ui/client-info";
import ContentEditable from "../components/ui/content-editable";
import PageHeader from "../components/ui/page-header";

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
  date: new Date().toISOString(),
  facilityName: "Param Adult DayCare",
  customerDOB: "[ DOB ]",
  customerName: "[ Name ]",
  consultantPharmacist: `
    Keyur K. Patel
    MS R.PH (NJ, NY, PA)
    Certified Consultant Pharmacist
  `,
};

export default function ChartReviewPrescription() {
  const handleChange = (value: string, label: string) => {
    console.log("chart-review-prescription", label, value);
  };

  return (
    <>
      <div className="h-16 print:hidden"></div>
      <LetterPage header={<PageHeader data={pageHeaderData} />}>
        <ClientInfo data={clientInfoData} />
        <ContentEditable
          className="mt-4 font-medium text-sm italic"
          label="consultant-pharmacist"
          defaultValue={data.consultantPharmacist}
          onChange={handleChange}
        />
        <ContentEditable
          className="mt-4 self-center font-bold text-lg underline"
          label="report-title"
          defaultValue={data.reportTitle}
          onChange={handleChange}
        />
        <div className="mt-4 flex justify-between text-sm">
          <p>
            <span>Facility: </span>
            <ContentEditable
              className="underline"
              inlineElement
              label="facility-name"
              defaultValue={data.facilityName}
              onChange={handleChange}
            />
            <br />
            <span>Member Name: </span>
            <ContentEditable
              inlineElement
              label="customer-dob"
              defaultValue={data.customerDOB}
              onChange={handleChange}
            />
            &nbsp;
            <ContentEditable
              className="underline"
              inlineElement
              label="customer-name"
              defaultValue={data.customerName}
              onChange={handleChange}
            />
          </p>
          <p>
            <span>Date: </span>
            <ContentEditable
              inlineElement
              label="report-date"
              defaultValue={reportDate(data.date)}
              onChange={handleChange}
            />
          </p>
        </div>
        <p className="mt-4 flex justify-between font-medium">
          <span className="p-2 border rounded-4xl bg-red-100">
            Pharmacist Comment
          </span>
          <span>Physician Review</span>
        </p>
        <table>
          <thead>
            <tr className="text-xs">
              <th></th>
              <th className="font-medium">Circle</th>
              <th className="font-medium">Initial</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <CommentRow key={idx} onChange={handleChange} />
              ))}
          </tbody>
        </table>
        <p className="mt-10 flex justify-between font-medium">
          <span className="p-2 border rounded-4xl bg-red-100">
            Physician Comment
          </span>
        </p>
        <div className="mt-4 text-xs">
          <ContentEditable
            className="h-8 border"
            label="physician-comment-1"
            defaultValue=""
            onChange={handleChange}
          />
          <ContentEditable
            className="h-8 border border-t-0"
            label="physician-comment-1"
            defaultValue=""
            onChange={handleChange}
          />
        </div>
        <div className="mt-10 flex justify-between text-sm font-medium">
          <p>
            Prescriber Signature:
            ____________________________________________________________
          </p>
          <p>Date: ___________________________</p>
        </div>
        <ContentEditable
          className="mt-4 text-sm font-medium text-center"
          label="thankyou-message"
          defaultValue="Thank you for your cooperation"
          onChange={handleChange}
        />
        <p className="mt-4 text-sm font-medium">
          <ContentEditable
            inlineElement
            label="end-message-1"
            defaultValue={`Please review the consultant pharmacist’s Drug Regimen Review recommendation/s. Fax the completed form to Param Adult Daycare at facility fax number`}
            onChange={handleChange}
          />
          &nbsp;
          <ContentEditable
            inlineElement
            label="client-phone-number"
            defaultValue="973-998-6899"
            onChange={handleChange}
          />
        </p>
        <ContentEditable
          className="text-sm font-medium"
          label="end-message-2"
          defaultValue={`If there are to be any changes in medication regimen please notify the family directly plus Param Adult Daycare.`}
          onChange={handleChange}
        />
        <ContentEditable
          className="mt-8 text-sm font-medium text-center"
          label="end-message-3"
          defaultValue={`Please remember to write an order if indicated. This is not an order sheet.`}
          onChange={handleChange}
        />
      </LetterPage>
    </>
  );
}

type CommentRowProps = {
  onChange: (value: string, label: string) => void;
};

function CommentRow({ onChange }: CommentRowProps) {
  return (
    <tr className="border">
      <td className="w-full h-8 text-xs border-r">
        <ContentEditable
          className="h-full"
          label="pharmacist-comment-1"
          defaultValue=""
          onChange={onChange}
        />
      </td>
      <td className="p-1 border-r">
        <span>Accepted</span>
        <br />
        <span className="whitespace-nowrap">Not Accepted</span>
      </td>
      <td className="min-w-16"></td>
    </tr>
  );
}

function reportDate(date: string) {
  return Intl.DateTimeFormat("em", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  }).format(new Date(date));
}
