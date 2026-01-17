"use client";

export const UNLOCK_STORAGE_KEY = "learning-unlocked-courses";
export const PROGRESS_STORAGE_KEY = "learning-course-progress";
export const COURSE_PROGRESS_EVENT = "course-progress-updated";

// 24 hours in milliseconds
const UNLOCK_EXPIRY_MS = 24 * 60 * 60 * 1000;

export type ProgressStore = Record<string, string[]>;

type UnlockedCoursesData = {
  courseIds: string[];
  expiresAt: number; // timestamp in milliseconds
};

export const readUnlockedCourses = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(UNLOCK_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    // Handle legacy format (array of strings)
    if (Array.isArray(parsed)) {
      // Migrate to new format inline
      const now = Date.now();
      const courseIds = parsed.filter((id): id is string => typeof id === "string");
      const data: UnlockedCoursesData = {
        courseIds,
        expiresAt: now + UNLOCK_EXPIRY_MS,
      };
      // Save migrated data
      window.localStorage.setItem(UNLOCK_STORAGE_KEY, JSON.stringify(data));
      return courseIds;
    }

    // Handle new format with expiration
    if (parsed && typeof parsed === "object" && Array.isArray(parsed.courseIds)) {
      const data = parsed as UnlockedCoursesData;
      const now = Date.now();

      // Check if expired
      if (data.expiresAt && now > data.expiresAt) {
        // Clear expired data
        window.localStorage.removeItem(UNLOCK_STORAGE_KEY);
        return [];
      }

      return data.courseIds.filter((id): id is string => typeof id === "string");
    }

    return [];
  } catch (_e) {
    return [];
  }
};

export const writeUnlockedCourses = (ids: string[]) => {
  if (typeof window === "undefined") return;
  try {
    const now = Date.now();
    const data: UnlockedCoursesData = {
      courseIds: ids,
      expiresAt: now + UNLOCK_EXPIRY_MS, // Expires in 24 hours
    };
    window.localStorage.setItem(UNLOCK_STORAGE_KEY, JSON.stringify(data));
  } catch (_e) {
    // ignore
  }
};

export const readProgressStore = (): ProgressStore => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return Object.entries(parsed).reduce<ProgressStore>((acc, [courseId, value]) => {
        if (Array.isArray(value)) {
          acc[courseId] = value.filter((lessonId): lessonId is string => typeof lessonId === "string");
        }
        return acc;
      }, {});
    }
    return {};
  } catch (_e) {
    return {};
  }
};

export const writeProgressStore = (store: ProgressStore) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(store));
  } catch (_e) {
    // ignore
  }
};

export const dispatchCourseProgressEvent = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(COURSE_PROGRESS_EVENT));
};


