/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type CreateChatCard_query$ref = any;
export type CreateChatCardQueryVariables = {|
  topicId?: ?string,
  hasTopic: boolean,
|};
export type CreateChatCardQueryResponse = {|
  +$fragmentRefs: CreateChatCard_query$ref
|};
export type CreateChatCardQuery = {|
  variables: CreateChatCardQueryVariables,
  response: CreateChatCardQueryResponse,
|};
*/


/*
query CreateChatCardQuery(
  $topicId: ID
  $hasTopic: Boolean!
) {
  ...CreateChatCard_query_3IG9Bu
}

fragment CreateChatCard_query_3IG9Bu on Query {
  defaultTopic {
    id
    title
  }
  currentTopic: topic(id: $topicId) @include(if: $hasTopic) {
    id
    title
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasTopic"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v2 = [
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
    "name": "title",
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
    "name": "CreateChatCardQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "hasTopic",
            "variableName": "hasTopic"
          },
          {
            "kind": "Variable",
            "name": "topicId",
            "variableName": "topicId"
          }
        ],
        "kind": "FragmentSpread",
        "name": "CreateChatCard_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateChatCardQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Topic",
        "kind": "LinkedField",
        "name": "defaultTopic",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      },
      {
        "condition": "hasTopic",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": "currentTopic",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "topicId"
              }
            ],
            "concreteType": "Topic",
            "kind": "LinkedField",
            "name": "topic",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "76f61d306b6fe64956c37987bca05cac",
    "id": null,
    "metadata": {},
    "name": "CreateChatCardQuery",
    "operationKind": "query",
    "text": "query CreateChatCardQuery(\n  $topicId: ID\n  $hasTopic: Boolean!\n) {\n  ...CreateChatCard_query_3IG9Bu\n}\n\nfragment CreateChatCard_query_3IG9Bu on Query {\n  defaultTopic {\n    id\n    title\n  }\n  currentTopic: topic(id: $topicId) @include(if: $hasTopic) {\n    id\n    title\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd6157dc5371a26f1cc556ed84698dc97';

module.exports = node;
