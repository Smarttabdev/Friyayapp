/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type pinnedLensesOrdersSetDefaultPinnedLensesOrderMutationVariables = {|
  id: string,
  topicId: string,
|};
export type pinnedLensesOrdersSetDefaultPinnedLensesOrderMutationResponse = {|
  +setDefaultPinnedLensesOrder: ?{|
    +pinnedLensesOrder: ?{|
      +id: string,
      +name: ?string,
      +order: ?$ReadOnlyArray<string>,
    |}
  |}
|};
export type pinnedLensesOrdersSetDefaultPinnedLensesOrderMutation = {|
  variables: pinnedLensesOrdersSetDefaultPinnedLensesOrderMutationVariables,
  response: pinnedLensesOrdersSetDefaultPinnedLensesOrderMutationResponse,
|};
*/


/*
mutation pinnedLensesOrdersSetDefaultPinnedLensesOrderMutation(
  $id: ID!
  $topicId: ID!
) {
  setDefaultPinnedLensesOrder(input: {id: $id, topicId: $topicId}) {
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
    "concreteType": "SetDefaultPinnedLensesOrderPayload",
    "kind": "LinkedField",
    "name": "setDefaultPinnedLensesOrder",
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
    "name": "pinnedLensesOrdersSetDefaultPinnedLensesOrderMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "pinnedLensesOrdersSetDefaultPinnedLensesOrderMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4c56f3b0b0d398080878a05ff49da3a8",
    "id": null,
    "metadata": {},
    "name": "pinnedLensesOrdersSetDefaultPinnedLensesOrderMutation",
    "operationKind": "mutation",
    "text": "mutation pinnedLensesOrdersSetDefaultPinnedLensesOrderMutation(\n  $id: ID!\n  $topicId: ID!\n) {\n  setDefaultPinnedLensesOrder(input: {id: $id, topicId: $topicId}) {\n    pinnedLensesOrder {\n      id\n      name\n      order\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '254f24f28468802d608269883b262e9e';

module.exports = node;
