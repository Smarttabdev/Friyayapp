import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setShowAddCardBottomOverlay } from 'Src/newRedux/interface/modals/actions';
import GenericDragContainer from 'Src/components/shared/drag_and_drop/GenericDragContainer';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import Icon from 'Components/shared/Icon';

class IntegrationFileItem extends Component {
  handleItemDoubleClick(fileItem) {
    if (!fileItem || fileItem.itemType !== 'folder') return;
    const { provider, handleFolderChange } = this.props;
    let folderID = fileItem.id;
    const folderName = fileItem.name;
    if (provider === 'dropbox') folderID = fileItem.path_lower;
    handleFolderChange({ folderID, folderName });
  }

  getRowItem = () => {
    const { provider, fileItem } = this.props;
    const { itemType, name } = fileItem;
    const fileItemClass = classNames(
      'file-item',
      'integration-file',
      `kind-${itemType}`,
      `${provider}-file`
    );
    const endIcon = itemType == 'folder' ? 'caret-right' : 'bars';
    return (
      <div
        onClick={() => itemType == 'file' && this.props.getFileUrl(fileItem)}
        className={fileItemClass}
        onDoubleClick={() => this.handleItemDoubleClick(fileItem)}
      >
        <Icon fontAwesome icon={itemType} containerClasses="mr5" />
        <div className="text">{name}</div>
        <Icon fontAwesome icon={endIcon} containerClasses="ml5 mr5" />
      </div>
    );
  };

  render() {
    const { provider, fileItem } = this.props;

    return (
      <GenericDragContainer
        item={{ fileItem, provider }}
        itemType={
          fileItem.itemType == 'file'
            ? dragItemTypes.FILE
            : dragItemTypes.FOLDER
        }
        dragPreview={this.getRowItem()}
        onDropElsewhere={() => {}}
      >
        {this.getRowItem()}
      </GenericDragContainer>
    );
  }
}

IntegrationFileItem.propTypes = {
  provider: PropTypes.oneOf(['dropbox', 'google', 'box']).isRequired,
  fileItem: PropTypes.object.isRequired,
  handleFolderChange: PropTypes.func.isRequired,
  getFileUrl: PropTypes.func.isRequired
};

const mapDispatch = {
  setShowAddCardBottomOverlay
};

export default connect(null, mapDispatch)(IntegrationFileItem);
