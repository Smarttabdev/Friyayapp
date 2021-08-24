/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type subscriptionsPinnedLensesOrdersUpdatedSubscriptionVariables = {||};
export type subscriptionsPinnedLensesOrdersUpdatedSubscriptionResponse = {|
  +pinnedLensesOrdersUpdated: {|
    +id: ?string
  |}
|};
export type subscriptionsPinnedLensesOrdersUpdatedSubscription = {|
  variables: subscriptionsPinnedLensesOrdersUpdatedSubscriptionVariables,
  response: subscriptionsPinnedLensesOrdersUpdatedSubscriptionResponse,
|};
*/


/*
subscription subscriptionsPinnedLensesOrdersUpdatedSubscription {
  pinnedLensesOrdersUpdated {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PinnedLensesOrdersUpdatedPayload",
    "kind": "LinkedField",
    "name": "pinnedLensesOrdersUpdated",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "subscriptionsPinnedLensesOrdersUpdatedSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "subscriptionsPinnedLensesOrdersUpdatedSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5b9f9d95f6464402c850f60cbbbdeb44",
    "id": null,
    "metadata": {},
    "name": "subscriptionsPinnedLensesOrdersUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription subscriptionsPinnedLensesOrdersUpdatedSubscription {\n  pinnedLensesOrdersUpdated {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8548dda2f7e5705a7deda49f1c1a8658';

module.exports = node;
