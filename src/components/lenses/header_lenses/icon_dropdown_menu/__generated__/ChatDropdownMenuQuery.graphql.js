/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ChatDropdownMenu_chatsQuery$ref = any;
type ChatUserNames_query$ref = any;
export type ChatDropdownMenuQueryVariables = {|
  topicId?: ?string
|};
export type ChatDropdownMenuQueryResponse = {|
  +$fragmentRefs: ChatUserNames_query$ref & ChatDropdownMenu_chatsQuery$ref
|};
export type ChatDropdownMenuQuery = {|
  variables: ChatDropdownMenuQueryVariables,
  response: ChatDropdownMenuQueryResponse,
|};
*/


/*
query ChatDropdownMenuQuery(
  $topicId: ID
) {
  ...ChatUserNames_query
  ...ChatDropdownMenu_chatsQuery_1QjtfV
}

fragment ChatDropdownMenu_chatsQuery_1QjtfV on Query {
  chats: tips(first: 10, filter: "is_chat = TRUE", sort: "created_at asc", topicId: $topicId, subtopics: true) {
    totalCount
    edges {
      node {
        id
        title
        ...ChatUserNames_chat
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

fragment ChatUserNames_query on Query {
  users {
    id
    name
    username
  }
  groups {
    id
    title
    userFollowers {
      id
      name
      username
    }
  }
  onlinePresences: channelFlag(channel: "domain", flag: "presence") {
    id
    channel
    users {
      id
    }
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
v1 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "filter",
    "value": "is_chat = TRUE"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "created_at asc"
  },
  {
    "kind": "Literal",
    "name": "subtopics",
    "value": true
  },
  (v1/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatDropdownMenuQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ChatUserNames_query"
      },
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ChatDropdownMenu_chatsQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChatDropdownMenuQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "users",
        "plural": true,
        "selections": (v3/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Group",
        "kind": "LinkedField",
        "name": "groups",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "userFollowers",
            "plural": true,
            "selections": (v3/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": "onlinePresences",
        "args": [
          {
            "kind": "Literal",
            "name": "channel",
            "value": "domain"
          },
          {
            "kind": "Literal",
            "name": "flag",
            "value": "presence"
          }
        ],
        "concreteType": "ChannelFlag",
        "kind": "LinkedField",
        "name": "channelFlag",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "channelFlag(channel:\"domain\",flag:\"presence\")"
      },
      {
        "alias": "chats",
        "args": (v5/*: any*/),
        "concreteType": "TipConnection",
        "kind": "LinkedField",
        "name": "tips",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          },
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
                  (v2/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": (v3/*: any*/),
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
        "args": (v5/*: any*/),
        "filters": [
          "filter",
          "sort",
          "topicId",
          "subtopics"
        ],
        "handle": "connection",
        "key": "ChatDropdownMenu_chats",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "48e4630b3573da8ef2c483432e6b299c",
    "id": null,
    "metadata": {},
    "name": "ChatDropdownMenuQuery",
    "operationKind": "query",
    "text": "query ChatDropdownMenuQuery(\n  $topicId: ID\n) {\n  ...ChatUserNames_query\n  ...ChatDropdownMenu_chatsQuery_1QjtfV\n}\n\nfragment ChatDropdownMenu_chatsQuery_1QjtfV on Query {\n  chats: tips(first: 10, filter: \"is_chat = TRUE\", sort: \"created_at asc\", topicId: $topicId, subtopics: true) {\n    totalCount\n    edges {\n      node {\n        id\n        title\n        ...ChatUserNames_chat\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ChatUserNames_chat on Tip {\n  id\n  user {\n    id\n    name\n    username\n  }\n  private\n  sharePublic\n  shareFollowing\n  shareSettings {\n    sharingObjectType\n    sharingObjectId\n    id\n  }\n}\n\nfragment ChatUserNames_query on Query {\n  users {\n    id\n    name\n    username\n  }\n  groups {\n    id\n    title\n    userFollowers {\n      id\n      name\n      username\n    }\n  }\n  onlinePresences: channelFlag(channel: \"domain\", flag: \"presence\") {\n    id\n    channel\n    users {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ca4b5b9fff33e749bdc0f71c9418c21f';

module.exports = node;
