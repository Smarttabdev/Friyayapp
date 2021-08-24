/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type subscriptionsNotificationCreatedSubscriptionVariables = {||};
export type subscriptionsNotificationCreatedSubscriptionResponse = {|
  +notificationCreated: {|
    +notification: ?{|
      +id: string,
      +jsonApi: ?any,
    |}
  |}
|};
export type subscriptionsNotificationCreatedSubscription = {|
  variables: subscriptionsNotificationCreatedSubscriptionVariables,
  response: subscriptionsNotificationCreatedSubscriptionResponse,
|};
*/


/*
subscription subscriptionsNotificationCreatedSubscription {
  notificationCreated {
    notification {
      id
      jsonApi
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "NotificationCreatedPayload",
    "kind": "LinkedField",
    "name": "notificationCreated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ActivityNotification",
        "kind": "LinkedField",
        "name": "notification",
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
            "name": "jsonApi",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "subscriptionsNotificationCreatedSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "subscriptionsNotificationCreatedSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "f1bee1e75c18f9f20d981062d67c7a0e",
    "id": null,
    "metadata": {},
    "name": "subscriptionsNotificationCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription subscriptionsNotificationCreatedSubscription {\n  notificationCreated {\n    notification {\n      id\n      jsonApi\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a59bc98402e7de86d586140ae03601ad';

module.exports = node;
