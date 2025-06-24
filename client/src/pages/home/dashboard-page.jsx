import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { useAuthStore } from "@/store/authStore";
import { useProgressStore } from "@/store/progressStore";
import UserInfoCard from "@/components/dashboard/user-info-card";
import StatShortcutCard from "@/components/dashboard/stat-shortcut-card";
import DashboardSkeleton from "@/components/skeletons/dashboard-skeleton";

const getBmiCategory = (bmi) => {
  if (bmi < 18.5) return "Zayıf";
  if (bmi < 25) return "İdeal";
  if (bmi < 30) return "Fazla kilolu";
  if (bmi < 35) return "Obez (1. derece)";
  if (bmi < 40) return "Obez (2. derece)";
  return "Aşırı obez (3. derece)";
};

const DashboardPage = () => {
  const { user } = useAuthStore();
  const { progresses, getProgressData, loading } = useProgressStore();
  const [showCompletionAlert, setShowCompletionAlert] = useState(false);

  const lastProgress = progresses[progresses.length - 1];
  const firstProgress = progresses[0];

  const startWeight = firstProgress?.weight;
  const currentWeight = lastProgress?.weight;
  const targetWeight = user?.target_weight;

  const totalToLose = startWeight - targetWeight;
  const lostSoFar = startWeight - currentWeight;

  const progress = (lostSoFar / totalToLose) * 100;

  // BMI hesap
  const heightInMeters = user?.height / 100;
  const bmi = currentWeight / (heightInMeters * heightInMeters);
  const bmiCategory = getBmiCategory(bmi);

  const minIdealWeight = 18.5 * (heightInMeters * heightInMeters);
  const maxIdealWeight = 24.9 * (heightInMeters * heightInMeters);

  useEffect(() => {
    getProgressData();
  }, [getProgressData]);

  useEffect(() => {
    if (progress === 100) {
      setShowCompletionAlert(true);
    }
  }, [progress]);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-4 space-y-10">
      <div className="space-y-6">
        <h1 className="text-xl font-bold">Merhaba, {user?.name}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-10">
          <UserInfoCard />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <StatShortcutCard
              title="Boy"
              value={user?.height.toFixed(1)}
              unit="cm"
            />
            {lastProgress?.weight && (
              <StatShortcutCard
                title="Kilo"
                value={lastProgress?.weight}
                unit="kg"
              />
            )}
            {user?.target_weight && (
              <StatShortcutCard
                title="Hedef Kilo"
                value={user?.target_weight}
                unit="kg"
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Hedefiniz Ne Durumda</h2>
        {user?.target_weight && lastProgress ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Mevcut kilo: {currentWeight} kg &rarr; Hedef: {targetWeight} kg
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Progress value={progress} className="flex-1" />
              <div className="text-sm">
                {progress > 0 ? progress.toFixed(1) : 0}%
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">
            Henüz hedefiniz veya kilo bilginiz bulunmamaktadır
          </p>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
          <h2 className="text-base sm:text-xl font-bold">
            BMI Hesaplamasına Göre Ne Durumdasınız
          </h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button>BMI Standartları</Button>
            </PopoverTrigger>
            <PopoverContent className="mx-2 bg-secondary-foreground text-secondary">
              <div className="flex flex-col gap-2">
                <span>18.5 ve aşşağısı &rarr; Zayıf</span>
                <span>18.5-24.9 &rarr; Normal (ideal)</span>
                <span>25-29.9 &rarr; Fazla kilolu</span>
                <span>30-34.9 &rarr; Obez(1. derece)</span>
                <span>35-39.9 &rarr; Obez(2. derece)</span>
                <span>40 ve üzeri &rarr; Aşırı obez(3. derece)</span>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <StatShortcutCard
            value={Math.round(minIdealWeight)}
            unit="kg"
            title="En düşük ideal kilon"
          />
          <StatShortcutCard
            value={Math.round(maxIdealWeight)}
            unit="kg"
            title="En yüksek ideal kilon"
          />
          {lastProgress && (
            <StatShortcutCard
              value={Math.round(bmi)}
              unit=""
              title="Şu anki bmi ortalamanız"
            />
          )}
          {!isNaN(bmi) && (
            <StatShortcutCard
              value={bmiCategory}
              unit=""
              title="BMI durumunuz"
            />
          )}
        </div>
      </div>

      <AlertDialog
        open={showCompletionAlert}
        onOpenChange={setShowCompletionAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tebrikler, Hedeflediğiniz Kiloya geldiniz
            </AlertDialogTitle>
            <AlertDialogDescription>
              Hedefinize ulaştığınız için sizi tebrik ederim
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Kapat</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DashboardPage;
