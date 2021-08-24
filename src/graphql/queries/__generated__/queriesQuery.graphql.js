/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type queries_tipsListQuery$ref = any;
export type queriesQueryVariables = {|
  count?: ?number,
  cursor?: ?string,
  rootTopics?: ?boolean,
  topicId?: ?string,
  filter?: ?any,
|};
export type queriesQueryResponse = {|
  +$fragmentRefs: queries_tipsListQuery$ref
|};
export type queriesQuery = {|
  variables: queriesQueryVariables,
  response: queriesQueryResponse,
|};
*/


/*
query queriesQuery(
  $count: Int
  $cursor: String
  $rootTopics: Boolean
  $topicId: ID
  $filter: JSON
) {
  ...queries_tipsListQuery_2CFD2m
}

fragment queries_tipsListQuery_2CFD2m on Query {
  tips(first: $count, after: $cursor, rootTopics: $rootTopics, topicId: $topicId, filter: $filter) {
    totalCount
    edges {
      node {
        id
        title
        slug
        cardType
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
  "name": "count"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filter"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "rootTopics"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v5 = {
  "kind": "Variable",
  "name": "filter",
  "variableName": "filter"
},
v6 = {
  "kind": "Variable",
  "name": "rootTopics",
  "variableName": "rootTopics"
},
v7 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v8 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v5/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v6/*: any*/),
  (v7/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "queriesQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "count",
            "variableName": "count"
          },
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "queries_tipsListQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "queriesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
        "concreteType": "TipConnection",
        "kind": "LinkedField",
        "name": "tips",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          },
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
                    "name": "slug",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cardType",
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
        "args": (v8/*: any*/),
        "filters": [
          "rootTopics",
          "topicId",
          "filter"
        ],
        "handle": "connection",
        "key": "queries_tips",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "f1f2990a1646f84e74e38b54eea273b5",
    "id": null,
    "metadata": {},
    "name": "queriesQuery",
    "operationKind": "query",
    "text": "query queriesQuery(\n  $count: Int\n  $cursor: String\n  $rootTopics: Boolean\n  $topicId: ID\n  $filter: JSON\n) {\n  ...queries_tipsListQuery_2CFD2m\n}\n\nfragment queries_tipsListQuery_2CFD2m on Query {\n  tips(first: $count, after: $cursor, rootTopics: $rootTopics, topicId: $topicId, filter: $filter) {\n    totalCount\n    edges {\n      node {\n        id\n        title\n        slug\n        cardType\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'babf4da5e821446255ac16176fbe4d38';

module.exports = node;
