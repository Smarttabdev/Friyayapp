/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CustomOrderEnum = "column_order" | "filters" | "people" | "topics" | "%future added value";
export type customOrdersCreateCustomOrderMutationVariables = {|
  orderType: CustomOrderEnum,
  name: string,
  order?: ?$ReadOnlyArray<string>,
  topicId?: ?string,
  lenseId?: ?string,
  lenseKey?: ?string,
  key?: ?string,
  defaultFilters?: ?any,
  copyFrom?: ?string,
|};
export type customOrdersCreateCustomOrderMutationResponse = {|
  +createCustomOrder: ?{|
    +customOrder: ?{|
      +id: string,
      +name: ?string,
      +order: ?$ReadOnlyArray<string>,
    |}
  |}
|};
export type customOrdersCreateCustomOrderMutation = {|
  variables: customOrdersCreateCustomOrderMutationVariables,
  response: customOrdersCreateCustomOrderMutationResponse,
|};
*/


/*
mutation customOrdersCreateCustomOrderMutation(
  $orderType: CustomOrderEnum!
  $name: String!
  $order: [String!]
  $topicId: ID
  $lenseId: ID
  $lenseKey: String
  $key: String
  $defaultFilters: JSON
  $copyFrom: ID
) {
  createCustomOrder(input: {orderType: $orderType, name: $name, order: $order, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey, key: $key, defaultFilters: $defaultFilters, copyFrom: $copyFrom}) {
    customOrder {
      id
      name
      order
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "copyFrom"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "defaultFilters"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "key"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseId"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseKey"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "order"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderType"
},
v8 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v9 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "copyFrom",
            "variableName": "copyFrom"
          },
          {
            "kind": "Variable",
            "name": "defaultFilters",
            "variableName": "defaultFilters"
          },
          {
            "kind": "Variable",
            "name": "key",
            "variableName": "key"
          },
          {
            "kind": "Variable",
            "name": "lenseId",
            "variableName": "lenseId"
          },
          {
            "kind": "Variable",
            "name": "lenseKey",
            "variableName": "lenseKey"
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
          },
          {
            "kind": "Variable",
            "name": "orderType",
            "variableName": "orderType"
          },
          {
            "kind": "Variable",
            "name": "topicId",
            "variableName": "topicId"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "CreateCustomOrderPayload",
    "kind": "LinkedField",
    "name": "createCustomOrder",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "customOrdersCreateCustomOrderMutation",
    "selections": (v9/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v7/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v8/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "customOrdersCreateCustomOrderMutation",
    "selections": (v9/*: any*/)
  },
  "params": {
    "cacheID": "2ed984dd1fd0bbc186b1496a088480ed",
    "id": null,
    "metadata": {},
    "name": "customOrdersCreateCustomOrderMutation",
    "operationKind": "mutation",
    "text": "mutation customOrdersCreateCustomOrderMutation(\n  $orderType: CustomOrderEnum!\n  $name: String!\n  $order: [String!]\n  $topicId: ID\n  $lenseId: ID\n  $lenseKey: String\n  $key: String\n  $defaultFilters: JSON\n  $copyFrom: ID\n) {\n  createCustomOrder(input: {orderType: $orderType, name: $name, order: $order, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey, key: $key, defaultFilters: $defaultFilters, copyFrom: $copyFrom}) {\n    customOrder {\n      id\n      name\n      order\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c92d852cf0c93eeb8bd0d1c8d6f9f4d6';

module.exports = node;
