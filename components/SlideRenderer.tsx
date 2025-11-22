import React from 'react';
import { SlideData, SlideType } from '../types';
import { 
  TitleSlide, 
  GridSlide, 
  SplitChartSlide, 
  TimelineSlide, 
  ListSlide, 
  ConclusionSlide 
} from './Slides';

interface SlideRendererProps {
  slide: SlideData;
}

const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  switch (slide.type) {
    case SlideType.TITLE:
      return <TitleSlide slide={slide} />;
    case SlideType.GRID:
      return <GridSlide slide={slide} />;
    case SlideType.SPLIT_CHART:
      return <SplitChartSlide slide={slide} />;
    case SlideType.TIMELINE:
      return <TimelineSlide slide={slide} />;
    case SlideType.LIST:
      return <ListSlide slide={slide} />;
    case SlideType.CONCLUSION:
      return <ConclusionSlide slide={slide} />;
    default:
      return <div className="flex items-center justify-center h-full">Unknown Slide Type</div>;
  }
};

export default SlideRenderer;
