/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TipItemAttachmentUpdatedSubscriptionVariables = {|
  id: string
|};
export type TipItemAttachmentUpdatedSubscriptionResponse = {|
  +attachmentUpdated: {|
    +attachment: ?{|
      +id: string
    |}
  |}
|};
export type TipItemAttachmentUpdatedSubscription = {|
  variables: TipItemAttachmentUpdatedSubscriptionVariables,
  response: TipItemAttachmentUpdatedSubscriptionResponse,
|};
*/


/*
subscription TipItemAttachmentUpdatedSubscription(
  $id: ID!
) {
  attachmentUpdated(id: $id) {
    attachment {
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "AttachmentUpdatedPayload",
    "kind": "LinkedField",
    "name": "attachmentUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Attachment",
        "kind": "LinkedField",
        "name": "attachment",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TipItemAttachmentUpdatedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TipItemAttachmentUpdatedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1365f2a2b955b4ade12b58214ce06e11",
    "id": null,
    "metadata": {},
    "name": "TipItemAttachmentUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription TipItemAttachmentUpdatedSubscription(\n  $id: ID!\n) {\n  attachmentUpdated(id: $id) {\n    attachment {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '03268649c00c37d2166a051c76414528';

module.exports = node;
