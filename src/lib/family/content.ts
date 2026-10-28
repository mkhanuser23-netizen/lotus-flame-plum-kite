import type { Bi, ValueId } from "@/lib/family/types";

export type RitualStep =
  | { kind: "gather"; title: Bi; body: Bi }
  | { kind: "read"; title: Bi; body: Bi }
  | { kind: "talk"; title: Bi; prompts: Bi[] }
  | { kind: "do"; title: Bi; body: Bi };

export type Ritual = {
  id: string;
  minutes: number;
  value: ValueId;
  title: Bi;
  promise: Bi;
  fits: Bi;
  steps: RitualStep[];
};

export type ValueDef = {
  id: ValueId;
  name: Bi;
  blurb: Bi;
};

export type Practice = {
  id: string;
  value: ValueId;
  text: Bi;
};

export type Quest = {
  id: string;
  value: ValueId;
  minutes: number;
  title: Bi;
  detail: Bi;
};

export const values: ValueDef[] = [
  {
    id: "respect",
    name: { en: "Respect", ar: "الاحترام" },
    blurb: {
      en: "Respect is how a house sounds. It is letting someone finish, greeting an elder properly, and repairing a sharp sentence before the night ends.",
      ar: "الاحترام هو صوت البيت. أن نترك الكلام يكتمل، وأن نسلم على الكبير كما ينبغي، وأن نصلح الجملة الحادة قبل أن ينتهي الليل.",
    },
  },
  {
    id: "kindness",
    name: { en: "Kindness", ar: "اللطف" },
    blurb: {
      en: "Kindness in a family is rarely grand. It is specific, and it is said to the person who did it.",
      ar: "اللطف في العائلة نادراً ما يكون كبيراً. هو محدد، ويُقال للشخص الذي فعله.",
    },
  },
  {
    id: "cooperation",
    name: { en: "Cooperation", ar: "التعاون" },
    blurb: {
      en: "Cooperation is one job finished by more than one pair of hands, including the smallest.",
      ar: "التعاون عمل واحد تنهيه أكثر من يدين، بما فيها الأيدي الصغيرة.",
    },
  },
  {
    id: "responsibility",
    name: { en: "Responsibility", ar: "المسؤولية" },
    blurb: {
      en: "Responsibility is a promise with a name on it. Someone owns it. The others do not take it over unless they are asked.",
      ar: "المسؤولية وعد عليه اسم. أحدهم يملكه. والباقون لا يأخذونه إلا إذا طُلب منهم.",
    },
  },
];

export const practices: Practice[] = [
  {
    id: "respect-finish",
    value: "respect",
    text: { en: "We let someone finish their sentence.", ar: "تركنا أحدهم يكمل جملته." },
  },
  {
    id: "respect-elder",
    value: "respect",
    text: { en: "We greeted an elder by name.", ar: "سلمنا على كبير بالاسم." },
  },
  {
    id: "respect-repair",
    value: "respect",
    text: { en: "We repaired one sharp tone before sleep.", ar: "أصلحنا نبرة حادة قبل النوم." },
  },
  {
    id: "kind-name",
    value: "kindness",
    text: { en: "We named a kindness out loud.", ar: "سمينا لطفاً بصوت مسموع." },
  },
  {
    id: "kind-note",
    value: "kindness",
    text: { en: "We left a note for someone in the house.", ar: "تركنا ملاحظة لأحد أهل البيت." },
  },
  {
    id: "kind-quiet",
    value: "kindness",
    text: { en: "Someone helped quietly and did not announce it.", ar: "أحدهم ساعد بهدوء ولم يعلن ذلك." },
  },
  {
    id: "coop-job",
    value: "cooperation",
    text: { en: "Two or more of us finished one job together.", ar: "أنهى اثنان أو أكثر عملاً واحداً معاً." },
  },
  {
    id: "coop-choice",
    value: "cooperation",
    text: { en: "A child or teen chose part of a plan.", ar: "طفل أو مراهق اختار جزءاً من الخطة." },
  },
  {
    id: "coop-decide",
    value: "cooperation",
    text: {
      en: "We decided something without one person forcing it.",
      ar: "قررنا أمراً دون أن يفرضه شخص واحد.",
    },
  },
  {
    id: "resp-bags",
    value: "responsibility",
    text: { en: "Bags were ready the night before.", ar: "الحقيبة جُهزت من الليل." },
  },
  {
    id: "resp-care",
    value: "responsibility",
    text: {
      en: "Someone looked after a younger child, a guest, or a grandparent's comfort.",
      ar: "أحدهم اعتنى براحة طفل أصغر أو ضيف أو جد.",
    },
  },
  {
    id: "resp-promise",
    value: "responsibility",
    text: {
      en: "We kept one promise that had been said out loud.",
      ar: "وفينا بوعد قيل بصوت مسموع.",
    },
  },
];

