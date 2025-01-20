import { useState } from 'react';
import Wrapper from '../assets/wrappers/ChartsContainer';
import BarChartComponent from './BarChart';
import AreaChartComponent from './AreaChart';

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(false);

  return (
    <Wrapper>
      <h4>Monthly Application</h4>
      <button type="button" onClick={() => setBarChart((c) => !c)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>

      {/* chart (bar/area) */}
      {barChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  );
};
export default ChartsContainer;
