/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ChatListItem_chat$ref = any;
export type ChatsListTipCreatedSubscriptionVariables = {|
  topicId: string
|};
export type ChatsListTipCreatedSubscriptionResponse = {|
  +tipCreated: {|
    +tip: ?{|
      +id: string,
      +$fragmentRefs: ChatListItem_chat$ref,
    |}
  |}
|};
export type ChatsListTipCreatedSubscription = {|
  variables: ChatsListTipCreatedSubscriptionVariables,
  response: ChatsListTipCreatedSubscriptionResponse,
|};
*/


/*
subscription ChatsListTipCreatedSubscription(
  $topicId: ID!
) {
  tipCreated(topicId: $topicId) {
    tip {
      id
      ...ChatListItem_chat
    }
  }
}

fragment ChatListItem_chat on Tip {
  id
  title
  chatUnreads
  ...ChatUserNames_chat
}

fragment ChatUserNames_chat on Tip {
  id
  user {
    id
    name
    username
  }
  private
  sharePublic
  shareFollowing
  shareSettings {
    sharingObjectType
    sharingObjectId
    id
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
    "kind": "Variable",
    "name": "topicId",
    "variableName": "topicId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatsListTipCreatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TipCreatedPayload",
        "kind": "LinkedField",
        "name": "tipCreated",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Tip",
            "kind": "LinkedField",
            "name": "tip",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ChatListItem_chat"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChatsListTipCreatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TipCreatedPayload",
        "kind": "LinkedField",
        "name": "tipCreated",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Tip",
            "kind": "LinkedField",
            "name": "tip",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "chatUnreads",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
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
                    "name": "username",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "private",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "sharePublic",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "shareFollowing",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ShareSetting",
                "kind": "LinkedField",
                "name": "shareSettings",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "sharingObjectType",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "sharingObjectId",
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b3d539ec9ce335b96b3106fadfdc2c15",
    "id": null,
    "metadata": {},
    "name": "ChatsListTipCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription ChatsListTipCreatedSubscription(\n  $topicId: ID!\n) {\n  tipCreated(topicId: $topicId) {\n    tip {\n      id\n      ...ChatListItem_chat\n    }\n  }\n}\n\nfragment ChatListItem_chat on Tip {\n  id\n  title\n  chatUnreads\n  ...ChatUserNames_chat\n}\n\nfragment ChatUserNames_chat on Tip {\n  id\n  user {\n    id\n    name\n    username\n  }\n  private\n  sharePublic\n  shareFollowing\n  shareSettings {\n    sharingObjectType\n    sharingObjectId\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a07948523f08fc05091a09f078fe23d5';

module.exports = node;
