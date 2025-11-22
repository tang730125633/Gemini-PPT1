import { ReactNode } from 'react';

export enum SlideType {
  TITLE = 'TITLE',
  GRID = 'GRID',
  SPLIT_CHART = 'SPLIT_CHART',
  TIMELINE = 'TIMELINE',
  LIST = 'LIST',
  CONCLUSION = 'CONCLUSION',
}

export interface SlideData {
  id: number;
  type: SlideType;
  title: string;
  subtitle?: string;
  content?: any; // Flexible content based on type
  notes?: string;
}

export interface GridItem {
  icon: string;
  title: string;
  description: string;
  highlight?: string;
}

export interface TimelineItem {
  phase: string;
  paradigm: string;
  tech: string;
  limitation: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fullMark?: number;
}
