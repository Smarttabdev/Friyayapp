/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ViewListItemChats_chatsQuery$ref = any;
export type ViewListItemChatsQueryVariables = {|
  cursor?: ?string,
  topicId?: ?string,
  chatsFilter?: ?any,
|};
export type ViewListItemChatsQueryResponse = {|
  +$fragmentRefs: ViewListItemChats_chatsQuery$ref
|};
export type ViewListItemChatsQuery = {|
  variables: ViewListItemChatsQueryVariables,
  response: ViewListItemChatsQueryResponse,
|};
*/


/*
query ViewListItemChatsQuery(
  $cursor: String
  $topicId: ID
  $chatsFilter: JSON
) {
  ...ViewListItemChats_chatsQuery_3RzUXY
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

fragment ViewListItemChats_chatsQuery_3RzUXY on Query {
  chats: tips(first: 10, after: $cursor, filter: $chatsFilter, topicId: $topicId, chatUnreads: true, sort: "chat_unreads desc, last_chat_message_date desc") {
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
  "name": "cursor"
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
v4 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
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
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "chat_unreads desc, last_chat_message_date desc"
  },
  (v3/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewListItemChatsQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "chatsFilter",
            "variableName": "chatsFilter"
          },
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v3/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ViewListItemChats_chatsQuery"
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
    "name": "ViewListItemChatsQuery",
    "selections": [
      {
        "alias": "chats",
        "args": (v4/*: any*/),
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
                  (v5/*: any*/),
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
                      (v5/*: any*/),
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
                      (v5/*: any*/)
                    ],
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
        "storageKey": null
      },
      {
        "alias": "chats",
        "args": (v4/*: any*/),
        "filters": [
          "filter",
          "topicId",
          "chatUnreads",
          "sort"
        ],
        "handle": "connection",
        "key": "ViewListItemChats_chats",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "8b42af571e9ac6986a7425b5ffb63933",
    "id": null,
    "metadata": {},
    "name": "ViewListItemChatsQuery",
    "operationKind": "query",
    "text": "query ViewListItemChatsQuery(\n  $cursor: String\n  $topicId: ID\n  $chatsFilter: JSON\n) {\n  ...ViewListItemChats_chatsQuery_3RzUXY\n}\n\nfragment ChatListItem_chat on Tip {\n  id\n  title\n  chatUnreads\n  ...ChatUserNames_chat\n}\n\nfragment ChatUserNames_chat on Tip {\n  id\n  user {\n    id\n    name\n    username\n  }\n  private\n  sharePublic\n  shareFollowing\n  shareSettings {\n    sharingObjectType\n    sharingObjectId\n    id\n  }\n}\n\nfragment ViewListItemChats_chatsQuery_3RzUXY on Query {\n  chats: tips(first: 10, after: $cursor, filter: $chatsFilter, topicId: $topicId, chatUnreads: true, sort: \"chat_unreads desc, last_chat_message_date desc\") {\n    edges {\n      node {\n        id\n        ...ChatListItem_chat\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f09068383fb211d5a6b3707436ce1b31';

module.exports = node;
