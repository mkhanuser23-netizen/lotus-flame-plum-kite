export type Copy = {
  switchTo: string;
  switchLabel: string;
  householdLine: (name: string) => string;
  morning: string;
  afternoon: string;
  evening: string;
  nav: {
    today: string;
    majlis: string;
    values: string;
    week: string;
    kindness: string;
    quests: string;
    household: string;
  };
  days: [string, string, string, string, string, string, string];
  roles: { parent: string; grandparent: string; teen: string; child: string };
  minutes: (n: number) => string;
  stats: (mins: number, notes: number, quests: number) => string;
  everyone: string;
  kept: string;
  open: string;
  notFound: string;
  back: string;
  justNow: string;
  home: {
    dek: string;
    begin: string;
    allGatherings: string;
    ifShort: string;
    thisWeek: string;
    seeWeek: string;
    valuesTitle: string;
    practicesKept: (done: number, total: number) => string;
    saidAloud: string;
    seeNotes: string;
    stillOpen: string;
    seeQuests: string;
    keptMoments: string;
    thesis: string;
  };
  majlis: { title: string; lead: string; begin: string };
  player: {
    back: string;
    startClock: string;
    pauseClock: string;
    phonesAway: string;
    whosHere: string;
    next: string;
    previous: string;
    remember: string;
    placeholder: string;
    save: string;
    savedTitle: string;
    savedBody: string;
    home: string;
    leaveNote: string;
    markPlan: (title: string) => string;
    stepOf: (i: number, n: number) => string;
  };
  values: { title: string; lead: string };
  week: {
    title: string;
    lead: string;
    name: string;
    add: string;
    save: string;
    cancel: string;
    titlePh: string;
    day: string;
    time: string;
    length: string;
    who: string;
    value: string;
    mark: string;
    undo: string;
    remove: string;
    today: string;
    noTitle: string;
  };
  kindness: {
    title: string;
    lead: string;
    from: string;
    to: string;
    note: string;
    send: string;
    prompts: string;
    empty: string;
    remove: string;
  };
  quests: {
    title: string;
    lead: string;
    mark: string;
    undo: string;
    notePh: string;
    reflection: string;
  };
  family: {
    title: string;
    lead: string;
    nameEn: string;
    nameAr: string;
    emirate: string;
    members: string;
    add: string;
    remove: string;
    role: string;
    personEn: string;
    personAr: string;
    reset: string;
    resetArm: string;
    resetYes: string;
    walkTitle: string;
    walk: string[];
  };
};

