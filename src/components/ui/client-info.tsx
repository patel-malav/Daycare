import ContentEditable from "./content-editable";

export type ClientInfoData = {
  companyName: string;
  address: string;
  attention: string[];
};

type Props = {
  data: ClientInfoData;
};

export default function ClientInfo({ data }: Props) {
  const handleChange = (value: string, label: string) => {
    console.log("client-info", label, value);
  };

  const handleAttentionChange = (value: string, label: string) => {
    console.log("client-info", label, value);
  };

  return (
    <div className="flex justify-between text-sm">
      <div>
        <ContentEditable
          className="font-medium"
          label="company-name"
          defaultValue={data.companyName}
          onChange={handleChange}
        />
        <ContentEditable
          label="address"
          defaultValue={data.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <ContentEditable
          className="text-right"
          multiline
          label="attention"
          defaultValue={`Attention: ${data.attention.join("\n")}`}
          onChange={handleAttentionChange}
        />
      </div>
    </div>
  );
}
