import React, { useState } from 'react';
import { Platform, StyleSheet, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Which hook is used for side effects in React?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "What is the primary language for Expo React Native apps?",
    options: ["Python", "Java", "TypeScript / JavaScript", "C++"],
    correctIndex: 2,
  },
  {
    id: 3,
    question: "Which file structure convention does Expo Router use?",
    options: ["File-based routing (app directory)", "XML routing", "Manifest routing only", "Manual URL routing table"],
    correctIndex: 0,
  }
];

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = SAMPLE_QUESTIONS[currentIndex];

  const handleSelect = (index: number) => {
    setSelectedOption(index);
    if (index === currentQ.correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentIndex < SAMPLE_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedText type="title" style={styles.title}>
            QuizUni Mobile
          </ThemedText>
          <ThemedText type="small" style={styles.subtitle}>
            Cross-Platform React Native & Expo Companion
          </ThemedText>
        </ThemedView>

        {!isFinished ? (
          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="code" style={styles.progress}>
              Question {currentIndex + 1} of {SAMPLE_QUESTIONS.length}
            </ThemedText>
            
            <ThemedText type="defaultSemiBold" style={styles.question}>
              {currentQ.question}
            </ThemedText>

            <View style={styles.optionsContainer}>
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                
                let optionStyle = styles.optionButton;
                if (selectedOption !== null) {
                  if (isCorrect) optionStyle = [styles.optionButton, styles.correctButton];
                  else if (isSelected) optionStyle = [styles.optionButton, styles.wrongButton];
                }

                return (
                  <Pressable
                    key={idx}
                    style={optionStyle}
                    onPress={() => selectedOption === null && handleSelect(idx)}
                  >
                    <ThemedText style={styles.optionText}>{option}</ThemedText>
                  </Pressable>
                );
              })}
            </View>

            {selectedOption !== null && (
              <Pressable style={styles.nextButton} onPress={handleNext}>
                <ThemedText style={styles.nextButtonText}>Next Question</ThemedText>
              </Pressable>
            )}
          </ThemedView>
        ) : (
          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="title" style={styles.completionTitle}>Quiz Complete! 🎉</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.scoreText}>
              Your Score: {score} / {SAMPLE_QUESTIONS.length}
            </ThemedText>
            <Pressable style={styles.nextButton} onPress={resetQuiz}>
              <ThemedText style={styles.nextButtonText}>Restart Quiz</ThemedText>
            </Pressable>
          </ThemedView>
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
    gap: Spacing.one,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
  card: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  progress: {
    textTransform: 'uppercase',
    marginBottom: Spacing.one,
  },
  question: {
    fontSize: 18,
    marginBottom: Spacing.two,
  },
  optionsContainer: {
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  optionButton: {
    padding: Spacing.three,
    borderRadius: 10,
    backgroundColor: 'rgba(150, 150, 150, 0.15)',
  },
  correctButton: {
    backgroundColor: 'rgba(22, 163, 74, 0.4)',
  },
  wrongButton: {
    backgroundColor: 'rgba(220, 38, 38, 0.4)',
  },
  optionText: {
    fontSize: 15,
  },
  nextButton: {
    backgroundColor: '#0284c7',
    padding: Spacing.three,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  nextButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  completionTitle: {
    textAlign: 'center',
    marginBottom: Spacing.one,
  },
  scoreText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: Spacing.three,
  },
});