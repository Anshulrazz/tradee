"use client";

import { useEffect, useMemo, useState, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { loadUser, logout } from '@/store/slices/authSlice';
import type { RootState } from '@/store';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Eye, EyeOff, BookOpen, TrendingUp, Award, Play, Lock, Unlock, User, Settings, GraduationCap, Copy, CheckCircle } from 'lucide-react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { sampleCourseCatalog, sampleCourseMap, type SampleCourse } from "@/lib/sample-courses";
import { readUnlockedCourses, writeUnlockedCourses, readProgressStore, COURSE_PROGRESS_EVENT } from "@/lib/learning-storage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_ENDPOINTS } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state: RootState) => state.auth);
  const { toast } = useToast();

  const [unlockedCourses, setUnlockedCourses] = useState<string[]>(() => readUnlockedCourses());
  const [progressStore, setProgressStore] = useState(() => readProgressStore());
  const [showUnlockKey, setShowUnlockKey] = useState(false);
  const [unlockModal, setUnlockModal] = useState<{ course: SampleCourse | null }>({ course: null });
  const [unlockInput, setUnlockInput] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handler = () => setProgressStore(readProgressStore());
    if (typeof window !== 'undefined') {
      window.addEventListener(COURSE_PROGRESS_EVENT, handler);
      return () => window.removeEventListener(COURSE_PROGRESS_EVENT, handler);
    }
    return undefined;
  }, []);

  const normalizeCourse = (raw: any): SampleCourse => {
    const title = raw?.title ?? raw?.name ?? 'Untitled Course';
    const id = raw?.id ?? raw?._id ?? raw?.courseId ?? title.toLowerCase().replace(/\s+/g, '-');
    const sample = sampleCourseMap[id];
    if (sample) return sample;
    return {
      id,
      title,
      description: raw?.description ?? 'Keep learning and track your progress here.',
      level: raw?.level ?? 'Beginner',
      unlockKey: raw?.unlockKey,
      isFree: Boolean(raw?.isFree),
      modules: Array.isArray(raw?.modules) ? raw.modules : [],
      outcomes: Array.isArray(raw?.outcomes) ? raw.outcomes : [],
    };
  };

  const userunlockeKey = user?.unlockeKey ?? null;
  const rawUserCourses = Array.isArray((user as any)?.courses) ? (user as any).courses : [];
  const normalizedUserCourses = rawUserCourses.map(normalizeCourse);

  const unlockedSet = useMemo(() => new Set(unlockedCourses), [unlockedCourses]);
  const catalogUnlocked = sampleCourseCatalog.filter((course: SampleCourse) => unlockedSet.has(course.id));

  const userCourseMap = new Map<string, SampleCourse>();
  normalizedUserCourses.forEach((course: SampleCourse) => userCourseMap.set(course.id, course));
  catalogUnlocked.forEach((course: SampleCourse) => userCourseMap.set(course.id, course));
  const userCourses = Array.from(userCourseMap.values());

  const courseProgressMap = ((user as any)?.courseProgress ?? (user as any)?.progress ?? {}) as Record<string, number>;

  const getProgressValue = (course: SampleCourse) => {
    const meta = sampleCourseMap[course.id] ?? course;
    const totalLessons = meta.modules?.reduce((count, module) => count + (Array.isArray(module.lessons) ? module.lessons.length : 0), 0) ?? 0;
    const completedLessons = progressStore[meta.id]?.length ?? 0;
    if (totalLessons > 0) {
      const ratio = Math.min(1, Math.max(0, completedLessons / totalLessons));
      return Math.round(ratio * 100);
    }
    const raw = courseProgressMap?.[meta.id] ?? courseProgressMap?.[meta.title] ?? 0;
    const numeric = Number(raw);
    if (Number.isNaN(numeric)) return 0;
    return Math.min(100, Math.max(0, numeric));
  };

  const coursesWithStatus = sampleCourseCatalog.map((course) => ({
    course,
    unlocked: unlockedSet.has(course.id) || userCourseMap.has(course.id),
  }));

  const handleCourseAccess = (course: SampleCourse, unlocked: boolean) => {
    if (unlocked) {
      router.push(`/courses/${course.id}`);
      return;
    }
    if (!userunlockeKey) {
      toast({ title: 'No key found', description: 'You do not have an unlock key. Please contact support.', variant: 'destructive' });
      return;
    }
    setUnlockModal({ course });
  };

  const handleUnlockSubmit = () => {
    if (!unlockModal.course) return;
    const input = unlockInput.trim();
    if (!input) {
      toast({ title: 'No key entered', description: 'Please enter the unlock key to continue.', variant: 'destructive' });
      return;
    }
    if (userunlockeKey && input === userunlockeKey.trim()) {
      const updated = Array.from(new Set([...unlockedCourses, unlockModal.course.id]));
      setUnlockedCourses(updated);
      writeUnlockedCourses(updated);
      toast({ title: 'Unlocked', description: `${unlockModal.course.title} unlocked. Enjoy learning!` });
      setUnlockModal({ course: null });
      setUnlockInput('');
      router.push(`/courses/${unlockModal.course.id}`);
    } else {
      toast({ title: 'Invalid key', description: 'The unlock key you entered is incorrect.', variant: 'destructive' });
    }
  };

  const handleUnlockCancel = () => {
    setUnlockModal({ course: null });
    setUnlockInput('');
  };

  const formatName = (name?: string) => {
    if (!name) return '';
    return name.split(' ').filter(Boolean).map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ');
  };

  useEffect(() => {
    if (!user && status === 'idle') {
      dispatch(loadUser());
    }
  }, [user, status, dispatch]);

  useEffect(() => {
    if (!user && status === 'failed') {
      router.replace('/login');
    }
  }, [user, status, router]);

  async function requestLogout() {
    try {
      await fetch(API_ENDPOINTS.auth.logout, { method: 'GET', credentials: 'include' });
    } catch (_e) {}
  }

  const handleLogout = async () => {
    await requestLogout();
    dispatch(logout());
    router.replace('/login');
  };

  if (!user) return null;

  const stats = [
    { icon: BookOpen, label: 'Enrolled Courses', value: userCourses.length, color: 'from-blue-500/20 to-cyan-500/20' },
    { icon: TrendingUp, label: 'Average Progress', value: userCourses.length > 0 ? Math.round(userCourses.reduce((sum, c) => sum + getProgressValue(c), 0) / userCourses.length) : 0, suffix: '%', color: 'from-green-500/20 to-emerald-500/20' },
    { icon: Award, label: 'Completed', value: userCourses.filter(c => getProgressValue(c) === 100).length, color: 'from-purple-500/20 to-pink-500/20' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <User className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-nav font-bold text-foreground">
                    Welcome back, {formatName(user?.name)}
                  </h1>
                  <p className="text-muted-foreground text-sm">Manage your learning journey from the dashboard</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/courses">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 shadow-lg shadow-primary/25">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Enroll Now
                </Button>
              </Link>
              <Button variant="destructive" onClick={handleLogout} className="rounded-xl px-6">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="glass-card rounded-2xl p-6 border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}{stat.suffix || ''}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start bg-card/50 rounded-xl p-1 mb-6 overflow-x-auto flex-nowrap">
            <TabsTrigger value="overview" className="rounded-lg font-nav text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
            <TabsTrigger value="courses" className="rounded-lg font-nav text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All Courses</TabsTrigger>
            <TabsTrigger value="my-courses" className="rounded-lg font-nav text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">My Courses</TabsTrigger>
            <TabsTrigger value="profile" className="rounded-lg font-nav text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-card rounded-2xl p-6 border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-nav font-semibold">Your Courses</h3>
                </div>
                
                {userCourses.length > 0 ? (
                  <div className="space-y-4">
                    {userCourses.slice(0, 3).map((course) => {
                      const progress = getProgressValue(course);
                      return (
                        <div key={course.id} className="p-4 bg-background/50 rounded-xl border border-border/50 hover:border-primary/30 transition-all cursor-pointer" onClick={() => router.push(`/courses/${course.id}`)}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-foreground">{course.title}</h4>
                            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No courses enrolled yet</p>
                    <Link href="/courses">
                      <Button variant="outline" className="rounded-xl">Browse Courses</Button>
                    </Link>
                  </div>
                )}
              </Card>

              <Card className="glass-card rounded-2xl p-6 border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Unlock className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-lg font-nav font-semibold">Course Unlock Key</h3>
                </div>

                {userunlockeKey ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-xl">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-muted-foreground mb-1">Your Unlock Key</p>
                          <code className="block text-sm font-mono bg-background/50 px-3 py-2 rounded-lg truncate">
                            {showUnlockKey ? user?.unlockeKey : '••••••••••••••••'}
                          </code>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setShowUnlockKey(!showUnlockKey)} className="h-9 w-9">
                            {showUnlockKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(user?.unlockeKey || '');
                              toast({ title: 'Copied', description: 'Key copied to clipboard' });
                            } catch {
                              toast({ title: 'Failed', description: 'Could not copy key', variant: 'destructive' });
                            }
                          }}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-secondary flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Expires: {user?.unlockKeyExpire ? new Date(user.unlockKeyExpire).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-xl text-center">
                    <Lock className="w-8 h-8 text-destructive mx-auto mb-2" />
                    <p className="text-destructive font-medium">No Key Found</p>
                    <p className="text-sm text-muted-foreground mt-1">Contact support to get your unlock key</p>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses">
            <div className="grid md:grid-cols-2 gap-4">
              {coursesWithStatus.map(({ course, unlocked }) => (
                <Card key={course.id} className="glass-card rounded-2xl overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift cursor-pointer" onClick={() => handleCourseAccess(course, unlocked)}>
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-nav font-semibold text-foreground">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{course.level}</p>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${unlocked ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'}`}>
                        {unlocked ? 'Unlocked' : course.isFree ? 'Free' : 'Locked'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="w-4 h-4" />
                        {course.modules.length} modules
                      </div>
                      <Button size="sm" variant={unlocked ? 'secondary' : 'default'} className="rounded-lg" onClick={(e: MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); handleCourseAccess(course, unlocked); }}>
                        {unlocked ? 'Continue' : 'Unlock'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-courses">
            {userCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {userCourses.map((course) => {
                  const progress = getProgressValue(course);
                  return (
                    <Card key={course.id} className="glass-card rounded-2xl p-6 border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift cursor-pointer" onClick={() => router.push(`/courses/${course.id}`)}>
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-nav font-semibold text-foreground">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">{course.level}</p>
                          </div>
                          <span className="text-lg font-bold text-primary">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{progress === 100 ? 'Completed!' : 'In Progress'}</span>
                          <Button size="sm" className="rounded-lg">
                            <Play className="w-4 h-4 mr-1" />
                            Continue
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="glass-card rounded-2xl p-12 text-center border-border/50">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No courses yet</h3>
                <p className="text-muted-foreground mb-6">Start your trading journey by enrolling in a course</p>
                <Link href="/courses">
                  <Button className="rounded-xl">Browse Courses</Button>
                </Link>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="profile">
            <Card className="glass-card rounded-2xl p-6 border-border/50 max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-nav font-semibold">Profile Information</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'Name', value: formatName(user?.name) },
                  { label: 'Email', value: user?.email },
                  { label: 'Phone', value: user?.phone === "1234567890" ? "Not set" : user?.phone },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border/50">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground mt-6">
                For account deletion requests, contact: <span className="text-primary">request@samraattrader.com</span>
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={!!unlockModal.course} onOpenChange={(open) => !open && handleUnlockCancel()}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-nav text-xl">Unlock Course</DialogTitle>
            <DialogDescription>Enter your unlock key to access "{unlockModal.course?.title}"</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="unlock-key" className="text-sm font-medium mb-2 block">Unlock Key</Label>
            <Input id="unlock-key" type="password" value={unlockInput} onChange={(e) => setUnlockInput(e.target.value)} className="rounded-xl" placeholder="Enter your unlock key" />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={handleUnlockCancel} className="rounded-xl">Cancel</Button>
            <Button onClick={handleUnlockSubmit} className="rounded-xl">Unlock Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
