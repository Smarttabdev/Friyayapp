/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type CardNestedCards_query$ref = any;
export type CardNestedCardsRefetchQueryVariables = {|
  cursor?: ?string,
  owner: string,
|};
export type CardNestedCardsRefetchQueryResponse = {|
  +$fragmentRefs: CardNestedCards_query$ref
|};
export type CardNestedCardsRefetchQuery = {|
  variables: CardNestedCardsRefetchQueryVariables,
  response: CardNestedCardsRefetchQueryResponse,
|};
*/


/*
query CardNestedCardsRefetchQuery(
  $cursor: String
  $owner: ID!
) {
  ...CardNestedCards_query_1umO4r
}

fragment CardNestedCards_query_1umO4r on Query {
  helperCards: tips(first: 10, after: $cursor, helperFor: $owner) {
    edges {
      node {
        id
        title
        slug
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
    "name": "owner"
  }
],
v1 = [
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
  {
    "kind": "Variable",
    "name": "helperFor",
    "variableName": "owner"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CardNestedCardsRefetchQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          {
            "kind": "Variable",
            "name": "owner",
            "variableName": "owner"
          }
        ],
        "kind": "FragmentSpread",
        "name": "CardNestedCards_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CardNestedCardsRefetchQuery",
    "selections": [
      {
        "alias": "helperCards",
        "args": (v1/*: any*/),
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
        "alias": "helperCards",
        "args": (v1/*: any*/),
        "filters": [
          "helperFor"
        ],
        "handle": "connection",
        "key": "CardNestedCards_helperCards",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "257d19fd08d9cb2d503c2987551625ac",
    "id": null,
    "metadata": {},
    "name": "CardNestedCardsRefetchQuery",
    "operationKind": "query",
    "text": "query CardNestedCardsRefetchQuery(\n  $cursor: String\n  $owner: ID!\n) {\n  ...CardNestedCards_query_1umO4r\n}\n\nfragment CardNestedCards_query_1umO4r on Query {\n  helperCards: tips(first: 10, after: $cursor, helperFor: $owner) {\n    edges {\n      node {\n        id\n        title\n        slug\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9af61d5e0e2df6206f1e166dd641adf7';

module.exports = node;
