export const attachmentsUpdater = ({
  filterSettings,
  topicId,
  connectionField,
  connectionVars,
  store
}) => {
  const rootField = store.getRootField('attachmentCreated');
  if (!rootField) return;
  const attachmentRecord = rootField.getLinkedRecord('attachment');
  if (!attachmentRecord) return;
  const tip = attachmentRecord.getLinkedRecord('tip');
  if (!tip) return;
  const connection = store
    .getRoot()
    .getLinkedRecord(connectionField, connectionVars);
  const edges = connection.getLinkedRecords('edges');
  const exists = edges.find(edge => {
    const node = edge.getLinkedRecord('node');
    if (node.getDataID() == tip.getDataID()) {
      const attachments = node.getLinkedRecords('attachments');
      if (
        !attachments.find(
          att => att.getDataID() === attachmentRecord.getDataID()
        )
      ) {
        attachments.push(attachmentRecord);
      }
      node.setLinkedRecords(attachments, 'attachments');
      return true;
    }
  });
  if (!exists) {
    tip.setLinkedRecords([attachmentRecord], 'attachments');
    const edge = ConnectionHandler.createEdge(
      store,
      connection,
      tip,
      'TipEdgeType'
    );
    ConnectionHandler.insertEdgeAfter(connection, edge);
  }
};
