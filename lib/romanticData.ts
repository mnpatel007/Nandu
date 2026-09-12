/* ============================================================================
   ROMANTIC MANIFEST & EMOTIONAL SANCTUARY
   Written with absolute love, devotion, and reverence for Nandini from Meet.
   ========================================================================== */

export interface ReasonLove {
  id: number;
  text: string;
  gujarati?: string;
  tag: string;
}

export interface OpenWhenLetter {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  content: string[];
  closure: string;
  affirmation: string;
}

export interface SacredPromise {
  id: number;
  starName: string;
  promise: string;
  whisper: string;
  coordinates: { x: number; y: number };
}

/* --------------------------------------------------------------------------
   THE LETTER TO NANDINI
   -------------------------------------------------------------------------- */
export const LOVE_LETTER = {
  recipient: "Mara Vhala Nandu,",
  salutation: "Nandini, mari jaan,",
  paragraphs: [
    "Kaik vaat evi hoy che je message ma nathi lakhi sakati, ane phone par bolta bolta shwas bharaai jaay che. Etle aaje aa aakhi website me tara maate banavi che — ek aevi jagya jya fakt hu ane tu chiye, ane tara maate maro nishwarth prem che.",
    "Hu jyre tari aankho ma jou chu ne, mane laage che ke aakhi duniya no shor ek pal ma shant thai gayo. Tu jetli bholi che, jetli sachhi che, ane jetli komal che — tane potane pan khabar nathi ke tu ketli anmol che. Tu potana dukh chupavi ne pan badha ni saame hase che, badha ni kaalji kare che, pan aaje hu tane kehva maangu chu: tu ahiya safe che. Mane tari badhi j kaalji che.",
    "Tari hasi, taru sharmavu, taru saree ma saame aavvu, balcony ma besi ne chupchaap vicharvu — tari aa har ek nani ada mara jeevan no sauthi sundar hisso che. Jyare tu dukh ma hoy, tyre maru dil roy che. Pan yaad raakhje, dharati ghumti bandh thai jaay to pan Meet kyarey taro saath nahi chhode.",
    "Tum humse pyar karo na karo hum sirf tumse pyar karte hain, tum hamari taraf dekho na dekho hum sirf aur sirf tumhari taraf dekhenge. Aa koi filmi line nathi, aa mari aakhi astitva no satya che.",
    "Tu mari shantayi che, maro aashro che, ane mari aakhi zindigi che. Janamdivas aave che taro 7 October e, pan mara maate to har divas tara hovathi j ujjwal che. Hasti rehje, kem ke tari hasi j mari duniya che.",
  ],
  signOff: "Kaayam taro, fakt taro,",
  author: "Meet",
  postScript: "P.S. Aa website par har ek photo, har ek akshar, ane har ek tara ma mara dil ni dhadkan che.",
};

/* --------------------------------------------------------------------------
   REASONS WHY YOU ARE MY LIFE (Deck of Love)
   -------------------------------------------------------------------------- */
