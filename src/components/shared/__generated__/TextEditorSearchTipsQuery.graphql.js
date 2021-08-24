/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TextEditorSearchTipsQueryVariables = {|
  filter?: ?any
|};
export type TextEditorSearchTipsQueryResponse = {|
  +tips: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: ?string,
        +slug: string,
        +cardType: ?string,
      |}
    |}>
  |}
|};
export type TextEditorSearchTipsQuery = {|
  variables: TextEditorSearchTipsQueryVariables,
  response: TextEditorSearchTipsQueryResponse,
|};
*/


/*
query TextEditorSearchTipsQuery(
  $filter: JSON
) {
  tips(first: 10, filter: $filter) {
    edges {
      node {
        id
        title
        slug
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
    "name": "filter"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "filter",
        "variableName": "filter"
      },
      {
        "kind": "Literal",
        "name": "first",
        "value": 10
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
                "name": "slug",
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
    "name": "TextEditorSearchTipsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TextEditorSearchTipsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "eeb91501043d13554088742f055b068e",
    "id": null,
    "metadata": {},
    "name": "TextEditorSearchTipsQuery",
    "operationKind": "query",
    "text": "query TextEditorSearchTipsQuery(\n  $filter: JSON\n) {\n  tips(first: 10, filter: $filter) {\n    edges {\n      node {\n        id\n        title\n        slug\n        cardType\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ccd83e0e25c5cd66ab73b67c95acb335';

module.exports = node;
