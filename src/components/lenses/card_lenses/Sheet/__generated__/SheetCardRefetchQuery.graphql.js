/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type SheetCard_query$ref = any;
export type SheetCardRefetchQueryVariables = {|
  cursor?: ?string,
  owner: string,
|};
export type SheetCardRefetchQueryResponse = {|
  +$fragmentRefs: SheetCard_query$ref
|};
export type SheetCardRefetchQuery = {|
  variables: SheetCardRefetchQueryVariables,
  response: SheetCardRefetchQueryResponse,
|};
*/


/*
query SheetCardRefetchQuery(
  $cursor: String
  $owner: ID!
) {
  ...SheetCard_query_1umO4r
}

fragment SheetCard_query_1umO4r on Query {
  isCardExpandedConfig: config(owner: $owner, config: "is_card_expanded") {
    value
    id
  }
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
    "name": "SheetCardRefetchQuery",
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
    "name": "SheetCardRefetchQuery",
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
    "cacheID": "8d42efac5dfb8566e924f8b9ccb5201f",
    "id": null,
    "metadata": {},
    "name": "SheetCardRefetchQuery",
    "operationKind": "query",
    "text": "query SheetCardRefetchQuery(\n  $cursor: String\n  $owner: ID!\n) {\n  ...SheetCard_query_1umO4r\n}\n\nfragment SheetCard_query_1umO4r on Query {\n  isCardExpandedConfig: config(owner: $owner, config: \"is_card_expanded\") {\n    value\n    id\n  }\n  helperCards: tips(first: 10, after: $cursor, helperFor: $owner) {\n    edges {\n      node {\n        id\n        title\n        slug\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e358b3b25580a3c644eefb93a3108795';

module.exports = node;
