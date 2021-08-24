import React, { Fragment, useState } from 'react';
import ExpandItem from 'Components/shared/ExpandItem';
import TipListItem from 'Components/shared/TipSelector/TipListItem';
import NestedCards from './NestedCards';
import { getCardTypeIconAttribute } from 'Src/utils/icons';

const TipItem = ({ tip, onClick }) => {
  const [expand, setExpand] = useState();

  const hasNestedTips = !!tip.nestedTips?.totalCount;

  return (
    <div>
      <ExpandItem
        expand={expand}
        canExpand={hasNestedTips}
        onExpandClick={() => setExpand(!expand)}
        className="canvas-cardList-block__tip-item"
      >
        <TipListItem
          tip={tip}
          onClick={onClick}
          style={{ marginBottom: 0 }}
          iconProps={{
            icon: getCardTypeIconAttribute(tip?.cardType).icon,
            color: getCardTypeIconAttribute(tip?.cardType).defaultColor,
            outlined: true,
            fontSize: 20
          }}
        />
      </ExpandItem>
      {expand &&
        queryRenderer({
          query: graphql`
            query TipItemNestedCardsQuery($tipId: ID!) {
              ...NestedCards_tipsQuery @arguments(tipId: $tipId)
            }
          `,
          vars: { tipId: tip.id },
          render: ({ props }) => (
            <NestedCards className="ml20" tipsQuery={props} onClick={onClick} />
          )
        })}
    </div>
  );
};

export default TipItem;
