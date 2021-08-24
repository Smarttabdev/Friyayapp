import React from 'react';
import { connect } from 'react-redux';
import { func, array, number, bool } from 'prop-types';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import IconButton from 'Components/shared/buttons/IconButton';
import DesignDetailRow from '../elements/DesignDetailRow';
import { SquareButton } from 'Components/shared/buttons/index';
import { updateDesign } from 'Src/newRedux/database/domains/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { updateDomainDesign } from 'Src/newRedux/database/domains/actions';

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

    type: 'color'
  },
  { id: 'workspace_font_color', name: 'Workspace Font', type: 'color' },
  { id: 'hexes_background_color', name: 'Folder/Hex Color', type: 'color' }
];

const RightDesignDetailMenu = ({
  domain_designs,
  selected,
  canEdit,
  ...props
}) => {
  const updateDesign = () => {
    props.updateDesign(domain_designs[selected]);
  };

  const onChange = (value, id) => {
    switch (id) {
      case 'banner_image_url':
        props.updateDomainDesign({
          id: domain_designs[selected].id,
          attributes: {
            ...domain_designs[selected],
            [id]: value,
            banner_image_display: true
          }
        });
        return;
      case 'card_background_image_url':
        props.updateDomainDesign({
          id: domain_designs[selected].id,
          attributes: {
            ...domain_designs[selected],
            [id]: value,
            card_background_image_display: true
          }
        });
        return;
      case 'banner_color':
        props.updateDomainDesign({
          id: domain_designs[selected].id,
          attributes: {
            ...domain_designs[selected],
            [id]: value,
            banner_color_display: true
          }
        });
        return;
      case 'card_background_color':
        props.updateDomainDesign({
          id: domain_designs[selected].id,
          attributes: {
            ...domain_designs[selected],
            [id]: value,
            card_background_color_display: true
          }
        });
        return;
      default:
        props.updateDomainDesign({
          id: domain_designs[selected].id,
          attributes: {
            ...domain_designs[selected],
            [id]: value
          }
        });
        return;
    }
  };

  return (
    <div className="right-submenu">
      <div className="right-submenu_header">
        <IconButton
          fontAwesome
          icon="caret-left"
          onClick={() => props.setRightMenuOpenForMenu('Workspace Design')}
        />
        <span className="ml5">{domain_designs[selected].name}</span>
      </div>
      {designDetails.map(designDetail => (
        <DesignDetailRow
          key={designDetail.id}
          detail={designDetail}
          value={domain_designs[selected][designDetail.id]}
          onChange={onChange}
        />
      ))}
      {canEdit && (
        <div className="Right-design-btn-wrapper">
          <SquareButton onClick={updateDesign}>Update</SquareButton>
        </div>
      )}
    </div>
  );
};

RightDesignDetailMenu.propTypes = {
  setRightMenuOpenForMenu: func.isRequired,
  selected: number.isRequired,
  updateDesign: func.isRequired,
  domain_designs: array.isRequired,
  updateDomainDesign: func.isRequired,
  canEdit: bool.isRequired
};

const mapState = state => {
  const sm = stateMappings(state);
  const { domainId } = sm.page;
  return {
    domain_designs: sm.domains[domainId].attributes.domain_designs || []
  };
};

const mapDispatch = {
  setRightMenuOpenForMenu,
  updateDesign,
  updateDomainDesign
};

export default connect(mapState, mapDispatch)(RightDesignDetailMenu);