const en: Copy = {
  switchTo: "عربي",
  switchLabel: "Switch language to Arabic",
  householdLine: (name) => `The ${name} household`,
  morning: "Good morning",
  afternoon: "Good afternoon",
  evening: "Good evening",
  nav: {
    today: "Today",
    majlis: "Majlis",
    values: "Values",
    week: "Week",
    kindness: "Kindness",
    quests: "Quests",
    household: "Household",
  },
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  roles: { parent: "Parent", grandparent: "Grandparent", teen: "Teen", child: "Child" },
  minutes: (n) => `${n} min`,
  stats: (mins, notes, quests) =>
    `${mins} minutes together · ${notes} kindnesses · ${quests} quests`,
  everyone: "Everyone",
  kept: "Kept",
  open: "Open",
  notFound: "That gathering is not in the library.",
  back: "Back",
  justNow: "Just now",
  home: {
    dek: "A short majlis for the people who already share your name. Small enough for a school night.",
    begin: "Begin together",
    allGatherings: "All gatherings",
    ifShort: "If the day is already too long",
    thisWeek: "This week",
    seeWeek: "See the week",
    valuesTitle: "Four values, practised",
    practicesKept: (done, total) => `${done} of ${total} practices kept`,
    saidAloud: "Said out loud",
    seeNotes: "All notes",
    stillOpen: "Still open",
    seeQuests: "All quests",
    keptMoments: "What we kept",
    thesis:
      "UAE families already know respect, kindness, cooperation and responsibility. What gets crowded out is the time to practise them. Baytna is a majlis that fits after school: a ritual, a week you can see, and a place to say something kind by name.",
  },
  majlis: {
    title: "Gatherings",
    lead: "Pick a length the week can actually hold. Read it across the table, not alone on a phone.",
    begin: "Begin",
  },
  player: {
    back: "Library",
    startClock: "Start the clock",
    pauseClock: "Pause",
    phonesAway: "Phones in the bowl",
    whosHere: "Who is here",
    next: "Next",
    previous: "Back",
    remember: "What should we remember?",
    placeholder: "One line. A name, if you can.",
    save: "Keep this majlis",
    savedTitle: "Kept.",
    savedBody: "It sits with the rest of the week now.",
    home: "Back to today",
    leaveNote: "Leave a kindness",
    markPlan: (title) => `Mark “${title}” kept`,
    stepOf: (i, n) => `${i} of ${n}`,
  },
  values: {
    title: "The four values",
    lead: "Not posters. Small conduct you can tick when it actually happened this week.",
  },
  week: {
    title: "The week",
    lead: "Sunday starts the school week. Friday afternoon and Saturday are where a longer table fits. A quarter of an hour still counts.",
    name: "Gathering",
    add: "Add a gathering",
    save: "Save gathering",
    cancel: "Cancel",
    titlePh: "After-school check-in",
    day: "Day",
    time: "Time",
    length: "Length",
    who: "Who",
    value: "Value",
    mark: "Mark kept",
    undo: "Undo",
    remove: "Remove",
    today: "Today",
    noTitle: "Give the gathering a name.",
  },
  kindness: {
    title: "Kindness, by name",
    lead: "A note is said to someone, not about them. Specific is better than grand.",
    from: "From",
    to: "To",
    note: "Note",
    send: "Leave the note",
    prompts: "Or start from a line",
    empty: "Nothing on the wall yet. One sentence is enough to begin.",
    remove: "Remove",
  },
  quests: {
    title: "Quests",
    lead: "Ordinary jobs with the family still in them. Finish one. Write one line about what changed.",
    mark: "We did this",
    undo: "Undo",
    notePh: "One line about what changed.",
    reflection: "What changed",
  },
  family: {
    title: "Household",
    lead: "This house lives on this device. No account. What you change stays in the browser.",
    nameEn: "Family name in English",
    nameAr: "Family name in Arabic",
    emirate: "Emirate",
    members: "People",
    add: "Add a person",
    remove: "Remove",
    role: "Role",
    personEn: "Name in English",
    personAr: "Name in Arabic",
    reset: "Restore the Al Mansoori example",
    resetArm: "This replaces the names, notes and plans on this device.",
    resetYes: "Restore example",
    walkTitle: "A two-minute walkthrough",
    walk: [
      "From Today, begin the Maghrib basket and read one question aloud.",
      "Open the week and mark the Friday table kept, or add your own gathering.",
      "Leave a kindness from one person to another.",
      "Switch the whole house into Arabic.",
    ],
  },
};

