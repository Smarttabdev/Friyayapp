/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type BoardListBlock_topicsQuery$ref = any;
export type BoardListBlockQueryVariables = {|
  topicId?: ?string
|};
export type BoardListBlockQueryResponse = {|
  +$fragmentRefs: BoardListBlock_topicsQuery$ref
|};
export type BoardListBlockQuery = {|
  variables: BoardListBlockQueryVariables,
  response: BoardListBlockQueryResponse,
|};
*/


/*
query BoardListBlockQuery(
  $topicId: ID
) {
  ...BoardListBlock_topicsQuery_1QjtfV
}

fragment BoardListBlock_topicsQuery_1QjtfV on Query {
  topics(first: 15, parentId: $topicId) {
    edges {
      node {
        id
        title
        slug
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "topicId"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  {
    "kind": "Variable",
    "name": "parentId",
    "variableName": "topicId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BoardListBlockQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "topicId",
            "variableName": "topicId"
          }
        ],
        "kind": "FragmentSpread",
        "name": "BoardListBlock_topicsQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BoardListBlockQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  },
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
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": [
          "parentId"
        ],
        "handle": "connection",
        "key": "BoardListBlock_topics",
        "kind": "LinkedHandle",
        "name": "topics"
      }
    ]
  },
  "params": {
    "cacheID": "6c01be18061a639cb9b0d607fc8cd4de",
    "id": null,
    "metadata": {},
    "name": "BoardListBlockQuery",
    "operationKind": "query",
    "text": "query BoardListBlockQuery(\n  $topicId: ID\n) {\n  ...BoardListBlock_topicsQuery_1QjtfV\n}\n\nfragment BoardListBlock_topicsQuery_1QjtfV on Query {\n  topics(first: 15, parentId: $topicId) {\n    edges {\n      node {\n        id\n        title\n        slug\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dae93e06864fc60deb9c9c77b305711f';

module.exports = node;
