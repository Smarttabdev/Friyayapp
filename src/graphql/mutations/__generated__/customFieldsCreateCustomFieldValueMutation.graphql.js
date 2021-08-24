/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type customFieldsCreateCustomFieldValueMutationVariables = {|
  ownerId: string,
  customFieldId: string,
  value?: ?any,
|};
export type customFieldsCreateCustomFieldValueMutationResponse = {|
  +createCustomFieldValue: ?{|
    +customFieldValue: {|
      +id: string,
      +value: ?any,
      +customField: {|
        +id: string
      |},
    |}
  |}
|};
export type customFieldsCreateCustomFieldValueMutation = {|
  variables: customFieldsCreateCustomFieldValueMutationVariables,
  response: customFieldsCreateCustomFieldValueMutationResponse,
|};
*/


/*
mutation customFieldsCreateCustomFieldValueMutation(
  $ownerId: ID!
  $customFieldId: ID!
  $value: JSON
) {
  createCustomFieldValue(input: {ownerId: $ownerId, customFieldId: $customFieldId, value: $value}) {
    customFieldValue {
      id
      value
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
  "name": "value"
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
            "name": "value",
            "variableName": "value"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "CreateCustomFieldValuePayload",
    "kind": "LinkedField",
    "name": "createCustomFieldValue",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CustomFieldValue",
        "kind": "LinkedField",
        "name": "customFieldValue",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "value",
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
    "name": "customFieldsCreateCustomFieldValueMutation",
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
    "name": "customFieldsCreateCustomFieldValueMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "d3ae425377f3bd663528c6d1e09b8bad",
    "id": null,
    "metadata": {},
    "name": "customFieldsCreateCustomFieldValueMutation",
    "operationKind": "mutation",
    "text": "mutation customFieldsCreateCustomFieldValueMutation(\n  $ownerId: ID!\n  $customFieldId: ID!\n  $value: JSON\n) {\n  createCustomFieldValue(input: {ownerId: $ownerId, customFieldId: $customFieldId, value: $value}) {\n    customFieldValue {\n      id\n      value\n      customField {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '041f2ed93bcacb3e20504bd77465fefa';

module.exports = node;
