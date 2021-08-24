import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import Icon from 'Components/shared/Icon';
import { stateMappings } from 'Src/newRedux/stateMappings';
import MoreItemsLoader from 'Src/components/shared/MoreItemsLoader';
import IconButton from 'Components/shared/buttons/IconButton';
import NewDriveDocOptions from 'Src/components/menus/right/right_submenus/elements/NewDriveDocOptions';
import {
  listFiles,
  refreshAccessToken,
  disconnect
} from 'Src/newRedux/integrationFiles/google-drive/thunks';
import DriveIcon from 'Src/components/svg_icons/driveIcon';
import ToggleSwitch from 'Components/shared/ToggleSwitch';
import OAuthClient from 'Lib/oauth/oauth_client';

class GoogleDriveLens extends PureComponent {
  static propTypes = {
    error: PropTypes.string,
    files: PropTypes.array,
    folderID: PropTypes.string,
    hasMore: PropTypes.bool,
    newAccessToken: PropTypes.string,
    nextPageToken: PropTypes.string,
    search: PropTypes.string,
    sendingRequest: PropTypes.bool,
    listFiles: PropTypes.func,
    refreshAccessToken: PropTypes.func,
    disconnect: PropTypes.func,
    active_design: PropTypes.object
  };

  static defaultProps = {
    error: null,
    files: [],
    folderID: 'root',
    hasMore: true,
    newAccessToken: null,
    nextPageToken: null,
    search: '',
    sendingRequest: false
  };

  constructor(props) {
    super(props);

    this.state = {
      folders: [],
      files: [],
      foldersPath: []
    };
  }

  getAccessToken = () => Cookies.get('googleAccessToken');
  getRefreshToken = () => Cookies.get('googleRefreshToken');

  componentDidMount = () => {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (!accessToken && refreshToken) {
      this.props.refreshAccessToken(accessToken, refreshToken);
      return;
    }

    if (!accessToken && !refreshToken) {
      this.handleConnect();
      return;
    }

    this.handleFolderChange(this.props.folderID, null);
  };

  getDriveIcon = ({ width, height, Imageclass }) => (
    <img
      className={Imageclass}
      alt=""
      aria-hidden="true"
      src="https://www.gstatic.com/images/branding/product/1x/drive_48dp.png"
      srcSet="https://www.gstatic.com/images/branding/product/1x/drive_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/drive_48dp.png 2x "
      width={width || '20px'}
      height={height || '20px'}
    />
  );

  handleFolderChange = (folderID, folderName) => {
    const foldersPath = this.buildFoldersPath(folderID, folderName);
    this.setState({ foldersPath });
    this.loadFiles(folderID);
  };

  loadFiles = folderID => {
    this.props.listFiles(this.getAccessToken(), folderID);
  };

  searchFiles = search => {
    const { folderID } = this.props;
    this.props.listFiles(this.getAccessToken(), folderID, search);
  };

  handleConnect = () => {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getAccessToken();

    const authClient = OAuthClient.create({
      provider: 'google',
      scopes: ['https://www.googleapis.com/auth/drive'],
      redirectTo: window.location.href,
      accessType: 'offline'
    });

    if (!accessToken && !refreshToken && authClient)
      window.location.assign(authClient.code.getUri());
  };

  UNSAFE_componentWillReceiveProps = props => {
    const { folderID, search } = props;
    const folderMime = 'application/vnd.google-apps.folder';
    let folders = props.files
      .filter(f => f.folderID == folderID && f.mimeType == folderMime)
      .sort((a, b) => a.name.localeCompare(b.name));
    let files = props.files
      .filter(f => f.folderID == folderID && f.mimeType != folderMime)
      .sort((a, b) => a.name.localeCompare(b.name));
    if (search != '') {
      folders = folders.filter(f => f.name.toLowerCase().includes(search));
      files = files.filter(f => f.name.toLowerCase().includes(search));
    }
    this.setState({ folders, files });
  };

  handleDisconnectClick = () => {
    const accessToken = this.getAccessToken();
    if (!accessToken) return;

    vex.dialog.confirm({
      message: 'Are you sure you want to remove Google Drive connection',
      callback: value => {
        if (value) this.props.disconnect(accessToken);
      }
    });
  };

