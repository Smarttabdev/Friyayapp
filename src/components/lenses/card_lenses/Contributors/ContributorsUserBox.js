import React, { useEffect } from 'react';
import Avatar from 'Components/shared/Avatar';
import { getAvatarUrl } from 'Lib/utilities';
import IconButton from 'Src/components/shared/buttons/IconButton';
import ScoreChart from 'src/components/pages/score_card/ScoreChart';

const ContributorsUserBox = ({
  user,
  position,
  removeUser,
  data,
  fontColor
}) => {
  useEffect(() => {
    const container = document.querySelectorAll(
      '.contributors-lens__grid-item__body'
    );
    if (container) {
      container.forEach(x => (x.scrollLeft = 1000));
    }
    return () => {};
  }, []);
  return (
    <div
      style={{ borderColor: fontColor }}
      className="contributors-lens__grid-item"
    >
      <div
        style={{ borderColor: fontColor }}
        className="contributors-lens__grid-item__header"
      >
        <div className="contributors-lens__grid-item__header__left">
          <Avatar
            url={getAvatarUrl(user)}
            initial={(user.attributes?.first_name[0] || '').toUpperCase()}
            border={'none'}
          />
          <div className="contributors-lens__grid-item__header__left-details">
            <div className="contributors-lens__grid-item__header__left-details__name">
              <span style={{ color: fontColor }}>
                {user.attributes?.first_name}
              </span>
              <IconButton
                additionalClasses="contributors-lens__grid-item-remove"
                icon="close"
                color={fontColor || '#808080'}
                tooltip="Remove user"
                fontSize={14}
                onClick={() => removeUser(user.id)}
                tooltipOptions={{ place: 'bottom' }}
              />
            </div>
            <div className="contributors-lens__grid-item__header__left-details__completed">
              <span className="mr10" style={{ color: fontColor }}>
                {data.completedCards} cards completed
              </span>
              <span style={{ color: fontColor }}>
                {data.bonusPoints} bonus points
              </span>
            </div>
          </div>
        </div>

        <span
          className="contributors-lens__grid-item__header__position"
          style={{ color: fontColor }}
        >
          #{position}
        </span>
      </div>
      <div className="contributors-lens__grid-item__body">
        <div className="score-card-wrapper">
          <ScoreChart
            userScore={data.score || {}}
            selectedScoreType={'completed'}
            minWidth={
              Object.entries(data.score || {}).length > 10 ? 1400 : '100%'
            }
            fontSize={13}
          />
        </div>
      </div>
    </div>
  );
};

export default ContributorsUserBox;
