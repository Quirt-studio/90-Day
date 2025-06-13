export type Question = {
  id: string;
  text: string;
  type: 'multiple' | 'scale';
  options?: string[];
  minLabel?: string;
  maxLabel?: string;
};

export const questions: Question[] = [
  {
    id: '1',
    text: '您对以下哪种工作内容最感兴趣？',
    type: 'multiple',
    options: [
      '技术研发与创新',
      '数据分析与洞察',
      '创意设计与表达',
      '战略规划与管理',
      '人际沟通与协调'
    ]
  },
  {
    id: '2',
    text: '您希望未来3年的薪资增长幅度如何？',
    type: 'scale',
    minLabel: '保持稳定',
    maxLabel: '快速增长'
  },
  {
    id: '3',
    text: '您更看重工作环境的哪些方面？',
    type: 'multiple',
    options: [
      '团队合作氛围',
      '学习成长机会',
      '工作生活平衡',
      '公司文化价值观',
      '福利待遇'
    ]
  }
];