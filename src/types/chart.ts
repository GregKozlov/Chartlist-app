export type ChartType = 'line' | 'spline' | 'area';
export type ColorType = '#2f7ed8' | '#8bbc21' | '#910000';

export type Chart = {
  id: number;
  date: string;
  title: {
    text: string;
  };
  series: {
    showInLegend: boolean;
    data: number[];
  }[];
  credits: {
    enabled: boolean;
  };
  colors: ColorType[];
  chart: {
    type: ChartType;
  };
};
