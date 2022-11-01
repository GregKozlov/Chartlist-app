import {Container, Typography, CssBaseline} from '@mui/material';
import {Button, ButtonGroup, AppBar, Toolbar} from '@mui/material';

import {Routes, Route, Link} from 'react-router-dom';
import Charts from './pages/Charts';
import ChartSettings from './pages/ChartSettings';
import chartData from './data/chartData';
import {useState} from 'react';
import {Chart} from './types';

const App: React.FC = () => {
  const [charts, setCharts] = useState<Chart[]>(chartData);

  return (
    <>
      <CssBaseline />
      <AppBar position="relative" color="transparent">
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <Typography
            variant="h1"
            sx={{
              fontSize: 50,
              fontWeight: 800
            }}
          >
            Chartlist
          </Typography>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="text button group"
            sx={{marginBottom: {500: '0.5rem', md: 0}}}
          >
            <Button component={Link} to="/">
              View Mode
            </Button>
            <Button component={Link} to="/settings">
              Settings
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Charts charts={charts} />} />
          <Route
            path="/settings"
            element={<ChartSettings charts={charts} setCharts={setCharts} />}
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
