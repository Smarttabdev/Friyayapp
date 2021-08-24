/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type GridBodyGetTypeQueryVariables = {|
  tipIds?: ?$ReadOnlyArray<string>
|};
export type GridBodyGetTypeQueryResponse = {|
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
export type GridBodyGetTypeQuery = {|
  variables: GridBodyGetTypeQueryVariables,
  response: GridBodyGetTypeQueryResponse,
|};
*/


/*
query GridBodyGetTypeQuery(
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
    "name": "GridBodyGetTypeQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GridBodyGetTypeQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6544f8f2da9a8de451bbd8fc0d09e66b",
    "id": null,
    "metadata": {},
    "name": "GridBodyGetTypeQuery",
    "operationKind": "query",
    "text": "query GridBodyGetTypeQuery(\n  $tipIds: [ID!]\n) {\n  tips(ids: $tipIds) {\n    edges {\n      node {\n        id\n        title\n        cardType\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '49ff6ef12490429868d0ddaaba73838f';

module.exports = node;
