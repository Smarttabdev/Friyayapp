import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import moment from 'moment';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';

const ScoreType = {
  assigned: {
    label: 'Assigned',
    color: '#f8c921'
  },
  completed: {
    label: 'Completed',
    color: '#43d391'
  },
  in_progress: {
    label: 'In progress',
    color: '#00cef6'
  },
  points: {
    label: 'Points',
    color: '#009de1'
  },
  cactii: {
    label: 'Cacti',
    color: '#a845e8'
  },
  hours: {
    label: 'Hour',
    color: '#fe9532'
  }
};

const getLabel = key => {
  const [year, weekkey] = key.split('-');
  const selectedWeek = moment()
    .year(year)
    .week(weekkey);

  return `${selectedWeek.startOf('week').format('MMM DD')} -
          ${selectedWeek.endOf('week').format('DD')}`;
};

const XaxisLabel = ({ x, y, stroke, payload, color }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={10}
        dy={16}
        textAnchor="end"
        fill={color || '#666'}
        transform="rotate(-45)"
      >
        {getLabel(payload.value)}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return <div>{`${getLabel(label)} : ${payload[0].value}`}</div>;
  }
  return null;
};

const ScoreChart = ({
  selectedScoreType,
  userScore,
  minWidth,
  fontSize,
  fontColor = '#666'
}) => {
  if (!userScore) {
    return null;
  }
  const scType = ScoreType[selectedScoreType] || {};
  const data = React.useMemo(
    () =>
      Object.keys(userScore).map(key => ({
        name: key,
        val: userScore[key][selectedScoreType]
      })),
    [selectedScoreType, userScore]
  );
  return (
    <ResponsiveContainer
      height={500}
      width="100%"
      minWidth={minWidth || '100%'}
    >
      <BarChart
        data={data}
        margin={{
          top: 50,
          right: 30,
          left: 30,
          bottom: 50
        }}
      >
        <Tooltip content={<CustomTooltip />} />
        <XAxis
          axisLine={{ fill: fontColor, stroke: fontColor }}
          tickLine={{ fill: fontColor, stroke: fontColor }}
          dataKey="name"
          tick={<XaxisLabel color={fontColor} />}
          interval={1}
        />
        <Bar
          barSize={20}
          dataKey="val"
          fill={scType.color}
          label={{
            position: 'insideTop',
            fill: fontColor || '#fff',
            fontSize: fontSize || 16
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const mapState = state => {
  const sm = stateMappings(state);
  const {
    utilities: { active_design }
  } = sm;

  return {
    fontColor: active_design?.card_font_color
  };
};

export default connect(mapState)(ScoreChart);
