# Career Compass Pro - 设计规范说明文档

## 项目概述

**项目名称**: Career Compass Pro 高保真交互原型  
**设计目标**: 基于产品需求文档(PRD)和用户故事地图，创建现代化、专业的职业发展平台原型  
**目标平台**: Web端优先，响应式设计  
**设计风格**: 现代简约、专业商务、暗色主题优先  

## 技术栈

### 核心技术
- **HTML5**: 语义化标签，现代Web标准
- **Tailwind CSS**: 实用优先的CSS框架，快速构建现代UI
- **Font Awesome**: 丰富的图标库，提供一致的视觉语言
- **JavaScript**: 基础交互逻辑和动态效果

### 图片资源
- **Unsplash**: 高质量免费图片 (https://unsplash.com)
- **Pexels**: 专业摄影图片 (https://pexels.com)
- **Apple官方资源**: UI参考和设计灵感

## 设计系统

### 色彩方案

#### 主色调 (暗色主题)
- **背景色**: `bg-gray-900` (#111827)
- **卡片背景**: `bg-gray-800` (#1f2937)
- **文本主色**: `text-white` (#ffffff)
- **文本次要**: `text-gray-300` (#d1d5db)

#### 功能色彩
- **主要操作**: `bg-blue-600` (#2563eb)
- **成功状态**: `bg-green-600` (#16a34a)
- **警告状态**: `bg-yellow-600` (#ca8a04)
- **危险状态**: `bg-red-600` (#dc2626)
- **信息提示**: `bg-indigo-600` (#4f46e5)

#### 特色功能色彩
- **AI定位器**: `text-purple-600` (#9333ea)
- **技能热力图**: `text-red-600` (#dc2626)
- **计划生成器**: `text-green-600` (#16a34a)
- **职位分析**: `text-indigo-600` (#4f46e5)
- **风险计算**: `text-orange-600` (#ea580c)

### 字体系统

#### 字体族
- **无衬线字体**: `font-sans` (Inter, system-ui, sans-serif)
- **等宽字体**: `font-mono` (用于代码和数据显示)

#### 字体大小
- **标题1**: `text-4xl` (36px)
- **标题2**: `text-3xl` (30px)
- **标题3**: `text-2xl` (24px)
- **标题4**: `text-xl` (20px)
- **正文**: `text-base` (16px)
- **小字**: `text-sm` (14px)
- **极小字**: `text-xs` (12px)

#### 字重
- **粗体**: `font-bold` (700)
- **半粗**: `font-semibold` (600)
- **中等**: `font-medium` (500)
- **常规**: `font-normal` (400)

### 间距系统

#### 内边距
- **极小**: `p-1` (4px)
- **小**: `p-2` (8px)
- **中**: `p-4` (16px)
- **大**: `p-6` (24px)
- **极大**: `p-8` (32px)

#### 外边距
- **极小**: `m-1` (4px)
- **小**: `m-2` (8px)
- **中**: `m-4` (16px)
- **大**: `m-6` (24px)
- **极大**: `m-8` (32px)

### 圆角系统
- **小圆角**: `rounded` (4px)
- **中圆角**: `rounded-md` (6px)
- **大圆角**: `rounded-lg` (8px)
- **超大圆角**: `rounded-xl` (12px)
- **圆形**: `rounded-full`

### 阴影系统
- **轻微阴影**: `shadow-sm`
- **标准阴影**: `shadow`
- **中等阴影**: `shadow-md`
- **较大阴影**: `shadow-lg`
- **超大阴影**: `shadow-xl`

## 组件规范

### 按钮组件

#### 主要按钮
```html
<button class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
    主要操作
</button>
```

#### 次要按钮
```html
<button class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
    次要操作
</button>
```

#### 危险按钮
```html
<button class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
    危险操作
</button>
```

### 卡片组件

#### 标准卡片
```html
<div class="bg-gray-800 rounded-lg shadow-lg p-6">
    <!-- 卡片内容 -->
</div>
```

#### 交互卡片
```html
<div class="bg-gray-800 hover:bg-gray-700 rounded-lg shadow-lg p-6 transition-colors cursor-pointer">
    <!-- 卡片内容 -->
</div>
```

### 表单组件

#### 输入框
```html
<input class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" 
       type="text" placeholder="请输入...">
```

#### 选择框
```html
<select class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
    <option>选项1</option>
    <option>选项2</option>
</select>
```

### 导航组件

#### 顶部导航
```html
<nav class="bg-gray-800 border-b border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 导航内容 -->
    </div>
</nav>
```

#### 侧边导航
```html
<aside class="w-64 bg-gray-800 border-r border-gray-700">
    <!-- 侧边栏内容 -->
</aside>
```

## 页面结构

### 标准页面布局
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题 - Career Compass Pro</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-900 text-white">
    <!-- 页面内容 -->
</body>
</html>
```

### 响应式断点
- **sm**: 640px+
- **md**: 768px+
- **lg**: 1024px+
- **xl**: 1280px+
- **2xl**: 1536px+

## 交互设计原则

### 状态反馈
1. **悬停状态**: 使用 `hover:` 前缀提供视觉反馈
2. **焦点状态**: 使用 `focus:` 前缀突出当前焦点
3. **活动状态**: 使用 `active:` 前缀表示点击状态
4. **禁用状态**: 使用 `disabled:` 前缀和透明度变化

### 动画过渡
1. **标准过渡**: `transition-colors duration-200`
2. **变换过渡**: `transition-transform duration-300`
3. **透明度过渡**: `transition-opacity duration-200`
4. **综合过渡**: `transition-all duration-200`

### 加载状态
1. **骨架屏**: 使用灰色占位块
2. **进度条**: 显示具体进度百分比
3. **旋转器**: 用于不确定时长的加载
4. **脉冲动画**: `animate-pulse` 类

## 可访问性规范

### 语义化标签
- 使用正确的HTML5语义标签
- 为图片添加 `alt` 属性
- 为表单元素添加 `label`
- 使用 `aria-*` 属性增强可访问性

### 键盘导航
- 确保所有交互元素可通过键盘访问
- 提供清晰的焦点指示器
- 支持Tab键顺序导航

### 颜色对比
- 确保文本与背景有足够的对比度
- 不仅依赖颜色传达信息
- 提供替代的视觉提示

## 性能优化

### 图片优化
1. 使用适当的图片格式
2. 提供多种尺寸的响应式图片
3. 实现懒加载
4. 使用CDN加速

### CSS优化
1. 使用Tailwind的purge功能移除未使用的样式
2. 合并和压缩CSS文件
3. 使用关键CSS内联

### JavaScript优化
1. 最小化JavaScript使用
2. 使用事件委托
3. 避免阻塞渲染的脚本

## 浏览器兼容性

### 支持的浏览器
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 降级策略
- 提供基础功能的fallback
- 使用feature detection
- 渐进式增强

## 文件组织结构

```
design/
├── prototypes/
│   ├── index.html          # 主入口页面
│   ├── home.html           # 首页原型
│   ├── auth.html           # 认证页面
│   ├── locator.html        # AI定位器
│   ├── heatmap.html        # 技能热力图
│   ├── planner.html        # 计划生成器
│   ├── analyzer.html       # 职位分析器
│   ├── calculator.html     # 风险计算器
│   └── profile.html        # 个人中心
├── specs/
│   └── Design_Spec.md      # 设计规范文档
└── assets/
    ├── images/             # 图片资源
    ├── icons/              # 图标资源
    └── fonts/              # 字体文件
```

## 维护和更新

### 版本控制
- 使用语义化版本号
- 记录重要变更
- 保持向后兼容性

### 文档更新
- 及时更新设计规范
- 记录新增组件和模式
- 维护组件使用示例

### 质量保证
- 定期进行可访问性测试
- 跨浏览器兼容性检查
- 性能监控和优化

---

**文档版本**: 1.0  
**最后更新**: 2024年12月  
**维护者**: UI/UX设计团队