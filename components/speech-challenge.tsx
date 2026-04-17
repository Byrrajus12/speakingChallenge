"use client"

import { useState, useEffect, useCallback } from "react"
import { Play, RotateCcw, Mic, Zap } from "lucide-react"
import { getRandomTopic, GAME_CONFIG, type Topic } from "@/lib/game-data"

type GameState = "idle" | "countdown" | "playing" | "finished"

const COUNTDOWN_DURATION = 5 // 5 second "get ready" phase

export function SpeechChallenge() {
  const [gameState, setGameState] = useState<GameState>("idle")
  const [topic, setTopic] = useState<Topic | null>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(-1)
  const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.totalTime)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [countdownTime, setCountdownTime] = useState(COUNTDOWN_DURATION)

  const startGame = useCallback(() => {
    const newTopic = getRandomTopic()
    setTopic(newTopic)
    setGameState("countdown")
    setCurrentWordIndex(-1)
    setTimeLeft(GAME_CONFIG.totalTime)
    setElapsedTime(0)
    setCountdownTime(COUNTDOWN_DURATION)
  }, [])

  const resetGame = useCallback(() => {
    setGameState("idle")
    setTopic(null)
    setCurrentWordIndex(-1)
    setTimeLeft(GAME_CONFIG.totalTime)
    setElapsedTime(0)
    setCountdownTime(COUNTDOWN_DURATION)
  }, [])

  // Countdown timer (get ready phase)
  useEffect(() => {
    if (gameState !== "countdown") return

    const interval = setInterval(() => {
      setCountdownTime((prev) => {
        if (prev <= 1) {
          setGameState("playing")
          return COUNTDOWN_DURATION
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [gameState])

  // Main game timer (starts after countdown)
  useEffect(() => {
    if (gameState !== "playing") return

    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        const newTime = prev + 1
        setTimeLeft(GAME_CONFIG.totalTime - newTime)

        if (newTime >= GAME_CONFIG.totalTime) {
          setGameState("finished")
          return prev
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [gameState])

  // Word reveal logic
  useEffect(() => {
    if (gameState !== "playing" || !topic) return

    // Calculate which word should be shown based on elapsed time
    if (elapsedTime >= GAME_CONFIG.firstWordDelay) {
      const wordsSinceFirst = Math.floor(
        (elapsedTime - GAME_CONFIG.firstWordDelay) / GAME_CONFIG.wordInterval
      )
      const newIndex = Math.min(wordsSinceFirst, topic.words.length - 1)
      setCurrentWordIndex(newIndex)
    }
  }, [elapsedTime, gameState, topic])

  const progressPercentage = (elapsedTime / GAME_CONFIG.totalTime) * 100
  const currentWord = topic?.words[currentWordIndex]
  const isIdle = gameState === "idle"

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden flex flex-col items-center px-3 pt-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4 sm:pt-5 md:min-h-[100dvh] md:justify-center md:p-8">
      {/* Decorative elements kept on mobile, but resized and moved to safer edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-14 -left-4 w-10 h-10 bg-chart-1 rounded-full border-3 border-foreground shadow-[3px_3px_0px_0px] shadow-foreground opacity-70 sm:top-12 sm:-left-3 sm:w-12 sm:h-12 sm:border-4 sm:shadow-[4px_4px_0px_0px] md:fixed md:top-8 md:left-8 md:w-16 md:h-16 md:opacity-60 z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 right-1 w-8 h-8 bg-chart-2 rounded-lg border-3 border-foreground shadow-[3px_3px_0px_0px] shadow-foreground rotate-12 opacity-75 sm:bottom-5 sm:right-2 sm:w-10 sm:h-10 sm:border-4 sm:shadow-[4px_4px_0px_0px] md:fixed md:bottom-12 md:right-12 md:w-12 md:h-12 md:opacity-60 z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-52 -right-2 w-5 h-5 bg-chart-3 rounded-full border-2 border-foreground opacity-70 sm:w-6 sm:h-6 sm:border-3 md:fixed md:top-1/4 md:right-8 md:w-8 md:h-8 md:opacity-50 z-0"
      />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <header className={`text-center ${isIdle ? "mb-4 sm:mb-5 md:mb-6" : "mb-4"}`}>
          <div className={`inline-flex items-center gap-2 bg-secondary px-3 py-2 sm:px-4 rounded-full border-3 border-foreground shadow-[4px_4px_0px_0px] shadow-foreground ${isIdle ? "mb-3 sm:mb-4" : "mb-0"}`}>
            <Mic className="w-5 h-5" />
            <span className="font-bold text-sm uppercase tracking-wide">Speech Challenge</span>
          </div>
          {isIdle && (
            <>
              <h1 className="text-[2.2rem] sm:text-4xl md:text-5xl leading-tight font-bold tracking-tight text-balance">
                Think Fast, <span className="text-primary">Speak Well</span>
              </h1>
              <p className="mt-2.5 sm:mt-3 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
                Speak on a topic while incorporating the words that appear
              </p>
            </>
          )}
        </header>

        {/* Main Game Card */}
        <div className="bg-card border-4 border-foreground rounded-2xl shadow-[8px_8px_0px_0px] shadow-foreground overflow-hidden">
          {/* Idle State */}
          {gameState === "idle" && (
            <div className="p-5 sm:p-6 md:p-8 text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-accent rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px] shadow-foreground mx-auto mb-4 md:mb-6 flex items-center justify-center">
                <Zap className="w-12 h-12 text-accent-foreground" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Challenge Yourself?</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You&apos;ll get a random topic and 60 seconds. New words will appear that you must incorporate into your speech!
              </p>
              <button
                onClick={startGame}
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl border-4 border-foreground shadow-[6px_6px_0px_0px] shadow-foreground font-bold text-lg uppercase tracking-wide hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0px_0px] transition-all"
              >
                <Play className="w-6 h-6" />
                Start Challenge
              </button>
            </div>
          )}

          {/* Countdown State (Get Ready) */}
          {gameState === "countdown" && topic && (
            <div className="p-6 sm:p-8 md:p-12 text-center">
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">Your Topic</p>
                <h2 className="text-2xl md:text-3xl font-bold text-balance">{topic.question}</h2>
              </div>
              
              <div className="my-8">
                <p className="text-lg font-medium text-muted-foreground mb-4">Get ready to speak...</p>
                <div className="w-28 h-28 sm:w-32 sm:h-32 bg-primary rounded-full border-4 border-foreground shadow-[6px_6px_0px_0px] shadow-foreground mx-auto flex items-center justify-center animate-pulse">
                  <span className="text-5xl sm:text-6xl font-bold text-primary-foreground">{countdownTime}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm">
                Take a breath and prepare your thoughts
              </p>
            </div>
          )}

          {/* Playing State */}
          {gameState === "playing" && topic && (
            <div className="p-4 sm:p-6 md:p-8">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Time Left</span>
                  <span className="font-mono font-bold text-xl">{timeLeft}s</span>
                </div>
                <div className="h-4 bg-muted rounded-full border-3 border-foreground overflow-hidden">
                  <div
                    className="h-full bg-chart-1 transition-all duration-1000 ease-linear"
                    style={{ width: `${100 - progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Topic */}
              <div className="bg-secondary p-5 sm:p-6 rounded-xl border-4 border-foreground shadow-[4px_4px_0px_0px] shadow-foreground mb-6">
                <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">Your Topic</p>
                <h2 className="text-[1.9rem] sm:text-2xl md:text-3xl leading-tight font-bold text-balance">{topic.question}</h2>
              </div>

              {/* Current Word */}
              <div className="text-center">
                {currentWordIndex >= 0 && (
                  <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3">
                    Incorporate this word
                  </p>
                )}
                <div className="min-h-[100px] flex items-center justify-center">
                  {currentWordIndex >= 0 && currentWord ? (
                    <div className="animate-in zoom-in-50 fade-in duration-300">
                      <span className="inline-block bg-accent text-accent-foreground px-6 sm:px-8 py-4 rounded-xl border-4 border-foreground shadow-[6px_6px_0px_0px] shadow-foreground text-2xl sm:text-3xl md:text-4xl font-bold">
                        {currentWord}
                      </span>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {currentWordIndex >= 0 && (
                  <p className="mt-4 text-muted-foreground text-sm">
                    Use this word in your speech!
                  </p>
                )}
              </div>

              {/* Reset button during challenge */}
              <div className="mt-6 text-center">
                <button
                  onClick={resetGame}
                  className="inline-flex items-center gap-2 bg-card text-foreground px-5 py-3 rounded-xl border-3 border-foreground shadow-[3px_3px_0px_0px] shadow-foreground font-bold text-sm uppercase tracking-wide hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px] transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* Finished State */}
          {gameState === "finished" && topic && (
            <div className="p-6 sm:p-8 md:p-12 text-center">
              <div className="w-24 h-24 bg-accent rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px] shadow-foreground mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl">🎉</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Challenge Complete!</h2>
              <p className="text-muted-foreground mb-6">
                Great job tackling &quot;{topic.question}&quot;
              </p>

              {/* Words used */}
              <div className="bg-muted p-4 rounded-xl border-3 border-foreground mb-8">
                <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3">Words You Incorporated</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {topic.words.map((word, index) => (
                    <span
                      key={index}
                      className="bg-card px-3 py-1 rounded-lg border-2 border-foreground text-sm font-medium"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={startGame}
                  className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl border-4 border-foreground shadow-[6px_6px_0px_0px] shadow-foreground font-bold text-lg uppercase tracking-wide hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0px_0px] transition-all"
                >
                  <Play className="w-6 h-6" />
                  Try Again
                </button>
                <button
                  onClick={resetGame}
                  className="inline-flex items-center gap-2 bg-card text-foreground px-6 py-4 rounded-xl border-4 border-foreground shadow-[4px_4px_0px_0px] shadow-foreground font-bold uppercase tracking-wide hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px] transition-all"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        {gameState === "idle" && (
          <div className="mt-4 md:mt-6 grid grid-cols-3 gap-2 md:gap-4">
            {[
              { num: "1", text: "Get a random topic to speak about" },
              { num: "2", text: "New words appear every 10 seconds" },
              { num: "3", text: "Incorporate each word into your speech" },
            ].map((item) => (
              <div
                key={item.num}
                className="bg-card p-2.5 md:p-4 rounded-xl border-3 border-foreground shadow-[4px_4px_0px_0px] shadow-foreground"
              >
                <div className="w-7 h-7 md:w-8 md:h-8 bg-secondary rounded-full border-2 border-foreground flex items-center justify-center font-bold text-xs md:text-sm mb-1.5 md:mb-2">
                  {item.num}
                </div>
                <p className="text-xs md:text-sm font-medium leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
