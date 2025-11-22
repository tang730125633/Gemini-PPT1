import React from 'react';
import { motion } from 'framer-motion';
import { SlideData, GridItem, TimelineItem, ChartDataPoint } from '../types';
import { 
  Code, Layers, Cpu, Zap, GitMerge, Waves, Box, TrendingUp, Users, CheckCircle, ArrowRight 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Icon mapping helper
const getIcon = (name: string, size = 24) => {
  const props = { size, className: "text-blue-400" };
  switch (name) {
    case 'code': return <Code {...props} />;
    case 'layers': return <Layers {...props} />;
    case 'cpu': return <Cpu {...props} />;
    case 'waves': return <Waves {...props} />;
    case 'git-merge': return <GitMerge {...props} />;
    case 'zap': return <Zap {...props} />;
    case 'box': return <Box {...props} />;
    case 'trending-up': return <TrendingUp {...props} />;
    case 'users': return <Users {...props} />;
    default: return <CheckCircle {...props} />;
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 50 }
  }
};

// --- 1. Title Slide ---
export const TitleSlide: React.FC<{ slide: SlideData }> = ({ slide }) => (
  <div className="flex flex-col items-center justify-center h-full text-center px-8">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="mb-6 inline-block p-4 rounded-full bg-blue-500/10 border border-blue-500/30">
        <Zap size={48} className="text-blue-400" />
      </div>
      <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-400 to-purple-400 mb-6">
        {slide.title}
      </h1>
      <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8 rounded-full" />
      <h2 className="text-2xl md:text-3xl text-slate-300 font-light tracking-wide max-w-4xl">
        {slide.subtitle}
      </h2>
    </motion.div>
  </div>
);

// --- 2. Grid Slide (Features/Cards) ---
export const GridSlide: React.FC<{ slide: SlideData }> = ({ slide }) => (
  <div className="flex flex-col h-full justify-center px-4 md:px-16">
    <div className="mb-12">
      <h2 className="text-4xl font-bold text-white mb-2">{slide.title}</h2>
      <p className="text-xl text-slate-400">{slide.subtitle}</p>
    </div>
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {(slide.content as GridItem[]).map((item, idx) => (
        <motion.div 
          key={idx} 
          variants={itemVariants}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl hover:bg-slate-800/80 transition-colors relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110">
             {getIcon(item.icon, 120)}
          </div>
          <div className="mb-6 bg-slate-900/50 w-16 h-16 rounded-xl flex items-center justify-center border border-slate-700/50 shadow-lg">
            {getIcon(item.icon, 32)}
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
          <p className="text-slate-300 leading-relaxed mb-6">{item.description}</p>
          {item.highlight && (
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-t border-white/5">
              <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider flex items-center gap-2">
                <Zap size={14} /> {item.highlight}
              </p>
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  </div>
);

// --- 3. Split Chart Slide ---
export const SplitChartSlide: React.FC<{ slide: SlideData }> = ({ slide }) => {
  const content = slide.content as { description: string[], chartData: ChartDataPoint[], chartLabel: string };
  
  return (
    <div className="flex flex-col md:flex-row h-full items-center px-4 md:px-16 gap-12">
      <motion.div 
        className="flex-1"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-white mb-2">{slide.title}</h2>
        <p className="text-xl text-slate-400 mb-8">{slide.subtitle}</p>
        
        <ul className="space-y-6">
          {content.description.map((desc, i) => (
            <li key={i} className="flex items-start gap-4 text-lg text-slate-200">
              <div className="mt-1.5 min-w-2 h-2 rounded-full bg-blue-400" />
              {desc}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div 
        className="flex-1 h-[400px] w-full bg-slate-800/30 rounded-2xl p-8 border border-slate-700"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-slate-400 mb-6 text-center">{content.chartLabel}</h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={content.chartData} layout="vertical" margin={{ left: 20 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" stroke="#cbd5e1" width={120} tick={{fontSize: 14, fontWeight: 600}} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
              cursor={{fill: 'rgba(255,255,255,0.05)'}}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
              {content.chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 1 ? '#60a5fa' : '#475569'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

// --- 4. Timeline Slide (Table Replacement) ---
export const TimelineSlide: React.FC<{ slide: SlideData }> = ({ slide }) => (
  <div className="flex flex-col h-full justify-center px-4 md:px-12">
    <div className="mb-12 text-center">
      <h2 className="text-4xl font-bold text-white mb-2">{slide.title}</h2>
      <p className="text-xl text-slate-400">{slide.subtitle}</p>
    </div>

    <div className="relative">
      {/* Connecting Line */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-700 -z-10 hidden md:block transform -translate-y-1/2" />
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {(slide.content as TimelineItem[]).map((item, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            className={`relative p-6 rounded-xl border ${idx === 2 ? 'bg-blue-900/20 border-blue-500/50 shadow-blue-500/20 shadow-lg' : 'bg-slate-800/80 border-slate-700'} backdrop-blur-md flex flex-col items-center text-center h-64 justify-between`}
          >
            <div className={`absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${idx === 2 ? 'bg-blue-500 text-white' : 'bg-slate-600 text-slate-300'} border-4 border-slate-900`}>
              {item.phase}
            </div>
            
            <div className="mt-6">
              <h3 className={`text-2xl font-bold mb-1 ${idx === 2 ? 'text-blue-300' : 'text-slate-200'}`}>
                {item.paradigm}
              </h3>
              <div className="h-0.5 w-12 bg-slate-600 mx-auto my-4" />
              <p className="text-slate-300 font-medium mb-2">{item.tech}</p>
            </div>

            <div className="w-full bg-slate-900/50 py-2 rounded text-sm text-slate-400 border border-slate-700/50">
              <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Limitation</span>
              {item.limitation}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
);

// --- 5. List Slide (Software 3.0 Features) ---
export const ListSlide: React.FC<{ slide: SlideData }> = ({ slide }) => (
  <div className="flex flex-col h-full justify-center px-4 md:px-20 max-w-6xl mx-auto">
    <div className="mb-10">
      <h2 className="text-4xl font-bold text-white mb-2">{slide.title}</h2>
      <p className="text-xl text-slate-400">{slide.subtitle}</p>
    </div>
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {(slide.content as GridItem[]).map((item, idx) => (
        <motion.div 
          key={idx} 
          variants={itemVariants}
          className="flex items-start gap-6 p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/30 transition-colors"
        >
          <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-white/10">
             {getIcon(item.icon, 28)}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-100 mb-2">{item.title}</h3>
            <p className="text-lg text-slate-400">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

// --- 6. Conclusion Slide ---
export const ConclusionSlide: React.FC<{ slide: SlideData }> = ({ slide }) => (
  <div className="flex flex-col items-center justify-center h-full text-center px-8 md:px-32 relative overflow-hidden">
    {/* Background Accents */}
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/0 to-slate-900/0 -z-10" />
    
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-5xl"
    >
      <h2 className="text-2xl font-semibold text-blue-400 tracking-widest uppercase mb-8">
        {slide.subtitle}
      </h2>
      <p className="text-4xl md:text-6xl font-bold text-white leading-tight mb-12">
        "{slide.content}"
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all"
      >
        开始意图驱动开发
      </motion.button>
    </motion.div>
  </div>
);
