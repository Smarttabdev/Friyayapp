/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type NestedCards_tipsQuery$ref = any;
export type TipItemNestedCardsQueryVariables = {|
  tipId: string
|};
export type TipItemNestedCardsQueryResponse = {|
  +$fragmentRefs: NestedCards_tipsQuery$ref
|};
export type TipItemNestedCardsQuery = {|
  variables: TipItemNestedCardsQueryVariables,
  response: TipItemNestedCardsQueryResponse,
|};
*/


/*
query TipItemNestedCardsQuery(
  $tipId: ID!
) {
  ...NestedCards_tipsQuery_4kXePK
}

fragment NestedCards_tipsQuery_4kXePK on Query {
  tips(first: 15, tipId: $tipId) {
    edges {
      node {
        id
        title
        slug
        nestedTips {
          totalCount
        }
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
    "name": "tipId"
  }
],
v1 = {
  "kind": "Variable",
  "name": "tipId",
  "variableName": "tipId"
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  (v1/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TipItemNestedCardsQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "NestedCards_tipsQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TipItemNestedCardsQuery",
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
                    "name": "slug",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TipConnection",
                    "kind": "LinkedField",
                    "name": "nestedTips",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "totalCount",
                        "storageKey": null
                      }
                    ],
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
          "tipId"
        ],
        "handle": "connection",
        "key": "NestedCards_tips",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "c71f71e359b7e4607eec60b753037e3b",
    "id": null,
    "metadata": {},
    "name": "TipItemNestedCardsQuery",
    "operationKind": "query",
    "text": "query TipItemNestedCardsQuery(\n  $tipId: ID!\n) {\n  ...NestedCards_tipsQuery_4kXePK\n}\n\nfragment NestedCards_tipsQuery_4kXePK on Query {\n  tips(first: 15, tipId: $tipId) {\n    edges {\n      node {\n        id\n        title\n        slug\n        nestedTips {\n          totalCount\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '80612857e8b4318a009005ed761ba839';

module.exports = node;
