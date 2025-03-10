
import React from "react";

interface RouteMapDisplayProps {
  selectedRoute: string;
  selectedRouteDetails: {
    id: string;
    name: string;
    modes: string[];
    weatherIcon: React.ReactNode;
    weatherStatus: string;
    co2: string;
  } | undefined;
}

export const RouteMapDisplay: React.FC<RouteMapDisplayProps> = ({ 
  selectedRoute,
  selectedRouteDetails
}) => {
  if (!selectedRouteDetails) return null;

  return (
    <div className="relative overflow-hidden rounded-lg bg-muted/50 p-1">
      <div className="aspect-[16/9] w-full overflow-hidden rounded-lg border border-white/10">
        {/* Satellite Map Background */}
        <div className="h-full w-full p-4">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="relative flex h-full w-full items-center justify-center">
              {/* Satellite Map Background */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508433957232-3107f5fd5995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80')] bg-cover bg-center opacity-60"></div>
              
              {/* Origin Point */}
              <div className="absolute left-[15%] top-[40%] h-4 w-4 rounded-full bg-nexus-blue shadow-[0_0_10px_rgba(0,98,255,0.7)]"></div>
              
              {/* Destination Point */}
              <div className="absolute right-[15%] top-[60%] h-4 w-4 rounded-full bg-nexus-purple shadow-[0_0_10px_rgba(110,54,229,0.7)]"></div>
              
              {/* Route Line */}
              <svg className="absolute inset-0 h-full w-full" style={{ filter: 'drop-shadow(0 0 4px rgba(110, 54, 229, 0.4))' }}>
                <path
                  d={selectedRoute === "fastest" 
                    ? "M 15% 40% C 40% 30%, 60% 70%, 85% 60%" 
                    : selectedRoute === "cheapest"
                    ? "M 15% 40% C 30% 60%, 70% 80%, 85% 60%"
                    : selectedRoute === "eco-friendly"
                    ? "M 15% 40% C 50% 20%, 40% 70%, 85% 60%"
                    : "M 15% 40% C 40% 50%, 60% 50%, 85% 60%"}
                  stroke={selectedRoute === "fastest" 
                    ? "#0062FF" 
                    : selectedRoute === "cheapest"
                    ? "#6E36E5"
                    : selectedRoute === "eco-friendly"
                    ? "#10B981"
                    : "#00CFD5"}
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray="6,3"
                  className="animate-pulse"
                />
              </svg>
              
              {/* Transport Mode Indicators */}
              {selectedRouteDetails?.modes.map((mode, index) => {
                const position = {
                  left: `${25 + (index * 25)}%`,
                  top: selectedRoute === "cheapest" ? "70%" 
                      : selectedRoute === "fastest" ? "40%" 
                      : selectedRoute === "eco-friendly" ? "30%"
                      : "50%"
                };
                
                return (
                  <div
                    key={index}
                    className={`absolute flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold shadow-lg ${
                      selectedRoute === "fastest" 
                        ? "bg-nexus-blue text-white" 
                        : selectedRoute === "cheapest"
                        ? "bg-nexus-purple text-white"
                        : selectedRoute === "eco-friendly"
                        ? "bg-green-500 text-white"
                        : "bg-nexus-teal text-white"
                    }`}
                    style={position}
                  >
                    {mode.charAt(0)}
                  </div>
                );
              })}

              {/* Cities/Points Labels */}
              <div className="absolute left-[12%] top-[36%] rounded-md bg-black/50 px-1.5 py-0.5 text-xs text-white backdrop-blur-sm">
                Shanghai
              </div>
              <div className="absolute right-[12%] top-[64%] rounded-md bg-black/50 px-1.5 py-0.5 text-xs text-white backdrop-blur-sm">
                Rotterdam
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Route Details Overlay */}
      <div className="absolute bottom-4 right-4 max-w-xs rounded-lg bg-background/90 p-4 shadow-lg backdrop-blur-md border border-white/10">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-white">Route Details</h4>
          <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-xs">
            {selectedRouteDetails?.weatherIcon}
            <span>{selectedRouteDetails?.weatherStatus}</span>
          </div>
        </div>
        
        <div className="mt-3 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Origin:</span>
            <span className="font-medium text-white">Shanghai, China</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Destination:</span>
            <span className="font-medium text-white">Rotterdam, Netherlands</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Distance:</span>
            <span className="font-medium text-white">11,425 km</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">CO₂ Emissions:</span>
            <span className="font-medium text-white">{selectedRouteDetails?.co2}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Transport Modes:</span>
            <span className="font-medium text-white">{selectedRouteDetails?.modes.join(" → ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
