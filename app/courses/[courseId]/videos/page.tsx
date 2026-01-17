"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { sampleCourseMap, type SampleCourse } from "@/lib/sample-courses";
import { readUnlockedCourses } from "@/lib/learning-storage";
import { ArrowLeft, ArrowRight, Lock, Play, Clock, Video, ChevronLeft, ChevronRight } from "lucide-react";

export default function CourseVideosPage() {
  const { toast: originalToast } = useToast();
  const toast = useCallback(originalToast, []);
  const router = useRouter();
  const params = useParams<{ courseId: string }>();
  const courseId = params?.courseId as string | undefined;

  const course: SampleCourse | undefined = useMemo(() => {
    if (!courseId) return undefined;
    return sampleCourseMap[courseId];
  }, [courseId]);

  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId || !course) return;
    const unlocked = new Set(readUnlockedCourses());
    const courseIsUnlocked = unlocked.has(course.id);
    setIsUnlocked(courseIsUnlocked);

    if (!courseIsUnlocked) {
      toast({
        title: "Locked",
        description: "This course is locked. Unlock it from Dashboard → Courses by entering your unlock key.",
        variant: "destructive",
      });
    }
  }, [courseId, course, toast]);

  useEffect(() => {
    if (!course || !course.videos || course.videos.length === 0) return;
    if (!selectedVideoId) {
      setSelectedVideoId(course.videos[0].id);
    }
  }, [course, selectedVideoId]);

  if (!course) return null;

  const videos = course.videos || [];
  const activeVideo = videos.find((v) => v.id === selectedVideoId);
  const currentIndex = videos.findIndex((v) => v.id === selectedVideoId);

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 py-16">
          <Card className="glass-card rounded-3xl p-8 md:p-12 max-w-md text-center space-y-6 border-border/50">
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <Lock className="w-10 h-10 text-destructive" />
            </div>
            <div>
              <h1 className="text-2xl font-nav font-bold text-foreground mb-2">Course Locked</h1>
              <p className="text-muted-foreground">
                This course is locked. Please unlock it from the Dashboard using your unlock key.
              </p>
            </div>
            <Link href="/dashboard">
              <Button className="w-full rounded-xl h-12 bg-primary hover:bg-primary/90">
                Go to Dashboard
              </Button>
            </Link>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href={`/courses/${courseId}`}>
            <Button variant="outline" size="sm" className="rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-nav font-bold text-foreground truncate">{course.title} - Videos</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          <aside className="hidden lg:block">
            <Card className="glass-card rounded-2xl p-4 border-border/50 max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide">
              <h3 className="font-nav font-semibold text-foreground mb-4 flex items-center gap-2">
                <Play className="w-4 h-4 text-primary" />
                Video Playlist
              </h3>
              <div className="space-y-2">
                {videos.map((video, idx) => (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideoId(video.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      selectedVideoId === video.id
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "glass-card hover:bg-foreground/5 border-border/50"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        selectedVideoId === video.id ? "bg-primary-foreground/20" : "bg-primary/10"
                      }`}>
                        <Play className={`w-4 h-4 ${selectedVideoId === video.id ? "text-primary-foreground" : "text-primary"}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">{video.title}</p>
                        <p className={`text-xs mt-1 flex items-center gap-1 ${
                          selectedVideoId === video.id ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}>
                          <Clock className="w-3 h-3" />
                          {video.duration}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </aside>

          <div className="lg:hidden">
            <Card className="glass-card rounded-xl p-3 border-border/50 mb-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentIndex <= 0}
                  onClick={() => currentIndex > 0 && setSelectedVideoId(videos[currentIndex - 1].id)}
                  className="rounded-lg"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium text-foreground">
                  Video {currentIndex + 1} of {videos.length}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentIndex >= videos.length - 1}
                  onClick={() => currentIndex < videos.length - 1 && setSelectedVideoId(videos[currentIndex + 1].id)}
                  className="rounded-lg"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>

          {activeVideo && (
            <Card className="glass-card rounded-2xl p-4 md:p-6 border-border/50 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-nav font-bold text-foreground">{activeVideo.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Duration: {activeVideo.duration}
                  </p>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">
                  {currentIndex + 1}/{videos.length}
                </span>
              </div>

              <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: "56.25%" }}>
                <video
                  key={activeVideo.id}
                  className="absolute inset-0 w-full h-full"
                  controls
                  controlsList="nodownload"
                  playsInline
                >
                  <source src={activeVideo.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {activeVideo.description && (
                <div className="glass-card rounded-xl p-4 border-border/50">
                  <h3 className="font-semibold text-foreground mb-2">About this video</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{activeVideo.description}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
                <Button
                  variant="outline"
                  disabled={currentIndex <= 0}
                  onClick={() => {
                    if (currentIndex > 0) {
                      setSelectedVideoId(videos[currentIndex - 1].id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="flex-1 rounded-xl h-12"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous Video
                </Button>

                <Button
                  disabled={currentIndex >= videos.length - 1}
                  onClick={() => {
                    if (currentIndex < videos.length - 1) {
                      setSelectedVideoId(videos[currentIndex + 1].id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="flex-1 rounded-xl h-12 bg-primary hover:bg-primary/90"
                >
                  Next Video
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
