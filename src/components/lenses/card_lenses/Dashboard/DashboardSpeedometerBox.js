import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart';
import CompletionSlider from 'Components/shared/CompletionSlider';
import { connect } from 'react-redux';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';
import LoadingIndicator from 'Components/shared/LoadingIndicator';

const DashboardSpeedometerBox = ({ topic, viewTopic }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { id, title, slug, completion = 0 } = topic || {};
  const gaugePercent = Number(completion) / 100;

  useEffect(() => {
    if (topic) {
      setIsLoading(false);
    }
  }, [topic]);

  return (
    <div className="dashboard-speedometer-box">
      <div
        style={{
          transform:
            completion === 100 ? 'translateY(0)' : 'translateY(-1000px)'
        }}
        className="dashboard-speedometer-box__completion-box"
      >
        <p>Woohooo! 🎉</p>
        <span>You completed</span>
        <span>"{title}"</span>
      </div>

      <div
        style={{ transform: completion === 100 ? 'scale(0)' : 'scale(1)' }}
        className="dashboard-speedometer-box__gauge"
      >
        <GaugeChart
          textColor="#fff"
          id={`gauge-chart${id}`}
          nrOfLevels={10}
          arcPadding={0.1}
          cornerRadius={3}
          percent={gaugePercent}
          needleColor="#fff"
          colors={['#EB5757', '#F2C94C', '#6fcf97']}
        />
      </div>
      <div className="dashboard-speedometer-box__details">
        {isLoading && <LoadingIndicator />}
        <h4
          onClick={() => viewTopic({ topicSlug: slug })}
          style={{ color: '#fff' }}
        >
          {title}
        </h4>
        <CompletionSlider
          className="dashboard-speedometer-box__details__slider"
          width="100%"
          value={completion}
          dontUpdate
          compactView
        />
      </div>
    </div>
  );
};

const mapDispatch = {
  viewTopic
};

export default connect(
  null,
  mapDispatch
)(
  QueryRenderer(DashboardSpeedometerBox, {
    query: graphql`
      query DashboardSpeedometerBoxQuery($topicId: ID) {
        topic(id: $topicId, speed: true, completion: true) {
          id
          title
          speed
          completion
          slug
        }
      }
    `,
    vars: ({ topicId }) => ({
      topicId: topicId && toGid('Topic', topicId)
    })
  })
);
