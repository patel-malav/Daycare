type Props = {
  total: number;
  approvedCountMap: Map<string, number>;
};

export default function CompliancePercentage({
  approvedCountMap,
  total,
}: Props) {
  // @ts-ignore
  const valid = approvedCountMap.values().reduce((acc, curr) => acc + curr, 0);

  const percentage = Math.floor((valid / total) * 100);
  return (
    <p className="px-3 border font-bold self-start">
      Compliance Rate <span>{valid}</span>/<span>{total}</span> &mdash;{" "}
      <span>{percentage}%</span>
    </p>
  );
}
