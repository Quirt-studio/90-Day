'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-4xl text-center space-y-8">
        <h1 className="text-4xl font-bold text-blue-800">Career Compass Pro</h1>
        <p className="text-xl text-gray-600">专业的职业测评与规划系统</p>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">发现适合您的职业发展方向</CardTitle>
            <p className="text-gray-600 mt-2">
              通过回答一系列精心设计的问题，我们将帮助您分析职业兴趣和优势，
              为您提供个性化的职业发展建议和规划路径。
            </p>
          </CardHeader>
          
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">了解自我</h3>
                <p className="text-sm">发现您的职业兴趣、能力和价值观</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">职业匹配</h3>
                <p className="text-sm">找到最适合您特质的职业发展方向</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">发展规划</h3>
                <p className="text-sm">获取个性化的职业发展路径建议</p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg">
              <Link href="/questionnaire">开始职业测评</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <div className="text-gray-500 text-sm">
          <p>Career Compass Pro - 助您探索职业未来</p>
        </div>
      </div>
    </div>
  );
}