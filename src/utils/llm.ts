/**
 * 大模型接口封装
 * 支持通义千问等主流大模型
 */

export interface LLMResponse {
  text: string
  error?: string
}

/**
 * 通义千问API封装
 */
export class TongyiLLM {
  private apiKey: string
  private apiUrl = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation'
  
  constructor(apiKey?: string) {
    this.apiKey = apiKey || import.meta.env.VITE_TONGYI_API_KEY || ''
  }
  
  /**
   * 发送对话请求
   * @param message 用户消息
   * @param systemPrompt 系统提示词
   */
  async chat(message: string, systemPrompt?: string): Promise<string> {
    if (!this.apiKey) {
      console.warn('未配置通义千问API Key，返回模拟回复')
      return this.getMockResponse(message)
    }
    
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'qwen-turbo',
          input: {
            messages: [
              {
                role: 'system',
                content: systemPrompt || '你是一个专业的展厅导览助手，请用简洁友好的语言回答问题。'
              },
              {
                role: 'user',
                content: message
              }
            ]
          },
          parameters: {
            result_format: 'message'
          }
        })
      })
      
      const data = await response.json()
      
      if (data.output && data.output.choices && data.output.choices[0]) {
        return data.output.choices[0].message.content
      }
      
      throw new Error('API返回格式错误')
    } catch (error) {
      console.error('通义千问API调用失败:', error)
      return this.getMockResponse(message)
    }
  }
  
  /**
   * 获取模拟回复（用于演示）
   */
  private getMockResponse(message: string): string {
    const responses: Record<string, string> = {
      '你好': '您好！欢迎来到我们的展厅，我是您的智能导览助手，很高兴为您服务。',
      '展厅': '我们的展厅分为四个主要区域：企业文化区、产品展示区、技术创新区和未来展望区。您想了解哪个区域呢？',
      '产品': '我们的核心产品包括智能硬件、软件平台和解决方案。每个产品都经过精心设计，致力于为客户创造价值。',
      '技术': '我们在人工智能、大数据、云计算等领域拥有深厚的技术积累，持续投入研发创新。',
      '参观': '建议您按照：企业文化区 → 产品展示区 → 技术创新区 → 未来展望区的顺序参观，全程约需30-40分钟。'
    }
    
    // 简单的关键词匹配
    for (const [keyword, response] of Object.entries(responses)) {
      if (message.includes(keyword)) {
        return response
      }
    }
    
    return '感谢您的提问。如需了解更多信息，欢迎向我提问或咨询现场工作人员。'
  }
}

/**
 * 创建LLM实例的工厂函数
 */
export function createLLM(type: 'tongyi' | 'gpt' = 'tongyi') {
  switch (type) {
    case 'tongyi':
      return new TongyiLLM()
    default:
      return new TongyiLLM()
  }
}
