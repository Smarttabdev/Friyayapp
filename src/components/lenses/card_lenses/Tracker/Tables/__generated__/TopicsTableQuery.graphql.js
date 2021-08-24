/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TopicsTable_topicsQuery$ref = any;
export type TopicsTableQueryVariables = {|
  parentId?: ?string,
  tagged?: ?$ReadOnlyArray<string>,
|};
export type TopicsTableQueryResponse = {|
  +$fragmentRefs: TopicsTable_topicsQuery$ref
|};
export type TopicsTableQuery = {|
  variables: TopicsTableQueryVariables,
  response: TopicsTableQueryResponse,
|};
*/


/*
query TopicsTableQuery(
  $parentId: ID
  $tagged: [String!]
) {
  ...TopicsTable_topicsQuery_RPdo4
}

fragment TopicsTable_topicsQuery_RPdo4 on Query {
  topics(first: 10, parentId: $parentId, tagged: $tagged) {
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
    "name": "parentId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "tagged"
  }
],
v1 = {
  "kind": "Variable",
  "name": "parentId",
  "variableName": "parentId"
},
v2 = {
  "kind": "Variable",
  "name": "tagged",
  "variableName": "tagged"
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  (v1/*: any*/),
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TopicsTableQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "TopicsTable_topicsQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TopicsTableQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
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
        "args": (v3/*: any*/),
        "filters": [
          "parentId",
          "tagged"
        ],
        "handle": "connection",
        "key": "TopicsTable_topics",
        "kind": "LinkedHandle",
        "name": "topics"
      }
    ]
  },
  "params": {
    "cacheID": "45d17f68e678e5face0a5ed6ab206918",
    "id": null,
    "metadata": {},
    "name": "TopicsTableQuery",
    "operationKind": "query",
    "text": "query TopicsTableQuery(\n  $parentId: ID\n  $tagged: [String!]\n) {\n  ...TopicsTable_topicsQuery_RPdo4\n}\n\nfragment TopicsTable_topicsQuery_RPdo4 on Query {\n  topics(first: 10, parentId: $parentId, tagged: $tagged) {\n    edges {\n      node {\n        id\n        title\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd2ba7f97f5b677878984295058d6f2e9';

module.exports = node;
