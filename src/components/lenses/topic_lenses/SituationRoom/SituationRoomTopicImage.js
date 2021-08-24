import React, { Component, Fragment } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';

class SituationRoomTopicImage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, avatarUrl, borderColor } = this.props;
    const name = get(user, 'attributes.name') || user.name || '-';
    let nameAcronym = name
      .split(/\s/)
      .reduce((response, word) => (response += word.slice(0, 1)), '');
    let box = (
      <span className="situation_room-user_letter" title={name}>
        <div>{nameAcronym.toUpperCase()}</div>
      </span>
    );

    if (avatarUrl) {
      box = (
        <img
          src={avatarUrl}
          className="situation_room-user_image"
          width="80px"
          height="80px"
          style={{ borderColor }}
          title={name}
        />
      );
    }
    return <Fragment>{box}</Fragment>;
  }
}

const mapState = (state, props) => {
  const { user } = props;

  let oldAvatarUrl = '';
  if (get(user, 'avatar_url')) {
    oldAvatarUrl = user.avatar_url;
  } else if (get(user, 'attributes.avatar_url')) {
    oldAvatarUrl = user.attributes.avatar_url;
  }

  const avatarUrl = get(
    user,
    'relationships.user_profile.data.attributes.avatar_url',
    oldAvatarUrl
  );

  return {
    avatarUrl
  };
};

export default connect(mapState)(SituationRoomTopicImage);
