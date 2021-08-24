/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ActivitiesTable_tipsQuery$ref = any;
export type ActivitiesTableQueryVariables = {|
  topicsParams?: ?any
|};
export type ActivitiesTableQueryResponse = {|
  +$fragmentRefs: ActivitiesTable_tipsQuery$ref
|};
export type ActivitiesTableQuery = {|
  variables: ActivitiesTableQueryVariables,
  response: ActivitiesTableQueryResponse,
|};
*/


/*
query ActivitiesTableQuery(
  $topicsParams: JSON
) {
  ...ActivitiesTable_tipsQuery_YXZLj
}

fragment ActivitiesTable_tipsQuery_YXZLj on Query {
  tips(first: 10, filter: "title != ''", topicsParams: $topicsParams) {
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
    "name": "topicsParams"
  }
],
v1 = {
  "kind": "Variable",
  "name": "topicsParams",
  "variableName": "topicsParams"
},
v2 = [
  {
    "kind": "Literal",
    "name": "filter",
    "value": "title != ''"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  (v1/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivitiesTableQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ActivitiesTable_tipsQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ActivitiesTableQuery",
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
          "filter",
          "topicsParams"
        ],
        "handle": "connection",
        "key": "ActivitiesTable_tips",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "f8fb5dedeb892a6d5d7dce79bfb3e64a",
    "id": null,
    "metadata": {},
    "name": "ActivitiesTableQuery",
    "operationKind": "query",
    "text": "query ActivitiesTableQuery(\n  $topicsParams: JSON\n) {\n  ...ActivitiesTable_tipsQuery_YXZLj\n}\n\nfragment ActivitiesTable_tipsQuery_YXZLj on Query {\n  tips(first: 10, filter: \"title != ''\", topicsParams: $topicsParams) {\n    edges {\n      node {\n        id\n        title\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a45819f939aa8c71208baf82ed1ed8ce';

module.exports = node;
