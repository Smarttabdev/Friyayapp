/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type subscriptionsUnreadChatsUpdatedSubscriptionVariables = {||};
export type subscriptionsUnreadChatsUpdatedSubscriptionResponse = {|
  +chatUnreadCountUpdated: {|
    +chatUnreadCount: ?{|
      +id: string,
      +count: number,
    |}
  |}
|};
export type subscriptionsUnreadChatsUpdatedSubscription = {|
  variables: subscriptionsUnreadChatsUpdatedSubscriptionVariables,
  response: subscriptionsUnreadChatsUpdatedSubscriptionResponse,
|};
*/


/*
subscription subscriptionsUnreadChatsUpdatedSubscription {
  chatUnreadCountUpdated {
    chatUnreadCount {
      id
      count
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ChatUnreadCountUpdatedPayload",
    "kind": "LinkedField",
    "name": "chatUnreadCountUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ChatUnreadCount",
        "kind": "LinkedField",
        "name": "chatUnreadCount",
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
            "name": "count",
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
    "name": "subscriptionsUnreadChatsUpdatedSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "subscriptionsUnreadChatsUpdatedSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "7c6df4725871cc7f25f5154725e79a40",
    "id": null,
    "metadata": {},
    "name": "subscriptionsUnreadChatsUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription subscriptionsUnreadChatsUpdatedSubscription {\n  chatUnreadCountUpdated {\n    chatUnreadCount {\n      id\n      count\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f39d96d746c991c96fdc30851d4990aa';

module.exports = node;
