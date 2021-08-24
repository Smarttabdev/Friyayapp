import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  match,
  length,
  equals,
  compose,
  not,
  ifElse,
  is,
  identity,
  and,
  isNil,
  always
} from 'ramda';
import { getCardTypeIconAttribute } from 'Src/utils/icons';
import { boardIconsColors } from 'Src/components/shared/CardAndBoardTypes';
// import { getUsers } from 'Actions/comments';

import FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min.js';
import ReactFroalaEditor from 'react-froala-wysiwyg';
import Tribute from 'tributejs';

import { getPeopleArray } from 'Src/newRedux/database/people/selectors';
import { getPeople } from 'Src/newRedux/database/people/thunks';

import 'froala-editor/css/froala_editor.pkgd.min.css';
// import 'froala-editor/css/themes/royal.min.css'
import 'froala-editor/css/froala_style.min.css';
import 'tributejs/dist/tribute.css';
import 'froala-editor/css/third_party/embedly.min.css';

// plugins js
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/plugins/video.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/quote.min.js';
import 'froala-editor/js/plugins/file.min.js';
import 'froala-editor/js/third_party/embedly.min.js';
import 'froala-editor/js/plugins/inline_style.min.js';
import 'froala-editor/js/plugins/line_breaker.min.js';
import 'froala-editor/js/plugins/code_beautifier.min.js';
import 'froala-editor/js/plugins/url.min.js';
import 'froala-editor/js/plugins/draggable.min.js';
import 'froala-editor/js/plugins/entities.min.js';

// plugin css
import 'froala-editor/css/plugins/colors.min.css';
import 'froala-editor/css/plugins/table.min.css';
import 'froala-editor/css/plugins/code_view.min.css';
import 'froala-editor/css/plugins/video.min.css';
import 'froala-editor/css/plugins/image.min.css';
import 'froala-editor/css/plugins/file.min.css';
import 'froala-editor/css/third_party/embedly.min.css';
import 'froala-editor/css/plugins/line_breaker.min.css';
import 'froala-editor/css/plugins/draggable.min.css';
import { topicFilter } from 'src/lib/config/filters/other';

const IMG_BASE_URL = 'https://process.filestackapi.com';
const notNull = compose(not, isNil);
const isString = is(String);
const notNullAndIsString = and(notNull, isString);
const getStringOrEmpty = ifElse(notNullAndIsString, identity, always(''));
const isImageUrl = compose(
  not,
  equals(0),
  length,
  match(/\.(jpeg|jpg|gif|png)$/),
  getStringOrEmpty
);

class TextEditor extends Component {
  static defaultProps = {
    defaultValue: null,
    focus: false,
    customStyleMap: {},
    tabIndex: null,
    placeholder: 'Input text',
    users: [],
    areUsersLoading: false,
    type: '',
    froalaEditorEvents: {},
    settings: {},
    contentUniqID: null,
    toolbarInline: false,
    extraStyle: {},
    toolbarVisibleWithoutSelection: false,
    toolbarBottom: false,
    editorRef: React.createRef()
  };

  static propTypes = {
    placeholder: PropTypes.string,
    className: PropTypes.string,
    editorClassName: PropTypes.string,
    toolbarClassName: PropTypes.string,
    body: PropTypes.string,
    onChange: PropTypes.func,
    tabIndex: PropTypes.number,
    users: PropTypes.array,
    areUsersLoading: PropTypes.bool,
    type: PropTypes.string,
    getPeople: PropTypes.func,
    froalaEditorEvents: PropTypes.object,
    settings: PropTypes.object,
    contentUniqID: PropTypes.string,
    toolbarInline: PropTypes.bool,
    extraStyle: PropTypes.object,
    toolbarVisibleWithoutSelection: PropTypes.bool,
    toolbarBottom: PropTypes.bool,
    editorRef: PropTypes.oneOfType([
      PropTypes.func, // for legacy refs
      PropTypes.shape({ current: PropTypes.any })
    ])
  };

  imgProcess = {
    id: '',
    getUrl: () => `${IMG_BASE_URL}/resize=width:300/${this.imgProcess.id}`,
    getUrlWithWidthHeight: (w, h) =>
      `${IMG_BASE_URL}/resize=width:${w},height:${h}/${this.imgProcess.id}`,
    renderImgElement: img => {
      const src = img.src;
      if (src.indexOf(IMG_BASE_URL) !== -1) {
        const splitUrl = src.split('/');
        this.imgProcess.id = splitUrl[splitUrl.length - 1];
        const height = Math.trunc(img.height || 0);
        const width = Math.trunc(img.width || 0);
        const imageUrl = this.imgProcess.getUrlWithWidthHeight(width, height);
        const uploadingImage = document.querySelector(`img[src="${src}"]`);
        uploadingImage.setAttribute('src', imageUrl);
      }
    }
  };

