/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type pinnedLensesOrdersDeletePinnedLensesOrderMutationVariables = {|
  id: string
|};
export type pinnedLensesOrdersDeletePinnedLensesOrderMutationResponse = {|
  +deletePinnedLensesOrder: ?{|
    +id: ?string
  |}
|};
export type pinnedLensesOrdersDeletePinnedLensesOrderMutation = {|
  variables: pinnedLensesOrdersDeletePinnedLensesOrderMutationVariables,
  response: pinnedLensesOrdersDeletePinnedLensesOrderMutationResponse,
|};
*/


/*
mutation pinnedLensesOrdersDeletePinnedLensesOrderMutation(
  $id: ID!
) {
  deletePinnedLensesOrder(input: {id: $id}) {
    id
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
    "concreteType": "DeletePinnedLensesOrderPayload",
    "kind": "LinkedField",
    "name": "deletePinnedLensesOrder",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "pinnedLensesOrdersDeletePinnedLensesOrderMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "pinnedLensesOrdersDeletePinnedLensesOrderMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5e6594d5f11ca84652ef7ad171b85dbd",
    "id": null,
    "metadata": {},
    "name": "pinnedLensesOrdersDeletePinnedLensesOrderMutation",
    "operationKind": "mutation",
    "text": "mutation pinnedLensesOrdersDeletePinnedLensesOrderMutation(\n  $id: ID!\n) {\n  deletePinnedLensesOrder(input: {id: $id}) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8c34f1544102e649d1cc9734b407556f';

module.exports = node;
