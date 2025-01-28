export type InspectionChecklist = {
  id: string;
  checkpoint: string;
  actionItems: ActionItem[];
};

export type ActionItem = {
  id: string;
  task: string;
  outcome: "yes" | "no" | undefined;
  comment: string | undefined;
};

const checklistGeneral = {
  id: "37dcfed3-a293-4d69-82a4-e9493b5c9daa",
  checkpoint: "General Appearance, Controlled Drugs, and Observations ",
  actionItems: [
    "Current drug reference books available",
    "Syringes and needles disposed of properly",
    "Pharmacy policy & procedures manual current and available",
    "Pharmacy provider contact information is posted including ordering cutoff time",
    "Lighting/ventilation adequate",
    "Ordering procedures adequate",
    "D/C’d medications listed and destroyed",
    "Internals/externals separated",
    "Storage space organized",
    "All Rx medications properly labeled and clearly  readable",
    "All OTC’s labeled with resident specific information",
    "Metric Apothecary conversion chart",
    "Poison control information phone number posted",
    "Proper licenses current",
    "Tablet crusher device clean",
    "Narcotic shift to shift count reconciliation log signed and completed daily",
    "Quantity , date received and signature recorded on control utilization form",
    "No discrepancies found on spot check of narcotic inventory count",
    "Emergency kit sealed with breakaway lock and accessible without a key",
    "Emergency kit contents/checklist posted on outside of each kit",
    "Contents of each emergency kit within date of expiration",
  ],
};

const checklistMedicationCart = {
  id: "04780d7f-2143-4399-8f8a-fe3b04310c5a",
  checkpoint: "Medication Cart",
  actionItems: [
    "Medications are locked and secure. Carts locked when not in use",
    "Medication drawers and storage areas are clean, organized, and properly labeled",
    "Medication cart keys are kept on person or in secure lock-box",
    "D/C’d meds removed from cart",
    "Drug handbook current and available",
    "Open multi-dose medication vials dated and initialed",
    "No pre-poured medications",
    "Controlled medications are double-locked",
    "Documentation of medication administration on MAR with no admissions",
    "MAR has a record of full signature and initials",
    "Medications are in date",
    "Medications properly labeled",
    "Medications separated by route with dividers",
    "Applesauce, pudding, water pitcher covered and dated",
  ],
};

const checklistMedicationRoomAndRefrigerator = {
  id: "795417af-5b9a-48c8-b662-ed375d5a3656",
  checkpoint: "Medication Room & Medication Refrigerator",
  actionItems: [
    "Medication refrigerator temperature within range 36 – 46 degrees F",
    "Medication refrigerator temperature logged on a daily basis",
    "Medication refrigerator clean- the only food present is for the med pass",
    "Cabinets, medication refrigerator, room locked when unattended",
    "Medications/medical supplies and foods are not mixed",
    "Medication room clean and organized ",
    "Blood glucose test strips and control solution dated and initialed when opened",
    "No expired medications noted in room or refrigerator",
    "All open vials/pens dated & initialed  i.e. PPD/insulin/heparin",
    "Drugs not requiring refrigeration are not present in medication refrigerator",
    "Medications for destruction stored securely",
  ],
};

const actionItemFromString = (id: string) => {
  return (value: string, idx: number) => ({
    id: `${id}-${idx}`,
    task: value,
    outcome: undefined,
    comment: undefined,
  })
}

function getAllChecklists(): InspectionChecklist[] {
  const checklists = [checklistGeneral, checklistMedicationCart, checklistMedicationRoomAndRefrigerator];

  let result: InspectionChecklist[] = [];

  for (let checklist of checklists) {
    const convertFn = actionItemFromString(checklist.id);
    const actionItems: ActionItem[] = checklist.actionItems.map(convertFn)
    result.push({...checklist, actionItems})
  }

  return result;
}

export { getAllChecklists };