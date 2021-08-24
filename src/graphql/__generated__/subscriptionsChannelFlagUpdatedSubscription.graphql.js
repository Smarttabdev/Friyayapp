/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type subscriptionsChannelFlagUpdatedSubscriptionVariables = {|
  channel: string,
  flag: string,
|};
export type subscriptionsChannelFlagUpdatedSubscriptionResponse = {|
  +channelFlagUpdated: {|
    +channelFlag: ?{|
      +id: string,
      +channel: string,
      +users: $ReadOnlyArray<{|
        +id: string
      |}>,
    |}
  |}
|};
export type subscriptionsChannelFlagUpdatedSubscription = {|
  variables: subscriptionsChannelFlagUpdatedSubscriptionVariables,
  response: subscriptionsChannelFlagUpdatedSubscriptionResponse,
|};
*/


/*
subscription subscriptionsChannelFlagUpdatedSubscription(
  $channel: String!
  $flag: String!
) {
  channelFlagUpdated(channel: $channel, flag: $flag) {
    channelFlag {
      id
      channel
      users {
        id
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "channel"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "flag"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "channel",
        "variableName": "channel"
      },
      {
        "kind": "Variable",
        "name": "flag",
        "variableName": "flag"
      }
    ],
    "concreteType": "ChannelFlagUpdatedPayload",
    "kind": "LinkedField",
    "name": "channelFlagUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ChannelFlag",
        "kind": "LinkedField",
        "name": "channelFlag",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "channel",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "users",
            "plural": true,
            "selections": [
              (v1/*: any*/)
            ],
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
    "name": "subscriptionsChannelFlagUpdatedSubscription",
    "selections": (v2/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "subscriptionsChannelFlagUpdatedSubscription",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "013e09a592032f31472cda536e687685",
    "id": null,
    "metadata": {},
    "name": "subscriptionsChannelFlagUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription subscriptionsChannelFlagUpdatedSubscription(\n  $channel: String!\n  $flag: String!\n) {\n  channelFlagUpdated(channel: $channel, flag: $flag) {\n    channelFlag {\n      id\n      channel\n      users {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '21266958f2ed2f2e71c9d8d061d4cffb';

module.exports = node;
