import React from 'react';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getSort } from 'Components/lenses/card_lenses/Starter/utils';
import DesktopItem from './DesktopItem';
import { getToolIcon } from 'Src/utils/icons';
import { getIconColor } from 'Src/utils/color';
import { handleType } from '../../utils';
import { connect } from 'react-redux';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';

class ExpandedBoardItem extends React.Component {
  onClickTitle = () => {
    this.props.viewTopic({ topicSlug: this.props.slug });
  };

  render() {
    const { color, icon, title, handleClickTitle } = this.props;
    return (
      <div className="expanded_board">
        <div className="header">
          <div className="icon" style={{ color }}>
            <i className="material-icons-outlined">{icon}</i>
          </div>
          <div className="title" onClick={this.onClickTitle}>
            {title}
          </div>
        </div>
        <div className="body">
          {getNodes(this.props.query?.items).map((item, i) => {
            const id = toId(item[item.baseType == 'Tip' ? 'tip' : 'topic'].id);
            const type = handleType(item.itemType);
            const slug = item.itemType === 'file' ? item.tip.slug : item.slug;
            return (
              <div key={i}>
                <DesktopItem
                  icon={getToolIcon(type)}
                  color={getIconColor(type)}
                  title={item?.title}
                  isNested
                  type={item.itemType}
                  slug={slug}
                  id={id}
                  handleClickTitle={handleClickTitle}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const ExpandedBoardItemContainer = createPaginationContainer(
  ExpandedBoardItem,
  {
    query: graphql`
      fragment ExpandedBoardItem_query on Query
        @argumentDefinitions(
          cursor: { type: String }
          topicId: { type: ID }
          itemTypes: { type: "[ItemTypeEnum!]" }
          sort: { type: JSON }
        ) {
        items(
          first: 3
          after: $cursor
          topicId: $topicId
          itemTypes: $itemTypes
          sort: $sort
        ) @connection(key: "ExpandedBoardItem_items") {
          totalCount
          edges {
            node {
              id
              itemId
              title
              slug
              baseType
              itemType
              tip {
                id
                parent {
                  id
                  title
                }
                topic {
                  id
                  title
                }
              }
              topic {
                id
                parent {
                  id
                  title
                }
              }
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.query?.items,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query ExpandedBoardItemItemsQuery(
        $cursor: String
        $topicId: ID
        $sort: JSON
        $itemTypes: [ItemTypeEnum!]
      ) {
        ...ExpandedBoardItem_query
          @arguments(
            cursor: $cursor
            sort: $sort
            topicId: $topicId
            itemTypes: $itemTypes
          )
      }
    `
  }
);

const mapState = state => {
  const sm = stateMappings(state);
  const {
    tools: { finderLens }
  } = sm;

  return {
    finderLens
  };
};

const mapDispatch = {
  viewTopic
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(
    props => <ExpandedBoardItemContainer {...props} query={props} />,
    {
      query: graphql`
        query ExpandedBoardItemQuery(
          $cursor: String
          $topicId: ID
          $sort: JSON
          $itemTypes: [ItemTypeEnum!]
        ) {
          ...ExpandedBoardItem_query
            @arguments(
              cursor: $cursor
              topicId: $topicId
              sort: $sort
              itemTypes: $itemTypes
            )
        }
      `,
      vars: props => ({
        topicId: toGid('Topic', props.id),
        sort: { created_at: 'asc' },
        itemTypes: []
      })
    }
  )
);
