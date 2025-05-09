interface TableStatsProp {
  label?: string;
  value?: string | React.ReactNode;
  valueBgColor?: string;
  valueColor?: string;
}
const TableStats = ({
  label,
  value,
  valueBgColor,
  valueColor,
}: TableStatsProp) => {
  return (
    <div className="flex items-center gap-3 px-3 first:pl-0 last:pr-0">
      <h2 className="font-light capitalize">{label}</h2>
      <p
        className={`px-2 py-1 font-medium shadow-sm`}
        style={{
          backgroundColor: `${valueBgColor}`,
          color: `${valueColor}`,
        }}
      >
        {value}
      </p>
    </div>
  );
};

export default TableStats;
