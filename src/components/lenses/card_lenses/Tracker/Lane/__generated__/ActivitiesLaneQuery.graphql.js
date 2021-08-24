/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ActivitiesLane_query$ref = any;
export type ActivitiesLaneQueryVariables = {|
  cursor?: ?string,
  topicId?: ?string,
|};
export type ActivitiesLaneQueryResponse = {|
  +$fragmentRefs: ActivitiesLane_query$ref
|};
export type ActivitiesLaneQuery = {|
  variables: ActivitiesLaneQueryVariables,
  response: ActivitiesLaneQueryResponse,
|};
*/


/*
query ActivitiesLaneQuery(
  $cursor: String
  $topicId: ID
) {
  ...ActivitiesLane_query_sq8rb
}

fragment ActivitiesLane_query_sq8rb on Query {
  tips(first: 15, after: $cursor, topicId: $topicId, topicsParams: {"tagged":["project"]}) {
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "topicId"
  }
],
v1 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "topicsParams",
    "value": {
      "tagged": [
        "project"
      ]
    }
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivitiesLaneQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ActivitiesLane_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ActivitiesLaneQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
        "args": (v2/*: any*/),
        "filters": [
          "topicId",
          "topicsParams"
        ],
        "handle": "connection",
        "key": "ActivitiesLane_tips",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "c8c8d7d58608c6640436f51875f6f512",
    "id": null,
    "metadata": {},
    "name": "ActivitiesLaneQuery",
    "operationKind": "query",
    "text": "query ActivitiesLaneQuery(\n  $cursor: String\n  $topicId: ID\n) {\n  ...ActivitiesLane_query_sq8rb\n}\n\nfragment ActivitiesLane_query_sq8rb on Query {\n  tips(first: 15, after: $cursor, topicId: $topicId, topicsParams: {\"tagged\":[\"project\"]}) {\n    edges {\n      node {\n        id\n        title\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '671ed79438ed6ed19e18f59a1edf0ca0';

module.exports = node;
