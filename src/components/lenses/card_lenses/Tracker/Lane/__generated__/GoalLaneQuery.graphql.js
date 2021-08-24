/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type GoalLane_query$ref = any;
export type GoalLaneQueryVariables = {|
  cursor?: ?string,
  assignedId?: ?$ReadOnlyArray<string>,
  assignedToType?: ?string,
|};
export type GoalLaneQueryResponse = {|
  +$fragmentRefs: GoalLane_query$ref
|};
export type GoalLaneQuery = {|
  variables: GoalLaneQueryVariables,
  response: GoalLaneQueryResponse,
|};
*/


/*
query GoalLaneQuery(
  $cursor: String
  $assignedId: [ID!]
  $assignedToType: String
) {
  ...GoalLane_query_1LxpZg
}

fragment GoalLane_query_1LxpZg on Query {
  topics(first: 15, after: $cursor, all: true, tagged: "goal", assignedTo: $assignedId, assignedToType: $assignedToType) {
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
  "name": "assignedId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "assignedToType"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v3 = {
  "kind": "Variable",
  "name": "assignedToType",
  "variableName": "assignedToType"
},
v4 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Literal",
    "name": "all",
    "value": true
  },
  {
    "kind": "Variable",
    "name": "assignedTo",
    "variableName": "assignedId"
  },
  (v3/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  {
    "kind": "Literal",
    "name": "tagged",
    "value": "goal"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "GoalLaneQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "assignedId",
            "variableName": "assignedId"
          },
          (v3/*: any*/),
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          }
        ],
        "kind": "FragmentSpread",
        "name": "GoalLane_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "GoalLaneQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
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
        "args": (v4/*: any*/),
        "filters": [
          "all",
          "tagged",
          "assignedTo",
          "assignedToType"
        ],
        "handle": "connection",
        "key": "GoalLane_topics",
        "kind": "LinkedHandle",
        "name": "topics"
      }
    ]
  },
  "params": {
    "cacheID": "9d7bda28b8d5ccda3f555ca57b59d081",
    "id": null,
    "metadata": {},
    "name": "GoalLaneQuery",
    "operationKind": "query",
    "text": "query GoalLaneQuery(\n  $cursor: String\n  $assignedId: [ID!]\n  $assignedToType: String\n) {\n  ...GoalLane_query_1LxpZg\n}\n\nfragment GoalLane_query_1LxpZg on Query {\n  topics(first: 15, after: $cursor, all: true, tagged: \"goal\", assignedTo: $assignedId, assignedToType: $assignedToType) {\n    edges {\n      node {\n        id\n        title\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '59ac0dbc55d9dc4a3da503af81e8bfd1';

module.exports = node;
