import { useRef } from "react";
import { Outlet } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AUTH_CAROUSEL_IMAGES } from "@/config";
import Autoplay from "embla-carousel-autoplay";

const AuthLayout = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <div className="h-screen flex items-center">
      <div className="w-full h-full hidden md:flex bg-primary items-center">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[plugin.current]}
        >
          <CarouselContent>
            {AUTH_CAROUSEL_IMAGES.map((src, index) => (
              <CarouselItem key={index} className="relative basis-full">
                <img
                  src={src}
                  alt={`slider-${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <h1 className="text-xl lg:text-4xl text-primary-foreground font-bold text-shadow-sm text-shadow-primary">
                    Fitness Tracker
                  </h1>
                  <p className="lg:text-2xl text-primary-foreground font-medium">
                    Gelişimini kolayca takip et
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="w-full md:w-2/3 h-full flex items-center justify-center p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