export const kindnessPrompts: Bi[] = [
  { en: "You made the morning easier.", ar: "جعلت الصباح أهون." },
  { en: "I noticed you wait without being asked.", ar: "لاحظت أنك تنتظر دون أن تُطلب." },
  { en: "Thank you for the ride, and for not rushing me.", ar: "شكراً على التوصيل، وعلى أنك لم تستعجلني." },
  { en: "You listened all the way to the end.", ar: "استمعت حتى النهاية." },
  { en: "The house is calmer because of something you did.", ar: "البيت أهدأ بسبب شيء فعلته." },
];

export const emirates: { id: string; en: string; ar: string }[] = [
  { id: "abu-dhabi", en: "Abu Dhabi", ar: "أبوظبي" },
  { id: "dubai", en: "Dubai", ar: "دبي" },
  { id: "sharjah", en: "Sharjah", ar: "الشارقة" },
  { id: "ajman", en: "Ajman", ar: "عجمان" },
  { id: "uaq", en: "Umm Al Quwain", ar: "أم القيوين" },
  { id: "rak", en: "Ras Al Khaimah", ar: "رأس الخيمة" },
  { id: "fuj", en: "Fujairah", ar: "الفجيرة" },
];

export function emirateLabel(id: string, lang: "en" | "ar") {
  const found = emirates.find((item) => item.id === id);
  if (!found) return id;
  return found[lang];
}

export const quests: Quest[] = [
  {
    id: "friday-dish",
    value: "cooperation",
    minutes: 45,
    title: { en: "One dish, several hands", ar: "طبق واحد، وأيدٍ كثيرة" },
    detail: {
      en: "Cook or plate one Friday dish together. The youngest person chooses the garnish or the drink.",
      ar: "اطبخوا أو رتّبوا طبق الجمعة معاً. أصغر الحاضرين يختار التزيين أو الشراب.",
    },
  },
  {
    id: "elder-hello",
    value: "respect",
    minutes: 15,
    title: { en: "A hello that is not rushed", ar: "سلام غير مستعجل" },
    detail: {
      en: "Call or visit one elder. Each person prepares one real question before you begin.",
      ar: "اتصلوا أو زوروا كبيراً واحداً. كل شخص يجهز سؤالاً حقيقياً قبل أن تبدأوا.",
    },
  },
  {
    id: "entrance",
    value: "cooperation",
    minutes: 12,
    title: { en: "The entrance, once", ar: "المدخل، مرة واحدة" },
    detail: {
      en: "Shoes, bags, and the door. No one is in charge. You finish when it looks like people live here on purpose.",
      ar: "الأحذية والحقائب والباب. لا مسؤول واحد. تنتهون حين يبدو أن ناساً يسكنون هنا بقصد.",
    },
  },
  {
    id: "bags",
    value: "responsibility",
    minutes: 10,
    title: { en: "Tomorrow's bag, tonight", ar: "حقيبة الغد، الليلة" },
    detail: {
      en: "Each person packs what is theirs. A parent checks only if asked.",
      ar: "كل شخص يجهز ما يخصه. الوالد يتفقد فقط إذا طُلب منه.",
    },
  },
  {
    id: "name-story",
    value: "respect",
    minutes: 10,
    title: { en: "The story of our name", ar: "حكاية اسمنا" },
    detail: {
      en: "Ten minutes on the family name: where it comes from, and who still says it the old way.",
      ar: "عشر دقائق عن اسم العائلة: من أين جاء، ومن ما زال ينطقه على الطريقة القديمة.",
    },
  },
  {
    id: "saturday",
    value: "cooperation",
    minutes: 15,
    title: { en: "Saturday, with a young vote", ar: "السبت، وبصوت صغير" },
    detail: {
      en: "Plan part of Saturday. The youngest person chooses one stop: a walk, a relative, a park, or breakfast out.",
      ar: "خطّطوا جزءاً من السبت. أصغر شخص يختار محطة واحدة: مشياً أو قريباً أو حديقة أو فطوراً خارج البيت.",
    },
  },
  {
    id: "guard",
    value: "kindness",
    minutes: 5,
    title: { en: "The person at the door", ar: "من يقف عند الباب" },
    detail: {
      en: "A building guard, a driver, or a neighbour. One specific thanks, said in person, not sent as a sticker.",
      ar: "حارس البناية أو السائق أو الجار. شكر محدد، يُقال وجهاً لوجه، لا ملصقاً.",
    },
  },
  {
    id: "flag",
    value: "respect",
    minutes: 12,
    title: { en: "The flag, at home", ar: "العلم، في البيت" },
    detail: {
      en: "Hang or draw the UAE flag. Each person names one way this house shows respect outside it.",
      ar: "علّقوا علم الدولة أو ارسموه. كل شخص يسمّي طريقة يُظهر بها هذا البيت الاحترام خارجه.",
    },
  },
];

