/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ExpandedCard_tipsQuery$ref = any;
export type ExpandedCardQueryVariables = {|
  cursor?: ?string,
  tipId?: ?string,
  sort?: ?any,
|};
export type ExpandedCardQueryResponse = {|
  +$fragmentRefs: ExpandedCard_tipsQuery$ref
|};
export type ExpandedCardQuery = {|
  variables: ExpandedCardQueryVariables,
  response: ExpandedCardQueryResponse,
|};
*/


/*
query ExpandedCardQuery(
  $cursor: String
  $tipId: ID
  $sort: JSON
) {
  ...ExpandedCard_tipsQuery_4aGR0f
}

fragment ExpandedCard_tipsQuery_4aGR0f on Query {
  tips(first: 15, after: $cursor, tipId: $tipId, sort: $sort) {
    totalCount
    edges {
      node {
        id
        title
        slug
        cardType
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sort"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tipId"
},
v3 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
},
v4 = {
  "kind": "Variable",
  "name": "tipId",
  "variableName": "tipId"
},
v5 = [
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
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ExpandedCardQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ExpandedCard_tipsQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "ExpandedCardQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "TipConnection",
        "kind": "LinkedField",
        "name": "tips",
        "plural": false,
        "selections": [
          (v6/*: any*/),
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
                    "concreteType": "TipConnection",
                    "kind": "LinkedField",
                    "name": "nestedTips",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/)
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
        "args": (v5/*: any*/),
        "filters": [
          "tipId",
          "sort"
        ],
        "handle": "connection",
        "key": "ExpandedCard_tips",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "dceacbdc984735341a003c020c6e618c",
    "id": null,
    "metadata": {},
    "name": "ExpandedCardQuery",
    "operationKind": "query",
    "text": "query ExpandedCardQuery(\n  $cursor: String\n  $tipId: ID\n  $sort: JSON\n) {\n  ...ExpandedCard_tipsQuery_4aGR0f\n}\n\nfragment ExpandedCard_tipsQuery_4aGR0f on Query {\n  tips(first: 15, after: $cursor, tipId: $tipId, sort: $sort) {\n    totalCount\n    edges {\n      node {\n        id\n        title\n        slug\n        cardType\n        nestedTips {\n          totalCount\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0d34243c4da9ad16925e1f1bc975faf2';

module.exports = node;