export const REASONS_WHY: ReasonLove[] = [
  {
    id: 1,
    text: "The way your eyes smile and crinkle before your lips even part.",
    gujarati: "Tari aankho pehla hase che, taro chehro pachi.",
    tag: "Her Smile",
  },
  {
    id: 2,
    text: "Because in a world full of noise, your presence is my only quiet sanctuary.",
    gujarati: "Aakhi duniya no shor ek baaju, ane tari shanti ek baaju.",
    tag: "Peace",
  },
  {
    id: 3,
    text: "How breathtaking and regal you look every single time you wear a saree.",
    gujarati: "Saree ma tu koi rajkumari thi ochi nathi lagti.",
    tag: "Elegance",
  },
  {
    id: 4,
    text: "Your tender, caring heart that always worries about everyone else first.",
    gujarati: "Tu jetli kaalji badhani kare che, etli koi nathi kari shakyu.",
    tag: "Kindness",
  },
  {
    id: 5,
    text: "The quiet strength inside you that endures storms without losing its gentle grace.",
    gujarati: "Tari andar ek aevi taakat che je tane har tufaan ma pan komal raakhe che.",
    tag: "Strength",
  },
  {
    id: 6,
    text: "How you put your hands on your cheeks when you get shy.",
    gujarati: "Tari gaal par banne haath muki ne sharmava ni ada.",
    tag: "Cutest",
  },
  {
    id: 7,
    text: "The sound of your laugh when you're genuinely, uncontrollably happy.",
    gujarati: "Jyre tu dil kholi ne khul-khulaat hase che.",
    tag: "Joy",
  },
  {
    id: 8,
    text: "Because you make simple balcony sunsets feel like a cinematic dream.",
    gujarati: "Balcony ma taro chehro ane aathamto suraj... swarg ahiya j che.",
    tag: "Moments",
  },
  {
    id: 9,
    text: "The innocence in your deep eyes that no darkness in the world can ever touch.",
    gujarati: "Tari aankho ma je nishpap sachaai che.",
    tag: "Purity",
  },
  {
    id: 10,
    text: "How you say you are not photogenic when every photo of you stops my breathing.",
    gujarati: "Tu kahe che hu photogenic nathi, ane hu kahu chu tu mari jaan che.",
    tag: "Beauty",
  },
  {
    id: 11,
    text: "Because loving you doesn't require reasons; it is my nature, as natural as breathing.",
    gujarati: "Tara thi prem karvo maro shwaas che, koi shart nathi.",
    tag: "Devotion",
  },
  {
    id: 12,
    text: "The soft melody of your voice when you say something in a quiet whisper.",
    gujarati: "Taro komal aawaj mara kaan ma amrut jevo lage che.",
    tag: "Voice",
  },
  {
    id: 13,
    text: "How you make me want to be the best, kindest, and strongest man for you.",
    gujarati: "Tari maate mara thi sauthi saro maanas banvu che mane.",
    tag: "Inspiration",
  },
  {
    id: 14,
    text: "The way you tilt your head when you are lost in your beautiful thoughts.",
    gujarati: "Vicharti vakhate taro shant chehro.",
    tag: "Soul",
  },
  {
    id: 15,
    text: "Because even on my darkest and heaviest days, the mere thought of you brings light.",
    gujarati: "Kharab divas ma pan taro vichar aave toh chehra par muskaan aavi jaay.",
    tag: "Light",
  },
  {
    id: 16,
    text: "Your pure simplicity — you don't need filters, pretense, or drama to shine.",
    gujarati: "Tari saadgi j taro sau thi moto gehna che.",
    tag: "Simplicity",
  },
  {
    id: 17,
    text: "How safe and understood I feel whenever I talk to you.",
    gujarati: "Tari sathe hu j hu chu, koi mukhoto nathi pehervo padto.",
    tag: "Safety",
  },
  {
    id: 18,
    text: "Because your happiness is the only thing I pray for, every single morning.",
    gujarati: "Mari har savar ni pehli prarthana tara maate hoy che.",
    tag: "Prayer",
  },
  {
    id: 19,
    text: "The magic in the way wind plays with your hair in candid moments.",
    gujarati: "Pawan pan tara vaal sathe ramva mate tarasta hoy che.",
    tag: "Magic",
  },
  {
    id: 20,
    text: "Because even when we are silent, our silence feels complete and poetic.",
    gujarati: "Chupchaap pan tari haajari mane poori kare che.",
    tag: "Connection",
  },
  {
    id: 21,
    text: "How you hold my heart without even trying.",
    gujarati: "Tane khabar pan nathi ne tu mara dil ni rani bani gai.",
    tag: "Heart",
  },
  {
    id: 22,
    text: "Because you are the only person I want to tell good news and bad news to first.",
    gujarati: "Khushi hoy ke gam, pehlo call fakt tane j karvano man thaay.",
    tag: "Best Friend",
  },
  {
    id: 23,
    text: "The sheer warmth of your existence in this cold universe.",
    gujarati: "Aa aakhi duniya ma tari huñfa mara maate ashirwad che.",
    tag: "Warmth",
  },
  {
    id: 24,
    text: "Because I have seen a thousand faces, but yours is the only one my heart recognizes.",
    gujarati: "Hazaro chehra ma thi fakt taro chehro mara dil ne potano lage che.",
    tag: "Destiny",
  },
  {
    id: 25,
    text: "The way you deserve to be loved with gentleness, patience, and honor.",
    gujarati: "Tu aatli vhali che ke tane ful jevi komalta thi rakhvi joiye.",
    tag: "Respect",
  },
  {
    id: 26,
    text: "Because you are Nandini — unique, irreplaceable, and my entire life.",
    gujarati: "Kem ke tu Nandini che, ane Nandini j mari zindigi che.",
    tag: "Everything",
  },
];

