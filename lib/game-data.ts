export interface Topic {
  question: string
  words: string[]
}

export const topics: Topic[] = [
  {
    question: "Is coffee overrated?",
    words: ["Energy", "Morning", "Habit", "Productivity", "Culture"],
  },
  {
    question: "Should AI replace teachers?",
    words: ["Learning", "Human", "Efficiency", "Creativity", "Connection"],
  },
  {
    question: "Is remote work better?",
    words: ["Office", "Collaboration", "Flexibility", "Focus", "Communication"],
  },
  {
    question: "Is college necessary?",
    words: ["Skills", "Network", "Debt", "Experience", "Alternative"],
  },
  {
    question: "Should social media be regulated?",
    words: ["Privacy", "Freedom", "Influence", "Youth", "Business"],
  },
  {
    question: "Are smartphones making us less social?",
    words: ["Connection", "Distraction", "Convenience", "Isolation", "Access"],
  },
  {
    question: "Should we colonize Mars?",
    words: ["Resources", "Survival", "Innovation", "Risk", "Future"],
  },
  {
    question: "Is fast fashion harmful?",
    words: ["Environment", "Trends", "Workers", "Waste", "Affordable"],
  },
  {
    question: "Should voting be mandatory?",
    words: ["Democracy", "Rights", "Engagement", "Penalty", "Choice"],
  },
  {
    question: "Are video games art?",
    words: ["Story", "Design", "Emotion", "Interactive", "Culture"],
  },
  {
    question: "Should tipping be abolished?",
    words: ["Wages", "Service", "Custom", "Fair", "Awkward"],
  },
  {
    question: "Is minimalism overrated?",
    words: ["Space", "Joy", "Clutter", "Identity", "Freedom"],
  },
]

export function getRandomTopic(): Topic {
  return topics[Math.floor(Math.random() * topics.length)]
}

// Game timing configuration
export const GAME_CONFIG = {
  totalTime: 60, // seconds
  firstWordDelay: 5, // seconds before first word
  wordInterval: 10, // seconds between words
  wordCount: 5,
}
