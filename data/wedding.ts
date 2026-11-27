export type WeddingEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  dateText: string;
  timeText: string;
  venue: string;
  address: string;
  mapsUrl: string;
};

const DATE = "2026-09-20";

const format = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...options }).format(new Date(`${DATE}T00:00:00Z`));

const dateLong = format({ day: "numeric", month: "long", year: "numeric" });
const dateText = `${format({ weekday: "long" })}, ${dateLong}`;
const at = (time: string) => `${DATE}T${time}:00+07:00`;

export const wedding = {
  groom: "Ahmad",
  bride: "Fatimah",
  date: DATE,
  dateLong,
  dateShort: DATE.split("-").reverse().join("."),
  parents: {
    groom: "Mr. Budi & Mrs. Eli",
    bride: "Mr. Doni & Mrs. Ela",
  },
  content: {
    tagline: "A story of love",
    verse: {
      arabic:
        "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
      translation:
        "And among the signs of His greatness is that He created partners for you from among yourselves, so that you may find peace in them, and He placed love and mercy between you.",
      source: "Qur’an, Ar-Rum 30:21",
    },
    blessing: {
      salam: "Assalamu’alaikum Warahmatullahi Wabarakatuh",
      prayer:
        "Glory be to Allah, who created all of His creation in pairs. O Allah, may Your blessing accompany our marriage.",
      closing: "May Allah SWT always bestow His blessings upon our marriage.",
    },
    thanks: "It would be a joy for us if you could attend and give us your prayers and blessings.",
  },
  events: [
    
{
  id: "akad",
  title: "Akad Nikah",
  start: at("08:00"),
  end: at("09:30"),
  dateText,
  timeText: "08:00 – 09:30 WIB",
  venue: "Sheraton Surabaya Hotel & Towers",
  address: "Jl. Embong Malang No. 25–31, Kedungdoro, Tegalsari, Surabaya, Jawa Timur 60261",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sheraton+Surabaya+Hotel",
},
{
  id: "reception",
  title: "Resepsi Pernikahan",
  start: at("11:00"),
  end: at("14:00"),
  dateText,
  timeText: "11:00 – 14:00 WIB",
  venue: "Grand Ballroom, Sheraton Surabaya",
  address: "Jl. Embong Malang No. 25–31, Kedungdoro, Tegalsari, Surabaya, Jawa Timur 60261",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sheraton+Surabaya+Hotel",
},

  ] as WeddingEvent[],
  gift: {
    enabled: true,
    bank: "BCI",
    accountNumber: "11223344",
    accountName: "Ahmad",
  },
  rsvp: {
    maxGuests: 5,
    whatsappFallback: "",
  },
  audio: { src: "/audio/terbuang-dalam-waktu.mp3" },
  site: {
    title: "The Wedding of Ahmad & Fatimah",
    description: "Somewhere between yesterday and tomorrow, I would still choose you.",
  },
};

export const isPlaceholder = (value: string) => /\[.*\]/.test(value.trim());
