import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import inflection from 'inflection';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';

import IntegrationHeaderDropdown from 'Src/components/menus/right/right_submenus/elements/integrationHeaderDropDown';
import NewDriveDocOptions from 'Src/components/menus/right/right_submenus/elements/NewDriveDocOptions';
import IntegrationFileItem from 'Src/components/menus/right/right_submenus/files_content/integration_file_item.js';
import MoreItemsLoader from 'Src/components/shared/MoreItemsLoader';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import IconButton from 'Components/shared/buttons/IconButton';

import {
  showDropboxFiles,
  listFiles as listDropboxFiles,
  disconnect as disconnectDropbox
} from 'Src/newRedux/integrationFiles/dropbox/thunks';
import {
  getGoogleFileURL as showGoogleFiles,
  listFiles as listGoogleFiles,
  disconnect as disconnectGoogle
} from 'Src/newRedux/integrationFiles/google-drive/thunks';
import {
  listFiles as listBoxFiles,
  disconnect as disconnectBox
} from 'Src/newRedux/integrationFiles/box/thunks';

class RightIntegrationsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      folderID: this.defaultFolderID(),
      folderName: null,
      foldersPath: []
    };
  }

  static propTypes = {
    listFiles: PropTypes.arrayOf(PropTypes.shape({})),
    listDropbox: PropTypes.func,
    getDriveIcon: PropTypes.func,
    listDropboxFiles: PropTypes.func,
    showDropboxFiles: PropTypes.func,
    showGoogleFiles: PropTypes.func,
    nextPageToken: PropTypes.string,
    provider: PropTypes.oneOf(['dropbox', 'google', 'box']).isRequired,
    setRightMenuOpenForMenu: PropTypes.func,
    googleData: PropTypes.shape({
      files: PropTypes.arrayOf(PropTypes.shape({}))
    }),
    dropboxData: PropTypes.shape({
      files: PropTypes.arrayOf(PropTypes.shape({}))
    }),
    boxData: PropTypes.shape({
      files: PropTypes.arrayOf(PropTypes.shape({}))
    })
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    let { provider } = this.props;
    let nextProvider = nextProps.provider;

    if (provider && nextProvider && provider !== nextProvider) {
      this.setState({
        folderID: this.defaultFolderID(),
        folderName: null,
        foldersPath: []
      });
    }
  };

  defaultFolderID = (provider = this.props.provider) => {
    return { box: 0, google: 'root', dropbox: '' }[provider];
  };

  buildFoldersPath = (folderID, folderName) => {
    const { foldersPath } = this.state;
    let newFoldersPath = [...foldersPath];
    if (folderID && folderID !== this.defaultFolderID() && folderName) {
      // check if folder already present in trail and make it last in trail
      const folderIndex = newFoldersPath.findIndex(
        folder => folder.folderID === folderID
      );

      if (folderIndex >= 0)
        newFoldersPath.splice(folderIndex, foldersPath.length);

      newFoldersPath.push({ folderID, folderName });
    } else newFoldersPath = [];

    return newFoldersPath;
  };

  getFileUrl = fileItem => {
    const { provider } = this.props;
    const accessToken = Cookies.get(`${provider}AccessToken`);

    if (provider === 'dropbox') {
      this.props.showDropboxFiles(accessToken, fileItem);
    } else {
      this.props.showGoogleFiles(accessToken, {}, fileItem);
    }
  };

  handleFolderChange = (options = {}) => {
    const {
      provider,
      listDropboxFiles,
      listBoxFiles,
      listGoogleFiles
    } = this.props;
    const accessToken = Cookies.get(`${provider}AccessToken`);
    if (!accessToken) return;

    const {
      folderID = this.state.folderID,
      folderName = this.state.folderName,
      search = ''
    } = options;

    const foldersPath = this.buildFoldersPath(folderID, folderName);
    this.setState({ folderID, folderName, foldersPath });

    const methodsMap = {
      google: listGoogleFiles,
      dropbox: listDropboxFiles,
      box: listBoxFiles
    };
    methodsMap[provider](accessToken, folderID, search);
  };

  handleDisconnectClick = () => {
    const {
      provider,
      setRightMenuOpenForMenu,
      disconnectDropbox,
      disconnectGoogle,
      disconnectBox
    } = this.props;
    const providerAccessToken = Cookies.get(`${provider}AccessToken`);
    if (!providerAccessToken) return;

    const methodsMap = {
      google: disconnectGoogle,
      dropbox: disconnectDropbox,
      box: disconnectBox
    };

    vex.dialog.confirm({
      message: `Are you sure you want to remove ${inflection.capitalize(
        provider
      )} connection?`,
      callback: value => {
        if (value) {
          methodsMap[provider](providerAccessToken);
          setRightMenuOpenForMenu(null);
        }
      }
    });
  };

  formatFileAndFolderForRender = (provider, files) => {
    let folderItems = [];
    let fileItems = [];
    const googleType = 'application/vnd.google-apps.folder';

    const isFolder = f =>
      f['.tag'] === 'folder' ||
      f['mimeType'] === googleType ||
      f['type'] === 'folder';

    const isFile = f =>
      f['.tag'] === 'file' ||
      (provider === 'google' && f['mimeType'] !== googleType) ||
      f['type'] === 'file';

    for (let file of files) {
      if (isFolder(file)) {
        file['itemType'] = 'folder';
        folderItems.push(file);
      } else if (isFile(file)) {
        file['itemType'] = 'file';
        fileItems.push(file);
      }
    }

    folderItems = this.sortByKey(folderItems, 'name');
    fileItems = this.sortByKey(fileItems, 'name');
    return folderItems.concat(fileItems);
  };

  renderFileAndFolder = () => {
    const { provider } = this.props;
    let { files, search, folderID } = this.props[`${provider}Data`];
    files = files.filter(fileItem => fileItem.folderID == folderID);
    if (search)
      files = files.filter(item => item.name.toLowerCase().includes(search));
    return this.formatFileAndFolderForRender(provider, files).map(fileItem => (
      <IntegrationFileItem
        provider={provider}
        key={fileItem.id}
        fileItem={fileItem}
        handleFolderChange={this.handleFolderChange}
        getFileUrl={this.getFileUrl}
      />
    ));
  };

  sortByKey = (array, key) => {
    return array.sort(function(a, b) {
      let x = a[key].toLowerCase();
      let y = b[key].toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  breadcrumbElement = ({ folderID, folderName }) => (
    <span key={`path-${folderID}`}>
      {' / '}
      <a
        style={{ cursor: 'pointer' }}
        className="text-muted"
        onClick={() =>
          this.handleFolderChange(
            this.state.foldersPath.find(fp => fp.folderID == folderID)
          )
        }
      >
        {folderName}
      </a>
    </span>
  );

  renderBreadCrumb = () => {
    const { foldersPath } = this.state;
    const DisplayingFoldersPath = () => {
      if (foldersPath.length < 3)
        return foldersPath.map(this.breadcrumbElement);
      return (
        <Fragment>
          {this.breadcrumbElement({
            folderID: foldersPath[0]['folderID'],
            folderName: foldersPath[0]['folderName']
          })}
          {this.breadcrumbElement({
            folderID: foldersPath[foldersPath.length - 2]['folderID'],
            folderName: '...'
          })}
          {this.breadcrumbElement({
            folderID: foldersPath[foldersPath.length - 1]['folderID'],
            folderName: foldersPath[foldersPath.length - 1]['folderName']
          })}
        </Fragment>
      );
    };

    const options = { folderID: this.defaultFolderID(), folderName: null };
    return (
      <div className="file-list-breadcrumb text-muted">
        <a
          style={{ cursor: 'pointer' }}
          className="text-muted"
          onClick={() => this.handleFolderChange(options)}
        >
          <i className="glyphicon glyphicon-home" />
        </a>
        <DisplayingFoldersPath />
      </div>
    );
  };

  renderSearch = () => {
    let searchInput;
    const { provider } = this.props;
    const click = () => this.handleFolderChange({ search: searchInput.value });
    return (
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          autoFocus
          autoComplete={'off'}
          ref={input => (searchInput = input)}
          placeholder={`Search ${inflection.capitalize(provider)}`}
        />
        <IconButton
          additionalClasses="font-size-16"
          icon="search"
          fontAwesome
          color="#63A0C3"
          tooltip="Search"
          tooltipOptions={{ place: 'bottom' }}
          onClick={click}
        />
      </div>
    );
  };

  getProviderIcon = (provider, connected, iconClass) => {
    if (provider == 'google') {
      return this.props.getDriveIcon({
        width: 20,
        height: 20,
        class: 'icon'
      });
    }
    if (provider == 'box') {
      const boxImageSrc = connected
        ? '/images/icon-box-com-active.png'
        : '/images/icon-box-com.png';
      return (
        <img
          src={boxImageSrc}
          style={{ position: 'relative', top: '-4px', cursor: 'pointer' }}
          onClick={() => this.handleFolderChange()}
        />
      );
    }
    return (
      <i
        className={iconClass}
        style={{ cursor: 'pointer' }}
        onClick={() => this.handleFolderChange()}
      />
    );
  };

  renderHeader = () => {
    const { provider } = this.props;
    const providerAccessToken = Cookies.get(`${provider}AccessToken`);
    const connected = !!providerAccessToken;
    const iconClass = classNames('fa', `fa-${provider}`, 'icon', { connected });
    const providerIcon = this.getProviderIcon(provider, connected, iconClass);
    const connectIcon = classNames('fa', 'icon', 'ml10', {
      'fa-toggle-on': connected,
      'fa-toggle-off': !connected,
      green: connected
    });

    return (
      <h3 className="right-submenu_header mr-1 flex-r-center-spacebetween">
        <div>
          {providerIcon}
          <span
            style={{ cursor: 'pointer', marginLeft: '5px' }}
            onClick={() => this.handleFolderChange()}
          >
            {inflection.capitalize(provider)}
          </span>
        </div>
        <div className="flex-r-center">
          {provider == 'google' && <NewDriveDocOptions />}
          <a onClick={this.handleDisconnectClick}>
            <i className={connectIcon} />
          </a>
        </div>
      </h3>
    );
  };

  render() {
    const { provider } = this.props;
    const { hasMore } = this.props[`${provider}Data`];
    return (
      <div className="right-submenu">
        {this.renderHeader()}
        {this.renderSearch()}
        <div className="rab-content-body">
          {this.renderBreadCrumb()}
          <div className="rab-items-listing">
            <div className="rab-items-container">
              {this.renderFileAndFolder()}
              {hasMore && (
                <MoreItemsLoader onVisible={() => this.handleFolderChange()} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  return {
    googleData: sm.integrationFiles.google,
    dropboxData: sm.integrationFiles.dropbox,
    boxData: sm.integrationFiles.box,
    slack: sm.integrationFiles.slack
  };
};

const mapDispatch = {
  disconnectDropbox,
  setRightMenuOpenForMenu,
  listDropboxFiles,
  listGoogleFiles,
  disconnectGoogle,
  listBoxFiles,
  disconnectBox,
  showDropboxFiles,
  showGoogleFiles
};

export default connect(mapState, mapDispatch)(RightIntegrationsList);
