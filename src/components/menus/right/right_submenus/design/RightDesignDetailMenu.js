import React from 'react';
import { connect } from 'react-redux';
import { func, array, number, bool } from 'prop-types';
import className from 'classnames';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import IconButton from 'Components/shared/buttons/IconButton';
import DesignDetailRow from '../elements/DesignDetailRow';
import { SquareButton } from 'Components/shared/buttons/index';
import {
  changeTopicDesign,
  removeDesign
} from 'Src/newRedux/database/topics/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { updateTopicDesign } from 'Src/newRedux/database/topics/actions';

const designDetails = [
  { id: 'banner_color', name: 'Banner Color', type: 'color' },
  { id: 'banner_color_display', name: 'Banner Color Display', type: 'boolean' },
  { id: 'banner_image_url', name: 'Banner Image', type: 'upload' },
  { id: 'banner_image_display', name: 'Banner Image Display', type: 'boolean' },
  { id: 'card_font_color', name: 'Board Font Color', type: 'color' },
  { id: 'card_background_color', name: 'Board Color', type: 'color' },
  {
    id: 'card_background_color_display',
    name: 'Board Color Display',
    type: 'boolean'
  },
  { id: 'card_background_image_url', name: 'Board Image', type: 'upload' },
  {
    id: 'card_background_image_display',
    name: 'Board Image Display',
    type: 'boolean'
  },
  {
    id: 'workspace_background_color',
    name: 'Workspace Background',
    type: 'color',
    showFullColorPicker: true
  },
  {
    id: 'workspace_font_color',
    name: 'Workspace Font',
    type: 'color',
    showFullColorPicker: true
  },
  {
    id: 'hexes_background_color',
    name: 'Folder/Hex Color',
    type: 'color',
    showFullColorPicker: true
  }
];

const RightDesignDetailMenu = ({
  topic_designs,
  selected,
  canEdit,
  topic,
  onSetDefault,
  onSelectDesign,
  activeDesign,
  designId,
  isOwner,
  removeDesign,
  ...props
}) => {
  const updateDesign = () => {
    props.changeTopicDesign(topic_designs[selected]);
  };
  const onChange = (value, id) => {
    switch (id) {
      case 'banner_image_url':
        props.updateTopicDesign({
          ...topic_designs[selected],
          [id]: value,
          banner_image_display: true
        });
        return;
      case 'card_background_image_url':
        props.updateTopicDesign({
          ...topic_designs[selected],
          [id]: value,
          card_background_image_display: true
        });
        return;
      case 'banner_color':
        props.updateTopicDesign({
          ...topic_designs[selected],
          [id]: value,
          banner_color_display: true
        });
        return;
      case 'card_background_color':
        props.updateTopicDesign({
          ...topic_designs[selected],
          [id]: value,
          card_background_color_display: true
        });
        return;
      default:
        props.updateTopicDesign({
          ...topic_designs[selected],
          [id]: value
        });
        return;
    }
  };
  const onDefaultClick = () => {
    if (
      Number(topic.attributes.default_design_id) !=
      Number(topic_designs[selected].id)
    ) {
      onSetDefault({
        topic_id: topic.id,
        design_id: topic_designs[selected].id
      });
    } else {
      removeDesign(+topic.id, {
        removeDefaultDesign: true
      });
    }
  };

  const onActivateClick = () => {
    if (Number(activeDesign) != Number(topic_designs[selected].id)) {
      onSelectDesign(topic_designs[selected].id, +topic.id);
    } else {
      removeDesign(+topic.id, {
        removeTopicDesign: true
      });
    }
  };

  return (
    <div className="right-submenu">
      <div className="right-submenu_header">
        <IconButton
          fontAwesome
          icon="caret-left"
          onClick={() => props.setRightMenuOpenForMenu('Design')}
        />
        <span className="ml5">{topic_designs[selected].name}</span>
      </div>
      <div className="design-control ml5">
        {canEdit && (
          <div className="design-control-item__button" onClick={updateDesign}>
            save
          </div>
        )}
        <div className="design-control-item">
          <span className="design-control-item__text">Activate</span>
          <i
            className={className(
              'fa active-filter-chip__toggle-filter-btn ml15',
              Number(activeDesign) === Number(topic_designs[selected].id)
                ? 'fa-toggle-on green'
                : 'fa-toggle-off grey-button-color'
            )}
            onClick={() => onActivateClick()}
          />
        </div>
        {isOwner() && (
          <div className="design-control-item">
            <span className="design-control-item__text">Default</span>
            <i
              className={className(
                'fa active-filter-chip__toggle-filter-btn ml15',
                Number(topic.attributes.default_design_id) ===
                  Number(topic_designs[selected].id)
                  ? 'fa-toggle-on green'
                  : 'fa-toggle-off grey-button-color'
              )}
              onClick={() => onDefaultClick()}
            />
          </div>
        )}
      </div>
      {designDetails.map(designDetail => (
        <DesignDetailRow
          key={designDetail.id}
          detail={designDetail}
          value={topic_designs[selected][designDetail.id]}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

RightDesignDetailMenu.propTypes = {
  setRightMenuOpenForMenu: func.isRequired,
  selected: number.isRequired,
  changeTopicDesign: func.isRequired,
  topic_designs: array.isRequired,
  updateTopicDesign: func.isRequired,
  canEdit: bool.isRequired
};

const mapState = state => {
  const sm = stateMappings(state);
  const { topicId } = sm.page;
  return {
    topic_designs: sm.topics[topicId].attributes.topic_designs || []
  };
};

const mapDispatch = {
  setRightMenuOpenForMenu,
  changeTopicDesign,
  updateTopicDesign,
  removeDesign
};

export default connect(mapState, mapDispatch)(RightDesignDetailMenu);
