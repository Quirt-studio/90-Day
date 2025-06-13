/**
 * 技能提取器模块
 * 负责从职位描述中提取关键技能并构建技能库
 */

import { JobPosition, Skill } from './types';

/**
 * 技能提取器类
 * 实现从职位描述中提取技能关键词的功能
 */
export class SkillExtractor {
  // 技能关键词库
  private skillKeywords: Record<string, string[]> = {
    'frontend': ['JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'HTML', 'CSS', 'Webpack', 'Babel', 'Redux', 'Next.js', 'Nuxt.js', 'Sass', 'Less', 'TailwindCSS', 'Bootstrap', 'Material UI', 'Responsive Design', 'PWA', 'SPA'],
    'backend': ['Java', 'Python', 'Node.js', 'Spring', 'Django', 'Express', 'MySQL', 'MongoDB', 'Redis', 'PostgreSQL', 'GraphQL', 'RESTful API', 'Microservices', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD', 'Git'],
    'data': ['SQL', 'Python', 'R', 'Tableau', 'Power BI', '数据分析', '数据挖掘', '机器学习', '深度学习', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn', 'Hadoop', 'Spark', 'ETL', '数据仓库', '数据可视化', 'SPSS'],
    'design': ['UI', 'UX', 'Figma', 'Sketch', 'Adobe XD', 'Photoshop', '用户研究', '原型设计', 'Illustrator', 'InDesign', '交互设计', '视觉设计', '品牌设计', '用户测试', '信息架构', '可用性测试', '设计系统', '响应式设计', '动效设计', '图标设计'],
    'product': ['需求分析', '产品规划', '用户故事', '原型设计', '数据分析', '项目管理', '市场调研', '竞品分析', '用户画像', '用户旅程', 'A/B测试', '敏捷开发', 'Scrum', '产品路线图', 'PRD', 'MRD', '用户反馈', '产品迭代', 'KPI分析', 'OKR']
  };

  /**
   * 从职位信息中提取技能关键词
   * @param positions 职位信息数组
   * @returns 更新后的职位信息数组（包含提取的技能）
   */
  extractSkills(positions: JobPosition[]): JobPosition[] {
    console.log('开始从职位描述中提取技能关键词');
    
    return positions.map(position => {
      const category = position.category;
      const relevantKeywords = this.skillKeywords[category] || [];
      const extractedSkills: string[] = [];
      
      // 从职位描述和要求中提取技能
      const textToAnalyze = position.description + ' ' + position.requirements.join(' ');
      
      // 实际项目中可以使用NLP技术或正则表达式进行更精确的提取
      // 这里使用简单的关键词匹配方法
      relevantKeywords.forEach(skill => {
        // 不区分大小写的匹配
        const regex = new RegExp(`\\b${skill}\\b`, 'i');
        if (regex.test(textToAnalyze) && !extractedSkills.includes(skill)) {
          extractedSkills.push(skill);
        }
      });
      
      // 如果没有提取到技能，随机选择一些相关技能（仅用于演示）
      if (extractedSkills.length === 0) {
        const randomSkills = this.getRandomSkills(category, 3);
        extractedSkills.push(...randomSkills);
      }
      
      return {
        ...position,
        skills: extractedSkills
      };
    });
  }

  /**
   * 构建技能库
   * @param positions 包含技能的职位信息
   * @returns 技能库
   */
  buildSkillLibrary(positions: JobPosition[]): Skill[] {
    console.log('开始构建技能库');
    
    // 收集所有技能并计算出现频率
    const skillFrequency: Record<string, number> = {};
    positions.forEach(position => {
      position.skills.forEach(skill => {
        skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
      });
    });
    
    // 转换为技能库格式
    const skills: Skill[] = Object.keys(skillFrequency).map(skillName => {
      // 计算重要性（基于出现频率）
      const frequency = skillFrequency[skillName];
      const importance = Math.min(5, Math.max(1, Math.ceil(frequency / positions.length * 10)));
      
      return {
        id: `skill-${skillName.toLowerCase().replace(/\s+/g, '-')}`,
        name: skillName,
        category: this.getCategoryForSkill(skillName),
        relatedCourses: [],  // 将在后续步骤中填充
        importance
      };
    });
    
    console.log(`成功构建包含${skills.length}个技能的技能库`);
    return skills;
  }

  /**
   * 确定技能所属类别
   * @param skillName 技能名称
   * @returns 技能类别
   */
  private getCategoryForSkill(skillName: string): string {
    for (const [category, keywords] of Object.entries(this.skillKeywords)) {
      if (keywords.includes(skillName)) {
        return category;
      }
    }
    return 'other';
  }

  /**
   * 获取随机技能（用于演示）
   * @param category 技能类别
   * @param count 技能数量
   * @returns 随机技能数组
   */
  private getRandomSkills(category: string, count: number): string[] {
    const availableSkills = this.skillKeywords[category] || [];
    const result: string[] = [];
    
    if (availableSkills.length === 0) {
      return result;
    }
    
    // 随机选择指定数量的技能
    for (let i = 0; i < count && i < availableSkills.length; i++) {
      const randomIndex = Math.floor(Math.random() * availableSkills.length);
      const skill = availableSkills[randomIndex];
      
      if (!result.includes(skill)) {
        result.push(skill);
      }
    }
    
    return result;
  }
}