import {ButtonGroup, Card, CardContent, Grid} from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import {Chart} from '../types';
import dayjs from 'dayjs';
import {DateRangePicker, DateRange} from 'mui-daterange-picker';
import {useMemo, useState} from 'react';
import {Button} from '@mui/material';

type Props = {
  charts: Chart[];
};

const Charts: React.FC<Props> = ({charts}) => {
  highchartsAccessibility(Highcharts);

  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({});

  const toggle = () => setOpen(!open);

  const filteredCharts = useMemo(() => {
    if (!dateRange.endDate || !dateRange.startDate) return charts;

    const startDateTimestamp = dateRange.startDate.getTime();
    const endDateTimestamp = dateRange.endDate.getTime();
    //timezone difference 3hrs
    const startDate = dayjs(startDateTimestamp)
      .set('hour', -3)
      .set('minute', 0)
      .set('second', 0)
      .valueOf();
    const endDate = dayjs(endDateTimestamp)
      .set('hour', 20)
      .set('minute', 59)
      .set('second', 59)
      .valueOf();

    return charts.filter(chart => {
      const date = dayjs(new Date(chart.date).getTime()).valueOf();
      return date <= endDate && date >= startDate;
    });
  }, [charts, dateRange.endDate, dateRange.startDate]);

  return (
    <main>
      {charts.length ? (
        <>
          <ButtonGroup
            variant="outlined"
            color="primary"
            aria-label="text button group"
            sx={{marginTop: '1rem'}}
            fullWidth
          >
            <Button onClick={toggle}>Select chart date</Button>
            <Button onClick={() => setDateRange({})}>Reset date</Button>
          </ButtonGroup>

          <DateRangePicker open={open} toggle={toggle} onChange={range => setDateRange(range)} />
        </>
      ) : (
        <>
          <h4>Sorry, no charts to display:(</h4>
          <span>But you can always add some in settings tab!</span>
        </>
      )}
      <>
        <Grid
          container
          justifyContent="center"
          spacing={3}
          sx={{marginTop: '16px', marginBottom: '16px'}}
        >
          {filteredCharts.map(item => (
            <Grid key={item.id} item xs={12} sm={12} md={6} lg={4}>
              <Card>
                <CardContent>
                  <HighchartsReact highcharts={Highcharts} options={item} />
                  <div>Date {item.date} </div>
                  <div>Highest chart value {Math.max(...item.series[0].data)}</div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    </main>
  );
};

export default Charts;
