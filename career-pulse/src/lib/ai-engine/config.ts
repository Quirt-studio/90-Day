/**
 * AI引擎配置
 */

export const AI_CONFIG = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4',
    maxTokens: 2000,
    temperature: 0.7
  },
  rateLimit: {
    requestsPerMinute: 60,
    requestsPerHour: 1000
  },
  cache: {
    ttl: 3600, // 1小时缓存
    maxSize: 1000
  }
};

// 验证配置
export function validateAIConfig(): boolean {
  if (!AI_CONFIG.openai.apiKey) {
    console.error('OpenAI API密钥未配置');
    return false;
  }
  return true;
}