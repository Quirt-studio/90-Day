/**
 * 数据处理模块类型定义
 * 定义职业测评系统数据处理所需的各种接口
 */

/**
 * 职位信息接口
 */
export interface JobPosition {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  skills: string[];
  category: string;
  createdAt: Date;
}

/**
 * 技能信息接口
 */
export interface Skill {
  id: string;
  name: string;
  category: string;
  relatedCourses: string[];
  importance: number; // 1-5 表示重要性
}

/**
 * 课程资源接口
 */
export interface Course {
  id: string;
  title: string;
  provider: string;
  url: string;
  skillIds: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string; // 例如 "2 weeks", "3 months"
  rating: number; // 1-5
}

/**
 * 用户测评结果接口
 */
export interface UserAssessment {
  id: string;
  userId: string;
  answers: Record<string, string>;
  careerType: string;
  skillsToDevelop: string[];
  recommendedCourses: string[];
  createdAt: Date;
}

/**
 * 资源映射表接口
 */
export interface ResourceMap {
  skillId: string;
  courseIds: string[];
  relevanceScore: number;
}

/**
 * 职业类型接口
 */
export interface CareerType {
  id: string;
  title: string;
  description: string;
  suitableFor: string;
  growthPath: string;
  skills: string[];
}

/**
 * 职业测评问题接口
 */
export interface AssessmentQuestion {
  id: string;
  category: 'personality' | 'interest' | 'skill' | 'value';
  question: string;
  options: {
    value: string;
    label: string;
    weight: Record<string, number>; // 对不同职业的权重
  }[];
  required: boolean;
}

/**
 * 学习路径接口
 */
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  targetCareer: string;
  prerequisites: string[];
  steps: {
    id: string;
    title: string;
    description: string;
    skills: string[];
    courses: string[];
    estimatedTime: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  }[];
  totalDuration: string;
  successRate: number;
}

/**
 * 市场数据接口
 */
export interface MarketData {
  skillId: string;
  demand: number; // 1-100
  averageSalary: {
    junior: number;
    mid: number;
    senior: number;
  };
  growthRate: number; // 年增长率
  jobCount: number;
  topCompanies: string[];
  locations: {
    city: string;
    jobCount: number;
    averageSalary: number;
  }[];
}

/**
 * 用户档案接口
 */
export interface UserProfile {
  id: string;
  currentSkills: {
    skillId: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    experience: number; // 年数
  }[];
  targetCareer: string;
  learningPreferences: {
    timeAvailable: number; // 每周小时数
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
    budget: number;
    preferredProviders: string[];
  };
  assessmentResults: UserAssessment[];
  learningProgress: {
    courseId: string;
    progress: number; // 0-100
    startDate: Date;
    completedDate?: Date;
  }[];
}