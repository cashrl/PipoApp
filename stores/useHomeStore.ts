import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface HomeStore {
  streak: number;
  lastPlayDate: string | null;
  totalStars: number;
  currentUnit: number;
  currentLesson: number;
  isLoaded: boolean;
  load: () => Promise<void>;
  completeLesson: (stars: number) => Promise<void>;
  checkStreak: () => Promise<void>;
}

const STORAGE_KEY = "@pipo_home_data";

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function isYesterday(dateStr: string): boolean {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  const diff = today.getTime() - date.getTime();
  return diff === 86400000;
}

function isToday(dateStr: string): boolean {
  return dateStr === getToday();
}

export const useHomeStore = create<HomeStore>((set, get) => ({
  streak: 0,
  lastPlayDate: null,
  totalStars: 0,
  currentUnit: 1,
  currentLesson: 1,
  isLoaded: false,

  load: async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        set({
          streak: parsed.streak || 0,
          lastPlayDate: parsed.lastPlayDate || null,
          totalStars: parsed.totalStars || 0,
          currentUnit: parsed.currentUnit || 1,
          currentLesson: parsed.currentLesson || 1,
          isLoaded: true,
        });
        await get().checkStreak();
      } else {
        set({ isLoaded: true });
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      set({ isLoaded: true });
    }
  },

  checkStreak: async () => {
    const { lastPlayDate, streak } = get();
    const today = getToday();

    if (!lastPlayDate) {
      return;
    }

    if (isToday(lastPlayDate)) {
      return;
    }

    if (isYesterday(lastPlayDate)) {
      return;
    }

    set({ streak: 0, lastPlayDate: today });
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...get(), streak: 0, lastPlayDate: today })
    );
  },

  completeLesson: async (stars: number) => {
    const { streak, lastPlayDate, totalStars, currentUnit, currentLesson } = get();
    const today = getToday();

    let newStreak = streak;
    if (!lastPlayDate || !isToday(lastPlayDate)) {
      if (lastPlayDate && isYesterday(lastPlayDate)) {
        newStreak = streak + 1;
      } else {
        newStreak = 1;
      }
    }

    const newData = {
      streak: newStreak,
      lastPlayDate: today,
      totalStars: totalStars + stars,
      currentUnit,
      currentLesson: currentLesson + 1,
    };

    set(newData);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  },
}));
