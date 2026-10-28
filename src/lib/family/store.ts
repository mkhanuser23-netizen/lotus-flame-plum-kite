import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  Lang,
  Member,
  Memory,
  Note,
  Plan,
  QuestProgress,
  Role,
  ValueId,
} from "@/lib/family/types";

export type FamilyData = {
  lang: Lang;
  householdEn: string;
  householdAr: string;
  emirate: string;
  members: Member[];
  plans: Plan[];
  notes: Note[];
  memories: Memory[];
  quests: Record<string, QuestProgress>;
  practices: Record<string, boolean>;
};

type Actions = {
  setLang: (lang: Lang) => void;
  setHousehold: (patch: Partial<Pick<FamilyData, "householdEn" | "householdAr" | "emirate">>) => void;
  updateMember: (id: string, patch: Partial<Member>) => void;
  addMember: () => void;
  removeMember: (id: string) => void;
  togglePlan: (id: string) => void;
  addPlan: (plan: Omit<Plan, "id" | "done">) => void;
  removePlan: (id: string) => void;
  addNote: (note: { fromId: string; toId: string; text: string; lang: Lang }) => void;
  removeNote: (id: string) => void;
  addMemory: (memory: Omit<Memory, "id">) => void;
  removeMemory: (id: string) => void;
  togglePractice: (id: string) => void;
  setQuest: (id: string, patch: Partial<QuestProgress>) => void;
  resetDemo: () => void;
};

