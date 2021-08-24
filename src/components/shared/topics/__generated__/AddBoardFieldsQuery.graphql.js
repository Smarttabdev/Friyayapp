/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AddBoardFieldsQueryVariables = {||};
export type AddBoardFieldsQueryResponse = {|
  +groups: ?$ReadOnlyArray<{|
    +id: string,
    +title: ?string,
  |}>,
  +users: ?$ReadOnlyArray<{|
    +id: string,
    +name: string,
  |}>,
|};
export type AddBoardFieldsQuery = {|
  variables: AddBoardFieldsQueryVariables,
  response: AddBoardFieldsQueryResponse,
|};
*/


/*
query AddBoardFieldsQuery {
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
    "name": "AddBoardFieldsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddBoardFieldsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4ae7cb534512c5d6511155424656925c",
    "id": null,
    "metadata": {},
    "name": "AddBoardFieldsQuery",
    "operationKind": "query",
    "text": "query AddBoardFieldsQuery {\n  groups {\n    id\n    title\n  }\n  users {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3059fe51afeb38fb5bfe8dab25b3bf61';

module.exports = node;
