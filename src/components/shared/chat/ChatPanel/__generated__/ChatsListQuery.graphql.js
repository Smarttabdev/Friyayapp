/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type BoardChatList_topicsQuery$ref = any;
type ChatsList_chatsQuery$ref = any;
export type ChatsListQueryVariables = {|
  topicId?: ?string,
  chatsFilter?: ?any,
  havingTips?: ?any,
|};
export type ChatsListQueryResponse = {|
  +$fragmentRefs: ChatsList_chatsQuery$ref & BoardChatList_topicsQuery$ref
|};
export type ChatsListQuery = {|
  variables: ChatsListQueryVariables,
  response: ChatsListQueryResponse,
|};
*/


/*
query ChatsListQuery(
  $topicId: ID
  $chatsFilter: JSON
  $havingTips: JSON
) {
  ...ChatsList_chatsQuery_4xbduK
  ...BoardChatList_topicsQuery_1GQIcb
}

fragment BoardChatList_topicsQuery_1GQIcb on Query {
  chatTopics: topics(first: 15, all: true, parentId: $topicId, subtopics: true, havingTips: $havingTips) {
    edges {
      node {
        id
        title
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

fragment ChatsList_chatsQuery_4xbduK on Query {
  chats: tips(first: 15, topicId: $topicId, subtopics: true, filter: $chatsFilter, chatUnreads: true, sort: "chat_unreads desc, last_chat_message_date desc") {
    edges {
      node {
        id
        ...ChatListItem_chat
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
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "chatsFilter"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "havingTips"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v3 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v4 = {
  "kind": "Variable",
  "name": "havingTips",
  "variableName": "havingTips"
},
v5 = {
  "kind": "Variable",
  "name": "parentId",
  "variableName": "topicId"
},
v6 = {
  "kind": "Literal",
  "name": "first",
  "value": 15
},
v7 = {
  "kind": "Literal",
  "name": "subtopics",
  "value": true
},
v8 = [
  {
    "kind": "Literal",
    "name": "chatUnreads",
    "value": true
  },
  {
    "kind": "Variable",
    "name": "filter",
    "variableName": "chatsFilter"
  },
  (v6/*: any*/),
  {
    "kind": "Literal",
    "name": "sort",
    "value": "chat_unreads desc, last_chat_message_date desc"
  },
  (v7/*: any*/),
  (v3/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v13 = {
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
},
v14 = [
  {
    "kind": "Literal",
    "name": "all",
    "value": true
  },
  (v6/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/),
  (v7/*: any*/)
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
    "name": "ChatsListQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "chatsFilter",
            "variableName": "chatsFilter"
          },
          (v3/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ChatsList_chatsQuery"
      },
      {
        "args": [
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "BoardChatList_topicsQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "ChatsListQuery",
    "selections": [
      {
        "alias": "chats",
        "args": (v8/*: any*/),
        "concreteType": "TipConnection",
        "kind": "LinkedField",
        "name": "tips",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TipEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Tip",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
                  (v10/*: any*/),
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
                      (v9/*: any*/),
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
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/)
                ],
                "storageKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          (v13/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "chats",
        "args": (v8/*: any*/),
        "filters": [
          "topicId",
          "subtopics",
          "filter",
          "chatUnreads",
          "sort"
        ],
        "handle": "connection",
        "key": "ChatList_chats",
        "kind": "LinkedHandle",
        "name": "tips"
      },
      {
        "alias": "chatTopics",
        "args": (v14/*: any*/),
        "concreteType": "TopicConnection",
        "kind": "LinkedField",
        "name": "topics",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TopicEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Topic",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/)
                ],
                "storageKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          (v13/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "chatTopics",
        "args": (v14/*: any*/),
        "filters": [
          "all",
          "parentId",
          "subtopics",
          "havingTips"
        ],
        "handle": "connection",
        "key": "BoardChatList_chatTopics",
        "kind": "LinkedHandle",
        "name": "topics"
      }
    ]
  },
  "params": {
    "cacheID": "bb8fb03b4123ffaefa48059948b03569",
    "id": null,
    "metadata": {},
    "name": "ChatsListQuery",
    "operationKind": "query",
    "text": "query ChatsListQuery(\n  $topicId: ID\n  $chatsFilter: JSON\n  $havingTips: JSON\n) {\n  ...ChatsList_chatsQuery_4xbduK\n  ...BoardChatList_topicsQuery_1GQIcb\n}\n\nfragment BoardChatList_topicsQuery_1GQIcb on Query {\n  chatTopics: topics(first: 15, all: true, parentId: $topicId, subtopics: true, havingTips: $havingTips) {\n    edges {\n      node {\n        id\n        title\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ChatListItem_chat on Tip {\n  id\n  title\n  chatUnreads\n  ...ChatUserNames_chat\n}\n\nfragment ChatUserNames_chat on Tip {\n  id\n  user {\n    id\n    name\n    username\n  }\n  private\n  sharePublic\n  shareFollowing\n  shareSettings {\n    sharingObjectType\n    sharingObjectId\n    id\n  }\n}\n\nfragment ChatsList_chatsQuery_4xbduK on Query {\n  chats: tips(first: 15, topicId: $topicId, subtopics: true, filter: $chatsFilter, chatUnreads: true, sort: \"chat_unreads desc, last_chat_message_date desc\") {\n    edges {\n      node {\n        id\n        ...ChatListItem_chat\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'afe4a5bdc2d464f7d051eb72bd60e5a7';

module.exports = node;
