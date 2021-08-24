/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ChatBox_chat$ref = any;
type ChatBox_typingFlagQuery$ref = any;
export type ChatBoxQueryVariables = {|
  chatId: string,
  hasChat: boolean,
  channel: string,
|};
export type ChatBoxQueryResponse = {|
  +chat?: ?{|
    +id: string,
    +title: ?string,
    +topic: ?{|
      +id: string,
      +title: string,
    |},
    +$fragmentRefs: ChatBox_chat$ref,
  |},
  +$fragmentRefs: ChatBox_typingFlagQuery$ref,
|};
export type ChatBoxQuery = {|
  variables: ChatBoxQueryVariables,
  response: ChatBoxQueryResponse,
|};
*/


/*
query ChatBoxQuery(
  $chatId: ID!
  $hasChat: Boolean!
  $channel: String!
) {
  chat: tip(id: $chatId) @include(if: $hasChat) {
    id
    title
    topic {
      id
      title
    }
    ...ChatBox_chat
  }
  ...ChatBox_typingFlagQuery_43Dw1G @include(if: $hasChat)
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

fragment ChatBox_typingFlagQuery_43Dw1G on Query {
  typingFlag: channelFlag(channel: $channel, flag: "typing") {
    id
    channel
    users {
      id
      name
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "channel"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "chatId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasChat"
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "chatId"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Topic",
  "kind": "LinkedField",
  "name": "topic",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    (v5/*: any*/)
  ],
  "storageKey": null
},
v7 = {
  "kind": "Variable",
  "name": "channel",
  "variableName": "channel"
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v10 = [
  (v4/*: any*/),
  (v8/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatBoxQuery",
    "selections": [
      {
        "condition": "hasChat",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": "chat",
            "args": (v3/*: any*/),
            "concreteType": "Tip",
            "kind": "LinkedField",
            "name": "tip",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ChatBox_chat"
              }
            ],
            "storageKey": null
          },
          {
            "args": [
              (v7/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ChatBox_typingFlagQuery"
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ChatBoxQuery",
    "selections": [
      {
        "condition": "hasChat",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": "chat",
            "args": (v3/*: any*/),
            "concreteType": "Tip",
            "kind": "LinkedField",
            "name": "tip",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v8/*: any*/),
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
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v9/*: any*/),
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
                          (v4/*: any*/),
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
                            "selections": (v10/*: any*/),
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
                "args": (v9/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "Tip_chatMessages",
                "kind": "LinkedHandle",
                "name": "chatMessages"
              }
            ],
            "storageKey": null
          },
          {
            "alias": "typingFlag",
            "args": [
              (v7/*: any*/),
              {
                "kind": "Literal",
                "name": "flag",
                "value": "typing"
              }
            ],
            "concreteType": "ChannelFlag",
            "kind": "LinkedField",
            "name": "channelFlag",
            "plural": false,
            "selections": [
              (v4/*: any*/),
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
                "selections": (v10/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "8f0e06cf53e03e70a5063f58ddf49aa9",
    "id": null,
    "metadata": {},
    "name": "ChatBoxQuery",
    "operationKind": "query",
    "text": "query ChatBoxQuery(\n  $chatId: ID!\n  $hasChat: Boolean!\n  $channel: String!\n) {\n  chat: tip(id: $chatId) @include(if: $hasChat) {\n    id\n    title\n    topic {\n      id\n      title\n    }\n    ...ChatBox_chat\n  }\n  ...ChatBox_typingFlagQuery_43Dw1G @include(if: $hasChat)\n}\n\nfragment ChatBox_chat on Tip {\n  id\n  title\n  ...ChatUserNames_chat\n  chatMessages(first: 10) {\n    edges {\n      node {\n        id\n        body\n        unread\n        user {\n          id\n          name\n        }\n        createdAt\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ChatBox_typingFlagQuery_43Dw1G on Query {\n  typingFlag: channelFlag(channel: $channel, flag: \"typing\") {\n    id\n    channel\n    users {\n      id\n      name\n    }\n  }\n}\n\nfragment ChatUserNames_chat on Tip {\n  id\n  user {\n    id\n    name\n    username\n  }\n  private\n  sharePublic\n  shareFollowing\n  shareSettings {\n    sharingObjectType\n    sharingObjectId\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b08196210a699b7e33156969272f2133';

module.exports = node;
