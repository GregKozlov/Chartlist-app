import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import {useMemo, useState} from 'react';
import {Chart} from '../types';
import ChartModal from '../components/ChartModal';
import {ColorType} from '../types/chart';

type Props = {
  charts: Chart[];
  setCharts: React.Dispatch<React.SetStateAction<Chart[]>>;
};

const ChartSettings: React.FC<Props> = ({charts, setCharts}) => {
  const [open, setOpen] = useState(false);
  const [currentChartId, setCurrentChartId] = useState<number | null>(null);

  const currentChartFields = useMemo(() => {
    const initialChartData: {
      name: Chart['title']['text'];
      values: string;
      color: ColorType;
      type: Chart['chart']['type'];
    } = {
      name: '',
      values: '',
      color: '#2f7ed8',
      type: 'line'
    };

    if (currentChartId === 0 || currentChartId === null) {
      return initialChartData;
    }
    const chart = charts.find(c => c.id === currentChartId);
    return {
      name: chart?.title.text || initialChartData.name,
      values: chart?.series?.[0].data.join() || initialChartData.values,
      color: (chart?.colors?.[0] || initialChartData.color) as ColorType,
      type: chart?.chart.type || initialChartData.type
    };
  }, [charts, currentChartId]);

  const handleOpen = (chartId: number) => {
    setCurrentChartId(chartId);
    setOpen(true);
  };
  const handleClose = () => {
    setCurrentChartId(null);
    setOpen(false);
  };

  const handleDelete = (id: Chart['id']) => {
    setCharts(prev => prev.filter(item => item.id !== id));
  };

  const updateCharts = (chart: Chart) => {
    if (chart.id === 0) {
      chart.id = Date.now();

      setCharts(prev => [...prev, chart]);
      return;
    }

    setCharts(prev =>
      prev.map(c => {
        if (c.id !== chart.id) return c;
        return chart;
      })
    );
  };

  return (
    <>
      <div>
        <Typography variant="h6" align="left" color="textPrimary" style={{marginTop: '16px'}}>
          Here you can add or customize chart settings
        </Typography>
        <Button size="small" variant="contained" color="success" onClick={() => handleOpen(0)}>
          Add new chart
        </Button>
      </div>
      <div>
        {charts.map(item => (
          <div
            key={item.id}
            style={{
              marginTop: '0.5rem'
            }}
          >
            {item.title.text}
            <div>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => handleOpen(item.id)}
              >
                Edit
              </Button>

              <Button
                size="small"
                color="error"
                variant="outlined"
                onClick={() => handleDelete(item.id)}
                style={{marginLeft: '0.5rem'}}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      <ChartModal
        open={open}
        updateCharts={updateCharts}
        handleClose={handleClose}
        currentChartFields={currentChartFields}
        key={String(currentChartId)}
        currentChartId={currentChartId}
      />
    </>
  );
};

export default ChartSettings;
