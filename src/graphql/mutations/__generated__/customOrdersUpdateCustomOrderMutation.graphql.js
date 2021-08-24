/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type customOrdersUpdateCustomOrderMutationVariables = {|
  id: string,
  name?: ?string,
  order?: ?$ReadOnlyArray<string>,
|};
export type customOrdersUpdateCustomOrderMutationResponse = {|
  +updateCustomOrder: ?{|
    +customOrder: ?{|
      +id: string,
      +name: ?string,
      +order: ?$ReadOnlyArray<string>,
    |}
  |}
|};
export type customOrdersUpdateCustomOrderMutation = {|
  variables: customOrdersUpdateCustomOrderMutationVariables,
  response: customOrdersUpdateCustomOrderMutationResponse,
|};
*/


/*
mutation customOrdersUpdateCustomOrderMutation(
  $id: ID!
  $name: String
  $order: [String!]
) {
  updateCustomOrder(input: {id: $id, name: $name, order: $order}) {
    customOrder {
      id
      name
      order
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
    "name": "name"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "order"
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
          },
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name"
          },
          {
            "kind": "Variable",
            "name": "order",
            "variableName": "order"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "UpdateCustomOrderPayload",
    "kind": "LinkedField",
    "name": "updateCustomOrder",
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
            "name": "order",
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
    "name": "customOrdersUpdateCustomOrderMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "customOrdersUpdateCustomOrderMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "657b0bcbe8f286179143157f22186e0e",
    "id": null,
    "metadata": {},
    "name": "customOrdersUpdateCustomOrderMutation",
    "operationKind": "mutation",
    "text": "mutation customOrdersUpdateCustomOrderMutation(\n  $id: ID!\n  $name: String\n  $order: [String!]\n) {\n  updateCustomOrder(input: {id: $id, name: $name, order: $order}) {\n    customOrder {\n      id\n      name\n      order\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ef7de2d5f520e7f645b045d7dc7bb538';

module.exports = node;
