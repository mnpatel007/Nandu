/* ============================================================================
   THE MEMORY MANIFEST
   ----------------------------------------------------------------------------
   This is the only file Meet needs to touch to change what the gallery shows.

   Every file listed here lives in  /public/media/  and is referenced from the
   web root, so "/media/whatever.jpg" is the correct form of the path.

   To ADD a photo:      drop the file into /public/media/ and add an entry.
   To REMOVE a photo:   delete its entry (the file can stay where it is).
   To REORDER:          move entries up or down — the gallery follows this order.
   To CHANGE a caption: edit `caption`. Leave it out for no caption.

   `rotate: true`  — for the frames that were shot lying down. They are stored
   sideways with the top of the head toward the RIGHT edge, so the card renders
   them in a landscape frame turned a quarter turn anticlockwise. Only set this
   on photos that genuinely look sideways in a file browser.
   ========================================================================== */

export type Memory = {
  /** Path from the web root — files live in /public/media/ */
  src: string;
  /** Read aloud by screen readers. Keep it human. */
  alt: string;
  /** Optional line that sits under the frame. */
  caption?: string;
  /** Photo or video. Videos get a real <video> element with controls. */
  kind?: "image" | "video";
  /** Poster frame for a video. */
  poster?: string;
  /** True for frames stored a quarter turn off. */
  rotate?: boolean;
  /** Which way the card drifts as she scrolls past it. */
  side?: "left" | "right" | "center";
  /** Relative size of the card. */
  size?: "sm" | "md" | "lg";
};

/* --------------------------------------------------------------------------
   The lines that sit between the photographs.
   These are the ones that do the emotional work — change them freely.
   -------------------------------------------------------------------------- */
export type Interlude = {
  lines: string[];
  /** A quieter follow-up under the main line. */
  soft?: string;
};

export type GalleryBlock =
  | { type: "memory"; data: Memory }
  | { type: "interlude"; data: Interlude };

/* --------------------------------------------------------------------------
   THE SEQUENCE
   -------------------------------------------------------------------------- */

export const GALLERY: GalleryBlock[] = [
  {
    type: "interlude",
    data: {
      lines: ["Pehla, ek vaat."],
      soft: "Tane koi ae aa nathi kahyu ghana time thi. Etle hu kahu chu.",
    },
  },
  {
    type: "memory",
    data: {
      src: "/media/IMG-20260905-WA0030.jpg",
      alt: "Nandini balcony ma, tadke",
      caption: "aa wali. bas aa wali.",
      side: "left",
      size: "lg",
    },
  },
  {
    type: "memory",
    data: {
      src: "/media/IMG-20260905-WA0035.jpg",
      alt: "Nandini, banne haath gaal par",
      caption: "ne pachi kahe che — hu photogenic nathi",
      side: "right",
      size: "md",
    },
  },
  {
    type: "interlude",
    data: {
      lines: ["Taru haasyu", "ek alag j duniya che."],
      soft: "Ne tane khabar pan nathi ke ae ketlu asar kare che.",
    },
  },
  {
    type: "memory",
    data: {
      src: "/media/IMG-20260903-WA0008.jpg",
      alt: "Nandini, hasti hasti, najik thi",
      caption: "aankho pehla hase che. moodh pachi.",
      rotate: true,
      side: "center",
      size: "lg",
    },
  },
  {
    type: "memory",
    data: {
      src: "/media/IMG-20260905-WA0027.jpg",
      alt: "Nandini besi ne, shant",
      side: "left",
      size: "md",
    },
  },
  {
    type: "memory",
    data: {
      src: "/media/IMG-20260901-WA0002.jpg",
      alt: "Nandini saree ma, aarsa saamne",
      caption: "saree ma to kaik alag j lage che",
      side: "right",
      size: "md",
    },
  },
  {
    type: "interlude",
    data: {
      lines: ["Tu aatlu badhu sehe che,", "ne koi ne khabar pan nathi padti."],
      soft: "Mane padi che.",
    },
  },
  {
    type: "memory",
    data: {
      src: "/media/IMG-20260905-WA0043.jpg",
      alt: "Nandini, haath par chin, upar jou",
      caption: "aa moment. ahiyan j rok.",
      side: "center",
      size: "lg",
    },
  },
  {
    type: "memory",
    data: {
      src: "/media/IMG-20260905-WA0013.jpg",
      alt: "Nandini, black and white",
      side: "right",
      size: "sm",
    },
  },
  {
    type: "memory",
    data: {
      src: "/media/IMG-20260905-WA0040.jpg",
      alt: "Nandini, haath vaal ma, aankho bandh",
      side: "left",
      size: "md",
    },
  },
  {
    type: "interlude",
    data: {
      lines: ["Tu aa dukh ne", "layak nathi, Nandini."],
      soft: "Je tane na samjyo — ae teni kami che. Tari nahi. Kyarey nahi.",
    },
  },
  {
    type: "memory",
    data: {
      src: "/media/VID-20260903-WA0010.mp4",
      alt: "Nandini no ek video",
      kind: "video",
      poster: "/media/IMG-20260905-WA0048.jpg",
      caption: "aa mane sauthi vhalu che. koi karan nathi. bas che.",
      side: "center",
      size: "lg",
    },
  },
  {
    type: "memory",
    data: {
      src: "/media/IMG-20260905-WA0019.jpg",
      alt: "Nandini balcony ni paali par besi ne",
      side: "left",
      size: "md",
    },
  },
  {
    type: "memory",
    data: {
      src: "/media/IMG-20260903-WA0006.jpg",
      alt: "Nandini, najik thi, shant",
      rotate: true,
      side: "right",
      size: "md",
    },
  },
  {
    type: "interlude",
    data: {
      lines: ["Tu jetli kaalji badha ni rakhe che —", "ketlik vaar potani pan rakhi le."],
      soft: "Etlu j. Bas etlu j maangu chu.",
    },
  },
  {
    type: "memory",
    data: {
      src: "/media/IMG-20260905-WA0048.jpg",
      alt: "Nandini, simple, saame joti",
      caption: "kai j extra nahi. bas tu.",
      side: "center",
      size: "lg",
    },
  },
  {
    type: "interlude",
    data: {
      lines: ["Tu bahu vhali che.", "Bahu vadhare."],
      soft: "Ne aa vaat kaayam sachi rehshe — tu maane ke na maane.",
    },
  },
];

/* Handy derived lists ----------------------------------------------------- */

export const MEMORIES: Memory[] = GALLERY.filter(
  (b): b is { type: "memory"; data: Memory } => b.type === "memory",
).map((b) => b.data);
