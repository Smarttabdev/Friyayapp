/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ChatBoxChatMessageCreatedSubscriptionVariables = {|
  tipId: string
|};
export type ChatBoxChatMessageCreatedSubscriptionResponse = {|
  +chatMessageCreated: {|
    +chatMessage: ?{|
      +id: string,
      +body: ?string,
      +unread: ?boolean,
      +createdAt: string,
      +user: ?{|
        +id: string,
        +name: string,
      |},
      +tip: ?{|
        +id: string
      |},
    |}
  |}
|};
export type ChatBoxChatMessageCreatedSubscription = {|
  variables: ChatBoxChatMessageCreatedSubscriptionVariables,
  response: ChatBoxChatMessageCreatedSubscriptionResponse,
|};
*/


/*
subscription ChatBoxChatMessageCreatedSubscription(
  $tipId: ID!
) {
  chatMessageCreated(tipId: $tipId) {
    chatMessage {
      id
      body
      unread
      createdAt
      user {
        id
        name
      }
      tip {
        id
      }
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "tipId",
        "variableName": "tipId"
      }
    ],
    "concreteType": "ChatMessageCreatedPayload",
    "kind": "LinkedField",
    "name": "chatMessageCreated",
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
          (v1/*: any*/),
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createdAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Tip",
            "kind": "LinkedField",
            "name": "tip",
            "plural": false,
            "selections": [
              (v1/*: any*/)
            ],
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
    "name": "ChatBoxChatMessageCreatedSubscription",
    "selections": (v2/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChatBoxChatMessageCreatedSubscription",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "fe4725c6adcfb4f49aa3e7e927107b02",
    "id": null,
    "metadata": {},
    "name": "ChatBoxChatMessageCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription ChatBoxChatMessageCreatedSubscription(\n  $tipId: ID!\n) {\n  chatMessageCreated(tipId: $tipId) {\n    chatMessage {\n      id\n      body\n      unread\n      createdAt\n      user {\n        id\n        name\n      }\n      tip {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6365dfdc0e5dfdebe7b0d0d8acedda62';

module.exports = node;
