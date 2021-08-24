/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TopicsTable_topicsQuery$ref = any;
export type TopicsTablePaginationQueryVariables = {|
  cursor?: ?string,
  parentId?: ?string,
  tagged?: ?$ReadOnlyArray<string>,
|};
export type TopicsTablePaginationQueryResponse = {|
  +$fragmentRefs: TopicsTable_topicsQuery$ref
|};
export type TopicsTablePaginationQuery = {|
  variables: TopicsTablePaginationQueryVariables,
  response: TopicsTablePaginationQueryResponse,
|};
*/


/*
query TopicsTablePaginationQuery(
  $cursor: String
  $parentId: ID
  $tagged: [String!]
) {
  ...TopicsTable_topicsQuery_1zeqi7
}

fragment TopicsTable_topicsQuery_1zeqi7 on Query {
  topics(first: 10, after: $cursor, parentId: $parentId, tagged: $tagged) {
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
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
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
    "name": "TopicsTablePaginationQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
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
    "name": "TopicsTablePaginationQuery",
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
    "cacheID": "f8d80629f8306c9a94515dbbe4295153",
    "id": null,
    "metadata": {},
    "name": "TopicsTablePaginationQuery",
    "operationKind": "query",
    "text": "query TopicsTablePaginationQuery(\n  $cursor: String\n  $parentId: ID\n  $tagged: [String!]\n) {\n  ...TopicsTable_topicsQuery_1zeqi7\n}\n\nfragment TopicsTable_topicsQuery_1zeqi7 on Query {\n  topics(first: 10, after: $cursor, parentId: $parentId, tagged: $tagged) {\n    edges {\n      node {\n        id\n        title\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '97fae357536c4c6cb90d0c1e5e70ea39';

module.exports = node;
