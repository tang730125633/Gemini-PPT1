import { SlideType, SlideData, GridItem, TimelineItem, ChartDataPoint } from './types';

export const SLIDES: SlideData[] = [
  {
    id: 1,
    type: SlideType.TITLE,
    title: "Gemini 3",
    subtitle: "技术突破与行业影响 / Technical Breakthroughs & Industry Impact",
    notes: "Introduction to the Gemini 3 era."
  },
  {
    id: 2,
    type: SlideType.GRID,
    title: "核心技术优势",
    subtitle: "Core Technical Advantages",
    content: [
      {
        icon: "code",
        title: "前端开发革命",
        description: "首次实现AI前端代码高精度生成，支持1:1还原设计稿（内边距、交互逻辑）。",
        highlight: "需求理解准确率 +300%"
      },
      {
        icon: "layers",
        title: "全栈能力整合",
        description: "Gemini 3 (前端) + Codex (后端) 组合。在架构调整与Bug修复上表现突出。",
        highlight: "200美元 = 企业级开发"
      },
      {
        icon: "cpu",
        title: "多模态生产力",
        description: "动态生成可交互UI（游戏、看板）与高密度长图文内容。",
        highlight: "效率提升 5-8倍"
      }
    ] as GridItem[]
  },
  {
    id: 3,
    type: SlideType.SPLIT_CHART,
    title: "前端开发革命 vs 传统模型",
    subtitle: "Performance Metrics",
    content: {
      description: [
        "解决传统AI编程的“抽卡式”输出痛点",
        "支持自动处理复杂交互逻辑（滚动加载、动画）",
        "从单纯的代码补全进化为完整的UI还原"
      ],
      chartData: [
        { name: 'GPT-4 Legacy', value: 30, fullMark: 100 },
        { name: 'Gemini 3', value: 95, fullMark: 100 },
      ] as ChartDataPoint[],
      chartLabel: "需求理解准确率"
    }
  },
  {
    id: 4,
    type: SlideType.TIMELINE,
    title: "软件范式演进",
    subtitle: "Evolution of Software Paradigms",
    content: [
      {
        phase: "1.0",
        paradigm: "代码即逻辑",
        tech: "手工编写业务逻辑",
        limitation: "依赖人力，扩展性差"
      },
      {
        phase: "2.0",
        paradigm: "代码即数据",
        tech: "神经网络 / 深度学习",
        limitation: "黑箱操作，交互薄弱"
      },
      {
        phase: "3.0",
        paradigm: "代码即意图",
        tech: "Gemini 3 + Gen UI",
        limitation: "需新型开发工具链"
      }
    ] as TimelineItem[]
  },
  {
    id: 5,
    type: SlideType.LIST,
    title: "Software 3.0 特征",
    subtitle: "Defining the New Era",
    content: [
      {
        icon: "waves",
        title: "流体软件 (Fluid Software)",
        description: "AI实时生成可运行代码流，界面动态渲染后即弃，不再有固定的App形态。"
      },
      {
        icon: "git-merge",
        title: "架构革新 (Architecture Innovation)",
        description: "打破前后端边界，形成“服务端决策 → 客户端渲染”的新范式。"
      },
      {
        icon: "zap",
        title: "意图编程 (Intent Programming)",
        description: "开发者仅需描述业务目标，AI自主完成逻辑实现与交互设计。"
      }
    ] as GridItem[]
  },
  {
    id: 6,
    type: SlideType.GRID,
    title: "商业生态价值",
    subtitle: "Business Ecosystem Value",
    content: [
      {
        icon: "box",
        title: "Google技术矩阵",
        description: "自研TPU摆脱硬件依赖。云计算+数据中心+全栈AI模型的闭环生态。",
        highlight: "全栈闭环"
      },
      {
        icon: "trending-up",
        title: "投资风向标",
        description: "Generative UI开启新交互时代。预计3年内重构SaaS产品形态（Figma/Webflow）。",
        highlight: "SaaS 重构"
      },
      {
        icon: "users",
        title: "开发者红利",
        description: "个人开发者200美元/月成本 = 原10人团队产出。教育领域出现“游戏化学习”。",
        highlight: "1人 = 10人团队"
      }
    ] as GridItem[]
  },
  {
    id: 7,
    type: SlideType.CONCLUSION,
    title: "关键结论",
    subtitle: "The Core Takeaway",
    content: "Gemini 3不仅是工具升级，更是推动行业进入“意图驱动开发”时代的核心引擎。它与Generative UI的结合将重新定义人机协作的边界。"
  }
];
