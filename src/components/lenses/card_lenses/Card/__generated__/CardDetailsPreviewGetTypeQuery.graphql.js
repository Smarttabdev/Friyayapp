/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CardDetailsPreviewGetTypeQueryVariables = {|
  tipIds?: ?$ReadOnlyArray<string>
|};
export type CardDetailsPreviewGetTypeQueryResponse = {|
  +tips: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: ?string,
        +cardType: ?string,
      |}
    |}>
  |}
|};
export type CardDetailsPreviewGetTypeQuery = {|
  variables: CardDetailsPreviewGetTypeQueryVariables,
  response: CardDetailsPreviewGetTypeQueryResponse,
|};
*/


/*
query CardDetailsPreviewGetTypeQuery(
  $tipIds: [ID!]
) {
  tips(ids: $tipIds) {
    edges {
      node {
        id
        title
        cardType
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "tipIds"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "ids",
        "variableName": "tipIds"
      }
    ],
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
                "name": "cardType",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CardDetailsPreviewGetTypeQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CardDetailsPreviewGetTypeQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "151c6fdef53cf0a2fa7fec96ecc76791",
    "id": null,
    "metadata": {},
    "name": "CardDetailsPreviewGetTypeQuery",
    "operationKind": "query",
    "text": "query CardDetailsPreviewGetTypeQuery(\n  $tipIds: [ID!]\n) {\n  tips(ids: $tipIds) {\n    edges {\n      node {\n        id\n        title\n        cardType\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5ca36f9059c9155a2b8e9923c7b5d49d';

module.exports = node;
