/**
 * AI引擎使用示例
 * 展示如何集成到Career Compass Pro系统中
 */

import { AIEngineManager } from './ai-manager';

// 初始化AI引擎
const aiEngine = new AIEngineManager(process.env.OPENAI_API_KEY!);

// 使用示例 - 对应Python代码的功能
async function demonstrateAIFeatures() {
  try {
    // 用户输入
    const userInput = {
      currentSkills: ['JavaScript', 'HTML', 'CSS'],
      targetJob: '前端工程师',
      experience: 2,
      learningPreferences: {
        timeAvailable: 10, // 每周10小时
        learningStyle: 'visual',
        budget: 500
      }
    };
    
    // 执行综合分析
    const analysis = await aiEngine.performComprehensiveAnalysis(userInput);
    
    console.log('=== AI分析结果 ===');
    console.log('技能差距:', analysis.gapAnalysis);
    console.log('学习路线图:', analysis.learningRoadmap);
    console.log('课程推荐:', analysis.courseRecommendations);
    console.log('职业建议:', analysis.careerAdvice);
    
    // 技能评估
    const skillAssessment = await aiEngine.assessSkillLevel({
      'javascript_basics': '熟练',
      'react_knowledge': '一般',
      'problem_solving': '良好'
    });
    
    console.log('=== 技能评估结果 ===');
    console.log(skillAssessment);
    
  } catch (error) {
    console.error('AI功能演示失败:', error);
  }
}

// 导出供其他模块使用
export { demonstrateAIFeatures };
export { AIEngineManager };