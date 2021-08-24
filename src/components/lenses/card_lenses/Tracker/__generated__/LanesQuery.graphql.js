/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LanesQueryVariables = {||};
export type LanesQueryResponse = {|
  +groups: ?$ReadOnlyArray<{|
    +id: string,
    +title: ?string,
  |}>,
  +users: ?$ReadOnlyArray<{|
    +id: string,
    +name: string,
  |}>,
|};
export type LanesQuery = {|
  variables: LanesQueryVariables,
  response: LanesQueryResponse,
|};
*/


/*
query LanesQuery {
  groups {
    id
    title
  }
  users {
    id
    name
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Group",
    "kind": "LinkedField",
    "name": "groups",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "users",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LanesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LanesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3d1c9bfe8073adcf3b7a3871aec1c609",
    "id": null,
    "metadata": {},
    "name": "LanesQuery",
    "operationKind": "query",
    "text": "query LanesQuery {\n  groups {\n    id\n    title\n  }\n  users {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e33abb1a1dd2070df09a9428b5d60181';

module.exports = node;
