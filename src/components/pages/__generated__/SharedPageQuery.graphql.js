/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SharedPageQueryVariables = {|
  token: string
|};
export type SharedPageQueryResponse = {|
  +sharing: ?{|
    +tip: ?{|
      +id: string,
      +slug: string,
    |}
  |}
|};
export type SharedPageQuery = {|
  variables: SharedPageQueryVariables,
  response: SharedPageQueryResponse,
|};
*/


/*
query SharedPageQuery(
  $token: String!
) {
  sharing(token: $token) {
    tip {
      id
      slug
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
    "name": "token"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "token",
    "variableName": "token"
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
  "concreteType": "Tip",
  "kind": "LinkedField",
  "name": "tip",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
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
    "name": "SharedPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Sharing",
        "kind": "LinkedField",
        "name": "sharing",
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
    "name": "SharedPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Sharing",
        "kind": "LinkedField",
        "name": "sharing",
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
    "cacheID": "bf5ad946cf091df8ad5aad3931d9325c",
    "id": null,
    "metadata": {},
    "name": "SharedPageQuery",
    "operationKind": "query",
    "text": "query SharedPageQuery(\n  $token: String!\n) {\n  sharing(token: $token) {\n    tip {\n      id\n      slug\n    }\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'eee21ce6d646c9abfe2e7fc33e3872b4';

module.exports = node;
