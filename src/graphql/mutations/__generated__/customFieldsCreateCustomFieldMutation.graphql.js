/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type customFieldsCreateCustomFieldMutationVariables = {|
  name: string,
  fieldType: string,
|};
export type customFieldsCreateCustomFieldMutationResponse = {|
  +createCustomField: ?{|
    +customField: {|
      +id: string
    |}
  |}
|};
export type customFieldsCreateCustomFieldMutation = {|
  variables: customFieldsCreateCustomFieldMutationVariables,
  response: customFieldsCreateCustomFieldMutationResponse,
|};
*/


/*
mutation customFieldsCreateCustomFieldMutation(
  $name: String!
  $fieldType: String!
) {
  createCustomField(input: {name: $name, fieldType: $fieldType}) {
    customField {
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "fieldType"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "fieldType",
            "variableName": "fieldType"
          },
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "CreateCustomFieldPayload",
    "kind": "LinkedField",
    "name": "createCustomField",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CustomField",
        "kind": "LinkedField",
        "name": "customField",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
    "name": "customFieldsCreateCustomFieldMutation",
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
    "name": "customFieldsCreateCustomFieldMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "0afbe6962be35e63b8711ef8ac7d55df",
    "id": null,
    "metadata": {},
    "name": "customFieldsCreateCustomFieldMutation",
    "operationKind": "mutation",
    "text": "mutation customFieldsCreateCustomFieldMutation(\n  $name: String!\n  $fieldType: String!\n) {\n  createCustomField(input: {name: $name, fieldType: $fieldType}) {\n    customField {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b87cbe86c867a83e6e5524575835584c';

module.exports = node;