const memoryStorage = {
  getItem: (name: string) => (typeof window === "undefined" ? null : localStorage.getItem(name)),
  setItem: (name: string, value: string) => {
    if (typeof window !== "undefined") localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    if (typeof window !== "undefined") localStorage.removeItem(name);
  },
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

const everyone = ["fatima", "khalid", "maryam", "zayed", "saeeda"];

export function seed(): FamilyData {
  return {
    lang: "en",
    householdEn: "Al Mansoori",
    householdAr: "المنصوري",
    emirate: "abu-dhabi",
    members: [
      { id: "fatima", name: "Fatima", nameAr: "فاطمة", role: "parent" },
      { id: "khalid", name: "Khalid", nameAr: "خالد", role: "parent" },
      { id: "maryam", name: "Maryam", nameAr: "مريم", role: "teen" },
      { id: "zayed", name: "Zayed", nameAr: "زايد", role: "child" },
      { id: "saeeda", name: "Saeeda", nameAr: "سعيدة", role: "grandparent" },
    ],
    plans: [
      {
        id: "sun-maghrib",
        titleEn: "Sunset pause",
        titleAr: "وقفة المغرب",
        day: 0,
        time: "19:30",
        minutes: 12,
        value: "kindness",
        memberIds: everyone,
        done: true,
      },
      {
        id: "tue-gate",
        titleEn: "After the school gate",
        titleAr: "بعد بوابة المدرسة",
        day: 2,
        time: "16:15",
        minutes: 10,
        value: "respect",
        memberIds: ["fatima", "maryam", "zayed"],
        done: false,
      },
      {
        id: "fri-table",
        titleEn: "The Friday table",
        titleAr: "سفرة الجمعة",
        day: 5,
        time: "13:30",
        minutes: 45,
        value: "cooperation",
        memberIds: everyone,
        done: false,
      },
      {
        id: "sat-out",
        titleEn: "Saturday, with a young vote",
        titleAr: "سبت بصوت صغير",
        day: 6,
        time: "09:30",
        minutes: 90,
        value: "cooperation",
        memberIds: everyone,
        done: false,
      },
    ],
    notes: [
      {
        id: "n1",
        fromId: "maryam",
        toId: "fatima",
        textEn: "You waited at the gate and didn't look at your phone. I saw.",
        textAr: "انتظرتِ عند البوابة ولم تنظري إلى هاتفك. أنا رأيت.",
        whenEn: "Tuesday",
        whenAr: "الثلاثاء",
      },
      {
        id: "n2",
        fromId: "zayed",
        toId: "khalid",
        textEn: "You let me crack the eggs.",
        textAr: "سمحت لي أن أكسر البيض.",
        whenEn: "Sunday",
        whenAr: "الأحد",
      },
      {
        id: "n3",
        fromId: "khalid",
        toId: "saeeda",
        textEn: "You still ask about my work as if you are hearing it for the first time.",
        textAr: "ما زلتِ تسألين عن عملي كأنك تسمعينه أول مرة.",
        whenEn: "Monday",
        whenAr: "الإثنين",
      },
    ],
    memories: [
      {
        id: "mem1",
        ritualId: "maghrib-basket",
        minutes: 12,
        noteEn: "Zayed said Maryam helped him with the reading.",
        noteAr: "قال زايد إن مريم ساعدته في القراءة.",
        whenEn: "Sunday evening",
        whenAr: "مساء الأحد",
        memberIds: everyone,
      },
    ],
    quests: {
      "elder-hello": {
        done: true,
        noteEn: "Saeeda asked about Maryam's project before anything else.",
        noteAr: "سألت سعيدة عن مشروع مريم قبل أي شيء آخر.",
      },
    },
    practices: {
      "respect-finish": true,
      "kind-name": true,
    },
  };
}

export const useFamily = create<FamilyData & Actions>()(
  persist(
    (set) => ({
      ...seed(),
      setLang: (lang) => set({ lang }),
      setHousehold: (patch) => set(patch),
      updateMember: (id, patch) =>
        set((state) => ({
          members: state.members.map((member) => (member.id === id ? { ...member, ...patch } : member)),
        })),
      addMember: () =>
        set((state) => ({
          members: [
            ...state.members,
            { id: uid(), name: "Name", nameAr: "الاسم", role: "child" satisfies Role },
          ],
        })),
      removeMember: (id) =>
        set((state) => {
          if (state.members.length <= 2) return state;
          return {
            members: state.members.filter((member) => member.id !== id),
            plans: state.plans.map((plan) => ({
              ...plan,
              memberIds: plan.memberIds.filter((memberId) => memberId !== id),
            })),
            notes: state.notes.filter((note) => note.fromId !== id && note.toId !== id),
          };
        }),
      togglePlan: (id) =>
        set((state) => ({
          plans: state.plans.map((plan) => (plan.id === id ? { ...plan, done: !plan.done } : plan)),
        })),
      addPlan: (plan) => set((state) => ({ plans: [...state.plans, { ...plan, id: uid(), done: false }] })),
      removePlan: (id) => set((state) => ({ plans: state.plans.filter((plan) => plan.id !== id) })),
      addNote: ({ fromId, toId, text, lang }) =>
        set((state) => ({
          notes: [
            {
              id: uid(),
              fromId,
              toId,
              textEn: text,
              textAr: text,
              whenEn: lang === "en" ? "Just now" : "Just now",
              whenAr: "الآن",
            },
            ...state.notes,
          ],
        })),
      removeNote: (id) => set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
      addMemory: (memory) => set((state) => ({ memories: [{ ...memory, id: uid() }, ...state.memories] })),
      removeMemory: (id) => set((state) => ({ memories: state.memories.filter((memory) => memory.id !== id) })),
      togglePractice: (id) =>
        set((state) => ({ practices: { ...state.practices, [id]: !state.practices[id] } })),
      setQuest: (id, patch) =>
        set((state) => {
          const current = state.quests[id] ?? { done: false, noteEn: "", noteAr: "" };
          return { quests: { ...state.quests, [id]: { ...current, ...patch } } };
        }),
      resetDemo: () => set((state) => ({ ...seed(), lang: state.lang })),
    }),
    {
      name: "baytna-v1",
      version: 1,
      skipHydration: true,
      storage: createJSONStorage(() => memoryStorage),
      partialize: (state) => ({
        lang: state.lang,
        householdEn: state.householdEn,
        householdAr: state.householdAr,
        emirate: state.emirate,
        members: state.members,
        plans: state.plans,
        notes: state.notes,
        memories: state.memories,
        quests: state.quests,
        practices: state.practices,
      }),
    },
  ),
);

export function sortedPlans(plans: Plan[]) {
  return [...plans].sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
}

export function planTitle(plan: Plan, lang: Lang) {
  return lang === "ar" ? plan.titleAr || plan.titleEn : plan.titleEn || plan.titleAr;
}

export function noteText(note: Note, lang: Lang) {
  return lang === "ar" ? note.textAr || note.textEn : note.textEn || note.textAr;
}

export function noteWhen(note: Note, lang: Lang) {
  return lang === "ar" ? note.whenAr || note.whenEn : note.whenEn || note.whenAr;
}

export function memoryNote(memory: Memory, lang: Lang) {
  return lang === "ar" ? memory.noteAr || memory.noteEn : memory.noteEn || memory.noteAr;
}

export function memoryWhen(memory: Memory, lang: Lang) {
  return lang === "ar" ? memory.whenAr || memory.whenEn : memory.whenEn || memory.whenAr;
}

export type { ValueId };
