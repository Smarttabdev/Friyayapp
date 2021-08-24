/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type subscriptionsChatMessageUpdatedSubscriptionVariables = {|
  tipId: string
|};
export type subscriptionsChatMessageUpdatedSubscriptionResponse = {|
  +chatMessageUpdated: {|
    +chatMessage: ?{|
      +id: string,
      +body: ?string,
      +unread: ?boolean,
    |}
  |}
|};
export type subscriptionsChatMessageUpdatedSubscription = {|
  variables: subscriptionsChatMessageUpdatedSubscriptionVariables,
  response: subscriptionsChatMessageUpdatedSubscriptionResponse,
|};
*/


/*
subscription subscriptionsChatMessageUpdatedSubscription(
  $tipId: ID!
) {
  chatMessageUpdated(tipId: $tipId) {
    chatMessage {
      id
      body
      unread
    }
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
    "concreteType": "ChatMessageUpdatedPayload",
    "kind": "LinkedField",
    "name": "chatMessageUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ChatMessage",
        "kind": "LinkedField",
        "name": "chatMessage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "body",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "unread",
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
    "name": "subscriptionsChatMessageUpdatedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "subscriptionsChatMessageUpdatedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3dcaa785df7b6b3fff0e0a6fff663074",
    "id": null,
    "metadata": {},
    "name": "subscriptionsChatMessageUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription subscriptionsChatMessageUpdatedSubscription(\n  $tipId: ID!\n) {\n  chatMessageUpdated(tipId: $tipId) {\n    chatMessage {\n      id\n      body\n      unread\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '06a26309bb638ce45ec3dfc7d10cde4d';

module.exports = node;
