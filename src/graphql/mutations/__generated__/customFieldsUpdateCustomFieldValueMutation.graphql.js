/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type customFieldsUpdateCustomFieldValueMutationVariables = {|
  id: string,
  value: any,
|};
export type customFieldsUpdateCustomFieldValueMutationResponse = {|
  +updateCustomFieldValue: ?{|
    +customFieldValue: {|
      +id: string,
      +value: ?any,
      +customField: {|
        +id: string
      |},
    |}
  |}
|};
export type customFieldsUpdateCustomFieldValueMutation = {|
  variables: customFieldsUpdateCustomFieldValueMutationVariables,
  response: customFieldsUpdateCustomFieldValueMutationResponse,
|};
*/


/*
mutation customFieldsUpdateCustomFieldValueMutation(
  $id: ID!
  $value: JSON!
) {
  updateCustomFieldValue(input: {id: $id, value: $value}) {
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "value"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
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
    "concreteType": "UpdateCustomFieldValuePayload",
    "kind": "LinkedField",
    "name": "updateCustomFieldValue",
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
          (v1/*: any*/),
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
              (v1/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "customFieldsUpdateCustomFieldValueMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "customFieldsUpdateCustomFieldValueMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "e3b5cce9b05e61cf84c37e334a45ac96",
    "id": null,
    "metadata": {},
    "name": "customFieldsUpdateCustomFieldValueMutation",
    "operationKind": "mutation",
    "text": "mutation customFieldsUpdateCustomFieldValueMutation(\n  $id: ID!\n  $value: JSON!\n) {\n  updateCustomFieldValue(input: {id: $id, value: $value}) {\n    customFieldValue {\n      id\n      value\n      customField {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ffa6c9f144373c7db7d238772f8455f0';

module.exports = node;
