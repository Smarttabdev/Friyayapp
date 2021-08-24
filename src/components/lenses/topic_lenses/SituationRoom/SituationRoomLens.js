import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SituationRoomTopics from './SituationRoomTopic';
import withDataManager from 'Src/dataManager/components/withDataManager';
import { getFilterSettings } from 'Src/helpers/user_config';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { get } from 'lodash';
import {
  dragItemTypes,
  GenericDragDropListing
} from 'Components/shared/drag_and_drop/_index';
import { moveTopicFromDragAndDrop } from 'Src/newRedux/database/topics/abstractions';
import { setUserFilterSettings } from 'Src/helpers/user_config';

class SituationRoomLens extends Component {
  static propTypes = {
    cards: PropTypes.array,
    subtopics: PropTypes.array,
    topic: PropTypes.any
  };

  componentDidMount() {
    this.props.setUserFilterSettings({ include_live_views: true });
  }

  componentWillUnmount() {
    this.props.setUserFilterSettings({ include_live_views: false });
  }

  render() {
    const {
      topic,
      cards,
      subtopics,
      presence,
      include_live_views,
      include_new_views,
      include_recently_updated_views
      //include_recently_visited_views
    } = this.props;

    const hasFilter =
      include_live_views || include_new_views || include_recently_updated_views;

    const filteredTopics = [];
    include_live_views &&
      subtopics
        .filter(tp => {
          let presenceChannels = get(presence, 'channels');
          let channels;
          if (presenceChannels) {
            channels = Object.keys(presenceChannels).map(chan => chan);
            const chan = channels.filter(
              ch => ch.search(`topic_${tp.id}`) != -1
            );
            const isChannel = chan.length > 0;
            return tp && isChannel;
          } else return false;
        })
        .map(tp => filteredTopics.push(tp));

    include_new_views &&
      subtopics
        .filter(tp => {
          let createdDate = new Date(get(tp, 'attributes.created_at'));
          createdDate = `${createdDate.getFullYear() +
            '/' +
            createdDate.getMonth() +
            '/' +
            createdDate.getDate()}`;
          let currentDate = new Date();
          currentDate = `${currentDate.getFullYear() +
            '/' +
            currentDate.getMonth() +
            '/' +
            currentDate.getDate()}`;
          return createdDate == currentDate;
        })
        .map(tp => filteredTopics.push(tp));

    include_recently_updated_views &&
      subtopics
        .filter(tp => {
          const updatedDate = new Date(get(tp, 'attributes.updated_at'));
          const currentDate = new Date();
          return (
            Math.floor((currentDate - updatedDate) / (1000 * 60 * 60 * 24)) <= 5
          );
        })
        .map(tp => filteredTopics.push(tp));

    filteredTopics.push({ id: 'for adding board' });

    return (
      <div className="situation_room-tool">
        <GenericDragDropListing
          dropClassName={'situation_room-grid-layout'}
          itemList={
            hasFilter
              ? [...new Set(filteredTopics)]
              : subtopics.concat([{ id: 'for adding board' }])
          }
          dropZoneProps={{ topicId: topic ? topic.id : null }}
          itemType={dragItemTypes.TOPIC}
          onDropItem={this.props.moveTopicFromDragAndDrop}
          renderItem={subtopic => (
            <SituationRoomTopics key={subtopic.id} topic={subtopic} />
          )}
        />
        {/* <div className="situation_room-grid-layout">
          {hasFilter
            ? [...new Set(filteredTopics)].map((tp, i) => (
                <SituationRoomTopics key={i} topic={tp} />
              ))
            : subtopics.map((tp, i) => (
                <SituationRoomTopics key={i} topic={tp} />
              ))}
        </div> */}
      </div>
    );
  }
}

const dataRequirements = ({ user, cardRequirements }) => ({
  cardsWithAttributes: {
    attributes: {
      ...cardRequirements,
      personId: user && user.id
    }
  }
});

const mapState = state => {
  const { presence } = stateMappings(state);

  const filterSettings = getFilterSettings(state);

  return {
    presence,
    include_live_views: get(filterSettings, 'include_live_views'),
    include_new_views: get(filterSettings, 'include_new_views'),
    include_recently_updated_views: get(
      filterSettings,
      'include_recently_updated_views'
    )
  };
};

const mapDispatch = {
  moveTopicFromDragAndDrop,
  setUserFilterSettings
};

export default withDataManager(dataRequirements, mapState, mapDispatch, {
  dontShowLoadingIndicator: true
})(SituationRoomLens);
