/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type customOrdersSelectCustomOrderMutationVariables = {|
  id: string,
  topicId: string,
  lenseId?: ?string,
  lenseKey: string,
|};
export type customOrdersSelectCustomOrderMutationResponse = {|
  +selectCustomOrder: ?{|
    +customOrder: ?{|
      +id: string,
      +name: ?string,
      +order: ?$ReadOnlyArray<string>,
    |}
  |}
|};
export type customOrdersSelectCustomOrderMutation = {|
  variables: customOrdersSelectCustomOrderMutationVariables,
  response: customOrdersSelectCustomOrderMutationResponse,
|};
*/


/*
mutation customOrdersSelectCustomOrderMutation(
  $id: ID!
  $topicId: ID!
  $lenseId: ID
  $lenseKey: String!
) {
  selectCustomOrder(input: {id: $id, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey}) {
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
  "name": "id"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseKey"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v4 = [
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
            "name": "topicId",
            "variableName": "topicId"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "SelectCustomOrderPayload",
    "kind": "LinkedField",
    "name": "selectCustomOrder",
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
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "customOrdersSelectCustomOrderMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v3/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "customOrdersSelectCustomOrderMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "fb2d68a53e7a0dead283af5f6877a174",
    "id": null,
    "metadata": {},
    "name": "customOrdersSelectCustomOrderMutation",
    "operationKind": "mutation",
    "text": "mutation customOrdersSelectCustomOrderMutation(\n  $id: ID!\n  $topicId: ID!\n  $lenseId: ID\n  $lenseKey: String!\n) {\n  selectCustomOrder(input: {id: $id, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey}) {\n    customOrder {\n      id\n      name\n      order\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '223d6f239617e669f1abf5750cd3243c';

module.exports = node;
