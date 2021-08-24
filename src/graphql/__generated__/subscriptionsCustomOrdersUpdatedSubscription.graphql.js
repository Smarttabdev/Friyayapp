/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CustomOrderEnum = "column_order" | "filters" | "people" | "topics" | "%future added value";
export type subscriptionsCustomOrdersUpdatedSubscriptionVariables = {|
  orderType: CustomOrderEnum
|};
export type subscriptionsCustomOrdersUpdatedSubscriptionResponse = {|
  +customOrdersUpdated: {|
    +id: ?string
  |}
|};
export type subscriptionsCustomOrdersUpdatedSubscription = {|
  variables: subscriptionsCustomOrdersUpdatedSubscriptionVariables,
  response: subscriptionsCustomOrdersUpdatedSubscriptionResponse,
|};
*/


/*
subscription subscriptionsCustomOrdersUpdatedSubscription(
  $orderType: CustomOrderEnum!
) {
  customOrdersUpdated(orderType: $orderType) {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "orderType"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "orderType",
        "variableName": "orderType"
      }
    ],
    "concreteType": "CustomOrdersUpdatedPayload",
    "kind": "LinkedField",
    "name": "customOrdersUpdated",
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
    "name": "subscriptionsCustomOrdersUpdatedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "subscriptionsCustomOrdersUpdatedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "99354f697b04986414275f4c902404dd",
    "id": null,
    "metadata": {},
    "name": "subscriptionsCustomOrdersUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription subscriptionsCustomOrdersUpdatedSubscription(\n  $orderType: CustomOrderEnum!\n) {\n  customOrdersUpdated(orderType: $orderType) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '977f80d1b6c51d542a1085de308c6679';

module.exports = node;
