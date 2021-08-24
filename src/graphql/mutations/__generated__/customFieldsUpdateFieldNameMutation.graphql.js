/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type customFieldsUpdateFieldNameMutationVariables = {|
  id: string,
  name?: ?string,
  fieldType?: ?string,
|};
export type customFieldsUpdateFieldNameMutationResponse = {|
  +updateCustomField: ?{|
    +customField: {|
      +id: string,
      +name: string,
      +fieldType: string,
    |}
  |}
|};
export type customFieldsUpdateFieldNameMutation = {|
  variables: customFieldsUpdateFieldNameMutationVariables,
  response: customFieldsUpdateFieldNameMutationResponse,
|};
*/


/*
mutation customFieldsUpdateFieldNameMutation(
  $id: ID!
  $name: String
  $fieldType: String
) {
  updateCustomField(input: {id: $id, name: $name, fieldType: $fieldType}) {
    customField {
      id
      name
      fieldType
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
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v3 = [
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
            "name": "id",
            "variableName": "id"
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
    "concreteType": "UpdateCustomFieldPayload",
    "kind": "LinkedField",
    "name": "updateCustomField",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "fieldType",
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
    "name": "customFieldsUpdateFieldNameMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "customFieldsUpdateFieldNameMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "0bd7ffefb07a3d589310ff2256955453",
    "id": null,
    "metadata": {},
    "name": "customFieldsUpdateFieldNameMutation",
    "operationKind": "mutation",
    "text": "mutation customFieldsUpdateFieldNameMutation(\n  $id: ID!\n  $name: String\n  $fieldType: String\n) {\n  updateCustomField(input: {id: $id, name: $name, fieldType: $fieldType}) {\n    customField {\n      id\n      name\n      fieldType\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'caa85eb10638eb0a6c5171226662dc8d';

module.exports = node;
