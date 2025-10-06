import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay"; // 👈 import plugin
import { cn } from "../../lib/utils";

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = React.forwardRef(
  (
    {
      orientation = "horizontal",
      opts,
      plugins = [],
      className,
      children,
      autoplay = true,
      delay = 3000,
      ...props
    },
    ref
  ) => {
    const autoplayPlugin = React.useMemo(
      () =>
        Autoplay(
          { delay, stopOnInteraction: false, stopOnMouseEnter: true },
          ref
        ),
      [delay, ref]
    );

    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      autoplay ? [autoplayPlugin, ...plugins] : plugins
    );

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState([]);

    const onSelect = React.useCallback((api) => {
      if (!api) return;
      setSelectedIndex(api.selectedScrollSnap());
    }, []);

    React.useEffect(() => {
      if (!api) return;
      setScrollSnaps(api.scrollSnapList());
      onSelect(api);
      api.on("select", onSelect);
      api.on("reInit", onSelect);

      return () => {
        api.off("select", onSelect);
        api.off("reInit", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{ carouselRef, api, orientation, selectedIndex, scrollSnaps }}
      >
        <div
          ref={ref}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "" : "flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full w-full", className)}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselDots = () => {
  const { api, selectedIndex, scrollSnaps } = useCarousel();

  if (!scrollSnaps || scrollSnaps.length <= 1) return null;

  return (
    <div className="flex justify-center gap-2.5 mt-4">
      {scrollSnaps.map((_, idx) => (
        <button
          key={idx}
          onClick={() => api?.scrollTo(idx)}
          className={cn(
            "h-2 w-2 rounded-full transition-all",
            idx === selectedIndex
              ? "bg-neutral-600 dark:bg-neutral-300 scale-125"
              : "bg-gray-200 dark:bg-neutral-500"
          )}
        />
      ))}
    </div>
  );
};

export { Carousel, CarouselContent, CarouselItem, CarouselDots };
