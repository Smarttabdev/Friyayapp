/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type SheetCard_query$ref = any;
export type SheetCardQueryVariables = {|
  owner: string
|};
export type SheetCardQueryResponse = {|
  +$fragmentRefs: SheetCard_query$ref
|};
export type SheetCardQuery = {|
  variables: SheetCardQueryVariables,
  response: SheetCardQueryResponse,
|};
*/


/*
query SheetCardQuery(
  $owner: ID!
) {
  ...SheetCard_query_1JS2nm
}

fragment SheetCard_query_1JS2nm on Query {
  isCardExpandedConfig: config(owner: $owner, config: "is_card_expanded") {
    value
    id
  }
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
v1 = {
  "kind": "Variable",
  "name": "owner",
  "variableName": "owner"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
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
    "name": "SheetCardQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "SheetCard_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SheetCardQuery",
    "selections": [
      {
        "alias": "isCardExpandedConfig",
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "is_card_expanded"
          },
          (v1/*: any*/)
        ],
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "value",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "helperCards",
        "args": (v3/*: any*/),
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
                  (v2/*: any*/),
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
        "args": (v3/*: any*/),
        "filters": [
          "helperFor"
        ],
        "handle": "connection",
        "key": "SheetCard_helperCards",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "9b291b63aaf6ce9dbdf191309663ad4b",
    "id": null,
    "metadata": {},
    "name": "SheetCardQuery",
    "operationKind": "query",
    "text": "query SheetCardQuery(\n  $owner: ID!\n) {\n  ...SheetCard_query_1JS2nm\n}\n\nfragment SheetCard_query_1JS2nm on Query {\n  isCardExpandedConfig: config(owner: $owner, config: \"is_card_expanded\") {\n    value\n    id\n  }\n  helperCards: tips(first: 10, helperFor: $owner) {\n    edges {\n      node {\n        id\n        title\n        slug\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ab7f10443dfc2206c4f81774c39f7758';

module.exports = node;
