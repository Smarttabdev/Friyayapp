/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type CardNestedCards_query$ref = any;
export type CardNestedCardsQueryVariables = {|
  owner: string
|};
export type CardNestedCardsQueryResponse = {|
  +$fragmentRefs: CardNestedCards_query$ref
|};
export type CardNestedCardsQuery = {|
  variables: CardNestedCardsQueryVariables,
  response: CardNestedCardsQueryResponse,
|};
*/


/*
query CardNestedCardsQuery(
  $owner: ID!
) {
  ...CardNestedCards_query_1JS2nm
}

fragment CardNestedCards_query_1JS2nm on Query {
  helperCards: tips(first: 10, helperFor: $owner) {
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
    "name": "owner"
  }
],
v1 = [
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
    "name": "CardNestedCardsQuery",
    "selections": [
      {
        "args": [
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
    "name": "CardNestedCardsQuery",
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
    "cacheID": "bd8b68623f952cf3d7a280d37b5c8724",
    "id": null,
    "metadata": {},
    "name": "CardNestedCardsQuery",
    "operationKind": "query",
    "text": "query CardNestedCardsQuery(\n  $owner: ID!\n) {\n  ...CardNestedCards_query_1JS2nm\n}\n\nfragment CardNestedCards_query_1JS2nm on Query {\n  helperCards: tips(first: 10, helperFor: $owner) {\n    edges {\n      node {\n        id\n        title\n        slug\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7a8181c55ddb00641adadc60a207b0f7';

module.exports = node;
