'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { questions } from '../questionnaire/questions';

// 职业类型定义
type CareerType = {
  id: string;
  title: string;
  description: string;
  suitableFor: string;
  growthPath: string;
  skills: string[];
};

// 预定义的职业类型
const careerTypes: CareerType[] = [
  {
    id: 'tech',
    title: '技术专家',
    description: '擅长解决复杂技术问题，热爱创新和研发工作。',
    suitableFor: '喜欢技术挑战、逻辑思维强、注重细节的人。',
    growthPath: '初级工程师 → 高级工程师 → 技术专家 → 架构师 → 技术总监',
    skills: ['编程能力', '问题解决', '持续学习', '技术分析']
  },
  {
    id: 'data',
    title: '数据分析师',
    description: '善于从数据中发现洞察，为决策提供支持。',
    suitableFor: '擅长数字分析、有好奇心、善于发现模式的人。',
    growthPath: '数据分析师 → 高级分析师 → 数据科学家 → 数据总监',
    skills: ['数据处理', '统计分析', '数据可视化', '业务理解']
  },
  {
    id: 'creative',
    title: '创意设计师',
    description: '具有创造力，能将想法转化为视觉或产品设计。',
    suitableFor: '有创意思维、审美能力强、关注用户体验的人。',
    growthPath: '初级设计师 → 高级设计师 → 设计主管 → 创意总监',
    skills: ['创意思维', '设计工具', '用户体验', '沟通表达']
  },
  {
    id: 'management',
    title: '管理者',
    description: '擅长规划、组织和领导团队实现目标。',
    suitableFor: '有领导力、善于沟通、战略思维强的人。',
    growthPath: '团队负责人 → 部门经理 → 高级经理 → 总监 → 副总裁',
    skills: ['领导力', '决策能力', '团队管理', '战略规划']
  },
  {
    id: 'communication',
    title: '人际关系专家',
    description: '擅长人际沟通和协调，能够建立良好的人际网络。',
    suitableFor: '外向、善于沟通、有同理心、情商高的人。',
    growthPath: '客户代表 → 客户经理 → 关系总监 → 首席客户官',
    skills: ['沟通能力', '谈判技巧', '人际关系', '情绪管理']
  }
];

// 根据答案分析职业倾向
function analyzeCareerType(answers: Record<string, string>): string {
  // 简单分析逻辑，实际应用中可能需要更复杂的算法
  const firstAnswer = answers['1'];
  
  if (firstAnswer === '技术研发与创新') return 'tech';
  if (firstAnswer === '数据分析与洞察') return 'data';
  if (firstAnswer === '创意设计与表达') return 'creative';
  if (firstAnswer === '战略规划与管理') return 'management';
  if (firstAnswer === '人际沟通与协调') return 'communication';
  
  // 默认返回技术专家
  return 'tech';
}

export default function Results() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [careerType, setCareerType] = useState<CareerType | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    try {
      // 从URL参数中获取答案数据
      const answersParam = searchParams.get('answers');
      
      if (answersParam) {
        const answers = JSON.parse(decodeURIComponent(answersParam));
        const typeId = analyzeCareerType(answers);
        const matchedType = careerTypes.find(type => type.id === typeId) || careerTypes[0];
        setCareerType(matchedType);
      } else {
        // 如果没有答案数据，重定向到问卷页面
        router.push('/questionnaire');
      }
    } catch (error) {
      console.error('解析答案数据出错', error);
    } finally {
      setLoading(false);
    }
  }, [searchParams, router]);

  const handleRetakeQuiz = () => {
    router.push('/questionnaire');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p>加载中...</p>
      </div>
    );
  }

  if (!careerType) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center">无法加载结果，请重新尝试。</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleRetakeQuiz}>重新测评</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">您的职业测评结果</CardTitle>
          <p className="text-gray-500 mt-2">基于您的回答，我们为您推荐以下职业发展方向</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h2 className="text-xl font-bold text-blue-800">{careerType.title}</h2>
            <p className="mt-2">{careerType.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">适合人群</h3>
              <p>{careerType.suitableFor}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">核心能力</h3>
              <ul className="list-disc pl-5 space-y-1">
                {careerType.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">职业发展路径</h3>
            <p>{careerType.growthPath}</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h3 className="font-semibold mb-2">下一步行动建议</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>深入了解{careerType.title}岗位的具体要求和行业趋势</li>
              <li>有针对性地提升核心能力中的薄弱项</li>
              <li>寻找该领域的导师或前辈进行交流</li>
              <li>参与相关的项目或实践活动积累经验</li>
            </ul>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleGoHome}>返回首页</Button>
          <Button onClick={handleRetakeQuiz}>重新测评</Button>
        </CardFooter>
      </Card>
    </div>
  );
}