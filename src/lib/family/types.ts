export type Lang = "en" | "ar";
export type Role = "parent" | "grandparent" | "teen" | "child";
export type ValueId = "respect" | "kindness" | "cooperation" | "responsibility";

export type Bi = { en: string; ar: string };

export type Member = {
  id: string;
  name: string;
  nameAr: string;
  role: Role;
};

export type Plan = {
  id: string;
  titleEn: string;
  titleAr: string;
  day: number;
  time: string;
  minutes: number;
  value: ValueId;
  memberIds: string[];
  done: boolean;
};

export type Note = {
  id: string;
  fromId: string;
  toId: string;
  textEn: string;
  textAr: string;
  whenEn: string;
  whenAr: string;
};

export type Memory = {
  id: string;
  ritualId: string;
  minutes: number;
  noteEn: string;
  noteAr: string;
  whenEn: string;
  whenAr: string;
  memberIds: string[];
};

export type QuestProgress = {
  done: boolean;
  noteEn: string;
  noteAr: string;
};

export function tx(lang: Lang, copy: Bi) {
  return copy[lang];
}

export function memberName(member: { name: string; nameAr: string }, lang: Lang) {
  const primary = lang === "ar" ? member.nameAr : member.name;
  const fallback = lang === "ar" ? member.name : member.nameAr;
  return primary.trim() || fallback.trim() || "—";
}