const ar: Copy = {
  switchTo: "English",
  switchLabel: "التبديل إلى الإنجليزية",
  householdLine: (name) => `بيت ${name}`,
  morning: "صباح الخير",
  afternoon: "طاب يومكم",
  evening: "مساء الخير",
  nav: {
    today: "اليوم",
    majlis: "المجلس",
    values: "القيم",
    week: "الأسبوع",
    kindness: "اللطف",
    quests: "المهام",
    household: "البيت",
  },
  days: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
  roles: { parent: "والد", grandparent: "جد", teen: "مراهق", child: "طفل" },
  minutes: (n) => `${n} د`,
  stats: (mins, notes, quests) => `${mins} دقيقة معاً · ${notes} ألطاف · ${quests} مهام`,
  everyone: "الجميع",
  kept: "حُفظ",
  open: "مفتوح",
  notFound: "هذا المجلس غير موجود في المكتبة.",
  back: "رجوع",
  justNow: "الآن",
  home: {
    dek: "مجلس قصير لأهل البيت الذين يشتركون في الاسم أصلاً. صغير بما يكفي لليلة مدرسة.",
    begin: "ابدأوا معاً",
    allGatherings: "كل المجالس",
    ifShort: "إن كان اليوم قد طال",
    thisWeek: "هذا الأسبوع",
    seeWeek: "الأسبوع كاملاً",
    valuesTitle: "أربع قيم تُمارَس",
    practicesKept: (done, total) => `${done} من ${total} ممارسات حُفظت`,
    saidAloud: "قيل بصوت مسموع",
    seeNotes: "كل الملاحظات",
    stillOpen: "ما زال مفتوحاً",
    seeQuests: "كل المهام",
    keptMoments: "ما حفظناه",
    thesis:
      "عائلات الإمارات تعرف الاحترام واللطف والتعاون والمسؤولية. ما يضيق هو الوقت لممارستها. بيتنا مجلس يتسع بعد المدرسة: طقس، وأسبوع ترونه، ومكان لقول اللطف بالاسم.",
  },
  majlis: {
    title: "المجالس",
    lead: "اختاروا مدة يحتملها الأسبوع فعلاً. تُقرأ على السفرة، لا على هاتف منفرد.",
    begin: "ابدأوا",
  },
  player: {
    back: "المكتبة",
    startClock: "ابدأوا الساعة",
    pauseClock: "إيقاف",
    phonesAway: "الهواتف في الوعاء",
    whosHere: "من الحاضرون",
    next: "التالي",
    previous: "رجوع",
    remember: "ماذا نريد أن نتذكر؟",
    placeholder: "سطر واحد. واسم، إن استطعتم.",
    save: "احفظوا هذا المجلس",
    savedTitle: "حُفظ.",
    savedBody: "صار مع بقية الأسبوع.",
    home: "العودة إلى اليوم",
    leaveNote: "اكتبوا لطفاً",
    markPlan: (title) => `احفظوا «${title}»`,
    stepOf: (i, n) => `${i} من ${n}`,
  },
  values: {
    title: "القيم الأربع",
    lead: "ليست ملصقات. سلوك صغير تعلّمونه حين يحدث فعلاً هذا الأسبوع.",
  },
  week: {
    title: "الأسبوع",
    lead: "الأحد يبدأ أسبوع المدرسة. عصر الجمعة والسبت يتسعان لسفرة أطول. وربع الساعة يُحتسب.",
    name: "المجلس",
    add: "أضيفوا مجلساً",
    save: "احفظوا المجلس",
    cancel: "إلغاء",
    titlePh: "اطمئنان بعد المدرسة",
    day: "اليوم",
    time: "الوقت",
    length: "المدة",
    who: "من",
    value: "القيمة",
    mark: "علّموه محفوظاً",
    undo: "تراجع",
    remove: "حذف",
    today: "اليوم",
    noTitle: "سمّوا المجلس.",
  },
  kindness: {
    title: "لطف بالاسم",
    lead: "الملاحظة تُقال لشخص، لا عنه. المحدد خير من الكبير.",
    from: "من",
    to: "إلى",
    note: "الملاحظة",
    send: "اتركوا الملاحظة",
    prompts: "أو ابدأوا من سطر",
    empty: "الجدار فارغ. جملة واحدة تكفي للبداية.",
    remove: "حذف",
  },
  quests: {
    title: "المهام",
    lead: "أعمال عادية يبقى فيها الأهل معاً. أتمّوا واحدة. اكتبوا سطراً عما تغيّر.",
    mark: "فعلنا هذا",
    undo: "تراجع",
    notePh: "سطر واحد عما تغيّر.",
    reflection: "ما الذي تغيّر",
  },
  family: {
    title: "البيت",
    lead: "هذا البيت يعيش على هذا الجهاز. بلا حساب. ما تغيّرونه يبقى في المتصفح.",
    nameEn: "اسم العائلة بالإنجليزية",
    nameAr: "اسم العائلة بالعربية",
    emirate: "الإمارة",
    members: "الأهل",
    add: "أضيفوا شخصاً",
    remove: "حذف",
    role: "الدور",
    personEn: "الاسم بالإنجليزية",
    personAr: "الاسم بالعربية",
    reset: "أعيدوا مثال المنصوري",
    resetArm: "هذا يستبدل الأسماء والملاحظات والخطط على هذا الجهاز.",
    resetYes: "أعيدوا المثال",
    walkTitle: "جولة من دقيقتين",
    walk: [
      "من اليوم، ابدأوا سلة المغرب واقرأوا سؤالاً واحداً بصوت مسموع.",
      "افتحوا الأسبوع وعلّموا سفرة الجمعة محفوظة، أو أضيفوا مجلسكم.",
      "اتركوا لطفاً من شخص إلى آخر.",
      "حوّلوا البيت كله إلى العربية.",
    ],
  },
};

export const copy = { en, ar };
