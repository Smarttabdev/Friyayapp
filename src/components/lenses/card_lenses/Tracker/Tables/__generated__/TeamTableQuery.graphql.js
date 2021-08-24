/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TeamTableQueryVariables = {||};
export type TeamTableQueryResponse = {|
  +groups: ?$ReadOnlyArray<{|
    +id: string,
    +title: ?string,
  |}>,
  +users: ?$ReadOnlyArray<{|
    +id: string,
    +name: string,
  |}>,
|};
export type TeamTableQuery = {|
  variables: TeamTableQueryVariables,
  response: TeamTableQueryResponse,
|};
*/


/*
query TeamTableQuery {
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
    "name": "TeamTableQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TeamTableQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2d6c64d8baa82a9a5f9b2747ed319073",
    "id": null,
    "metadata": {},
    "name": "TeamTableQuery",
    "operationKind": "query",
    "text": "query TeamTableQuery {\n  groups {\n    id\n    title\n  }\n  users {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '78205977fcf8757eaa955b0ea10d2cb7';

module.exports = node;
