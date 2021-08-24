/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type sharingUpdateSharingMutationVariables = {|
  id: string,
  active?: ?boolean,
|};
export type sharingUpdateSharingMutationResponse = {|
  +updateSharing: ?{|
    +sharing: {|
      +id: string,
      +token: ?string,
      +active: ?boolean,
    |}
  |}
|};
export type sharingUpdateSharingMutation = {|
  variables: sharingUpdateSharingMutationVariables,
  response: sharingUpdateSharingMutationResponse,
|};
*/


/*
mutation sharingUpdateSharingMutation(
  $id: ID!
  $active: Boolean
) {
  updateSharing(input: {id: $id, active: $active}) {
    sharing {
      id
      token
      active
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "active"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "active",
            "variableName": "active"
          },
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "UpdateSharingPayload",
    "kind": "LinkedField",
    "name": "updateSharing",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Sharing",
        "kind": "LinkedField",
        "name": "sharing",
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "sharingUpdateSharingMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "sharingUpdateSharingMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "6f27c626450c775d5f1ef8b060b74733",
    "id": null,
    "metadata": {},
    "name": "sharingUpdateSharingMutation",
    "operationKind": "mutation",
    "text": "mutation sharingUpdateSharingMutation(\n  $id: ID!\n  $active: Boolean\n) {\n  updateSharing(input: {id: $id, active: $active}) {\n    sharing {\n      id\n      token\n      active\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a6d8a35cb8277a886d64fd442c5c4aa4';

module.exports = node;
