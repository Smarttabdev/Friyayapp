/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LiveChatRoomsLensQueryVariables = {|
  chatMessageSince: string,
  topicId: string,
|};
export type LiveChatRoomsLensQueryResponse = {|
  +recentChats: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: ?string,
        +chatMessages: ?{|
          +edges: ?$ReadOnlyArray<?{|
            +node: ?{|
              +id: string,
              +body: ?string,
              +user: ?{|
                +id: string,
                +name: string,
              |},
            |}
          |}>
        |},
      |}
    |}>
  |}
|};
export type LiveChatRoomsLensQuery = {|
  variables: LiveChatRoomsLensQueryVariables,
  response: LiveChatRoomsLensQueryResponse,
|};
*/


/*
query LiveChatRoomsLensQuery(
  $chatMessageSince: String!
  $topicId: ID!
) {
  recentChats: tips(chatMessageSince: $chatMessageSince, topicId: $topicId, subtopics: true) {
    edges {
      node {
        id
        title
        chatMessages(first: 1) {
          edges {
            node {
              id
              body
              user {
                id
                name
              }
            }
          }
        }
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
    "name": "chatMessageSince"
  },
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
    "alias": "recentChats",
    "args": [
      {
        "kind": "Variable",
        "name": "chatMessageSince",
        "variableName": "chatMessageSince"
      },
      {
        "kind": "Literal",
        "name": "subtopics",
        "value": true
      },
      {
        "kind": "Variable",
        "name": "topicId",
        "variableName": "topicId"
      }
    ],
    "concreteType": "TipConnection",
    "kind": "LinkedField",
    "name": "tips",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TipEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Tip",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 1
                  }
                ],
                "concreteType": "ChatMessageConnection",
                "kind": "LinkedField",
                "name": "chatMessages",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ChatMessageEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ChatMessage",
                        "kind": "LinkedField",
                        "name": "node",
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
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "chatMessages(first:1)"
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
    "name": "LiveChatRoomsLensQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LiveChatRoomsLensQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "7b3db1065ca391d95ce30255c2fa5ad5",
    "id": null,
    "metadata": {},
    "name": "LiveChatRoomsLensQuery",
    "operationKind": "query",
    "text": "query LiveChatRoomsLensQuery(\n  $chatMessageSince: String!\n  $topicId: ID!\n) {\n  recentChats: tips(chatMessageSince: $chatMessageSince, topicId: $topicId, subtopics: true) {\n    edges {\n      node {\n        id\n        title\n        chatMessages(first: 1) {\n          edges {\n            node {\n              id\n              body\n              user {\n                id\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '052375b413738f3ea8499249fb3ddcc8';

module.exports = node;
