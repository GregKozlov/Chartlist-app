import {
  Typography,
  Box,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import {Button, ButtonGroup} from '@mui/material';
import dayjs from 'dayjs';
import React, {useState} from 'react';
import {Chart} from '../types';
import {ChartType, ColorType} from '../types/chart';

type Props = {
  open: boolean;
  updateCharts: (chart: Chart) => void;
  handleClose: () => void;
  currentChartFields: {
    name: Chart['title']['text'];
    values: string;
    color: ColorType;
    type: Chart['chart']['type'];
  };
  currentChartId: number | null;
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const generateChart = (
  chartData: {
    name: string;
    values: string;
    color: ColorType;
    type: ChartType;
  },
  chartId: number | null
): Chart => {
  return {
    id: chartId || 0,
    date: dayjs().format('YYYY.MM.DD'),
    title: {
      text: chartData.name
    },
    series: [
      {
        showInLegend: false,

        data: chartData.values.split(',').map((item: string) => Number(item))
      }
    ],
    credits: {
      enabled: false
    },
    colors: [chartData.color],
    chart: {
      type: chartData.type
    }
  };
};

const ChartModal: React.FC<Props> = ({
  open,
  updateCharts,
  handleClose,
  currentChartFields,
  currentChartId
}) => {
  const [chartParams, setChartParams] = useState<{
    name: Chart['title']['text'];
    values: string;
    color: ColorType;
    type: Chart['chart']['type'];
  }>(currentChartFields);

  const onChartInputUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChartParams(prev => ({...prev, [e.target.name]: e.target.value}));
  };
  const onChartSelectUpdate = (e: SelectChangeEvent<string>) => {
    setChartParams(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const chart = generateChart(chartParams, currentChartId);
    updateCharts(chart);
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Add chart properties
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              name="name"
              value={chartParams.name}
              onChange={onChartInputUpdate}
              label="Name"
              variant="standard"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              id="values"
              name="values"
              value={chartParams.values}
              onChange={onChartInputUpdate}
              label="Values (comma separated)"
              variant="standard"
              fullWidth
              margin="normal"
              required
            />
            <FormControl variant="standard" fullWidth margin="normal">
              <InputLabel id="color">Color</InputLabel>
              <Select
                labelId="color"
                id="color"
                name="color"
                value={chartParams.color}
                onChange={onChartSelectUpdate}
                label="Color"
                required
              >
                <MenuItem value={'#2f7ed8'}>Blue</MenuItem>
                <MenuItem value={'#8bbc21'}>Green</MenuItem>
                <MenuItem value={'#910000'}>Red</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" fullWidth margin="normal">
              <InputLabel id="type">Type</InputLabel>
              <Select
                labelId="type"
                name="type"
                id="type"
                value={chartParams.type}
                onChange={onChartSelectUpdate}
                label="Type"
                required
              >
                <MenuItem value={'line'}>Line</MenuItem>
                <MenuItem value={'spline'}>Spline</MenuItem>
                <MenuItem value={'area'}>Area</MenuItem>
              </Select>
            </FormControl>

            <ButtonGroup
              color="primary"
              aria-label="text button group"
              sx={{justifyContent: 'flex-end', width: '100%', marginTop: '2rem'}}
            >
              <Button variant="outlined" color="primary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </ButtonGroup>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ChartModal;