  searchTips = async text => {
    return fetchQuery(
      graphql`
        query TextEditorSearchTipsQuery($filter: JSON) {
          tips(first: 10, filter: $filter) {
            edges {
              node {
                id
                title
                slug
                cardType
              }
            }
          }
        }
      `,
      { filter: `title ILIKE '%${text}%'` }
    );
  };

  searchTopics = async text => {
    return fetchQuery(
      graphql`
        query TextEditorSearchTopicsQuery($title: String) {
          topics(first: 10, all: true, title: $title) {
            edges {
              node {
                id
                title
                slug
                tagList
              }
            }
          }
        }
      `,
      { title: text }
    );
  };

  renderIcon = attributes => {
    if (attributes.iconType == 'hashtag') {
      return `<div class=" tribute-container__icon mr-5"><i class="tiphive-icon material-icons icon-fa" style="color: ${attributes.color}; font-size: 14px;"><span class="fa fa-hashtag" /></i></div>`;
    }
    return `<div class="tribute-container__icon" mr-5><i style="color: ${
      attributes.color
    }; font-size: ${attributes.fontSize ||
      '1.14em'}" class= "tiphive-icon material-icons-outlined">${
      attributes.iconType
    }</i></div>`;
  };

  editorConfig = () => {
    const that = this;

    const {
      placeholder,
      toolbarInline,
      toolbarVisibleWithoutSelection,
      type,
      getPeople,
      users,
      user,
      contentUniqID,
      areUsersLoading,
      froalaEditorEvents,
      toolbarBottom
    } = this.props;

    const uploadURL = `${window.FILESTACK_API_URL}?key=${window.FILESTACK_API_KEY}`;

    const defaultEvents = {
      'paste.before': function(originalEvent) {
        const clipboard = originalEvent.clipboardData;
        const data = clipboard.getData('text/plain');

        const isYoutubeLink = /^https?:\/\/.*youtu\.?be/.test(data);
        const isImageLink = false; //isImageUrl(data); // temp disable it for now

        if (isYoutubeLink) {
          this.video.insertByURL(data);

          return false;
        } else if (isImageLink) {
          this.image.insert(data);

          const checkImageInterval = setInterval(() => {
            const uploadedImage = document.querySelector(`img[src="${data}"]`);
            if (uploadedImage) {
              uploadedImage.style.opacity = 0.6;
              clearInterval(checkImageInterval);
            }
          });

          filepicker.storeUrl(data, {}, imageData => {
            const [splitUrl] = imageData.url.split('/').reverse();
            that.imgProcess.id = splitUrl;
            const uploadedImage = document.querySelector(`img[src="${data}"]`);
            uploadedImage.setAttribute('src', that.imgProcess.getUrl());
            uploadedImage.style.opacity = 1;
          });

          return false;
        }
      },
      initialized: async function() {
        let editor = this;
        self.editor = this;

        const userMapper = ({ id, attributes: { name, username } }) => ({
          key: username.replace(/\d+$/, ''),
          value: username.replace(/\d+$/, ''),
          id
        });

        let usersToDisplay = users.map(userMapper);
        if (users.length === 0 && !areUsersLoading) {
          usersToDisplay = (await getPeople()).map(userMapper);
        }

        let tribute = new Tribute({
          collection: [
            {
              trigger: '@',
              selectClass: 'tribute-container--highlight',
              containerClass: 'tribute-container',
              values: usersToDisplay,
              selectTemplate: item => {
                // DON'T SPREAD IT TO MULTIPLE LINES
                return `<span class="fr-deletable fr-tribute"><a href="/users/${item.original.id}" target="_blank">@${item.original.key}</a></span>`;
              }
            },
            {
              trigger: '#',
              menuItemLimit: 30,
              selectClass: 'tribute-container--highlight',
              containerClass: 'tribute-container',
              allowSpaces: true,
              values: async function(text, cb) {
                const boardResults = await that.searchTopics(
                  text.replace(/'_'/g, ' ')
                );
                const cardResults = await that.searchTips(
                  text.replace(/'_'/g, ' ')
                );
                const boards = getNodes(boardResults.topics).map(topic => {
                  const iconAttributes =
                    boardIconsColors[topic.tagList[0] || 'board'];
                  return {
                    value: topic.title,
                    key: topic.title.replace(/\s/g, '_'),
                    slug: `/boards/${topic.slug}`,
                    iconAttributes,
                    id: toId(topic.id),
                    type: 'Topic'
                  };
                });

                const cards = getNodes(cardResults.tips).map(tip => {
                  const iconProperties = getCardTypeIconAttribute(tip.cardType);
                  return {
                    value: tip.title,
                    key: tip.title.replace(/\s/g, '_'),
                    slug: `/cards/${tip.slug}`,
                    iconAttributes: {
                      iconType: iconProperties.icon,
                      color: iconProperties.defaultColor
                    },
                    id: toId(tip.id),
                    type: 'Tip'
                  };
                });
                cb([...boards, ...cards]);
              },
              selectTemplate: item => {
                // DON'T SPREAD IT TO MULTIPLE LINES
                return `<span style="display: inline-flex; align-items: baseline;">${that.renderIcon(
                  item.original.iconAttributes
                )}<span contenteditable="false" class="fr-deletable fr-tribute" style="margin-left: 5px"><a href="${
                  item.original.slug
                }" target="_blank" data-mention-id="${
                  item.original.id
                }" data-mention-type="${item.original.type}">${
                  item.original.value
                }</a></span></span>`;
              },
              menuItemTemplate: item => {
                return `<span style="display: inline-flex; align-items: center;">${that.renderIcon(
                  item.original.iconAttributes
                )}<span style="margin-left: 5px;">${
                  item.original.key
                }</span></span>`;
              }
            }
          ]
        });

        tribute.attach(editor.el);
        editor.events.on(
          'keydown',
          function(e) {
            if (e.which == FroalaEditor.KEYCODE.ENTER && tribute.isActive) {
              return false;
            }
          },
          true
        );

        // if (type !== 'comment' && contentUniqID && window.CODOX_API_KEY) {
        //   const codox = new Codox();
        //   const username = `${user.attributes.first_name} ${user.attributes.last_name}`;
        //   codox.init({
        //     docId: contentUniqID,
        //     username,
        //     editor,
        //     apiKey: window.CODOX_API_KEY,
        //     app: 'froala'
        //   });

        //   that.codox = codox;
        // }
      },
      'file.uploaded': function(response) {
        const { filename, url } = JSON.parse(response) || {};
        this.file.insert(url, filename, response);

        return false;
      },
      'image.uploaded': function(response) {
        const { url } = JSON.parse(response);
        const [splitUrl] = url.split('/').reverse();
        that.imgProcess.id = splitUrl;

        this.image.insert(that.imgProcess.getUrl());
        this.image.remove($('img.fr-uploading'));
      },
      'image.resizeEnd': function(image) {
        return that.imgProcess.renderImgElement(image[0]);
      },
      'commands.after': function(cmd) {
        if (cmd === 'imageSetSize') {
          const images = this.image.get();
          // there's no way to access the right image here, so update everything
          // fancy way to iterate is because images is a jquery iterator map or each don't work
          for (let idx of [...Array(images.length).keys()]) {
            that.imgProcess.renderImgElement(images[idx]);
          }
        }
      }
    };

    const mergedEvents = { ...defaultEvents };
    Object.entries(froalaEditorEvents).forEach(([key, propsEvent]) => {
      if (defaultEvents[key]) {
        const compoundFunction = (...props) => {
          defaultEvents[key](...props);
          propsEvent(...props);
        };
        mergedEvents[key] = compoundFunction;
      } else {
        mergedEvents[key] = propsEvent;
      }
    });

    const settings = {
      key: window.FROALA_EDITOR_KEY,
      enter: FroalaEditor.ENTER_BR,
      attribution: false,
      inlineMode: false,
      typingTimer: 0,
      toolbarInline: toolbarInline,
      toolbarVisibleWithoutSelection: toolbarVisibleWithoutSelection,

      /*
        setting zIndex to make fr-popup work,
        values have to be 2050, see _models.scss
      */
      zIndex: 0,

      imageDefaultWidth: 0,
      imagePaste: true,
      imagePasteProcess: true,
      pasteAllowLocalImages: true,

      linkAlwaysBlank: false,
      linkInsertButtons: ['linkBack'],
      linkEditButtons: ['linkOpen', 'linkStyle', 'linkEdit', 'linkRemove'],
      linkStyles: { froala_banner_link_style: 'Banner' },

      paragraphFormatSelection: true,
      placeholderText: placeholder,
      toolbarSticky: false,
      tabSpaces: 4,
      toolbarBottom: toolbarBottom,
      toolbarButtons: {
        moreText: {
          buttons: [
            'bold',
            'italic',
            'underline',
            'strikeThrough',
            'subscript',
            'superscript',
            'fontSize',
            'textColor',
            'backgroundColor',
            'clearFormatting'
          ]
        },
        moreParagraph: {
          buttons: [
            'formatUL',
            'formatOL',
            'indent',
            'outdent',
            'alignLeft',
            'alignCenter',
            'alignRight',
            'alignJustify',
            'paragraphFormat'
          ],
          buttonsVisible: 3
        },
        moreRich: {
          buttons: [
            'insertFile',
            'insertLink',
            'insertImage',
            'insertVideo',
            'insertTable',
            'emoticons',
            'embedly',
            'insertHR'
          ]
        },
        moreMisc: {
          buttons: ['undo', 'redo', 'selectAll', 'html'],
          align: 'right',
          buttonsVisible: 0
        }
      },
      // toolbarButtons: [
      //   'bold',
      //   'italic',
      //   'underline',
      //   'strikeThrough',
      //   'fontSize',
      //   'colors',
      //   '|',
      //   'paragraphFormat',
      //   'align',
      //   'formatOL',
      //   'formatUL',
      //   'outdent',
      //   'indent',
      //   'insertFile',
      //   'embedly',
      //   'insertLink',
      //   'insertImage',
      //   'insertVideo',
      //   'insertTable',
      //   'emoticons',
      //   'insertHR',
      //   'html',
      // ],
      fileUseSelectedText: true,
      fileUploadURL: uploadURL,
      fileUploadMethod: 'POST',
      fileUploadParam: 'fileUpload',
      pluginsEnabled: [
        'align',
        'codeBeautifier',
        'codeView',
        'entities',
        'fontFamily',
        'fontSize',
        'inlineStyle',
        'lineBreaker',
        'link',
        'lists',
        'paragraphFormat',
        'paragraphStyle',
        'save',
        'table',
        'url',
        'video',
        'image',
        'emoticons',
        'draggable',
        'colors',
        'file',
        'embedly'
      ],
      pluginsDisabled: [],
      codeBeautifierOptions: {
        indent_char: ' ',
        indent_size: 2
      },
      imageUploadURL: uploadURL,
      imageUploadParam: 'fileUpload',
      imageUploadMethod: 'POST',
      imageInsertButtons: ['imageUpload', 'imageByURL'],
      videoInsertButtons: ['videoByURL', 'videoEmbed'],
      events: mergedEvents
    };

    if (type === 'comment') {
      settings.toolbarButtons = [
        'bold',
        'italic',
        'paragraphFormat',
        'formatOL',
        'formatUL',
        'insertLink',
        'insertImage',
        'emoticons',
        'html'
      ];
      settings.zIndex = 20;
    }

    if (type === 'chat') {
      settings.toolbarButtons = [
        'bold',
        'italic',
        // 'paragraphFormat',
        'formatOL',
        'formatUL',
        'insertLink',
        'insertImage',
        'emoticons',
        'html',
        'insertFile'
      ];

      settings.zIndex = 20;
    }

    return {
      ...settings,
      ...this.props.settings
    };
  };

  componentWillUnmount() {
    this.codox && this.codox.stop();
  }

  focus = () => this.editor.events.focus();

  render() {
    const {
      props: { body, onChange, tabIndex, extraStyle, editorRef }
    } = this;
    const config = this.editorConfig();
    return (
      <div id="editor" className="text-editor-wrapper" style={extraStyle}>
        <ReactFroalaEditor
          ref={editorRef}
          config={config}
          model={body}
          onModelChange={onChange}
          tabIndex={tabIndex}
        />
      </div>
    );
  }
}

const mapState = (state, props) => {
  return {
    users: getPeopleArray(state),
    user: state._newReduxTree.database.user
  };
};

const mapDispatch = {
  getPeople
};

const dataRequirements = props => {
  return {
    people: {}
  };
};

export default connect(mapState, mapDispatch, null, { withRef: true })(
  TextEditor
);
