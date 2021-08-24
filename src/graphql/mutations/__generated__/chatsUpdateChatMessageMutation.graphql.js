/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type chatsUpdateChatMessageMutationVariables = {|
  id: string,
  body: string,
|};
export type chatsUpdateChatMessageMutationResponse = {|
  +updateChatMessage: ?{|
    +chatMessage: ?{|
      +id: string,
      +body: ?string,
      +user: ?{|
        +id: string
      |},
      +tip: ?{|
        +id: string
      |},
      +createdAt: string,
    |}
  |}
|};
export type chatsUpdateChatMessageMutation = {|
  variables: chatsUpdateChatMessageMutationVariables,
  response: chatsUpdateChatMessageMutationResponse,
|};
*/


/*
mutation chatsUpdateChatMessageMutation(
  $id: ID!
  $body: String!
) {
  updateChatMessage(input: {id: $id, body: $body}) {
    chatMessage {
      id
      body
      user {
        id
      }
      tip {
        id
      }
      createdAt
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "body"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  (v2/*: any*/)
],
v4 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "body",
            "variableName": "body"
          },
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "UpdateChatMessagePayload",
    "kind": "LinkedField",
    "name": "updateChatMessage",
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
          (v2/*: any*/),
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
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Tip",
            "kind": "LinkedField",
            "name": "tip",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createdAt",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "chatsUpdateChatMessageMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "chatsUpdateChatMessageMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "3ee56b047f5e75a4399d3f5f43823c26",
    "id": null,
    "metadata": {},
    "name": "chatsUpdateChatMessageMutation",
    "operationKind": "mutation",
    "text": "mutation chatsUpdateChatMessageMutation(\n  $id: ID!\n  $body: String!\n) {\n  updateChatMessage(input: {id: $id, body: $body}) {\n    chatMessage {\n      id\n      body\n      user {\n        id\n      }\n      tip {\n        id\n      }\n      createdAt\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '745b43c5ce6e852b8c0ed3bef43c2b4c';

module.exports = node;
