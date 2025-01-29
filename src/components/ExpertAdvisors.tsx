import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Download } from "lucide-react";

const ExpertAdvisors = () => {
  const { toast } = useToast();

  // Mock connected account ID - replace this with actual account connection logic
  const connectedAccountId = "demo123";

  const experts = [
    {
      name: "PlatinumAi: Stealth",
      description: "Our most advanced bot. Use with caution.",
      subtitle: "Ideal for personal capital, optimized for prop firm capital.",
      presets: "7 presets available",
      path: "/expert-advisors/platinumai-stealth",
      image: null
    },
    {
      name: "PlatinumAi: Infinity",
      description: "Minimal manual intervention required, with a \"one shot, one entry at a time\" approach.",
      presets: "5 presets available",
      path: "/expert-advisors/platinumai-infinity",
      image: null
    },
  ];

  const handleDownload = (expertName: string) => {
    toast({
      title: "Starting Download",
      description: `Downloading ${expertName}...`,
    });
  };

  const handleSetupGuide = (expertName: string) => {
    toast({
      title: "Setup Guide",
      description: `Opening setup guide for ${expertName}...`,
    });
  };

  return (
    <div className="p-4 ml-[64px] relative">
      <h1 className="text-xl font-semibold text-softWhite mb-4">Expert Advisors</h1>
      
      <div className="grid gap-3 relative">
        {/* Left fade gradient - made more subtle and removed shadow */}
        <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-darkBase to-transparent z-10" />
        
        {/* Right fade gradient - made more subtle and removed shadow */}
        <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-darkBase to-transparent z-10" />
        
        {experts.map((expert) => (
          <div 
            key={expert.name}
            className="group bg-darkBlue/40 backdrop-blur-sm p-3 border border-mediumGray/20 
                     hover:border-mediumGray/30 transition-all duration-300
                     relative overflow-hidden"
          >
            {/* Shiny gold reflective effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700
                          bg-gradient-to-r from-transparent via-[#ffd70022] to-transparent
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000
                          pointer-events-none" />
            
            <div className="flex items-center justify-center gap-3 relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 
                            flex items-center justify-center p-2 border border-mediumGray/10">
                {expert.image ? (
                  <img src={expert.image} alt={expert.name} className="w-10 h-10" />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500/40 to-cyan-500/40" />
                )}
              </div>
              <div className="flex-1 space-y-1.5 text-center">
                <div>
                  <h2 className="text-base font-medium text-softWhite">{expert.name}</h2>
                  <p className="text-sm text-mediumGray leading-relaxed">{expert.description}</p>
                  {expert.subtitle && (
                    <p className="text-xs text-mediumGray/80 mt-1 leading-relaxed">{expert.subtitle}</p>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center gap-2 pt-1.5">
                  <div className="text-xs text-mediumGray flex items-center mb-2">
                    <span className="inline-block mr-1">📄</span>
                    {expert.presets}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDownload(expert.name)}
                      size="sm"
                      className="bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-softWhite px-3 
                               shadow-embossed hover:shadow-embossed-hover transition-all duration-300
                               border border-[#00ADB5]/30 hover:border-[#00ADB5]/40 text-xs h-7
                               relative overflow-hidden group"
                    >
                      {/* Gold shine animation for download button */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700
                                    bg-gradient-to-r from-transparent via-[#ffd70022] to-transparent
                                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000
                                    pointer-events-none" />
                      <Download className="w-3.5 h-3.5 mr-1" />
                      Download
                    </Button>
                    <Button
                      onClick={() => handleSetupGuide(expert.name)}
                      variant="outline"
                      size="sm"
                      className="border-mediumGray/20 hover:bg-mediumGray/10 text-mediumGray 
                               hover:text-softWhite transition-colors duration-300 text-xs h-7"
                    >
                      Setup guide
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertAdvisors;