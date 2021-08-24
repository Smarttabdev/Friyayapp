/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type customFieldsDeleteActiveFieldMutationVariables = {|
  id: string
|};
export type customFieldsDeleteActiveFieldMutationResponse = {|
  +deleteActiveField: ?{|
    +activeField: {|
      +id: string
    |}
  |}
|};
export type customFieldsDeleteActiveFieldMutation = {|
  variables: customFieldsDeleteActiveFieldMutationVariables,
  response: customFieldsDeleteActiveFieldMutationResponse,
|};
*/


/*
mutation customFieldsDeleteActiveFieldMutation(
  $id: ID!
) {
  deleteActiveField(input: {id: $id}) {
    activeField {
      id
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
    "concreteType": "DeleteActiveFieldPayload",
    "kind": "LinkedField",
    "name": "deleteActiveField",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "customFieldsDeleteActiveFieldMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "customFieldsDeleteActiveFieldMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "50203345b8d94ece1150b3c3165904e4",
    "id": null,
    "metadata": {},
    "name": "customFieldsDeleteActiveFieldMutation",
    "operationKind": "mutation",
    "text": "mutation customFieldsDeleteActiveFieldMutation(\n  $id: ID!\n) {\n  deleteActiveField(input: {id: $id}) {\n    activeField {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '46bde294524548bb3d306503c8c545a3';

module.exports = node;