export const rituals: Ritual[] = [
  {
    id: "maghrib-basket",
    minutes: 12,
    value: "kindness",
    title: { en: "The Maghrib basket", ar: "سلة المغرب" },
    promise: {
      en: "Phones rest. Names are said out loud.",
      ar: "الهواتف ترتاح. والأسماء تُقال بصوت مسموع.",
    },
    fits: {
      en: "After maghrib, before homework spreads.",
      ar: "بعد المغرب، وقبل أن تنتشر الواجبات.",
    },
    steps: [
      {
        kind: "gather",
        title: { en: "Put the day down", ar: "أنزلوا اليوم" },
        body: {
          en: "Phones go in a bowl in the middle. Sit where you can see every face. The youngest person says each name, slowly, and the named person answers: I'm here.",
          ar: "الهواتف في وعاء في الوسط. اجلسوا حيث ترون كل الوجوه. أصغر الحاضرين يقول كل اسم على مهل، وصاحبه يجيب: أنا هنا.",
        },
      },
      {
        kind: "read",
        title: { en: "Kindness, said specifically", ar: "لطف يُقال بالتحديد" },
        body: {
          en: "Not a compliment about character. A thing someone did that made the house easier. If you cannot remember one, say so honestly. That is information.",
          ar: "ليس مديحاً في الطباع. شيء فعله أحدكم فصار البيت أهون. إن لم تتذكروا، قولوا ذلك بصدق. هذه معلومة.",
        },
      },
      {
        kind: "talk",
        title: { en: "Three questions", ar: "ثلاثة أسئلة" },
        prompts: [
          { en: "Who carried something quietly this week?", ar: "من حمل شيئاً بهدوء هذا الأسبوع؟" },
          { en: "What did you notice and not say?", ar: "ماذا لاحظتم ولم تقولوه؟" },
          { en: "Who needs a softer voice from us tonight?", ar: "من يحتاج منا صوتاً ألين الليلة؟" },
        ],
      },
      {
        kind: "do",
        title: { en: "Pass the bowl", ar: "مرّروا الوعاء" },
        body: {
          en: "Each person names one kindness and who it belongs to. The named person answers only: I heard you. No correcting. No turning it into a joke.",
          ar: "كل شخص يسمّي لطفاً واحداً وصاحبه. المُسمّى يجيب فقط: سمعتك. بلا تصحيح. وبلا تحويلها إلى مزاح.",
        },
      },
    ],
  },
  {
    id: "name-the-good",
    minutes: 8,
    value: "kindness",
    title: { en: "Say it by name", ar: "قُله باسمه" },
    promise: {
      en: "Eight minutes. One true sentence each.",
      ar: "ثماني دقائق. جملة صادقة من كل شخص.",
    },
    fits: {
      en: "An exhausted weeknight, when the long version will not happen.",
      ar: "ليلة أسبوع متعبة، حين لا يتسع الوقت للنسخة الطويلة.",
    },
    steps: [
      {
        kind: "gather",
        title: { en: "Stay where you are", ar: "ابقوا حيث أنتم" },
        body: {
          en: "No relocating the whole house. Phones face down, one arm's length away. If someone is still in the car, this can wait until the door closes.",
          ar: "لا تنقلوا البيت كله. الهواتف مقلوبة، على مدى ذراع. إن كان أحدكم ما زال في السيارة، فليانتظر هذا حتى يُغلق الباب.",
        },
      },
      {
        kind: "read",
        title: { en: "Short still counts", ar: "القصير يُحتسب" },
        body: {
          en: "If the long majlis cannot happen, the short one still counts. One sentence. The person's name. Then stop.",
          ar: "إن لم يتيسر المجلس الطويل، فالقصير يُحتسب. جملة واحدة. اسم الشخص. ثم توقفوا.",
        },
      },
      {
        kind: "talk",
        title: { en: "Only these", ar: "فقط هذان" },
        prompts: [
          { en: "Who made today lighter?", ar: "من خفّف اليوم؟" },
          { en: "What were you glad was waiting at home?", ar: "ماذا سركم أنكم وجدتموه في البيت؟" },
        ],
      },
      {
        kind: "do",
        title: { en: "One sentence", ar: "جملة واحدة" },
        body: {
          en: "Each person says one sentence to one person who is present. No speeches after. You are done when the last sentence lands.",
          ar: "كل شخص يقول جملة واحدة لشخص حاضر. بلا خطب بعدها. تنتهون حين تستقر الجملة الأخيرة.",
        },
      },
    ],
  },
  {
    id: "respect-voices",
    minutes: 12,
    value: "respect",
    title: { en: "How we speak", ar: "كيف نتكلم" },
    promise: {
      en: "Finish the sentence. Then repair the tone.",
      ar: "أكملوا الجملة. ثم أصلحوا النبرة.",
    },
    fits: {
      en: "When the house has been sharp.",
      ar: "حين يكون البيت حاد النبرة.",
    },
    steps: [
      {
        kind: "gather",
        title: { en: "A minute of quiet", ar: "دقيقة صمت" },
        body: {
          en: "Sit where you can see each other. For one minute, no one speaks. Notice who usually fills a silence.",
          ar: "اجلسوا حيث ترون بعضكم. لدقيقة واحدة لا يتكلم أحد. لاحظوا من يملأ الصمت عادة.",
        },
      },
      {
        kind: "read",
        title: { en: "Room, not volume", ar: "مساحة، لا ارتفاع صوت" },
        body: {
          en: "Respect is not how loud a house is. It is leaving room, including for the person who talks the least. The first time an elder is mentioned, their name is said in full.",
          ar: "الاحترام ليس علو الصوت في البيت. هو ترك مساحة، بما فيها لمن يتكلم أقل. وأول مرة يُذكر فيها كبير، يُقال اسمه كاملاً.",
        },
      },
      {
        kind: "talk",
        title: { en: "Three questions", ar: "ثلاثة أسئلة" },
        prompts: [
          { en: "Where did we interrupt this week?", ar: "أين قاطعنا الكلام هذا الأسبوع؟" },
          { en: "Which tone do we want to retire?", ar: "أي نبرة نريد أن نُنهيها؟" },
          { en: "What does a proper greeting sound like here?", ar: "كيف يكون السلام اللائق في هذا البيت؟" },
        ],
      },
      {
        kind: "do",
        title: { en: "A repair sentence", ar: "جملة إصلاح" },
        body: {
          en: "Each person offers one sentence they could have used: “I cut you off. Finish. I'm listening.” Say it to the person it concerns, if they are in the room.",
          ar: "كل شخص يقدم جملة كان يمكن أن يقولها: «قاطعتك. أكمل. أنا أسمع». قولوها لصاحبها إن كان في المجلس.",
        },
      },
    ],
  },
  {
    id: "four-hands",
    minutes: 15,
    value: "cooperation",
    title: { en: "Four hands", ar: "أربع أيدٍ" },
    promise: {
      en: "One job. No foreman.",
      ar: "عمل واحد. بلا رئيس.",
    },
    fits: {
      en: "When one person is about to tidy up alone.",
      ar: "حين يوشك شخص واحد أن يرتب وحده.",
    },
    steps: [
      {
        kind: "gather",
        title: { en: "Point at one job", ar: "أشيروا إلى عمل واحد" },
        body: {
          en: "Choose one thing everyone can see: the table, the shoes, the bags by the door. Do not discuss a second job.",
          ar: "اختاروا شيئاً يراه الجميع: السفرة، الأحذية، الحقائب عند الباب. لا تناقشوا عملاً ثانياً.",
        },
      },
      {
        kind: "read",
        title: { en: "Hands, not supervision", ar: "أيدٍ، لا إشراف" },
        body: {
          en: "Cooperation fails when it becomes management. Advice counts as extra noise. The smallest hands get a real part, not a pretend one.",
          ar: "يفشل التعاون حين يصير إدارة. النصيحة ضوضاء زائدة. والأيدي الصغيرة تأخذ جزءاً حقيقياً، لا تمثيلاً.",
        },
      },
      {
        kind: "talk",
        title: { en: "Before you start", ar: "قبل أن تبدأوا" },
        prompts: [
          { en: "What makes a shared job feel like an order?", ar: "ما الذي يجعل العمل المشترك يبدو أمراً؟" },
          { en: "Who usually finishes what others start?", ar: "من يُنهي عادة ما يبدأه غيره؟" },
          { en: "What can the youngest hands actually do here?", ar: "ماذا تستطيع الأيدي الأصغر أن تفعل هنا فعلاً؟" },
        ],
      },
      {
        kind: "do",
        title: { en: "Do it now", ar: "افعلوه الآن" },
        body: {
          en: "Do the job together until it is finished. Then sit down and say one thing that was easier because no one was alone.",
          ar: "أنفِذوا العمل معاً حتى ينتهي. ثم اجلسوا وقولوا شيئاً واحداً كان أهون لأن أحداً لم يكن وحده.",
        },
      },
    ],
  },
  {
    id: "what-i-keep",
    minutes: 10,
    value: "responsibility",
    title: { en: "What I look after", ar: "ما أعتني به" },
    promise: {
      en: "A promise with a name on it.",
      ar: "وعد عليه اسم.",
    },
    fits: {
      en: "Sunday night, or any night before a busy morning.",
      ar: "ليلة الأحد، أو أي ليلة قبل صباح مزدحم.",
    },
    steps: [
      {
        kind: "gather",
        title: { en: "Bring one object", ar: "أحضروا شيئاً واحداً" },
        body: {
          en: "Each person brings one thing they are responsible for this week: a bag, a key, a water bottle, a uniform, a laptop.",
          ar: "كل شخص يحضر شيئاً هو مسؤول عنه هذا الأسبوع: حقيبة، مفتاح، قارورة ماء، زي مدرسي، حاسوباً.",
        },
      },
      {
        kind: "read",
        title: { en: "Ownership, not a lecture", ar: "ملكية، لا محاضرة" },
        body: {
          en: "Nobody assigns the duty. The person names it. The others do not take it over unless they are asked.",
          ar: "لا أحد يوزّع الواجب. صاحبه يسميه. والآخرون لا يأخذونه إلا إذا طُلب منهم.",
        },
      },
      {
        kind: "talk",
        title: { en: "Three questions", ar: "ثلاثة أسئلة" },
        prompts: [
          { en: "What do you forget because someone else remembers?", ar: "ماذا تنسون لأن غيركم يتذكر؟" },
          { en: "What is actually yours, at school or at work?", ar: "ما الذي هو لكم فعلاً، في المدرسة أو العمل؟" },
          { en: "Who are you caring for besides yourself?", ar: "من تعتنون به غير أنفسكم؟" },
        ],
      },
      {
        kind: "do",
        title: { en: "Say the duty", ar: "قولوا الواجب" },
        body: {
          en: "Each person says one duty out loud and when it will be done. Write nothing for them. They can write it themselves if they want a reminder.",
          ar: "كل شخص يقول واجباً واحداً بصوت مسموع ومتى سيُنجز. لا تكتبوا عنهم. يمكنهم أن يكتبوا لأنفسهم إن أرادوا تذكيراً.",
        },
      },
    ],
  },
  {
    id: "friday-table",
    minutes: 20,
    value: "cooperation",
    title: { en: "The Friday table", ar: "سفرة الجمعة" },
    promise: {
      en: "Everyone gets a say, including the quietest.",
      ar: "لكل واحد قول، بما فيه الأهدأ.",
    },
    fits: {
      en: "Friday, after the half-day.",
      ar: "الجمعة، بعد دوام نصف اليوم.",
    },
    steps: [
      {
        kind: "gather",
        title: { en: "The table you will eat at", ar: "السفرة التي ستأكلون عليها" },
        body: {
          en: "Clear the real table. Phones go in another room, not face-down beside a plate.",
          ar: "أفرغوا السفرة الحقيقية. الهواتف في غرفة أخرى، لا مقلوبة بجانب الصحن.",
        },
      },
      {
        kind: "read",
        title: { en: "A plan, not a performance", ar: "خطة، لا استعراض" },
        body: {
          en: "One dish is enough. The point is that more than one person decided it, and a child was not only told to come and eat.",
          ar: "طبق واحد يكفي. المقصود أن يقرره أكثر من شخص، وألا يكون الطفل مدعواً للأكل فقط.",
        },
      },
      {
        kind: "talk",
        title: { en: "Decide together", ar: "قرروا معاً" },
        prompts: [
          { en: "What can we make with what is already at home?", ar: "ماذا نقدر أن نعدّ مما هو في البيت أصلاً؟" },
          { en: "Who has not chosen a meal in a long time?", ar: "من لم يختر وجبة منذ مدة؟" },
          { en: "What help is real, and what is hovering?", ar: "أي مساعدة حقيقية، وأيها وقوف فوق الرأس؟" },
        ],
      },
      {
        kind: "do",
        title: { en: "Name the plan", ar: "سمّوا الخطة" },
        body: {
          en: "Choose the dish, the time, and who leads. The youngest person chooses one part: salad, drink, fruit, or where you sit. If you can start now, start. If not, the plan itself is the gathering.",
          ar: "اختاروا الطبق والوقت ومن يقود. أصغر شخص يختار جزءاً: سلطة أو شراباً أو فاكهة أو مكان الجلوس. إن استطعتم البدء الآن فابدأوا. وإلا فالخطة نفسها هي المجلس.",
        },
      },
    ],
  },
  {
    id: "long-hello",
    minutes: 12,
    value: "respect",
    title: { en: "The long hello", ar: "السلام الطويل" },
    promise: {
      en: "A real question, then the quiet to hear the answer.",
      ar: "سؤال حقيقي، ثم صمت يكفي لسماع الجواب.",
    },
    fits: {
      en: "When an elder has become a sticker on a chat.",
      ar: "حين صار الكبير ملصقاً في محادثة.",
    },
    steps: [
      {
        kind: "gather",
        title: { en: "Choose the person", ar: "اختاروا الشخص" },
        body: {
          en: "Decide who you are calling or visiting. If they are already in the house, turn your chairs toward them and put the phones away.",
          ar: "قرروا من ستتصلون به أو تزورونه. إن كان في البيت، فوجهوا الكراسي إليه وأبعدوا الهواتف.",
        },
      },
      {
        kind: "read",
        title: { en: "How are you is only a door", ar: "«كيف حالك» باب فقط" },
        body: {
          en: "Bring one question you do not already know the answer to. A greeting without a question is a wave from a moving car.",
          ar: "أحضروا سؤالاً لا تعرفون جوابه مسبقاً. السلام بلا سؤال تلويح من سيارة تمشي.",
        },
      },
      {
        kind: "talk",
        title: { en: "Before the call", ar: "قبل الاتصال" },
        prompts: [
          { en: "What do we not know about this person's week?", ar: "ماذا لا نعرف عن أسبوع هذا الشخص؟" },
          { en: "What story have we never asked for?", ar: "أي حكاية لم نطلبها قط؟" },
          { en: "How do we show that we actually have time?", ar: "كيف نُظهر أن لدينا وقتاً فعلاً؟" },
        ],
      },
      {
        kind: "do",
        title: { en: "Ask, then wait", ar: "اسألوا، ثم انتظروا" },
        body: {
          en: "Make the call, or have the conversation now. Each person asks their one question and does not fill the pause. Afterwards, say one thing you learned that you did not know this morning.",
          ar: "أجروا الاتصال، أو الحديث الآن. كل شخص يسأل سؤاله الواحد ولا يملأ الصمت. بعد ذلك قولوا شيئاً تعلمتموه ولم تكونوا تعرفونه هذا الصباح.",
        },
      },
    ],
  },
  {
    id: "flag-at-home",
    minutes: 12,
    value: "respect",
    title: { en: "The flag at home", ar: "العلم في البيت" },
    promise: {
      en: "A standard for the house, not a decoration.",
      ar: "ميزان للبيت، لا زينة.",
    },
    fits: {
      en: "Flag Day week, or any week you need to remember where you stand.",
      ar: "أسبوع يوم العلم، أو أي أسبوع تحتاجون فيه أن تتذكروا أين تقفون.",
    },
    steps: [
      {
        kind: "gather",
        title: { en: "Bring the flag close", ar: "قرّبوا العلم" },
        body: {
          en: "If you have a flag, put it on the table. If not, a drawing by the youngest person is enough. This is a conversation, not a parade.",
          ar: "إن كان عندكم علم فضعوه على السفرة. وإلا فرسمة من أصغر شخص تكفي. هذا حديث، لا استعراض.",
        },
      },
      {
        kind: "read",
        title: { en: "Conduct, not a slogan", ar: "سلوك، لا شعار" },
        body: {
          en: "In a family, belonging shows up as ordinary conduct: how you speak to a guard, how you wait your turn, how you treat a classmate who is new.",
          ar: "في العائلة، الانتماء يظهر في السلوك العادي: كيف تكلمون الحارس، كيف تنتظرون دوركم، كيف تعاملون زميلاً جديداً.",
        },
      },
      {
        kind: "talk",
        title: { en: "Outside the door", ar: "خارج الباب" },
        prompts: [
          { en: "What does respect look like on our street?", ar: "كيف يبدو الاحترام في شارعنا؟" },
          { en: "Who do we pass in this city without seeing?", ar: "من نمر به في هذه المدينة ولا نراه؟" },
          { en: "What would a guest remember about our house?", ar: "ماذا سيتذكر ضيف عن بيتنا؟" },
        ],
      },
      {
        kind: "do",
        title: { en: "One conduct each", ar: "سلوك واحد لكل شخص" },
        body: {
          en: "Each person names one way they will show respect outside the house this week. Say it as a promise, not a slogan. No one applauds.",
          ar: "كل شخص يسمّي طريقة سيُظهر بها الاحترام خارج البيت هذا الأسبوع. قولوها وعداً، لا شعاراً. بلا تصفيق.",
        },
      },
    ],
  },
];

export function ritualById(id: string) {
  return rituals.find((ritual) => ritual.id === id);
}

export function valueById(id: ValueId) {
  const found = values.find((value) => value.id === id);
  if (!found) throw new Error(`Unknown value ${id}`);
  return found;
}
