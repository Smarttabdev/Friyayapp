/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type customOrdersDeleteCustomOrderMutationVariables = {|
  id: string
|};
export type customOrdersDeleteCustomOrderMutationResponse = {|
  +deleteCustomOrder: ?{|
    +customOrder: ?{|
      +id: string
    |}
  |}
|};
export type customOrdersDeleteCustomOrderMutation = {|
  variables: customOrdersDeleteCustomOrderMutationVariables,
  response: customOrdersDeleteCustomOrderMutationResponse,
|};
*/


/*
mutation customOrdersDeleteCustomOrderMutation(
  $id: ID!
) {
  deleteCustomOrder(input: {id: $id}) {
    customOrder {
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
    "concreteType": "DeleteCustomOrderPayload",
    "kind": "LinkedField",
    "name": "deleteCustomOrder",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CustomOrder",
        "kind": "LinkedField",
        "name": "customOrder",
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
    "name": "customOrdersDeleteCustomOrderMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "customOrdersDeleteCustomOrderMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2ad049f22f9cf639d05f80f24f1098ac",
    "id": null,
    "metadata": {},
    "name": "customOrdersDeleteCustomOrderMutation",
    "operationKind": "mutation",
    "text": "mutation customOrdersDeleteCustomOrderMutation(\n  $id: ID!\n) {\n  deleteCustomOrder(input: {id: $id}) {\n    customOrder {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f65a27d1397ddd1d8264b7e4c45d33dd';

module.exports = node;