/* --------------------------------------------------------------------------
   OPEN WHEN... CARE PACKAGES
   -------------------------------------------------------------------------- */
export const OPEN_WHEN_LETTERS: OpenWhenLetter[] = [
  {
    id: "bad-day",
    title: "Open when you're having a heavy, exhausting day",
    subtitle: "When the weight feels too much to carry alone",
    badge: "Comfort & Warmth",
    icon: "🌧️",
    content: [
      "Nandini, pehla to ek lambo shwaas le.",
      "Khandha neeche utaar, dhyan thi shwas andar le ane dhire thi bahar kaadh. Tu aatlu badhu bojh potana nankada khandha par lai ne chaale che, badha ni apekshao poori kare che.",
      "Pan aaje hu tane kehva mangu chu: tane badhu perfect karvani jarur nathi. Tane haari javano, thaki javano, ane shant besi rehvano poore-pooro adhikar che.",
      "Koi divas kharab hoy etle taro aakho astitva kharab nathi thai jato. Tu bahu bahadur che, pan aaje bahadur banva ni jarur nathi. Chupchaap aakho bandh kar, hu man ma tara haath pakdi ne betha chu.",
    ],
    closure: "Aa divas pan viti jashe, pan maro prem kaayam rehshe.",
    affirmation: "Tu safe che, tu samjayeli che, ane tu bahu pyaari che.",
  },
  {
    id: "doubt-self",
    title: "Open when you doubt your worth or feel unseen",
    subtitle: "When negative thoughts whisper lies",
    badge: "Truth & Worth",
    icon: "🥺",
    content: [
      "Kadi kadi aavi lage che ke koi tane samjtu nathi? Ke tu jetli mehnat kare che, koi teni kadar nathi kartu?",
      "Saambhdi le Nandu: je loko tara mol nathi samji shakya, ae teni nigaah ni khami che, tara astitva ni nahi. Tu koi aam chokri nathi, tu ek heera che.",
      "Taru dil aatlu shuddh che ke aava jamana ma aavi chokri sodhva thi pan nathi malti. Tu potana mate gaurav anubhav kar. Tane mara thi vadhare koi nathi samji shaktu, ane me tari andar fakt khubsurti ane sachai j joi che.",
      "Kyarey potani tulna bija sathe na karti. Tu jevi che, evi j mari aakhi duniya che.",
    ],
    closure: "Taro mol koi shart par nathi, tu priceless che.",
    affirmation: "Tu amulya che. Kadi potani kadr kam na karti.",
  },
  {
    id: "miss-me",
    title: "Open when you miss me and feel lonely",
    subtitle: "Bridging every distance between us",
    badge: "Unbroken Bond",
    icon: "💭",
    content: [
      "Jyre pan tane mari yaad aave, bas potana dil par haath mukje.",
      "Je dhadkan tu sambhde che, ae mara prem ni gavahi che. Hu bhale shareer thi ketlo pan door hoy, pan mara aatma, mara vicharo, ane mari badhi duao tari sathe j ramti hoy che.",
      "Hu kyanya nathi jato, Nandu. Ahiyan j chu — chupchaap, tara maate, koi shart vagar. Jyre pan aakash ma tara joiye, yaad rakhje ke e j tara mane pan dekhe che.",
      "Bas ek call, ek message, ya fakt ek vichar... ane hu tari aaspas j hov.",
    ],
    closure: "Distance is just a test to see how far love will travel.",
    affirmation: "Hu har pal tara dil ni sauthi najik chu.",
  },
  {
    id: "cant-sleep",
    title: "Open when you can't sleep at night",
    subtitle: "A bedtime lullaby for your restless thoughts",
    badge: "Peaceful Sleep",
    icon: "🌙",
    content: [
      "Raat ghani shant thai gai che, pan taro dimag hajii vicharo ma dodi rahyo che ne?",
      "Badha vicharo ne kaho ke kaale savare vaat karshu. Aaje raat fakt tara aaram maate che.",
      "Aankho bandh kar. Kalpana kar ke ek thandi mand hava aave che, balcony ma tara vaal sathe ramti hoy, ane hu chupchaap tara maatha par haath feraavi rahyo chu.",
      "Tu bilkul safe che. Koi chinta nathi karvani. Meet ahiyan peharo aape che tara sapna no.",
    ],
    closure: "Meetha sapna jo, mara Nandu. Kaal no suraj nava umang laavshe.",
    affirmation: "Shanti thi sui jaa, tari raksha maru prem kare che.",
  },
  {
    id: "need-smile",
    title: "Open when you need an instant reason to smile",
    subtitle: "A pocket full of sunshine and laughter",
    badge: "Joy Burst",
    icon: "🌸",
    content: [
      "Ek vaat khabar che tane?",
      "Jyre tu hase che ne, aaju-baaju na badha phool sharmai jaay che ke amaro rang to aani aagal kaik nathi!",
      "Ane haan — ae photo ma tu 'photogenic nathi' bolya pachi je look aape che ne, ae to aakhi duniya ma sauthi cute che! Tane gusso karva ma pan aatli cute laage che ke mane hasvu aavi jaay.",
      "Hasi le have! Jo tara honth par nani si muskaan aavi gai. Bas aa j muskaan mane aakhi jindagi joiye che.",
    ],
    closure: "Hasti rehje, ae tane sauthi vadhare suit kare che!",
    affirmation: "Taru haasyu mari aakhi duniya roshan kare che.",
  },
  {
    id: "oct-7",
    title: "Open on 7 October — Janamdivas ni Shubhkamnao",
    subtitle: "A celebration of the day the universe gave me you",
    badge: "The Grand Day",
    icon: "🎂",
    content: [
      "Happy Birthday, mari jaan Nandini!",
      "Aa divas tara maate janamdivas hashe, pan mara maate aa divas aakhi kudrat no sau thi moto aashirwad hato. Kem ke aa divase bhagwane tari aavi pyari aatma ne dharti par mokli.",
      "Tari umar vadhe, tari khushi vadhe, ane tara jeevan ma badha sapna sachha thaay aevi mari dil thi prarthana che. Tu jya pan hoy, hasi tari sathe rahe.",
      "Aa trailer to fakt ek nani si bhet hati. Aakhi vaarta, aakhi zindigi, ane maro aakho prem fakt tara naam par che.",
    ],
    closure: "Janamdivas ni khoob khoob shubhkamnao, Nandu. Love you to infinity.",
    affirmation: "Aaje aakhu aakash tara naam par chamke che.",
  },
];

