/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type customFieldsCreateActiveFieldMutationVariables = {|
  ownerId: string,
  customFieldId: string,
  position?: ?number,
|};
export type customFieldsCreateActiveFieldMutationResponse = {|
  +createActiveField: ?{|
    +activeField: {|
      +id: string,
      +position: number,
      +customField: {|
        +id: string
      |},
    |}
  |}
|};
export type customFieldsCreateActiveFieldMutation = {|
  variables: customFieldsCreateActiveFieldMutationVariables,
  response: customFieldsCreateActiveFieldMutationResponse,
|};
*/


/*
mutation customFieldsCreateActiveFieldMutation(
  $ownerId: ID!
  $customFieldId: ID!
  $position: Int
) {
  createActiveField(input: {ownerId: $ownerId, customFieldId: $customFieldId, position: $position}) {
    activeField {
      id
      position
      customField {
        id
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "customFieldId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "ownerId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "position"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "customFieldId",
            "variableName": "customFieldId"
          },
          {
            "kind": "Variable",
            "name": "ownerId",
            "variableName": "ownerId"
          },
          {
            "kind": "Variable",
            "name": "position",
            "variableName": "position"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "CreateActiveFieldPayload",
    "kind": "LinkedField",
    "name": "createActiveField",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ActiveField",
        "kind": "LinkedField",
        "name": "activeField",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "position",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CustomField",
            "kind": "LinkedField",
            "name": "customField",
            "plural": false,
            "selections": [
              (v3/*: any*/)
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "customFieldsCreateActiveFieldMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "customFieldsCreateActiveFieldMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "cab3ad7901a5aa7e697d142e148bc251",
    "id": null,
    "metadata": {},
    "name": "customFieldsCreateActiveFieldMutation",
    "operationKind": "mutation",
    "text": "mutation customFieldsCreateActiveFieldMutation(\n  $ownerId: ID!\n  $customFieldId: ID!\n  $position: Int\n) {\n  createActiveField(input: {ownerId: $ownerId, customFieldId: $customFieldId, position: $position}) {\n    activeField {\n      id\n      position\n      customField {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '80bffcd80a4657d7e33e358460c5f204';

module.exports = node;
