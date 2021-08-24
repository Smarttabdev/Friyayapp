/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type pinnedLensesOrdersSelectPinnedLensesOrderMutationVariables = {|
  id: string,
  topicId: string,
|};
export type pinnedLensesOrdersSelectPinnedLensesOrderMutationResponse = {|
  +selectPinnedLensesOrder: ?{|
    +pinnedLensesOrder: ?{|
      +id: string,
      +name: ?string,
      +order: ?$ReadOnlyArray<string>,
    |}
  |}
|};
export type pinnedLensesOrdersSelectPinnedLensesOrderMutation = {|
  variables: pinnedLensesOrdersSelectPinnedLensesOrderMutationVariables,
  response: pinnedLensesOrdersSelectPinnedLensesOrderMutationResponse,
|};
*/


/*
mutation pinnedLensesOrdersSelectPinnedLensesOrderMutation(
  $id: ID!
  $topicId: ID!
) {
  selectPinnedLensesOrder(input: {id: $id, topicId: $topicId}) {
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
    "name": "topicId"
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
            "name": "topicId",
            "variableName": "topicId"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "SelectPinnedLensesOrderPayload",
    "kind": "LinkedField",
    "name": "selectPinnedLensesOrder",
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
    "name": "pinnedLensesOrdersSelectPinnedLensesOrderMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "pinnedLensesOrdersSelectPinnedLensesOrderMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f838f6b318926ee19de44190f551963a",
    "id": null,
    "metadata": {},
    "name": "pinnedLensesOrdersSelectPinnedLensesOrderMutation",
    "operationKind": "mutation",
    "text": "mutation pinnedLensesOrdersSelectPinnedLensesOrderMutation(\n  $id: ID!\n  $topicId: ID!\n) {\n  selectPinnedLensesOrder(input: {id: $id, topicId: $topicId}) {\n    pinnedLensesOrder {\n      id\n      name\n      order\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '472857b9585e27a89ecc4d4d0a374707';

module.exports = node;
