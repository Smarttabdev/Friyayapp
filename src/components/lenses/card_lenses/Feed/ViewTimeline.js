import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { groupBy, compact } from 'lodash';
import PropTypes from 'prop-types';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';
import { getLabelsInAlphaOrder } from 'Src/newRedux/database/labels/selectors';
import Icon from 'Components/shared/Icon';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Select from 'react-select';
import IconButton from 'Components/shared/buttons/IconButton';
import APIRequest from 'Lib/ApiRequest';

const colors = {
  '0': '#a2a2a2',
  '1': '#f2ab13',
  '2': '#ee9843',
  '3': '#a95fd0',
  '4': '#cf61c4',
  '5': '#60cf8b',
  '6': '#5f8ccf',
  '7': '#7f5ecf',
  '8': '#D8D8D8',
  '9': '#1d182a'
};

const colourStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: 'white'
  }),
  input: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid #000',
    width: '100%',
    padding: '10px 10px 0 0'
  }),
  option: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: data.color,
      color: '#fff',
      cursor: 'pointer'
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      borderRadius: 2,
      backgroundColor: data.color
    };
  },
  multiValueLabel: styles => ({
    ...styles,
    fontSize: 17,
    fontWeight: 500,
    color: '#fff'
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: '#fff',
    fontSize: 17,
    ':hover': {
      fontSize: 17,
      backgroundColor: data.color,
      color: '#fff',
      cursor: 'pointer'
    }
  })
};

const ViewTimeline = ({
  cards,
  allLabels,
  selectedTopic,
  parentTopic,
  userId
}) => {
  const [labels, setLabels] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const topic = selectedTopic || parentTopic;
    if (!topic || !topic.relationships.topic_preferences) {
      return;
    }

    const userTopicPreference = (
      topic.relationships.topic_preferences.data || []
    ).find(pref => pref.user_id == userId) || { timeline_labels: [] };

    const selectedLabels = userTopicPreference.timeline_labels.map(lbl => {
      const cur = allLabels.find(l => l.id == lbl);
      if (!cur) {
        return;
      }
      return {
        value: cur.id,
        label: cur.attributes.name,
        color: colors[cur.attributes.color] || cur.attributes.color
      };
    });
    setLabels(compact(selectedLabels));
  }, [
    (selectedTopic || {}).relationships,
    (parentTopic || {}).relationships,
    allLabels
  ]);

  const showLabelModal = () => {
    if (modalOpen && (selectedTopic || parentTopic)) {
      let id = selectedTopic ? selectedTopic.id : parentTopic.id;
      let resource = `topics/${id}/assign_timeline_labels`;
      APIRequest.post({
        resource,
        data: {
          data: {
            attributes: {
              timeline_labels: labels.map(l => l.value)
            }
          }
        }
      });
    }
    setModalOpen(!modalOpen);
  };
  const groupedCards = groupBy(cards, card => {
    return moment(card.attributes.created_at)
      .startOf('day')
      .format();
  });

  const options = allLabels.map(l => ({
    value: l.id,
    label: l.attributes.name,
    color: colors[l.attributes.color] || l.attributes.color
  }));

  return (
    <div className="fv-cards-timeline">
      <div className="label-selector">
        <IconButton
          icon="tag"
          fontAwesome
          onClick={showLabelModal}
          additionalClasses="tag-class"
        />
        {modalOpen && (
          <div className="tag-popup">
            <div className="tag-popup-header">
              Select labels to show on Timeline
            </div>
            <Select
              isMulti
              closeMenuOnSelect={false}
              placeholder="Search Labels"
              value={labels}
              onChange={list => {
                setLabels(list);
              }}
              options={options}
              styles={colourStyles}
              className="label-input"
            />
          </div>
        )}
      </div>
      {Object.keys(groupedCards).map(date => (
        <div key={date} className="dot-wrapper">
          <div className="fv-date">{moment(date).format('MMM DD')}</div>
          <div>
            {(groupedCards[date] || []).map(card => {
              const lbls = card.relationships.labels;
              if (lbls && lbls.data && lbls.data.length) {
                for (let slabel of labels) {
                  if (lbls.data.includes(slabel.value)) {
                    return (
                      <div key={card.id} className="dot-label-checked">
                        <HashLink smooth to={`#card-${card.id}`}>
                          <Icon
                            icon="fiber_manual_record"
                            fontSize={26}
                            color={slabel.color}
                          />
                        </HashLink>
                        {slabel.label}
                      </div>
                    );
                  }
                }
              }
              return (
                <div key={card.id} className="dot-label">
                  <HashLink smooth to={`#card-${card.id}`}>
                    <Icon icon="fiber_manual_record" size="small" />
                  </HashLink>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const mapState = (state, props) => {
  const topic = props.selectedTopic;
  const allLabels = getLabelsInAlphaOrder(state) || [];
  const sm = stateMappings(state);
  const { user } = sm;
  if (!props.selectedTopic) {
    return {
      allLabels,
      userId: user.id
    };
  }
  const cards = getSortedFilteredCardsByTopic(state)[topic.id] || [];

  return {
    cards: cards,
    allLabels,
    userId: user.id
  };
};

ViewTimeline.propTypes = {
  selectedTopic: PropTypes.object,
  parentTopic: PropTypes.object,
  cards: PropTypes.arrayOf(PropTypes.object),
  allLabels: PropTypes.arrayOf(PropTypes.object),
  userId: PropTypes.string
};

export default connect(mapState)(ViewTimeline);
