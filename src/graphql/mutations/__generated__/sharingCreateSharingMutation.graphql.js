/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type sharingCreateSharingMutationVariables = {|
  id: string
|};
export type sharingCreateSharingMutationResponse = {|
  +createSharing: ?{|
    +sharing: {|
      +id: string,
      +token: ?string,
      +active: ?boolean,
    |}
  |}
|};
export type sharingCreateSharingMutation = {|
  variables: sharingCreateSharingMutationVariables,
  response: sharingCreateSharingMutationResponse,
|};
*/


/*
mutation sharingCreateSharingMutation(
  $id: ID!
) {
  createSharing(input: {id: $id}) {
    sharing {
      id
      token
      active
    }
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
    "alias": null,
    "args": [
      {
        "fields": [
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
    "concreteType": "CreateSharingPayload",
    "kind": "LinkedField",
    "name": "createSharing",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "sharingCreateSharingMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "sharingCreateSharingMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "625956e6724a0b72f8b4e4c3e2fc9b2e",
    "id": null,
    "metadata": {},
    "name": "sharingCreateSharingMutation",
    "operationKind": "mutation",
    "text": "mutation sharingCreateSharingMutation(\n  $id: ID!\n) {\n  createSharing(input: {id: $id}) {\n    sharing {\n      id\n      token\n      active\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dee604047cd809f762d19a5b025aa2cd';

module.exports = node;
