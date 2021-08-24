/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type chatsCreateChatMessageMutationVariables = {|
  body: string,
  tipId: string,
|};
export type chatsCreateChatMessageMutationResponse = {|
  +createChatMessage: ?{|
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
export type chatsCreateChatMessageMutation = {|
  variables: chatsCreateChatMessageMutationVariables,
  response: chatsCreateChatMessageMutationResponse,
|};
*/


/*
mutation chatsCreateChatMessageMutation(
  $body: String!
  $tipId: ID!
) {
  createChatMessage(input: {body: $body, tipId: $tipId}) {
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "body"
  },
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
  (v1/*: any*/)
],
v3 = [
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
            "name": "tipId",
            "variableName": "tipId"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "CreateChatMessagePayload",
    "kind": "LinkedField",
    "name": "createChatMessage",
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
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Tip",
            "kind": "LinkedField",
            "name": "tip",
            "plural": false,
            "selections": (v2/*: any*/),
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "chatsCreateChatMessageMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatsCreateChatMessageMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "acff365ff2b892e0679bd6e0ecb31a94",
    "id": null,
    "metadata": {},
    "name": "chatsCreateChatMessageMutation",
    "operationKind": "mutation",
    "text": "mutation chatsCreateChatMessageMutation(\n  $body: String!\n  $tipId: ID!\n) {\n  createChatMessage(input: {body: $body, tipId: $tipId}) {\n    chatMessage {\n      id\n      body\n      user {\n        id\n      }\n      tip {\n        id\n      }\n      createdAt\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4caf7423c9168268478bd92f8cddce9c';

module.exports = node;
