/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type subscriptionsNotificationListSubscriptionVariables = {||};
export type subscriptionsNotificationListSubscriptionResponse = {|
  +notificationList: {|
    +notifications: ?$ReadOnlyArray<{|
      +id: string,
      +jsonApi: ?any,
    |}>
  |}
|};
export type subscriptionsNotificationListSubscription = {|
  variables: subscriptionsNotificationListSubscriptionVariables,
  response: subscriptionsNotificationListSubscriptionResponse,
|};
*/


/*
subscription subscriptionsNotificationListSubscription {
  notificationList {
    notifications {
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
    "concreteType": "NotificationListPayload",
    "kind": "LinkedField",
    "name": "notificationList",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ActivityNotification",
        "kind": "LinkedField",
        "name": "notifications",
        "plural": true,
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
    "name": "subscriptionsNotificationListSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "subscriptionsNotificationListSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2c3ac99b88ceb7650aeefe7a6f786892",
    "id": null,
    "metadata": {},
    "name": "subscriptionsNotificationListSubscription",
    "operationKind": "subscription",
    "text": "subscription subscriptionsNotificationListSubscription {\n  notificationList {\n    notifications {\n      id\n      jsonApi\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '97ebb5fa7cc67c6c93260ec3c3cff64c';

module.exports = node;
