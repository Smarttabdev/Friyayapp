import React, { Fragment, useEffect } from 'react';

import tiphive from 'Lib/tiphive';
import Icon from 'Components/shared/Icon';
import TipListItem from 'Components/shared/TipSelector/TipListItem';

const TipItem = ({
  tip,
  onClickTip,
  topicId,
  filterSettings,
  connectionField
}) => {
  const attachmentIds = tip?.attachments.map(att => att.id).sort();

  useEffect(() => {
    if (!tip?.attachments.length) return;
    const disposers = tip.attachments.map(att =>
      requestSubscription({
        subscription: graphql`
          subscription TipItemAttachmentUpdatedSubscription($id: ID!) {
            attachmentUpdated(id: $id) {
              attachment {
                id
              }
            }
          }
        `,
        vars: { id: att.id },
        updater: store => {
          const rootField = store.getRootField('attachmentUpdated');
          if (!rootField) return;
          const attachmentRecord = rootField.getLinkedRecord('attachment');
          if (attachmentRecord) return;
          const connectionVars = {
            topicId: toGid('Topic', topicId),
            haveFiles: true,
            subtopics: filterSettings?.include_subtopic_cards,
            root: !filterSettings.include_nested_cards
          };
          const connection = store
            .getRoot()
            .getLinkedRecord(connectionField, connectionVars);
          const edges = connection.getLinkedRecords('edges');
          edges.forEach(edge => {
            const node = edge.getLinkedRecord('node');
            let attachments = node.getLinkedRecords('attachments');
            attachments = attachments.filter(a => a.getDataID() !== att.id);
            if (!attachments.length) {
              ConnectionHandler.deleteNode(connection, node.getDataID());
            } else {
              node.setLinkedRecords(attachments, 'attachments');
            }
          });
        }
      })
    );
    return () => disposers.forEach(d => d.dispose());
  }, [JSON.stringify(attachmentIds)]);

  return (
    <Fragment>
      <TipListItem tip={tip} className="mb10" onClick={() => onClickTip(tip)} />
      {tip.attachments.map(att => (
        <div key={att.id} className="flex flex-r-center ml17 mb10">
          <Icon
            outlined
            icon="insert_drive_file"
            color="#F2994A"
            containerClasses="mr10"
          />
          <a href={tiphive.apiBase() + att.url} target="_blank">
            {tiphive.baseName(att.url)}
          </a>
        </div>
      ))}
    </Fragment>
  );
};

export default createFragmentContainer(TipItem, {
  tip: graphql`
    fragment TipItem_tip on Tip {
      id
      title
      slug
      attachments {
        id
        url
      }
    }
  `
});
