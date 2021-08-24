import React, { PureComponent } from 'react';
import TypeDropdownList from 'Src/components/lenses/card_lenses/TypeDropdownList';
import IconButton from 'Src/components/shared/buttons/IconButton';
import {
  cardTypes,
  getCardTypeAndIndex
} from 'Src/components/shared/CardAndBoardTypes';
import Dropdown from 'Src/components/shared/Dropdown';
import Icon from 'Src/components/shared/Icon';

class TipTitleEditor extends PureComponent {
  render() {
    let {
      cardType,
      onChangeCardType,
      tipTitle,
      onChangeTipTitle,
      onToggleToolbar
    } = this.props;
    cardType = getCardTypeAndIndex(cardType);

    return (
      <div className="tip_title_editor">
        <span>
          <Dropdown
            trigger={
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton
                  outlined={cardTypes[cardType.index].outlined}
                  icon={cardTypes[cardType.index].iconType}
                  color={cardTypes[cardType.index].color}
                  tooltip={cardTypes[cardType.index].label}
                  tooltipOptions={{ place: 'bottom' }}
                />
                <IconButton
                  additionalClasses="dark-grey-icon-button"
                  fontSize={12}
                  fontAwesome
                  icon="caret-down"
                />
              </div>
            }
          >
            <TypeDropdownList
              type="card"
              onCardClick={CT => onChangeCardType(CT)}
            />
          </Dropdown>
        </span>
        <input
          type="text"
          name="tip[title]"
          className="form-control tip-title form-control-minimal"
          placeholder="Type title"
          autoComplete="off"
          value={tipTitle}
          onChange={onChangeTipTitle}
          required
          autoFocus
        />
        <div onClick={onToggleToolbar} className="hideToolbar">
          <Icon icon={'keyboard_hide'} fontSize={24} />
        </div>
      </div>
    );
  }
}

export default TipTitleEditor;
