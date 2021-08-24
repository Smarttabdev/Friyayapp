/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ChatBox_chat$ref = any;
export type ChatBoxTipQuerySubscriptionVariables = {|
  tipId: string
|};
export type ChatBoxTipQuerySubscriptionResponse = {|
  +tipQuery: {|
    +tip: ?{|
      +$fragmentRefs: ChatBox_chat$ref
    |}
  |}
|};
export type ChatBoxTipQuerySubscription = {|
  variables: ChatBoxTipQuerySubscriptionVariables,
  response: ChatBoxTipQuerySubscriptionResponse,
|};
*/


/*
subscription ChatBoxTipQuerySubscription(
  $tipId: ID!
) {
  tipQuery(tipId: $tipId) {
    tip {
      ...ChatBox_chat
      id
    }
  }
}

fragment ChatBox_chat on Tip {
  id
  title
  ...ChatUserNames_chat
  chatMessages(first: 10) {
    edges {
      node {
        id
        body
        unread
        user {
          id
          name
        }
        createdAt
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
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
    "name": "tipId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "tipId",
    "variableName": "tipId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatBoxTipQuerySubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TipQueryPayload",
        "kind": "LinkedField",
        "name": "tipQuery",
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ChatBox_chat"
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
    "name": "ChatBoxTipQuerySubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TipQueryPayload",
        "kind": "LinkedField",
        "name": "tipQuery",
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
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
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
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "concreteType": "ChatMessageConnection",
                "kind": "LinkedField",
                "name": "chatMessages",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ChatMessageEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ChatMessage",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "body",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "unread",
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
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "createdAt",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__typename",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cursor",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "kind": "LinkedField",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endCursor",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasNextPage",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "chatMessages(first:10)"
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "Tip_chatMessages",
                "kind": "LinkedHandle",
                "name": "chatMessages"
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
    "cacheID": "25c5a70face46f015d932e5da745ae01",
    "id": null,
    "metadata": {},
    "name": "ChatBoxTipQuerySubscription",
    "operationKind": "subscription",
    "text": "subscription ChatBoxTipQuerySubscription(\n  $tipId: ID!\n) {\n  tipQuery(tipId: $tipId) {\n    tip {\n      ...ChatBox_chat\n      id\n    }\n  }\n}\n\nfragment ChatBox_chat on Tip {\n  id\n  title\n  ...ChatUserNames_chat\n  chatMessages(first: 10) {\n    edges {\n      node {\n        id\n        body\n        unread\n        user {\n          id\n          name\n        }\n        createdAt\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ChatUserNames_chat on Tip {\n  id\n  user {\n    id\n    name\n    username\n  }\n  private\n  sharePublic\n  shareFollowing\n  shareSettings {\n    sharingObjectType\n    sharingObjectId\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7111e5f8ef8149b18952ce247e8c458e';

module.exports = node;
