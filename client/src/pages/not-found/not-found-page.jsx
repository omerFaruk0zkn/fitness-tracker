import { useNavigate } from "react-router-dom";
import { Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-primary px-4">
      <div className="mb-6 animate-bounce">
        <Ghost className="size-24 text-primary drop-shadow-lg" />
      </div>

      <h1 className="text-5xl font-bold mb-2">404</h1>
      <p className="text-xl text-muted-foreground mb-6 text-center">
        Üzgünüz, aradığınız sayfa bulunamadı.
      </p>

      <Button
        onClick={() => navigate("/")}
        className="text-lg transition-all duration-200"
      >
        Anasayfaya Dön
      </Button>
    </div>
  );
};

export default NotFoundPage;
