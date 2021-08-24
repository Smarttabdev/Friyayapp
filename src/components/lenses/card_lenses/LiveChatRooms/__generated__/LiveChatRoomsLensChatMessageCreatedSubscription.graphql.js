/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LiveChatRoomsLensChatMessageCreatedSubscriptionVariables = {|
  topicId?: ?string
|};
export type LiveChatRoomsLensChatMessageCreatedSubscriptionResponse = {|
  +chatMessageCreated: {|
    +chatMessage: ?{|
      +id: string,
      +body: ?string,
      +user: ?{|
        +id: string,
        +name: string,
      |},
      +tip: ?{|
        +id: string,
        +title: ?string,
      |},
    |}
  |}
|};
export type LiveChatRoomsLensChatMessageCreatedSubscription = {|
  variables: LiveChatRoomsLensChatMessageCreatedSubscriptionVariables,
  response: LiveChatRoomsLensChatMessageCreatedSubscriptionResponse,
|};
*/


/*
subscription LiveChatRoomsLensChatMessageCreatedSubscription(
  $topicId: ID
) {
  chatMessageCreated(topicId: $topicId) {
    chatMessage {
      id
      body
      user {
        id
        name
      }
      tip {
        id
        title
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
    "name": "topicId"
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
        "name": "topicId",
        "variableName": "topicId"
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
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              }
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
    "name": "LiveChatRoomsLensChatMessageCreatedSubscription",
    "selections": (v2/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LiveChatRoomsLensChatMessageCreatedSubscription",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "d5b38208f23c9245f36645f790272b59",
    "id": null,
    "metadata": {},
    "name": "LiveChatRoomsLensChatMessageCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription LiveChatRoomsLensChatMessageCreatedSubscription(\n  $topicId: ID\n) {\n  chatMessageCreated(topicId: $topicId) {\n    chatMessage {\n      id\n      body\n      user {\n        id\n        name\n      }\n      tip {\n        id\n        title\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e352197b95b18770c59d03b342fb1c6b';

module.exports = node;
