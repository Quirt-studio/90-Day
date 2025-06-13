'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from './questions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function Questionnaire() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 问卷完成，跳转到结果页面
      console.log('问卷完成', answers);
      // 将答案数据编码后通过URL参数传递到结果页面
      const encodedAnswers = encodeURIComponent(JSON.stringify(answers));
      router.push(`/results?answers=${encodedAnswers}`);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAnswer = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">职业兴趣问卷</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium">
                {currentQuestion.text}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                问题 {currentIndex + 1} / {questions.length}
              </p>
            </div>

            {currentQuestion.type === 'multiple' && (
              <RadioGroup 
                value={answers[currentQuestion.id] || ''}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {currentQuestion.options?.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestion.type === 'scale' && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{currentQuestion.minLabel}</span>
                  <span>{currentQuestion.maxLabel}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={answers[currentQuestion.id] || '3'}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-full"
                />
                <div className="text-center text-sm text-gray-600">
                  当前选择: {answers[currentQuestion.id] || '3'}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                上一题
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
              >
                {currentIndex === questions.length - 1 ? '提交问卷' : '下一题'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}