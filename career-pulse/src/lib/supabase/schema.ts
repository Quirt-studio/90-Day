/**
 * Supabase数据库模型定义
 * 定义职业测评系统所需的数据表结构
 */

/**
 * 职位信息表结构
 */
export interface JobPositionTable {
  id: string;           // 职位ID
  title: string;        // 职位标题
  company: string;      // 公司名称
  description: string;  // 职位描述
  requirements: string[]; // 职位要求
  skills: string[];     // 相关技能ID列表
  category: string;     // 职位类别
  created_at: string;   // 创建时间
}

/**
 * 技能信息表结构
 */
export interface SkillTable {
  id: string;           // 技能ID
  name: string;         // 技能名称
  category: string;     // 技能类别
  related_courses: string[]; // 相关课程ID列表
  importance: number;   // 重要性评分(1-5)
  created_at: string;   // 创建时间
}

/**
 * 课程资源表结构
 */
export interface CourseTable {
  id: string;           // 课程ID
  title: string;        // 课程标题
  provider: string;     // 课程提供商
  url: string;          // 课程链接
  skill_ids: string[];  // 相关技能ID列表
  level: string;        // 课程难度级别
  duration: string;     // 课程时长
  rating: number;       // 课程评分
  created_at: string;   // 创建时间
}

/**
 * 用户测评结果表结构
 */
export interface UserAssessmentTable {
  id: string;           // 测评ID
  user_id: string;      // 用户ID
  answers: Record<string, string>; // 问卷答案
  career_type: string;  // 推荐职业类型
  skills_to_develop: string[]; // 建议发展的技能
  recommended_courses: string[]; // 推荐课程
  created_at: string;   // 创建时间
}

/**
 * 资源映射表结构
 * 用于关联技能和课程资源
 */
export interface ResourceMapTable {
  skill_id: string;     // 技能ID
  course_ids: string[]; // 课程ID列表
  relevance_score: number; // 相关性评分
  created_at: string;   // 创建时间
}

/**
 * 数据库表名定义
 */
export const DB_TABLES = {
  JOB_POSITIONS: 'job_positions',
  SKILLS: 'skills',
  COURSES: 'courses',
  USER_ASSESSMENTS: 'user_assessments',
  RESOURCE_MAPS: 'resource_maps'
};

/**
 * 创建Supabase数据库表的SQL语句
 * 实际项目中可以使用Supabase的界面或迁移工具创建表
 */
export const CREATE_TABLES_SQL = {
  // 职位信息表
  JOB_POSITIONS: `
    CREATE TABLE ${DB_TABLES.JOB_POSITIONS} (
      id UUID PRIMARY KEY,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      description TEXT,
      requirements TEXT[],
      skills TEXT[],
      category TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `,
  
  // 技能信息表
  SKILLS: `
    CREATE TABLE ${DB_TABLES.SKILLS} (
      id UUID PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT,
      related_courses TEXT[],
      importance INTEGER CHECK (importance BETWEEN 1 AND 5),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `,
  
  // 课程资源表
  COURSES: `
    CREATE TABLE ${DB_TABLES.COURSES} (
      id UUID PRIMARY KEY,
      title TEXT NOT NULL,
      provider TEXT,
      url TEXT,
      skill_ids TEXT[],
      level TEXT,
      duration TEXT,
      rating NUMERIC CHECK (rating BETWEEN 0 AND 5),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `,
  
  // 用户测评结果表
  USER_ASSESSMENTS: `
    CREATE TABLE ${DB_TABLES.USER_ASSESSMENTS} (
      id UUID PRIMARY KEY,
      user_id UUID NOT NULL,
      answers JSONB,
      career_type TEXT,
      skills_to_develop TEXT[],
      recommended_courses TEXT[],
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `,
  
  // 资源映射表
  RESOURCE_MAPS: `
    CREATE TABLE ${DB_TABLES.RESOURCE_MAPS} (
      skill_id UUID REFERENCES ${DB_TABLES.SKILLS}(id),
      course_ids TEXT[],
      relevance_score NUMERIC,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      PRIMARY KEY (skill_id)
    );
  `
};