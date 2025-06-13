/**
 * OpenAI集成模块
 * 实现技能差距分析和学习路线图生成
 */

import OpenAI from 'openai';
import { UserProfile, Skill, LearningPath } from '../data-processing/types';

export interface GapAnalysisResult {
  missingSkills: string[];
  skillGaps: {
    skill: string;
    currentLevel: string;
    targetLevel: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  recommendations: string[];
}

export interface LearningRoadmap {
  totalDuration: string;
  phases: {
    phase: number;
    title: string;
    duration: string;
    skills: string[];
    courses: string[];
    milestones: string[];
  }[];
  timeline: {
    week: number;
    activities: string[];
    goals: string[];
  }[];
}

export class OpenAIIntegration {
  private openai: OpenAI;
  
  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey
    });
  }

  /**
   * 生成学习路线图 - 对应Python中的generateRoadmap函数
   * @param userInput 用户输入信息
   * @returns 学习路线图
   */
  async generateRoadmap(userInput: {
    skills: string[];
    targetJob: string;
    dbSkills: string[];
    learningResources: any[];
  }): Promise<LearningRoadmap> {
    console.log('开始生成AI学习路线图');
    
    // 1. 技能差距分析
    const gapAnalysisPrompt = `
用户技能: ${userInput.skills.join(', ')}
目标职位: ${userInput.targetJob}
数据库技能要求: ${userInput.dbSkills.join(', ')}
---
输出: {差距技能}, {优势技能}
    `.trim();
    
    const gapAnalysis = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'user',
        content: gapAnalysisPrompt
      }],
      temperature: 0.7,
      max_tokens: 500
    });
    
    // 2. 生成学习计划
    const roadmapPrompt = `
根据差距: ${gapAnalysis.choices[0].message.content}
学习资源库: ${JSON.stringify(userInput.learningResources)}
生成90天计划，按周拆分
    `.trim();
    
    const roadmapResponse = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'user',
        content: roadmapPrompt
      }],
      temperature: 0.7,
      max_tokens: 1500
    });
    
    // 解析AI响应并结构化
    return this.parseRoadmapResponse(roadmapResponse.choices[0].message.content || '');
  }

  /**
   * 技能差距分析
   * @param currentSkills 当前技能
   * @param targetJob 目标职位
   * @param requiredSkills 职位要求技能
   */
  async analyzeSkillGaps(
    currentSkills: string[], 
    targetJob: string, 
    requiredSkills: string[]
  ): Promise<GapAnalysisResult> {
    const prompt = `
作为职业规划专家，请分析以下技能差距：

当前技能: ${currentSkills.join(', ')}
目标职位: ${targetJob}
职位要求: ${requiredSkills.join(', ')}

请提供：
1. 缺失的关键技能
2. 需要提升的技能及其优先级
3. 学习建议

请以JSON格式返回结果。
    `.trim();
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: '你是一个专业的职业规划顾问，擅长技能分析和职业发展建议。'
      }, {
        role: 'user',
        content: prompt
      }],
      temperature: 0.3,
      max_tokens: 800
    });
    
    return this.parseGapAnalysisResponse(response.choices[0].message.content || '');
  }

  /**
   * 个性化课程推荐
   * @param skillGaps 技能差距
   * @param learningStyle 学习风格
   * @param timeAvailable 可用时间
   */
  async recommendCourses(
    skillGaps: string[], 
    learningStyle: string, 
    timeAvailable: number
  ): Promise<{
    courses: {
      title: string;
      provider: string;
      duration: string;
      difficulty: string;
      reason: string;
    }[];
    studyPlan: {
      week: number;
      focus: string;
      hours: number;
      activities: string[];
    }[];
  }> {
    const prompt = `
基于以下信息推荐学习课程：

需要学习的技能: ${skillGaps.join(', ')}
学习风格: ${learningStyle}
每周可用时间: ${timeAvailable}小时

请推荐：
1. 适合的在线课程（包括平台、时长、难度）
2. 详细的学习计划（按周安排）

以JSON格式返回。
    `.trim();
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: '你是一个在线教育专家，熟悉各大学习平台的课程质量和特点。'
      }, {
        role: 'user',
        content: prompt
      }],
      temperature: 0.5,
      max_tokens: 1200
    });
    
    return this.parseCourseRecommendations(response.choices[0].message.content || '');
  }

  /**
   * 职业发展建议
   * @param userProfile 用户档案
   * @param marketTrends 市场趋势
   */
  async generateCareerAdvice(
    userProfile: UserProfile, 
    marketTrends: any
  ): Promise<{
    shortTermGoals: string[];
    longTermGoals: string[];
    actionItems: string[];
    riskFactors: string[];
    opportunities: string[];
  }> {
    const prompt = `
基于用户档案和市场趋势，提供职业发展建议：

用户档案: ${JSON.stringify(userProfile, null, 2)}
市场趋势: ${JSON.stringify(marketTrends, null, 2)}

请提供：
1. 短期目标（6个月内）
2. 长期目标（2-3年）
3. 具体行动计划
4. 潜在风险
5. 发展机会

以JSON格式返回。
    `.trim();
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: '你是一个资深的职业规划师，具有丰富的行业洞察和职业发展经验。'
      }, {
        role: 'user',
        content: prompt
      }],
      temperature: 0.4,
      max_tokens: 1000
    });
    
    return this.parseCareerAdvice(response.choices[0].message.content || '');
  }

  /**
   * 解析路线图响应
   */
  private parseRoadmapResponse(response: string): LearningRoadmap {
    try {
      // 尝试解析JSON响应
      const parsed = JSON.parse(response);
      return parsed;
    } catch (error) {
      // 如果不是JSON格式，进行文本解析
      return this.parseTextRoadmap(response);
    }
  }

  private parseTextRoadmap(text: string): LearningRoadmap {
    // 文本解析逻辑
    const lines = text.split('\n').filter(line => line.trim());
    const phases: any[] = [];
    const timeline: any[] = [];
    
    // 简化的解析逻辑
    let currentPhase = 1;
    for (let i = 0; i < 12; i += 4) { // 按4周为一个阶段
      phases.push({
        phase: currentPhase++,
        title: `第${currentPhase}阶段学习`,
        duration: '4周',
        skills: ['技能' + currentPhase],
        courses: ['课程' + currentPhase],
        milestones: ['里程碑' + currentPhase]
      });
    }
    
    // 生成周计划
    for (let week = 1; week <= 12; week++) {
      timeline.push({
        week,
        activities: [`第${week}周学习活动`],
        goals: [`第${week}周目标`]
      });
    }
    
    return {
      totalDuration: '12周',
      phases,
      timeline
    };
  }

  private parseGapAnalysisResponse(response: string): GapAnalysisResult {
    try {
      return JSON.parse(response);
    } catch (error) {
      // 默认响应
      return {
        missingSkills: ['待分析'],
        skillGaps: [],
        recommendations: ['请重新分析']
      };
    }
  }

  private parseCourseRecommendations(response: string): any {
    try {
      return JSON.parse(response);
    } catch (error) {
      return {
        courses: [],
        studyPlan: []
      };
    }
  }

  private parseCareerAdvice(response: string): any {
    try {
      return JSON.parse(response);
    } catch (error) {
      return {
        shortTermGoals: [],
        longTermGoals: [],
        actionItems: [],
        riskFactors: [],
        opportunities: []
      };
    }
  }
}