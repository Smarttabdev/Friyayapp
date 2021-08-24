/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type pinnedLensesOrdersCreatePinnedLensesOrderMutationVariables = {|
  name: string,
  order?: ?$ReadOnlyArray<string>,
  topicId?: ?string,
  isTeamDefault?: ?boolean,
|};
export type pinnedLensesOrdersCreatePinnedLensesOrderMutationResponse = {|
  +createPinnedLensesOrder: ?{|
    +pinnedLensesOrder: ?{|
      +id: string,
      +name: ?string,
      +order: ?$ReadOnlyArray<string>,
    |}
  |}
|};
export type pinnedLensesOrdersCreatePinnedLensesOrderMutation = {|
  variables: pinnedLensesOrdersCreatePinnedLensesOrderMutationVariables,
  response: pinnedLensesOrdersCreatePinnedLensesOrderMutationResponse,
|};
*/


/*
mutation pinnedLensesOrdersCreatePinnedLensesOrderMutation(
  $name: String!
  $order: [String!]
  $topicId: ID
  $isTeamDefault: Boolean
) {
  createPinnedLensesOrder(input: {name: $name, order: $order, topicId: $topicId, isTeamDefault: $isTeamDefault}) {
    pinnedLensesOrder {
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
  "name": "isTeamDefault"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "order"
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
            "name": "isTeamDefault",
            "variableName": "isTeamDefault"
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
            "name": "topicId",
            "variableName": "topicId"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "CreatePinnedLensesOrderPayload",
    "kind": "LinkedField",
    "name": "createPinnedLensesOrder",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "pinnedLensesOrdersCreatePinnedLensesOrderMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "pinnedLensesOrdersCreatePinnedLensesOrderMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "092026c3bdcf8863929f8b7d307cfa7b",
    "id": null,
    "metadata": {},
    "name": "pinnedLensesOrdersCreatePinnedLensesOrderMutation",
    "operationKind": "mutation",
    "text": "mutation pinnedLensesOrdersCreatePinnedLensesOrderMutation(\n  $name: String!\n  $order: [String!]\n  $topicId: ID\n  $isTeamDefault: Boolean\n) {\n  createPinnedLensesOrder(input: {name: $name, order: $order, topicId: $topicId, isTeamDefault: $isTeamDefault}) {\n    pinnedLensesOrder {\n      id\n      name\n      order\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '77d873bd9223806ec98a5416692ae52f';

module.exports = node;