/* --------------------------------------------------------------------------
   CONSTELLATION OF PROMISES
   -------------------------------------------------------------------------- */
export const SACRED_PROMISES: SacredPromise[] = [
  {
    id: 1,
    starName: "Tara of Safe Harbor",
    promise: "I promise to always be your safe harbor where you never have to pretend.",
    whisper: "Ahiyan tu jevi che evi j swikaraayeli che.",
    coordinates: { x: 20, y: 35 },
  },
  {
    id: 2,
    starName: "Tara of Unspoken Words",
    promise: "I promise to listen to the words you leave unsaid and understand your silence.",
    whisper: "Tari khamoshi pan mara dil ne samjay che.",
    coordinates: { x: 38, y: 22 },
  },
  {
    id: 3,
    starName: "Tara of Unwavering Presence",
    promise: "I promise that whether the world stands with you or walks away, Meet will never leave.",
    whisper: "Hu ahiyan j chu — chupchaap, koi shart vagar.",
    coordinates: { x: 55, y: 40 },
  },
  {
    id: 4,
    starName: "Tara of Gentle Reverence",
    promise: "I promise to always respect your boundaries, honor your choices, and protect your dignity.",
    whisper: "Taro aadar mari pehli jimmedari che.",
    coordinates: { x: 72, y: 25 },
  },
  {
    id: 5,
    starName: "Tara of Endless Smiles",
    promise: "I promise to do everything in my power to keep that radiant smile dancing on your lips.",
    whisper: "Tari hasi maate hu aakhi duniya sathe ladi shaku chu.",
    coordinates: { x: 84, y: 55 },
  },
  {
    id: 6,
    starName: "Tara of Forgiveness & Patience",
    promise: "I promise to always choose patience, forgiveness, and gentle kindness over ego.",
    whisper: "Prem ma ahankar nathi hoto, fakt samarpad hoy che.",
    coordinates: { x: 45, y: 70 },
  },
  {
    id: 7,
    starName: "Tara of Eternal Devotion",
    promise: "Tum humse pyar karo na karo hum sirf tumse pyar karte hain. For this lifetime and every one after.",
    whisper: "Maro prem koi badlo nathi mangto, bas taro che.",
    coordinates: { x: 62, y: 82 },
  },
];

