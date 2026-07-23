import { Progress } from "antd";

export const AndProgress = ({ percent, text, onClick }: any) => {
  return (
    <div
      className="w-full md:px-4 md:py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 hover:ring-blue-500/20 hover:border-blue-500 transition-all duration-300 flex flex-col gap-3 p-3"
      onClick={onClick}
    >
      <p>{text}</p>
      <Progress
        percent={percent}
        percentPosition={{ align: "center", type: "inner" }}
        size={[800, 20]}
        strokeColor="#6366F1"
        railColor="#E2E8F0"
      />
    </div>
  );
};
