/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AddAssigneeQueryVariables = {||};
export type AddAssigneeQueryResponse = {|
  +groups: ?$ReadOnlyArray<{|
    +id: string,
    +title: ?string,
  |}>,
  +users: ?$ReadOnlyArray<{|
    +id: string,
    +name: string,
  |}>,
  +labels: ?$ReadOnlyArray<{|
    +id: string,
    +name: ?string,
    +kind: ?string,
    +color: ?string,
  |}>,
|};
export type AddAssigneeQuery = {|
  variables: AddAssigneeQueryVariables,
  response: AddAssigneeQueryResponse,
|};
*/


/*
query AddAssigneeQuery {
  groups {
    id
    title
  }
  users {
    id
    name
  }
  labels {
    id
    name
    kind
    color
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
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
      (v1/*: any*/)
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Label",
    "kind": "LinkedField",
    "name": "labels",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "kind",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "color",
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
    "name": "AddAssigneeQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddAssigneeQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "3485b1d1f506ddfd40501183e00aac9e",
    "id": null,
    "metadata": {},
    "name": "AddAssigneeQuery",
    "operationKind": "query",
    "text": "query AddAssigneeQuery {\n  groups {\n    id\n    title\n  }\n  users {\n    id\n    name\n  }\n  labels {\n    id\n    name\n    kind\n    color\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9c75ddae8d9904bea0e5d8ba9f7938fe';

module.exports = node;
