/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type GoalLane_query$ref = any;
export type GoalLaneTipsQueryVariables = {|
  cursor?: ?string,
  assignedId?: ?$ReadOnlyArray<string>,
  assignedToType?: ?string,
|};
export type GoalLaneTipsQueryResponse = {|
  +$fragmentRefs: GoalLane_query$ref
|};
export type GoalLaneTipsQuery = {|
  variables: GoalLaneTipsQueryVariables,
  response: GoalLaneTipsQueryResponse,
|};
*/


/*
query GoalLaneTipsQuery(
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
    "name": "GoalLaneTipsQuery",
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
    "name": "GoalLaneTipsQuery",
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
    "cacheID": "802fdc2b9661eca7d3ac6ec6a936ef20",
    "id": null,
    "metadata": {},
    "name": "GoalLaneTipsQuery",
    "operationKind": "query",
    "text": "query GoalLaneTipsQuery(\n  $cursor: String\n  $assignedId: [ID!]\n  $assignedToType: String\n) {\n  ...GoalLane_query_1LxpZg\n}\n\nfragment GoalLane_query_1LxpZg on Query {\n  topics(first: 15, after: $cursor, all: true, tagged: \"goal\", assignedTo: $assignedId, assignedToType: $assignedToType) {\n    edges {\n      node {\n        id\n        title\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd8aa11873c8a06e5fa34e0a259ca5669';

module.exports = node;
