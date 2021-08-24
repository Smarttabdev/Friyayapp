/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type PinToolsToBoardsActiveToolsOrderQueryVariables = {|
  topicId: string
|};
export type PinToolsToBoardsActiveToolsOrderQueryResponse = {|
  +activePinnedLensesOrder: ?{|
    +id: string,
    +name: ?string,
    +order: ?$ReadOnlyArray<string>,
  |}
|};
export type PinToolsToBoardsActiveToolsOrderQuery = {|
  variables: PinToolsToBoardsActiveToolsOrderQueryVariables,
  response: PinToolsToBoardsActiveToolsOrderQueryResponse,
|};
*/


/*
query PinToolsToBoardsActiveToolsOrderQuery(
  $topicId: ID!
) {
  activePinnedLensesOrder(topicId: $topicId) {
    id
    name
    order
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
        "kind": "Variable",
        "name": "topicId",
        "variableName": "topicId"
      }
    ],
    "concreteType": "PinnedLensesOrder",
    "kind": "LinkedField",
    "name": "activePinnedLensesOrder",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PinToolsToBoardsActiveToolsOrderQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PinToolsToBoardsActiveToolsOrderQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c3b3de72c1cdc2e88c87d8cb37ec5a83",
    "id": null,
    "metadata": {},
    "name": "PinToolsToBoardsActiveToolsOrderQuery",
    "operationKind": "query",
    "text": "query PinToolsToBoardsActiveToolsOrderQuery(\n  $topicId: ID!\n) {\n  activePinnedLensesOrder(topicId: $topicId) {\n    id\n    name\n    order\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3177e37e9191491cf7e5c97e490e53cb';

module.exports = node;
