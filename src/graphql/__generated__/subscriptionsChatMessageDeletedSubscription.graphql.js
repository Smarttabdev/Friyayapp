/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type subscriptionsChatMessageDeletedSubscriptionVariables = {|
  tipId: string
|};
export type subscriptionsChatMessageDeletedSubscriptionResponse = {|
  +chatMessageDeleted: {|
    +id: ?string
  |}
|};
export type subscriptionsChatMessageDeletedSubscription = {|
  variables: subscriptionsChatMessageDeletedSubscriptionVariables,
  response: subscriptionsChatMessageDeletedSubscriptionResponse,
|};
*/


/*
subscription subscriptionsChatMessageDeletedSubscription(
  $tipId: ID!
) {
  chatMessageDeleted(tipId: $tipId) {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "tipId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "tipId",
        "variableName": "tipId"
      }
    ],
    "concreteType": "ChatMessageDeletedPayload",
    "kind": "LinkedField",
    "name": "chatMessageDeleted",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "subscriptionsChatMessageDeletedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "subscriptionsChatMessageDeletedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ae6e5366dc6bdf082dc51b439a8a0f5b",
    "id": null,
    "metadata": {},
    "name": "subscriptionsChatMessageDeletedSubscription",
    "operationKind": "subscription",
    "text": "subscription subscriptionsChatMessageDeletedSubscription(\n  $tipId: ID!\n) {\n  chatMessageDeleted(tipId: $tipId) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b89248e0e791752b12fc7b7507c05936';

module.exports = node;
