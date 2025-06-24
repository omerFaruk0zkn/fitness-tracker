import { useEffect } from "react";
import { useProgressStore } from "@/store/progressStore";
import ChartItem from "@/components/charts/chart-item";
import ChartsSkeleton from "@/components/skeletons/charts-skeleton";

const chartFields = [
  {
    key: "weight",
    title: "Kilo Gelişimi",
    label: "Kilo (kg)",
  },
  {
    key: "shoulder",
    title: "Omuz Gelişimi",
    label: "Omuz (cm)",
  },
  {
    key: "waist",
    title: "Bel Gelişimi",
    label: "Bel (cm)",
  },
  {
    key: "chest",
    title: "Göğüs Gelişimi",
    label: "Göğüs (cm)",
  },
  {
    key: "arm_left",
    title: "Sol Kol Gelişimi",
    label: "Sol Kol (cm)",
  },
  {
    key: "arm_right",
    title: "Sağ Kol Gelişimi",
    label: "Sağ Kol (cm)",
  },
  {
    key: "hip",
    title: "Kalça Gelişimi",
    label: "Kalça (cm)",
  },
  {
    key: "leg",
    title: "Bacak Gelişimi",
    label: "Bacak (cm)",
  },
  {
    key: "abdominal",
    title: "Karın Gelişimi",
    label: "Karın (cm)",
  },
];

const ChartsPage = () => {
  const { progresses, getProgressData, isFetching } = useProgressStore();

  const sortedProgresses = [...progresses].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  useEffect(() => {
    getProgressData();
  }, [getProgressData]);

  if (isFetching) return <ChartsSkeleton />;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-secondary-foreground">
        Gelişim Grafikleri
      </h2>

      {progresses && progresses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {chartFields.map((field) => (
            <ChartItem
              key={field.key}
              sortedProgresses={sortedProgresses}
              dataKey={field.key}
              title={field.title}
              label={field.label}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          Henüz gelişim verisi bulunmamaktadır
        </p>
      )}
    </div>
  );
};

export default ChartsPage;
