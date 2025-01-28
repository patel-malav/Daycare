import { ChangeEvent, useEffect, useState } from "react";
import type { ActionItem, InspectionChecklist } from "../data/checklist";
import ContentEditable from "./ui/content-editable";

type Props = {
  mode: "edit" | "print";
  data: InspectionChecklist;
  // onChange: (listId: string, actionItem: ActionItem) => void;
  onApprovalCountChange: (approvalCount: number, id: string) => void;
};

export default function InspectionChecklist({
  data,
  onApprovalCountChange,
}: Props) {
  const [checklist, setChecklist] = useState(
    () =>
      new Map(data.actionItems.map((actionItem) => [actionItem.id, actionItem]))
  );

  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  useEffect(() => {
    let approved = 0;
    let rejected = 0;
    for (let item of checklist.values()) {
      if (item.outcome === "yes") {
        approved += 1;
      } else if (item.outcome === "no") {
        rejected += 1;
      }
    }
    setApprovedCount(approved);
    setRejectedCount(rejected);
  }, [checklist]);

  useEffect(() => {
    onApprovalCountChange(approvedCount, data.id);
  }, [approvedCount]);

  const handleActionItemChange = (actionItem: ActionItem) => {
    setChecklist(new Map(checklist).set(actionItem.id, actionItem));
  };

  return (
    <table>
      <caption>
        <span className="text-xs">Approved - </span>
        <span className="text-xs">{approvedCount} </span>
        <span className="text-xs">Rejected - </span>
        <span className="text-xs">{rejectedCount}</span>
      </caption>
      <thead>
        <tr className="text-xs border bg-blue-100">
          <th className="px-2 text-left border-r">{data.checkpoint}</th>
          <th className="px-2 min-w-8 text-center border-r">Yes</th>
          <th className="px-2 min-w-8 text-center border-r">No</th>
          <th className="px-2 min-w-56">Comments</th>
        </tr>
      </thead>
      <tbody>
        {data.actionItems.map((actionItem) => (
          <EditActionItem
            key={actionItem.id}
            actionItem={actionItem}
            onChange={handleActionItemChange}
          />
        ))}
      </tbody>
    </table>
  );
}

function EditActionItem({
  actionItem,
  onChange,
}: {
  actionItem: ActionItem;
  onChange: (item: ActionItem) => void;
}) {
  const [outcome, setOutcome] = useState(actionItem.outcome);
  const [comment, setComment] = useState(actionItem.comment);

  useEffect(() => {
    onChange({ ...actionItem, outcome, comment });
  }, [outcome, comment]);

  function handleValueChange(e: ChangeEvent<HTMLInputElement>) {
    setOutcome(e.target.value as "yes" | "no");
  }

  function handleCommentChange(e: ChangeEvent<HTMLInputElement>) {
    setComment(e.target.value);
  }

  return (
    <tr className="text-xs border">
      <td className="px-2 py-1 border-r">
        <ContentEditable
          label={actionItem.id}
          defaultValue={actionItem.task}
          onChange={(_value, _label) => {}}
        />
      </td>
      <td className="px-2 py-1 text-center border-r align-middle">
        <input
          type="checkbox"
          value="yes"
          name="answer"
          checked={outcome === "yes"}
          onChange={handleValueChange}
        />
      </td>
      <td className="px-2 py-1 text-center border-r align-middle">
        <input
          type="checkbox"
          value="no"
          name="answer"
          checked={outcome === "no"}
          onChange={handleValueChange}
        />
      </td>
      <td className="px-2 py-1">
        <input
          className="px-1 appearance-auto w-full bg-gray-200"
          type="text"
          placeholder="write comments"
          defaultValue={comment}
          onChange={handleCommentChange}
        />
      </td>
    </tr>
  );
}
