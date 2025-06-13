/**
 * 职业测评模块
 * 实现MBTI、Holland等职业测评算法
 */

import { UserAssessment, CareerType } from './types';

export class CareerAssessment {
  private careerTypes: CareerType[] = [
    {
      id: 'tech-frontend',
      title: '前端开发工程师',
      description: '负责用户界面开发，注重用户体验',
      suitableFor: '逻辑思维强，对视觉设计敏感，喜欢与用户交互',
      growthPath: '初级前端 → 中级前端 → 高级前端 → 前端架构师 → 技术总监',
      skills: ['JavaScript', 'HTML', 'CSS', 'React', 'Vue']
    },
    {
      id: 'tech-backend',
      title: '后端开发工程师',
      description: '负责服务器端逻辑开发，处理数据和业务逻辑',
      suitableFor: '逻辑思维强，喜欢解决复杂问题，注重系统稳定性',
      growthPath: '初级后端 → 中级后端 → 高级后端 → 系统架构师 → 技术专家',
      skills: ['Java', 'Python', 'MySQL', 'Redis', 'Docker']
    },
    // ... 更多职业类型
  ];

  /**
   * 执行职业测评
   * @param answers 用户答题结果
   * @returns 测评结果
   */
  async assessCareer(answers: Record<string, string>): Promise<{
    primaryCareer: CareerType;
    secondaryCareer: CareerType;
    matchScore: number;
    personalityType: string;
    recommendations: string[];
  }> {
    // 实现测评算法
    const scores = this.calculateCareerScores(answers);
    const sortedCareers = this.careerTypes
      .map(career => ({
        career,
        score: scores[career.id] || 0
      }))
      .sort((a, b) => b.score - a.score);

    return {
      primaryCareer: sortedCareers[0].career,
      secondaryCareer: sortedCareers[1].career,
      matchScore: sortedCareers[0].score,
      personalityType: this.determinePersonalityType(answers),
      recommendations: this.generateRecommendations(sortedCareers[0].career)
    };
  }

  private calculateCareerScores(answers: Record<string, string>): Record<string, number> {
    // 实现评分算法
    const scores: Record<string, number> = {};
    
    // 根据答题结果计算各职业匹配度
    Object.entries(answers).forEach(([questionId, answer]) => {
      // 根据问题和答案更新职业分数
      this.updateScoresBasedOnAnswer(scores, questionId, answer);
    });
    
    return scores;
  }

  private updateScoresBasedOnAnswer(scores: Record<string, number>, questionId: string, answer: string): void {
    // 实现具体的评分逻辑
    // 例如：如果用户喜欢编程，增加技术类职业的分数
    if (questionId === 'programming_interest' && answer === 'high') {
      scores['tech-frontend'] = (scores['tech-frontend'] || 0) + 10;
      scores['tech-backend'] = (scores['tech-backend'] || 0) + 10;
    }
  }

  private determinePersonalityType(answers: Record<string, string>): string {
    // 实现MBTI或其他性格测试算法
    return 'INTJ'; // 示例
  }

  private generateRecommendations(career: CareerType): string[] {
    return [
      `建议重点学习${career.skills.slice(0, 3).join('、')}等核心技能`,
      `可以考虑从${career.growthPath.split(' → ')[0]}开始职业发展`,
      `适合在互联网、科技公司等环境工作`
    ];
  }
}