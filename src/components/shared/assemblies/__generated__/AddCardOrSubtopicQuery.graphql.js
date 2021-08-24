/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type CreateChatCard_query$ref = any;
type CreateChatCard_topicsQuery$ref = any;
export type AddCardOrSubtopicQueryVariables = {|
  topicId?: ?string,
  hasTopic: boolean,
|};
export type AddCardOrSubtopicQueryResponse = {|
  +$fragmentRefs: CreateChatCard_topicsQuery$ref & CreateChatCard_query$ref
|};
export type AddCardOrSubtopicQuery = {|
  variables: AddCardOrSubtopicQueryVariables,
  response: AddCardOrSubtopicQueryResponse,
|};
*/


/*
query AddCardOrSubtopicQuery(
  $topicId: ID
  $hasTopic: Boolean!
) {
  ...CreateChatCard_topicsQuery
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

fragment CreateChatCard_topicsQuery on Query {
  topics(first: 15, all: true) {
    edges {
      node {
        id
        title
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
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
    "kind": "Literal",
    "name": "all",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddCardOrSubtopicQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "CreateChatCard_topicsQuery"
      },
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
    "name": "AddCardOrSubtopicQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "TopicConnection",
        "kind": "LinkedField",
        "name": "topics",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TopicEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Topic",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "topics(all:true,first:15)"
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": [
          "all"
        ],
        "handle": "connection",
        "key": "CreateChatCard_topics",
        "kind": "LinkedHandle",
        "name": "topics"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Topic",
        "kind": "LinkedField",
        "name": "defaultTopic",
        "plural": false,
        "selections": (v5/*: any*/),
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
            "selections": (v5/*: any*/),
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "fbff2045903448ecef9901706f70d0db",
    "id": null,
    "metadata": {},
    "name": "AddCardOrSubtopicQuery",
    "operationKind": "query",
    "text": "query AddCardOrSubtopicQuery(\n  $topicId: ID\n  $hasTopic: Boolean!\n) {\n  ...CreateChatCard_topicsQuery\n  ...CreateChatCard_query_3IG9Bu\n}\n\nfragment CreateChatCard_query_3IG9Bu on Query {\n  defaultTopic {\n    id\n    title\n  }\n  currentTopic: topic(id: $topicId) @include(if: $hasTopic) {\n    id\n    title\n  }\n}\n\nfragment CreateChatCard_topicsQuery on Query {\n  topics(first: 15, all: true) {\n    edges {\n      node {\n        id\n        title\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8e7bdad8d9e2e79ed560192fc47da08d';

module.exports = node;
