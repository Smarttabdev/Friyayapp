import React, { PureComponent, Fragment } from 'react';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import TextEditor from 'Components/shared/text_editor';
import Dotdotdot from 'react-dotdotdot';
import StringHelper from 'Src/helpers/string_helper';
import debounce from 'lodash/debounce';
import { fetchQuery } from 'Lib/relay';
import { getLinkItemTypes, toId } from 'src/lib/utilities';

class CardBody extends PureComponent {
  constructor(props) {
    super(props);
    this.delayedAutoSave = debounce(this.autoSave, 2000);
  }
  state = {
    isInEditMode: false,
    linkItemTypes: []
  };

  async componentDidMount() {
    const {
      attributes: { attachments_json = {} }
    } = this.props.card;
    const { tip_links } = attachments_json;
    const results = await getLinkItemTypes(tip_links, this.getType);
    this.setState({ linkItemTypes: results });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.card !== this.props.card) {
      const {
        attributes: { attachments_json = {} }
      } = this.props.card;
      const { tip_links } = attachments_json;

      const results = await getLinkItemTypes(tip_links, this.getType);
      this.setState({ linkItemTypes: results });
    }
  }

  getType = ({ isBoard, isCard, id }) => {
    let result = {};
    if (isBoard) {
      result = fetchQuery(
        graphql`
          query cardBodyPreviewQuery($topicIds: [ID!]) {
            topics(ids: $topicIds) {
              edges {
                node {
                  id
                  title
                  tagList
                }
              }
            }
          }
        `,
        {
          topicIds: [toId(id)]
        }
      );
    } else if (isCard) {
      result = fetchQuery(
        graphql`
          query cardBodyPreviewGetTypeQuery($tipIds: [ID!]) {
            tips(ids: $tipIds) {
              edges {
                node {
                  id
                  title
                  cardType
                }
              }
            }
          }
        `,
        {
          tipIds: [toId(id)]
        }
      );
    }
    return result;
  };

  toggleEditMode = () =>
    this.setState(prev => ({ isInEditMode: !prev.isInEditMode }));

  handleClickSave = () => {
    const { card, value } = this.props;
    const body = value || get(card, 'attributes.body', '');
    this.props.handleValueUpdate({ attributes: { body } });
    this.toggleEditMode();
  };

  handleValueChange = value => {
    this.props.handleValueChange(value);
    this.delayedAutoSave(value);
  };

  autoSave = value => {
    this.props.handleValueUpdate({ attributes: { body: value } });
  };

  render() {
    const { isInEditMode, linkItemTypes } = this.state;
    const { value, card } = this.props;

    const body = value || get(card, 'attributes.body', '');
    return (
      <Fragment>
        {isInEditMode ? (
          <div
            className="flex-c-start-spacebetween sheet-view__cell--body-content w100"
            style={{ zIndex: 0 }}
          >
            <TextEditor
              settings={{ toolbarInline: true, zIndex: 12, heightMax: 150 }}
              tabIndex={1}
              extraStyle={{
                width: '100%'
              }}
              placeholder="Write your Card content here"
              body={body || ''}
              onChange={this.handleValueChange}
            />
            <button
              className="btn btn-default btn-xs"
              style={{ alignSelf: 'flex-end' }}
              onClick={this.handleClickSave}
            >
              <i className="fa fa-save" aria-hidden="true"></i>
            </button>
          </div>
        ) : (
          <Dotdotdot clamp={10}>
            <div
              className="sheet-view__cell--body-content"
              style={{ maxHeight: 150, overflowY: 'auto' }}
              onDoubleClick={this.toggleEditMode}
              dangerouslySetInnerHTML={{
                __html: StringHelper.simpleFormat(
                  StringHelper.truncate(
                    body ||
                      '<span class="text-muted">Double click to edit</span>',
                    180
                  ),
                  linkItemTypes
                )
              }}
            />
          </Dotdotdot>
        )}
      </Fragment>
    );
  }
}

export default {
  cssModifier: 'body',
  display: 'Card Content',
  resizableProps: {
    minWidth: '140'
  },
  Component: CardBody,
  renderSummary: () => null,
  sort(cards, order) {
    return orderBy(cards, card => (card.attributes.body || '').length, order);
  }
};
