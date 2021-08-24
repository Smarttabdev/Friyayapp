/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ProjectLane_query$ref = any;
export type ProjectLaneTipsQueryVariables = {|
  cursor?: ?string,
  parentId?: ?string,
|};
export type ProjectLaneTipsQueryResponse = {|
  +$fragmentRefs: ProjectLane_query$ref
|};
export type ProjectLaneTipsQuery = {|
  variables: ProjectLaneTipsQueryVariables,
  response: ProjectLaneTipsQueryResponse,
|};
*/


/*
query ProjectLaneTipsQuery(
  $cursor: String
  $parentId: ID
) {
  ...ProjectLane_query_3OnjOP
}

fragment ProjectLane_query_3OnjOP on Query {
  topics(first: 15, after: $cursor, all: true, tagged: "project", parentId: $parentId) {
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
    "name": "parentId"
  }
],
v1 = {
  "kind": "Variable",
  "name": "parentId",
  "variableName": "parentId"
},
v2 = [
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
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "tagged",
    "value": "project"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProjectLaneTipsQuery",
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
        "name": "ProjectLane_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProjectLaneTipsQuery",
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
          "all",
          "tagged",
          "parentId"
        ],
        "handle": "connection",
        "key": "ProjectLane_topics",
        "kind": "LinkedHandle",
        "name": "topics"
      }
    ]
  },
  "params": {
    "cacheID": "18a2fdec01c31ed0f52c82c5fc813411",
    "id": null,
    "metadata": {},
    "name": "ProjectLaneTipsQuery",
    "operationKind": "query",
    "text": "query ProjectLaneTipsQuery(\n  $cursor: String\n  $parentId: ID\n) {\n  ...ProjectLane_query_3OnjOP\n}\n\nfragment ProjectLane_query_3OnjOP on Query {\n  topics(first: 15, after: $cursor, all: true, tagged: \"project\", parentId: $parentId) {\n    edges {\n      node {\n        id\n        title\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a541238bab8fa2c2a4c34838d8ac4b0d';

module.exports = node;
