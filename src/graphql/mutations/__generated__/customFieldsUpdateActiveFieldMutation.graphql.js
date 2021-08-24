/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type customFieldsUpdateActiveFieldMutationVariables = {|
  id: string,
  position?: ?number,
|};
export type customFieldsUpdateActiveFieldMutationResponse = {|
  +updateActiveField: ?{|
    +activeField: {|
      +id: string,
      +position: number,
      +customField: {|
        +id: string
      |},
    |}
  |}
|};
export type customFieldsUpdateActiveFieldMutation = {|
  variables: customFieldsUpdateActiveFieldMutationVariables,
  response: customFieldsUpdateActiveFieldMutationResponse,
|};
*/


/*
mutation customFieldsUpdateActiveFieldMutation(
  $id: ID!
  $position: Int
) {
  updateActiveField(input: {id: $id, position: $position}) {
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "position"
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
            "name": "position",
            "variableName": "position"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "UpdateActiveFieldPayload",
    "kind": "LinkedField",
    "name": "updateActiveField",
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
          (v1/*: any*/),
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
    "name": "customFieldsUpdateActiveFieldMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "customFieldsUpdateActiveFieldMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "45bc6436390179abb50b4a86d041d897",
    "id": null,
    "metadata": {},
    "name": "customFieldsUpdateActiveFieldMutation",
    "operationKind": "mutation",
    "text": "mutation customFieldsUpdateActiveFieldMutation(\n  $id: ID!\n  $position: Int\n) {\n  updateActiveField(input: {id: $id, position: $position}) {\n    activeField {\n      id\n      position\n      customField {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bcfcf2bc808458a70ef65efa4667d675';

module.exports = node;
