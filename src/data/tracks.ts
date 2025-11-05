export interface Track {
  id: number;
  title: string;
  key: string;
  duration: string;
  description: string;
  lyrics?: string;
  imageUrl: string;
  theme: {
    background: string;
    accent: string;
  };
  textStyle: {
    fontFamily: string;
    animation: string;
  };
  particleType: 'mountain' | 'water' | 'feather' | 'echo' | 'lightning' | 'aurora' | 'golden';
}

export const tracks: Track[] = [
  {
    id: 1,
    title: "The Mountain's Shadow",
    key: "D minor",
    duration: "6:00",
    description: "Our opening epic - sets the journey's beginning.",
    imageUrl: "/images/1.jpg",
    theme: {
      background: "linear-gradient(135deg, #1a1a2e 0%, #2d3561 50%, #16213e 100%)",
      accent: "#4a5568"
    },
    textStyle: {
      fontFamily: "'Cinzel', 'Georgia', serif",
      animation: "mountain-shadow"
    },
    particleType: 'mountain'
  },
  {
    id: 2,
    title: "Rivers Running Backward",
    key: "A minor",
    duration: "5:00",
    description: "About defying natural order, swimming against the current. Flowing orchestral with prominent strings and woodwinds.",
    lyrics: "Where the rivers run backward / Up the mountainside / I learned to breathe underwater / With my lungs open wide",
    imageUrl: "/images/2.jpg",
    theme: {
      background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
      accent: "#4a90a4"
    },
    textStyle: {
      fontFamily: "'Merriweather', 'Georgia', serif",
      animation: "water-flow"
    },
    particleType: 'water'
  },
  {
    id: 3,
    title: "The Weight of Wings",
    key: "E minor",
    duration: "7:00",
    description: "The burden of potential, learning to fly while carrying stones. Heavy percussion building to soaring violin solos.",
    lyrics: "These wings were made of iron / Before they learned to soar / Every feather weighs a lifetime / But I'm stronger than before",
    imageUrl: "/images/3.jpg",
    theme: {
      background: "linear-gradient(135deg, #232526 0%, #414345 50%, #536976 100%)",
      accent: "#6b7b8c"
    },
    textStyle: {
      fontFamily: "'Playfair Display', 'Georgia', serif",
      animation: "fire-glow"
    },
    particleType: 'feather'
  },
  {
    id: 4,
    title: "Echoes in the Void",
    key: "B minor",
    duration: "4:00",
    description: "Finding your voice in emptiness, creating something from nothing. Minimalist start, building layers of vocal harmonies.",
    lyrics: "In the void I found my echo / Teaching me to sing / In the silence, I'm the thunder / In the nothing, everything",
    imageUrl: "/images/4.jpg",
    theme: {
      background: "linear-gradient(135deg, #1e1e2e 0%, #2e2e4e 50%, #3e3e5e 100%)",
      accent: "#5e5e7e"
    },
    textStyle: {
      fontFamily: "'Crimson Text', 'Georgia', serif",
      animation: "echo-pulse"
    },
    particleType: 'echo'
  },
  {
    id: 5,
    title: "The Storm's Eye",
    key: "F# minor",
    duration: "8:00",
    description: "The calm within chaos, finding peace in turmoil. Full symphonic power, with quiet centered interlude.",
    lyrics: "In the eye of every storm / There's a chapel made of rain / Where the lightning serves as candles / And the thunder calls my name",
    imageUrl: "/images/5.jpg",
    theme: {
      background: "linear-gradient(135deg, #1c1c2e 0%, #363654 50%, #4a4a6a 100%)",
      accent: "#6a6a8a"
    },
    textStyle: {
      fontFamily: "'EB Garamond', 'Georgia', serif",
      animation: "lightning-strike"
    },
    particleType: 'lightning'
  },
  {
    id: 6,
    title: "Beneath the Northern Lights",
    key: "G minor",
    duration: "5:00",
    description: "Wonder in darkness, finding magic in the coldest night. Ethereal, with choir and shimmering strings.",
    lyrics: "Where the world ends in winter / The sky begins to dance / Aurora tells the story / Of the stars' second chance",
    imageUrl: "/images/6.jpg",
    theme: {
      background: "linear-gradient(135deg, #0a2e38 0%, #1a4d5e 50%, #2a6d7e 100%)",
      accent: "#3a8d9e"
    },
    textStyle: {
      fontFamily: "'Libre Baskerville', 'Georgia', serif",
      animation: "aurora-shimmer"
    },
    particleType: 'aurora'
  },
  {
    id: 7,
    title: "The Summit's Secret",
    key: "D minor to D major",
    duration: "9:00",
    description: "The finale - discovering the journey was the destination. Reprises themes from all previous tracks, ends in major key triumph.",
    lyrics: "At the summit there's no treasure / Just the person you became / Every scar a constellation / Every loss a sacred flame",
    imageUrl: "/images/7.jpg",
    theme: {
      background: "linear-gradient(135deg, #2c1a1e 0%, #4a3a3e 50%, #6a5a5e 100%)",
      accent: "#8a7a7e"
    },
    textStyle: {
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      animation: "golden-triumph"
    },
    particleType: 'golden'
  }
];
