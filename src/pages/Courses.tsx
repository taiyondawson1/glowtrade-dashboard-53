
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const CoursesPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });

  const handleStartCourse = (courseId: string, courseName: string) => {
    toast({
      title: "Starting Course",
      description: `Loading ${courseName}...`,
    });
    navigate(`/courses/${courseId}`);
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading courses...</div>;
  }

  return (
    <div className="p-4 ml-[64px] relative">
      <h1 className="text-xl font-semibold text-softWhite mb-4">Courses</h1>
      
      <div className="grid gap-3 relative">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-darkBase to-transparent z-10" />
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-darkBase to-transparent z-10" />
        
        {courses?.map((course) => (
          <div 
            key={course.id}
            className="group bg-darkBlue/40 backdrop-blur-sm p-3 border border-mediumGray/20 
                     hover:border-mediumGray/30 transition-all duration-300
                     relative overflow-hidden !rounded-none"
          >
            {/* Shiny gold reflective effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700
                          bg-gradient-to-r from-transparent via-[#ffd70022] to-transparent
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000
                          pointer-events-none" />
            
            <div className="flex flex-col items-center justify-center gap-3 relative">
              <div className="space-y-1.5 text-center">
                <div>
                  <h2 className="text-base font-medium text-softWhite">{course.name}</h2>
                  <p className="text-sm text-mediumGray leading-relaxed">{course.description}</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 pt-1.5">
                  <div className="text-xs text-mediumGray flex items-center gap-4 mb-2">
                    <span>⏱️ {course.duration}</span>
                    <span>📚 {course.lessons} lessons</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleStartCourse(course.id, course.name)}
                      size="sm"
                      className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black px-3 
                               shadow-embossed hover:shadow-embossed-hover transition-all duration-300
                               border border-[#FFD700]/30 hover:border-[#FFD700]/40 text-xs h-7
                               relative overflow-hidden group !rounded-none"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700
                                    bg-gradient-to-r from-transparent via-[#ffd70022] to-transparent
                                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000
                                    pointer-events-none" />
                      <BookOpen className="w-3.5 h-3.5 mr-1" />
                      Start Course
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

export default CoursesPage;
