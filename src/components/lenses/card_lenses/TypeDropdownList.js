import React, { Fragment } from 'react';
import IconButton from 'Src/components/shared/buttons/IconButton';
import { boardTypes, cardTypes } from 'Src/components/shared/CardAndBoardTypes';

export default ({ type, onCardClick, onBoardClick }) => {
  return (
    <Fragment>
      {type === 'card'
        ? cardTypes.map((x, i) => (
            <div
              key={i}
              className="sheet-view__cell--title-type-dropdown"
              onClick={() => onCardClick(x.type, i)}
            >
              <IconButton
                additionalClasses="font-size-16 mr5"
                icon={x.iconType}
                outlined={x.outlined}
                color={x.color}
                tooltip={x.label}
                tooltipOptions={{ place: 'top' }}
              />
              <span>{x.label}</span>
            </div>
          ))
        : boardTypes.map((x, i) => (
            <div
              key={i}
              className="sheet-view__cell--title-type-dropdown"
              onClick={() => onBoardClick(x.type, i)}
            >
              <IconButton
                additionalClasses="font-size-16 mr5"
                icon={x.iconType}
                fontAwesome={x.fontAwesome}
                outlined={x.outlined}
                color={x.color}
                tooltip={x.label}
                tooltipOptions={{ place: 'top' }}
              />
              <span>{x.label}</span>
            </div>
          ))}
    </Fragment>
  );
};
