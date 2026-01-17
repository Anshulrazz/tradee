"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  sampleCourseMap,
  type SampleCourse,
  type Module,
  type Lesson,
} from "@/lib/sample-courses";
import {
  readUnlockedCourses,
  readProgressStore,
  writeProgressStore,
  dispatchCourseProgressEvent,
} from "@/lib/learning-storage";
import { ArrowLeft, ArrowRight, CheckCircle, Menu, BookOpen, Play, Clock, Award, Lock, ChevronRight, FileText } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { PDFViewer } from "@/components/pdf-viewer";
import { PDFViewer as PDFViewerV2 } from "@/components/v2";
import { DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { loadUser } from "@/store/slices/authSlice";

const getFlattenedLessons = (course: SampleCourse) => {
  const lessons: Lesson[] = [];
  course.modules.forEach(module => {
    lessons.push(...module.lessons);
  });
  return lessons;
};

export default function CourseReaderPage() {
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state: RootState) => state.auth);
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams<{ courseId: string }>();
  const courseId = params?.courseId as string | undefined;
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!user && status === 'idle') {
      dispatch(loadUser());
    }
  }, [user, status, dispatch]);

  useEffect(() => {
    if (status === 'loading') return;
    if (!user) {
      router.push('/login');
      return;
    }
    if (!user.unlockeKey || user.unlockeKey === "") {
      router.push('/dashboard');
      return;
    }
  }, [user, status, router]);

  const course: SampleCourse | undefined = useMemo(() => {
    if (!courseId) return undefined;
    return sampleCourseMap[courseId];
  }, [courseId]);

  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedLessonId, setselectedLessonId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!courseId || !course) return;
    const unlocked = new Set(readUnlockedCourses());
    if (!unlocked.has(course.id)) {
      toast({
        title: "Locked",
        description: "This course is locked. Unlock it from Dashboard → Courses by entering your unlock key.",
        variant: "destructive",
      });
      router.replace("/dashboard");
    }
  }, [courseId, course, router, toast]);

  useEffect(() => {
    if (!course) return;
    const firstModule = course.modules?.[0];
    const firstLesson = firstModule?.lessons?.[0];
    if (firstModule && !selectedModuleId) setSelectedModuleId(firstModule.id);
    if (firstLesson && !selectedLessonId) setselectedLessonId(firstLesson.id);
  }, [course, selectedModuleId, selectedLessonId]);

  if (!course) return null;

  const onMarkCompleted = (lesson: Lesson, navigateNext: boolean = false) => {
    const store = readProgressStore();
    const completed = new Set(store[course.id] ?? []);
    if (!completed.has(lesson.id)) {
      completed.add(lesson.id);
      store[course.id] = Array.from(completed);
      writeProgressStore(store);
      dispatchCourseProgressEvent();
      toast({ title: "Progress saved", description: `Marked "${lesson.title}" as completed.` });
    } else {
      toast({ title: "Already Completed", description: `"${lesson.title}" is already marked as completed.` });
    }

    if (navigateNext) {
      const allLessons = getFlattenedLessons(course);
      const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
      const nextLesson = allLessons[currentIndex + 1];
      if (nextLesson) handleLessonNavigation(nextLesson.id);
    }
  };

  const store = readProgressStore();
  const completedIds = new Set(store[course.id] ?? []);
  const totalLessons = getFlattenedLessons(course).length;
  const completedCount = completedIds.size;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const activeModule: Module | undefined = course.modules.find((m) => m.id === selectedModuleId);
  const activeLesson: Lesson | undefined = activeModule?.lessons.find((l) => l.id === selectedLessonId);

  const allLessons = useMemo(() => getFlattenedLessons(course), [course]);
  const currentLessonIndex = activeLesson ? allLessons.findIndex(l => l.id === activeLesson.id) : -1;
  const previousLesson = allLessons[currentLessonIndex - 1];
  const nextLesson = allLessons[currentLessonIndex + 1];

  const handleLessonNavigation = useCallback((lessonId: string) => {
    let targetModuleId = null;
    for (const module of course.modules) {
      if (module.lessons.some(l => l.id === lessonId)) {
        targetModuleId = module.id;
        break;
      }
    }
    if (targetModuleId) {
      setSelectedModuleId(targetModuleId);
      setselectedLessonId(lessonId);
      if (isMobile) setSidebarOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.getElementById('lesson-content-area')?.scrollTo(0, 0);
    }
  }, [course.modules, isMobile]);

  const SidebarContent = () => (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-4 border-border/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-nav font-bold text-foreground truncate">{course.title}</h2>
            <p className="text-xs text-muted-foreground">{course.level}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-primary">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          <p className="text-xs text-muted-foreground">{completedCount} of {totalLessons} lessons completed</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Link href="/dashboard" className="flex-1">
          <Button variant="outline" size="sm" className="w-full rounded-xl">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Dashboard
          </Button>
        </Link>
        {course.videos && course.videos.length > 0 && (
          <Link href={`/courses/${courseId}/videos`} className="flex-1">
            <Button size="sm" className="w-full rounded-xl bg-primary hover:bg-primary/90">
              <Play className="w-4 h-4 mr-1" />
              Videos
            </Button>
          </Link>
        )}
      </div>

      <div className="space-y-3">
        {course.modules.map((module, moduleIdx) => (
          <div key={module.id} className="glass-card rounded-xl border-border/50 overflow-hidden">
            <button
              className={`w-full text-left p-4 transition-all ${selectedModuleId === module.id ? 'bg-primary/10 border-l-4 border-primary' : 'hover:bg-foreground/5'}`}
              onClick={() => setSelectedModuleId(module.id)}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {moduleIdx + 1}
                </span>
                <span className="font-nav font-semibold text-sm text-foreground">{module.title}</span>
              </div>
            </button>
            
            {selectedModuleId === module.id && (
              <div className="px-4 pb-4 space-y-1">
                {module.lessons.map((lesson) => {
                  const isActive = selectedLessonId === lesson.id;
                  const isDone = completedIds.has(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 ${
                        isActive 
                          ? 'bg-primary text-primary-foreground' 
                          : isDone 
                            ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20' 
                            : 'hover:bg-foreground/5 text-foreground/80'
                      }`}
                      onClick={() => handleLessonNavigation(lesson.id)}
                    >
                      {isDone ? (
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${isActive ? 'border-primary-foreground' : 'border-muted-foreground/50'}`} />
                      )}
                      <span className="text-sm font-nav truncate">{lesson.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="font-nav font-bold text-foreground truncate">{course.title}</h1>
              <p className="text-xs text-muted-foreground">{progressPercent}% complete</p>
            </div>
          </div>
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-xl flex-shrink-0">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] sm:w-[400px] p-4 overflow-y-auto">
              <VisuallyHidden><DialogTitle>Course Menu</DialogTitle></VisuallyHidden>
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 scrollbar-hide">
              <SidebarContent />
            </div>
          </aside>

          <Card id="lesson-content-area" className="glass-card rounded-2xl p-6 lg:p-8 border-border/50">
            {activeLesson ? (
              <div className="space-y-6">
                <div className="pb-4 border-b border-border/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>{activeModule?.title}</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-primary">Lesson {currentLessonIndex + 1}</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-nav font-bold text-foreground">{activeLesson.title}</h2>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {activeLesson.duration}
                    </span>
                    {completedIds.has(activeLesson.id) && (
                      <span className="flex items-center gap-1 text-sm text-green-500">
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </span>
                    )}
                  </div>
                </div>

                <div className="glass-card rounded-xl p-4 border-l-4 border-primary bg-primary/5">
                  <p className="text-foreground/90 font-medium">{activeLesson.summary}</p>
                </div>

                {activeLesson.pdfUrl ? (
                  <div className="space-y-6">
                    <div className="glass-card rounded-xl p-4 border-border/50">
                      <div className="flex items-center gap-3 mb-4">
                        <FileText className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-foreground">English Version</h3>
                      </div>
                      <PDFViewer pdfUrl={activeLesson.pdfUrl} title={activeLesson.title} />
                    </div>
                    <div className="glass-card rounded-xl p-4 border-border/50">
                      <div className="flex items-center gap-3 mb-4">
                        <FileText className="w-5 h-5 text-secondary" />
                        <h3 className="font-semibold text-foreground">Hindi Version</h3>
                      </div>
                      <PDFViewerV2 pdfUrl={activeLesson.pdfUrl} title={activeLesson.title} />
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none space-y-4">
                    {activeLesson.content.map((para, idx) => (
                      <p key={idx} className="text-foreground/80 leading-relaxed">{para}</p>
                    ))}
                  </div>
                )}

                {activeLesson.pdfUrl && activeLesson.content && activeLesson.content.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-border/50">
                    <h3 className="font-semibold text-foreground">Additional Notes</h3>
                    {activeLesson.content.map((para, idx) => (
                      <p key={idx} className="text-foreground/80 leading-relaxed">{para}</p>
                    ))}
                  </div>
                )}

                {activeLesson.resources && activeLesson.resources.length > 0 && (
                  <div className="glass-card rounded-xl p-4 border-border/50 space-y-3">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Additional Resources
                    </h3>
                    <ul className="space-y-2">
                      {activeLesson.resources.map((url) => (
                        <li key={url}>
                          <a
                            className="text-sm text-primary hover:text-primary/80 underline break-all"
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {url.length > 60 ? `${url.substring(0, 60)}...` : url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border/50">
                  <Button
                    variant="outline"
                    onClick={() => previousLesson && handleLessonNavigation(previousLesson.id)}
                    disabled={!previousLesson}
                    className="flex-1 rounded-xl h-12"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <Button
                    onClick={() => onMarkCompleted(activeLesson, true)}
                    disabled={completedIds.has(activeLesson.id)}
                    className={`flex-1 rounded-xl h-12 ${completedIds.has(activeLesson.id) ? 'bg-green-600 hover:bg-green-600' : 'bg-primary hover:bg-primary/90'}`}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {completedIds.has(activeLesson.id) ? 'Completed' : 'Mark Complete & Next'}
                  </Button>

                  <Button
                    onClick={() => nextLesson && handleLessonNavigation(nextLesson.id)}
                    disabled={!nextLesson}
                    className="flex-1 rounded-xl h-12"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Select a Lesson</h3>
                <p className="text-muted-foreground">Choose a lesson from the course outline to begin learning</p>
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
