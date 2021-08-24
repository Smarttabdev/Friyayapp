/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type HeaderTeamQueryVariables = {||};
export type HeaderTeamQueryResponse = {|
  +groups: ?$ReadOnlyArray<{|
    +id: string,
    +title: ?string,
  |}>,
  +users: ?$ReadOnlyArray<{|
    +id: string,
    +name: string,
  |}>,
|};
export type HeaderTeamQuery = {|
  variables: HeaderTeamQueryVariables,
  response: HeaderTeamQueryResponse,
|};
*/


/*
query HeaderTeamQuery {
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
    "name": "HeaderTeamQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HeaderTeamQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "45f9473a0060603890f07ffe68410fef",
    "id": null,
    "metadata": {},
    "name": "HeaderTeamQuery",
    "operationKind": "query",
    "text": "query HeaderTeamQuery {\n  groups {\n    id\n    title\n  }\n  users {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '730eaeb8d7b3988c05b4ac713eae380d';

module.exports = node;
