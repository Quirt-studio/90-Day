/**
 * 课程资源整合器模块
 * 负责收集与技能相关的课程资源并生成资源映射表
 */

import { Skill, Course, ResourceMap } from './types';

/**
 * 课程资源整合器类
 * 实现课程资源与技能的映射关系
 */
export class CourseIntegrator {
  // 模拟课程资源库
  private courseDatabase: Course[] = [
    {
      id: 'course-js-basic',
      title: 'JavaScript基础教程',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/javascript-basics',
      skillIds: ['skill-javascript'],
      level: 'beginner',
      duration: '4 weeks',
      rating: 4.7
    },
    {
      id: 'course-react-advanced',
      title: 'React高级开发实战',
      provider: 'Coursera',
      url: 'https://www.coursera.org/learn/react-advanced',
      skillIds: ['skill-react'],
      level: 'advanced',
      duration: '8 weeks',
      rating: 4.8
    },
    {
      id: 'course-python-data',
      title: 'Python数据分析入门',
      provider: 'DataCamp',
      url: 'https://www.datacamp.com/courses/python-data-analysis',
      skillIds: ['skill-python', 'skill-数据分析'],
      level: 'beginner',
      duration: '6 weeks',
      rating: 4.6
    },
    {
      id: 'course-ui-design',
      title: 'UI设计原理与实践',
      provider: 'Udacity',
      url: 'https://www.udacity.com/course/ui-design',
      skillIds: ['skill-ui', 'skill-figma'],
      level: 'intermediate',
      duration: '10 weeks',
      rating: 4.5
    },
    {
      id: 'course-product-management',
      title: '产品经理实战课程',
      provider: '极客时间',
      url: 'https://time.geekbang.org/course/intro/100053601',
      skillIds: ['skill-产品规划', 'skill-需求分析'],
      level: 'intermediate',
      duration: '12 weeks',
      rating: 4.9
    },
    {
      id: 'course-java-spring',
      title: 'Spring Boot企业级应用开发',
      provider: '慕课网',
      url: 'https://coding.imooc.com/class/401.html',
      skillIds: ['skill-java', 'skill-spring'],
      level: 'intermediate',
      duration: '16 weeks',
      rating: 4.7
    },
    {
      id: 'course-machine-learning',
      title: '机器学习实战',
      provider: 'Coursera',
      url: 'https://www.coursera.org/learn/machine-learning',
      skillIds: ['skill-机器学习', 'skill-python'],
      level: 'advanced',
      duration: '12 weeks',
      rating: 4.9
    },
    {
      id: 'course-vue-basics',
      title: 'Vue.js从入门到精通',
      provider: '慕课网',
      url: 'https://coding.imooc.com/class/419.html',
      skillIds: ['skill-vue'],
      level: 'beginner',
      duration: '8 weeks',
      rating: 4.6
    },
    {
      id: 'course-database-design',
      title: '数据库设计与优化',
      provider: 'Udemy',
      url: 'https://www.udemy.com/course/database-design',
      skillIds: ['skill-mysql', 'skill-postgresql', 'skill-sql'],
      level: 'intermediate',
      duration: '6 weeks',
      rating: 4.5
    },
    {
      id: 'course-ux-research',
      title: '用户体验研究方法',
      provider: 'LinkedIn Learning',
      url: 'https://www.linkedin.com/learning/ux-research-methods',
      skillIds: ['skill-ux', 'skill-用户研究'],
      level: 'intermediate',
      duration: '4 weeks',
      rating: 4.7
    }
  ];

  /**
   * 为技能匹配相关课程
   * @param skills 技能库
   * @returns 更新后的技能库（包含相关课程）
   */
  matchCoursesToSkills(skills: Skill[]): Skill[] {
    console.log('开始为技能匹配相关课程');
    
    return skills.map(skill => {
      // 查找与技能相关的课程
      const skillIdNormalized = `skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`;
      const relatedCourseIds = this.courseDatabase
        .filter(course => course.skillIds.some(id => 
          id.toLowerCase() === skillIdNormalized.toLowerCase() ||
          id.toLowerCase().includes(skill.name.toLowerCase())
        ))
        .map(course => course.id);
      
      return {
        ...skill,
        relatedCourses: relatedCourseIds
      };
    });
  }

  /**
   * 生成资源映射表
   * @param skills 技能库（包含相关课程）
   * @returns 资源映射表
   */
  generateResourceMap(skills: Skill[]): ResourceMap[] {
    console.log('开始生成资源映射表');
    
    const resourceMaps: ResourceMap[] = skills.map(skill => {
      // 计算相关性评分（这里简单地使用技能重要性作为相关性评分）
      const relevanceScore = skill.importance;
      
      return {
        skillId: skill.id,
        courseIds: skill.relatedCourses,
        relevanceScore
      };
    });
    
    console.log(`资源映射表生成完成，共${resourceMaps.length}条映射关系`);
    return resourceMaps;
  }

  /**
   * 获取所有课程
   * @returns 课程列表
   */
  getAllCourses(): Course[] {
    return this.courseDatabase;
  }

  /**
   * 根据技能推荐课程
   * @param skillIds 技能ID数组
   * @param limit 限制返回数量
   * @returns 推荐课程列表
   */
  recommendCoursesBySkills(skillIds: string[], limit: number = 5): Course[] {
    // 找出与技能相关的所有课程
    const relevantCourses = this.courseDatabase.filter(course => 
      course.skillIds.some(skillId => skillIds.includes(skillId))
    );
    
    // 按评分排序
    const sortedCourses = relevantCourses.sort((a, b) => b.rating - a.rating);
    
    // 返回前N个课程
    return sortedCourses.slice(0, limit);
  }
}