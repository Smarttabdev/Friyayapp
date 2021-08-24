/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type pinnedLensesOrdersUpdatePinnedLensesOrderMutationVariables = {|
  id: string,
  name?: ?string,
  order?: ?$ReadOnlyArray<string>,
|};
export type pinnedLensesOrdersUpdatePinnedLensesOrderMutationResponse = {|
  +updatePinnedLensesOrder: ?{|
    +pinnedLensesOrder: ?{|
      +id: string,
      +name: ?string,
      +order: ?$ReadOnlyArray<string>,
    |}
  |}
|};
export type pinnedLensesOrdersUpdatePinnedLensesOrderMutation = {|
  variables: pinnedLensesOrdersUpdatePinnedLensesOrderMutationVariables,
  response: pinnedLensesOrdersUpdatePinnedLensesOrderMutationResponse,
|};
*/


/*
mutation pinnedLensesOrdersUpdatePinnedLensesOrderMutation(
  $id: ID!
  $name: String
  $order: [String!]
) {
  updatePinnedLensesOrder(input: {id: $id, name: $name, order: $order}) {
    pinnedLensesOrder {
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
    "concreteType": "UpdatePinnedLensesOrderPayload",
    "kind": "LinkedField",
    "name": "updatePinnedLensesOrder",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PinnedLensesOrder",
        "kind": "LinkedField",
        "name": "pinnedLensesOrder",
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
    "name": "pinnedLensesOrdersUpdatePinnedLensesOrderMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "pinnedLensesOrdersUpdatePinnedLensesOrderMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1ea72ea50c3c6043bbb1cd8131495e0c",
    "id": null,
    "metadata": {},
    "name": "pinnedLensesOrdersUpdatePinnedLensesOrderMutation",
    "operationKind": "mutation",
    "text": "mutation pinnedLensesOrdersUpdatePinnedLensesOrderMutation(\n  $id: ID!\n  $name: String\n  $order: [String!]\n) {\n  updatePinnedLensesOrder(input: {id: $id, name: $name, order: $order}) {\n    pinnedLensesOrder {\n      id\n      name\n      order\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b80360a00673fa8fc42f8e2fe587944c';

module.exports = node;