  renderSearch = () => {
    let searchInput;
    const click = e => {
      e.preventDefault();
      this.searchFiles(searchInput.value);
    };
    return (
      <form onSubmit={click} className="search-container">
        <input
          type="text"
          className="search-input"
          autoFocus
          autoComplete={'off'}
          ref={input => (searchInput = input)}
          placeholder="Search Google Drive"
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
      </form>
    );
  };

  buildFoldersPath = (folderID, folderName) => {
    const { foldersPath } = this.state;
    let newFoldersPath = [...foldersPath];
    if (folderID && folderID !== 'root' && folderName) {
      // check if folder already present in trail and make it last in trail
      const index = newFoldersPath.findIndex(f => f.folderID === folderID);
      if (index >= 0) newFoldersPath.splice(index + 1, foldersPath.length);
      else newFoldersPath.push({ folderID, folderName });
    } else newFoldersPath = [];

    return newFoldersPath;
  };

  breadcrumbElement = ({ folderID, folderName }) => (
    <span key={`path-${folderID}`}>
      {' / '}
      <a
        style={{ cursor: 'pointer' }}
        onClick={() => this.handleFolderChange(folderID, folderName)}
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
    return (
      <div className="file-list-breadcrumb ml10">
        <a
          style={{ cursor: 'pointer' }}
          onClick={() => this.handleFolderChange('root', null)}
        >
          <i className="glyphicon glyphicon-home" />
        </a>
        <DisplayingFoldersPath />
      </div>
    );
  };

  renderHeader = () => {
    const isConnected = !!this.getAccessToken();
    const googleIcon = isConnected ? (
      this.getDriveIcon({ width: 16, height: 16, Imageclass: 'mr10 icon' })
    ) : (
      <DriveIcon className="mr10 icon" fill="#515050" />
    );
    const toggleConnection = () => {
      if (isConnected) this.handleDisconnectClick();
      else this.handleConnect();
      this.setState(state => ({ isConnected: !state.isConnected }));
    };
    return (
      <div className="flex-r-center">
        {googleIcon}
        <NewDriveDocOptions dropdownLeft />
        {this.renderSearch()}
        <ToggleSwitch on={isConnected} onClick={toggleConnection} />
        {this.renderBreadCrumb()}
      </div>
    );
  };

  renderFolders = () => {
    const { folders } = this.state;
    return (
      <div className="icons-board">
        {folders.map(item => (
          <div
            key={item.id}
            className="folder"
            onClick={() => this.handleFolderChange(item.id, item.name)}
          >
            <Icon fontAwesome icon="folder" color="#888888" />
            <span className="folder-text">{item.name}</span>
          </div>
        ))}
      </div>
    );
  };

  renderFiles = () => {
    const { files } = this.state;
    const {
      active_design: { card_font_color }
    } = this.props;
    return (
      <div className="icons-board">
        {files.map(item => (
          <a
            href={item.webViewLink}
            target="_blank"
            rel="noopener noreferrer"
            key={item.id}
            className="file"
          >
            <div className="img-container">
              <img src={item.thumbnailLink || item.iconLink} />
            </div>
            <div className="file-title">
              <img src={item.iconLink} />
              <span
                className="file-text"
                style={{ color: card_font_color || '#666666' }}
              >
                {item.name}
              </span>
            </div>
          </a>
        ))}
      </div>
    );
  };

  render = () => {
    const { hasMore, folderID } = this.props;
    return (
      <div className="google-drive">
        {this.renderHeader()}
        {this.renderFolders()}
        {this.renderFiles()}
        {hasMore && (
          <MoreItemsLoader onVisible={() => this.loadFiles(folderID)} />
        )}
      </div>
    );
  };
}

const mapState = state => {
  const {
    user: {
      attributes: {
        google_drive_access_token: accessToken,
        google_drive_refresh_token: refreshToken
      }
    },
    utilities: { active_design },
    integrationFiles: { google }
  } = stateMappings(state);
  return { ...google, active_design, accessToken, refreshToken };
};
const mapDispatch = {
  listFiles,
  refreshAccessToken,
  disconnect
};

export default connect(mapState, mapDispatch)(GoogleDriveLens);
