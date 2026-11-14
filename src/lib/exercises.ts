export type StageId =
  | "tayyorlov"
  | "tebranish"
  | "bogin"
  | "soz"
  | "gap";

export type Drill = {
  id: string;
  title: string;
  hint: string;
  items: string[];
  reps: number;
};

export type Stage = {
  id: StageId;
  number: number;
  title: string;
  goal: string;
  why: string;
  steps: string[];
  drills: Drill[];
  tip: string;
};

export const STAGES: Stage[] = [
  {
    id: "tayyorlov",
    number: 1,
    title: "Tilni tayyorlash",
    goal: "Til uchini R chiqadigan joyga o‘rgating.",
    why: "O‘zbek R harfi til uchi yuqori tishlar orqasidagi qattiq tangaiga tekkanda chiqadi. Avval joyini topish kerak.",
    steps: [
      "Ko‘zguga qarang. Og‘zingizni biroz oching.",
      "Til uchini yuqori old tishlarning orqa tomoniga — qattiq tangaiga — tekkizing.",
      "Shu joyda «da-da-da» deb tez-tez ayting (10 marta).",
      "Keyin «ta-ta-ta» deb ayting. Til uchi har safar joyiga qaytsin.",
      "Tilni pastga tushirmang: faqat uchi tebranadi, ildiz tinch turadi.",
    ],
    drills: [
      {
        id: "t1",
        title: "Joy topish",
        hint: "Har bir tovushda til uchi bir xil nuqtaga tegadi.",
        items: ["da-da-da", "ta-ta-ta", "na-na-na", "la-la-la"],
        reps: 8,
      },
      {
        id: "t2",
        title: "Sekin → tez",
        hint: "Avval sekin, keyin tezlashtiring. Aniqlik muhimroq.",
        items: ["da", "ta", "na", "da-ta-na"],
        reps: 10,
      },
    ],
    tip: "Agar tilingiz charchasa — 30 soniya tanaffus qiling. Bu normal.",
  },
  {
    id: "tebranish",
    number: 2,
    title: "Tebranishni topish",
    goal: "Havo oqimi til uchini tebratib, R tovushini chiqarsin.",
    why: "R — tebranadigan tovush. Til uchi joyida turib, havo uni silkitadi. Kuch bilan «siqib» chiqarmang.",
    steps: [
      "Til uchini 1-bosqichdagi joyga qo‘ying (yuqori tishlar orqasi).",
      "Tilni kuch bilan bosib turmang — yengil teginish kifoya.",
      "Og‘izdan kuchli, tekis havo chiqaring (go‘yo shamolni puflayotgandek).",
      "«d» yoki «t» dan boshlab havo bilan «drrr» / «trrr» deb urinib ko‘ring.",
      "Birinchi marta faqat qisqa «r» (bir tebranish) chiqsa ham — bu yutuq!",
    ],
    drills: [
      {
        id: "v1",
        title: "Havo + til",
        hint: "Tilni joyida ushlab, faqat havoni kuchaytiring.",
        items: ["fff → til", "sss → til", "pufla", "drrr", "trrr"],
        reps: 6,
      },
      {
        id: "v2",
        title: "Ko‘prik tovushlar",
        hint: "«d» yoki «t» dan R ga o‘ting. Bu eng ishonchli yo‘l.",
        items: ["dra", "tra", "dra-dra", "tra-tra", "ad-ra", "at-ra"],
        reps: 8,
      },
    ],
    tip: "Ko‘pchilikda birinchi haftada faqat qisqa R chiqadi. Uzun «rrr» keyinroq keladi.",
  },
  {
    id: "bogin",
    number: 3,
    title: "Bo‘g‘inlar",
    goal: "R ni unlilar bilan barqaror bog‘lang.",
    why: "Yolg‘iz «rrr» dan so‘ng unli qo‘shiladi. Avval ochiq unlilar (a, o), keyin qiyinroqlari.",
    steps: [
      "Har bir bo‘g‘inni sekin, aniq ayting.",
      "R chiqqandan keyin unlini cho‘zmang — qisqa va toza.",
      "Kuniga 2–3 daqiqa bo‘g‘in mashqi yetarli.",
      "Qiyin bo‘lsa, oldiga «d» qo‘ying: «dra» → «ra».",
    ],
    drills: [
      {
        id: "b1",
        title: "R + unli",
        hint: "Birinchi bo‘g‘in: ra. Eng osonidan boshlang.",
        items: ["ra", "ro", "ru", "ri", "re", "ro‘"],
        reps: 10,
      },
      {
        id: "b2",
        title: "Unli + R",
        hint: "Oxiridagi R ni «yutib» yubormang.",
        items: ["ar", "or", "ur", "ir", "er", "o‘r"],
        reps: 10,
      },
      {
        id: "b3",
        title: "O‘rtada R",
        hint: "Ikki unli orasidagi R ni yumshoq, lekin aniq saqlang.",
        items: ["ara", "oro", "uru", "iri", "ere", "ara-ara"],
        reps: 8,
      },
    ],
    tip: "Kunlik ritm: ertalab 5 daqiqa, kechqurun 5 daqiqa — uzun mashqdan yaxshiroq.",
  },
  {
    id: "soz",
    number: 4,
    title: "So‘zlar",
    goal: "Haqiqiy o‘zbek so‘zlarida R ni ishlating.",
    why: "Bo‘g‘in tayyor bo‘lgach, so‘zga o‘tamiz. Avval boshida R, keyin o‘rtada, oxirida.",
    steps: [
      "So‘zni sekin bo‘lib ayting, keyin birlashtiring.",
      "Mikrofon bilan yozib, o‘zingiz tinglang.",
      "Bir kunda 8–12 so‘z yetarli — sifat tezlikdan muhim.",
    ],
    drills: [
      {
        id: "s1",
        title: "Boshida R",
        hint: "Birinchi tovush R. Oldin «r…» deb tayyorlaning.",
        items: ["rasm", "rang", "radio", "rost", "ramka", "raqam", "rivoj", "roh"],
        reps: 4,
      },
      {
        id: "s2",
        title: "O‘rtada R",
        hint: "R dan oldingi unlini yutib yubormang.",
        items: ["bir", "daraxt", "qaror", "o‘rin", "sabr", "tarix", "kerak", "to‘g‘ri"],
        reps: 4,
      },
      {
        id: "s3",
        title: "Oxirida R",
        hint: "So‘z oxiridagi R ni aniq tugating.",
        items: ["bor", "yor", "nur", "shahar", "bahor", "qor", "zar", "asar"],
        reps: 4,
      },
    ],
    tip: "Oila a’zolaringiz bilan mashq qiling: ular R ni eshitishi sizga feedback beradi.",
  },
  {
    id: "gap",
    number: 5,
    title: "Gaplar",
    goal: "Oddiy gaplarda R ni tabiiy gapirishga o‘tkazing.",
    why: "Maqsad — faqat mashqda emas, kundalik nutqda ham R chiqishi. Gaplar shu ko‘prik.",
    steps: [
      "Gapni avval sekin, so‘zma-so‘z o‘qing.",
      "Keyin oddiy suhbat tezligida qaytaring.",
      "R lar «ushib» qolsa — tezlikni pasaytiring, sifatni saqlang.",
    ],
    drills: [
      {
        id: "g1",
        title: "Qisqa gaplar",
        hint: "Har bir R ni eshitib boring.",
        items: [
          "Rasm chiroyli.",
          "Bahor keldi.",
          "Bir qaror qildim.",
          "Shahar katta.",
          "Ranglar yorqin.",
        ],
        reps: 3,
      },
      {
        id: "g2",
        title: "Ko‘proq R",
        hint: "Bu gaplarda R ko‘p — sekin boshlang.",
        items: [
          "Radio orqali yangiliklar eshitdim.",
          "Daraxtlar bahorda gullaydi.",
          "To‘g‘ri qaror kerak edi.",
          "Raqamlar tartib bilan yozildi.",
          "Sabr qilib, mashqni takrorladim.",
        ],
        reps: 3,
      },
    ],
    tip: "23 yoshda ham til mushaklari o‘rganadi. Kunlik qisqa mashq — eng kuchli davo.",
  },
];

export const DAILY_PLAN = [
  { minutes: 2, label: "Tilni isitish", detail: "da-da-da, ta-ta-ta" },
  { minutes: 3, label: "Tebranish", detail: "dra / tra / drrr" },
  { minutes: 3, label: "Bo‘g‘in yoki so‘z", detail: "Bugungi bosqichdan" },
  { minutes: 2, label: "Yozib tinglash", detail: "1–2 so‘z yoki gap" },
];

export const MISTAKES = [
  {
    title: "R o‘rniga L aytish",
    fix: "L da til yonlari ishlaydi. R da faqat uchi — yonlar ochiq, havo o‘tsin.",
  },
  {
    title: "R ni tomoqdan chiqarish",
    fix: "O‘zbek R til uchi bilan. Tomoq R (fransuzcha) bu yerda maqsad emas.",
  },
  {
    title: "Juda kuchli bosish",
    fix: "Tilni qattiq bosib tursangiz, tebranmaydi. Yengil teginish + kuchli havo.",
  },
  {
    title: "Shoshilish",
    fix: "Avval sekin va toza. Tezlik keyin keladi.",
  },
];
