import React, { useState, useRef, useEffect } from 'react';
// import Icon from 'Components/shared/Icon';
import moment from 'moment';
import { get, orderBy } from 'lodash';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';

const UpdateDropdown = ({ updates, onUpdate, user, people }) => {
  const [input, setInput] = useState('');
  const storeUpdate = e => {
    e.preventDefault();
    if (input) {
      const data = [
        ...updates,
        { user: user.id, date: moment().toISOString(), comment: input }
      ];
      onUpdate({ attributes: { updates: data } });
      setInput('');
    }
  };

  const deleteComment = i => {
    const data = updates.filter((u, index) => index !== i);
    onUpdate({ attributes: { updates: data } });
  };

  return (
    <ul className="dropdown-menu dropdown-menu-updates" id="domain-dropdown">
      <li className="flexCenter">
        <form className="update-form" onSubmit={storeUpdate}>
          <input
            value={input}
            onChange={({ target: { value } }) => {
              setInput(value);
            }}
            className="update-input"
          />
          <button type="submit" className="update-input-button">
            🙋
          </button>
        </form>
      </li>
      <div className="update-display-list">
        {updates.map((u, i) => {
          return (
            <li className="flexCenter update-display-data" key={i}>
              <UserAvatar key={i} userId={u.user} readonly />
              <div className="update-display-wrapper">
                <p>
                  {people[u.user].attributes.first_name}{' '}
                  {moment(u.date).format('MMM DD h:mm a')}
                </p>
                <div className="update-display-comment">
                  <span>{u.comment}</span>
                  <div className="update-display-action">
                    <a
                      href="javascript:void(0)"
                      onClick={() => deleteComment(i)}
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </div>
    </ul>
  );
};

const UpdateComponent = ({ card, handleValueUpdate, user, people }) => {
  const myRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const { updates = [] } = card.attributes;
  const getEpoch = d => moment(d).valueOf();
  const currentUpdate =
    updates.length > 0 &&
    updates.sort((a, b) => getEpoch(b.date) - getEpoch(a.date))[0];

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = e => {
    if (myRef.current && !myRef.current.contains(e.target)) {
      setVisible(false);
    }
  };

  return (
    <div
      ref={myRef}
      className={`dropdown sheet-update-dropdown ${visible ? 'open' : ''}`}
    >
      <a
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {!currentUpdate ? (
          <span>No update yet!</span>
        ) : (
          <div className="flex sheet-update-data">
            <span className="sheet-update-date">
              {moment(currentUpdate.date).format('MMM Do YY h:mm a')}
            </span>
            <span className="sheet-update-name">
              {people[currentUpdate.user].attributes.first_name}
            </span>
            <p className="sheet-update-comment">
              <span>{currentUpdate.comment}</span>
            </p>
          </div>
        )}
      </a>
      <UpdateDropdown
        user={user}
        people={people}
        updates={updates}
        onUpdate={handleValueUpdate}
      />
    </div>
  );
};

const mapState = state => {
  const { user, people } = stateMappings(state);
  return {
    user,
    people
  };
};

const ConnectedComponent = connect(mapState, null)(UpdateComponent);

const getLatestUpdate = card =>
  orderBy(
    get(card, 'attributes.updates', []),
    [update => moment(update.date).valueOf()],
    ['desc']
  )[0];

export default {
  cssModifier: 'updates',
  display: 'Updates',
  resizableProps: {
    minWidth: '600'
  },
  Component: ConnectedComponent,
  renderSummary: () => null,
  sort: (cards, order) => {
    return orderBy(
      cards,
      [
        card =>
          moment(
            get(
              getLatestUpdate(card),
              'date',
              order.startsWith('asc') ? Infinity : 0
            )
          ).valueOf()
      ],
      [order]
    );
  }
};
