export interface Topic {
  question: string
  words: string[]
}

export type Difficulty = "easy" | "medium" | "hard"

export const DIFFICULTY_STORAGE_KEY = "speechchall_difficulty"

export const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; description: string }> = {
  easy: { label: "Easy", description: "10s prep" },
  medium: { label: "Medium", description: "5s prep" },
  hard: { label: "Hard", description: "3s prep" },
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
  {
    question: "Should people live in big cities?",
    words: ["Noise", "Opportunity", "Rent", "Diversity", "Speed"],
  },
  {
    question: "Can money buy happiness?",
    words: ["Comfort", "Security", "Pressure", "Choice", "Meaning"],
  },
  {
    question: "Is it better to wake up early?",
    words: ["Routine", "Silence", "Discipline", "Sleep", "Momentum"],
  },
  {
    question: "Should homework be banned?",
    words: ["Practice", "Stress", "Family", "Responsibility", "Balance"],
  },
  {
    question: "Are influencers good role models?",
    words: ["Image", "Trust", "Audience", "Pressure", "Authenticity"],
  },
  {
    question: "Is traveling alone worth it?",
    words: ["Confidence", "Risk", "Discovery", "Loneliness", "Growth"],
  },
  {
    question: "Should public transport be free?",
    words: ["Taxes", "Access", "Traffic", "Equity", "Environment"],
  },
  {
    question: "Is competition healthy?",
    words: ["Motivation", "Stress", "Excellence", "Comparison", "Teamwork"],
  },
  {
    question: "Should pets be allowed at work?",
    words: ["Comfort", "Allergy", "Distraction", "Culture", "Policy"],
  },
  {
    question: "Is online shopping too convenient?",
    words: ["Impulse", "Delivery", "Returns", "Local", "Choice"],
  },
  {
    question: "Should school start later in the day?",
    words: ["Teenagers", "Focus", "Commute", "Rhythm", "Grades"],
  },
  {
    question: "Are exams a good way to measure learning?",
    words: ["Memory", "Pressure", "Fairness", "Skill", "Feedback"],
  },
  {
    question: "Is failure necessary for success?",
    words: ["Resilience", "Ego", "Lesson", "Risk", "Perspective"],
  },
  {
    question: "Should everyone learn a second language?",
    words: ["Culture", "Career", "Identity", "Practice", "Empathy"],
  },
  {
    question: "Is fame worth the cost?",
    words: ["Privacy", "Influence", "Expectation", "Attention", "Longevity"],
  },
  {
    question: "Should junk food ads target children?",
    words: ["Habit", "Health", "Marketing", "Choice", "Parents"],
  },
  {
    question: "Is working from cafes productive?",
    words: ["Ambience", "Focus", "Wi-Fi", "Routine", "Distraction"],
  },
  {
    question: "Should birthdays be a big celebration?",
    words: ["Ritual", "Memory", "Cost", "Expectations", "Gratitude"],
  },
  {
    question: "Are documentaries better than movies for learning?",
    words: ["Fact", "Emotion", "Narration", "Bias", "Curiosity"],
  },
  {
    question: "Should people take gap years?",
    words: ["Maturity", "Adventure", "Delay", "Purpose", "Experience"],
  },
  {
    question: "Is owning a car still important?",
    words: ["Freedom", "Cost", "Status", "Commute", "Maintenance"],
  },
  {
    question: "Should news be personalized by algorithms?",
    words: ["Filter", "Relevance", "Bias", "Awareness", "Control"],
  },
  {
    question: "Is boredom good for creativity?",
    words: ["Silence", "Imagination", "Restlessness", "Ideas", "Attention"],
  },
  {
    question: "Should humans trust self-driving cars?",
    words: ["Safety", "Control", "Error", "Convenience", "Ethics"],
  },
]

export function getRandomTopic(): Topic {
  return topics[Math.floor(Math.random() * topics.length)]
}

export function getGameConfig(difficulty: Difficulty = "medium") {
  const difficultyTiming: Record<Difficulty, { prepTime: number; firstWordDelay: number; wordInterval: number }> = {
    easy: { prepTime: 10, firstWordDelay: 5, wordInterval: 15 },
    medium: { prepTime: 5, firstWordDelay: 5, wordInterval: 10 },
    hard: { prepTime: 3, firstWordDelay: 5, wordInterval: 8 },
  }

  return {
    totalTime: 60,
    ...difficultyTiming[difficulty],
    wordCount: 5,
  }
}
