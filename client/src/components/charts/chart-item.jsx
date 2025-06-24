import { formatNumber } from "@/utils/formatNumber";
import { useTheme } from "../theme/use-theme";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ChartItem = ({ sortedProgresses, dataKey, label, title }) => {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const colors = {
    light: {
      background: "#fff",
      text: "#1f2937",
      axis: "#6b7280",
      grid: "#e5e7eb",
      tooltipBg: "#f9fafb",
      tooltipText: "#111827",
      legendText: "#374151",
      line: "#3b82f6",
    },
    dark: {
      background: "#1f2937",
      text: "#f9fafb",
      axis: "#9ca3af",
      grid: "#374151",
      tooltipBg: "#111827",
      tooltipText: "#f9fafb",
      legendText: "#d1d5db",
      line: "#60a5fa",
    },
  };

  const c = isDark ? colors.dark : colors.light;

  const indexedData = sortedProgresses.map((item, index) => ({
    ...item,
    index: index + 1,
  }));

  return (
    <div
      className={`rounded-2xl p-4 shadow`}
      style={{ backgroundColor: c.background, color: c.text }}
    >
      <h3 className="text-lg font-medium mb-2 text-secondary-foreground">
        {title}
      </h3>

      <div className="overflow-x-auto">
        <div className="min-w-sm h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={indexedData}>
              <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
              <XAxis
                dataKey="index"
                stroke={c.axis}
                tick={{ fill: c.axis }}
                tickLine={false}
                label={{
                  value: "Kayıt",
                  position: "insideBottomRight",
                  offset: -5,
                }}
              />
              <YAxis stroke={c.axis} tick={{ fill: c.axis }} tickLine={false} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const dataPoint = payload[0].payload;
                    return (
                      <div
                        style={{
                          background: c.tooltipBg,
                          padding: "8px",
                          borderRadius: "8px",
                          color: c.tooltipText,
                        }}
                      >
                        <div>
                          <strong>Tarih:</strong> {dataPoint.date}
                        </div>
                        <div>
                          <strong>{payload[0].name}:</strong>{" "}
                          {formatNumber(payload[0].value)}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                wrapperStyle={{ color: c.legendText }}
                formatter={(value) => (
                  <span style={{ color: c.legendText }}>{value}</span>
                )}
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                name={label}
                stroke={c.line}
                strokeWidth={2}
                dot={{ stroke: c.line, strokeWidth: 2, fill: c.line }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartItem;
