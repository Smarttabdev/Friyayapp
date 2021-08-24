/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type tipTabContentShareLinkQueryVariables = {|
  id: string
|};
export type tipTabContentShareLinkQueryResponse = {|
  +tip: ?{|
    +sharing: ?{|
      +id: string,
      +token: ?string,
      +active: ?boolean,
    |}
  |}
|};
export type tipTabContentShareLinkQuery = {|
  variables: tipTabContentShareLinkQueryVariables,
  response: tipTabContentShareLinkQueryResponse,
|};
*/


/*
query tipTabContentShareLinkQuery(
  $id: ID!
) {
  tip(id: $id) {
    sharing {
      id
      token
      active
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Sharing",
  "kind": "LinkedField",
  "name": "sharing",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "token",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "active",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "tipTabContentShareLinkQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Tip",
        "kind": "LinkedField",
        "name": "tip",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "tipTabContentShareLinkQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Tip",
        "kind": "LinkedField",
        "name": "tip",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "03bedf13c0be72e2d85ee1ed6e382884",
    "id": null,
    "metadata": {},
    "name": "tipTabContentShareLinkQuery",
    "operationKind": "query",
    "text": "query tipTabContentShareLinkQuery(\n  $id: ID!\n) {\n  tip(id: $id) {\n    sharing {\n      id\n      token\n      active\n    }\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5d290f04660d64b76f934ab770fa3911';

module.exports = node;
