/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type cardBodyPreviewGetTypeQueryVariables = {|
  tipIds?: ?$ReadOnlyArray<string>
|};
export type cardBodyPreviewGetTypeQueryResponse = {|
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
export type cardBodyPreviewGetTypeQuery = {|
  variables: cardBodyPreviewGetTypeQueryVariables,
  response: cardBodyPreviewGetTypeQueryResponse,
|};
*/


/*
query cardBodyPreviewGetTypeQuery(
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
    "name": "cardBodyPreviewGetTypeQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "cardBodyPreviewGetTypeQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "52a915de0e60d5a6b99f944a2d66a69e",
    "id": null,
    "metadata": {},
    "name": "cardBodyPreviewGetTypeQuery",
    "operationKind": "query",
    "text": "query cardBodyPreviewGetTypeQuery(\n  $tipIds: [ID!]\n) {\n  tips(ids: $tipIds) {\n    edges {\n      node {\n        id\n        title\n        cardType\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4b46a27552a8e30d5387915b0f084292';

module.exports = node;
