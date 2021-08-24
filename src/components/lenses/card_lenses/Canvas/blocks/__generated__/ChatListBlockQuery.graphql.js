/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ChatListBlock_tipsQuery$ref = any;
type ChatUserNames_query$ref = any;
export type ChatListBlockQueryVariables = {|
  topicId?: ?string,
  subtopics?: ?boolean,
  root?: ?boolean,
|};
export type ChatListBlockQueryResponse = {|
  +$fragmentRefs: ChatUserNames_query$ref & ChatListBlock_tipsQuery$ref
|};
export type ChatListBlockQuery = {|
  variables: ChatListBlockQueryVariables,
  response: ChatListBlockQueryResponse,
|};
*/


/*
query ChatListBlockQuery(
  $topicId: ID
  $subtopics: Boolean
  $root: Boolean
) {
  ...ChatUserNames_query
  ...ChatListBlock_tipsQuery_2Relrj
}

fragment ChatItem_chat on Tip {
  id
  title
  chatUnreads
  ...ChatUserNames_chat
}

fragment ChatListBlock_tipsQuery_2Relrj on Query {
  tips(first: 15, topicId: $topicId, subtopics: $subtopics, root: $root, isChat: true, sort: "created_at asc") {
    edges {
      node {
        id
        title
        slug
        ...ChatItem_chat
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "root"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "subtopics"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v3 = {
  "kind": "Variable",
  "name": "root",
  "variableName": "root"
},
v4 = {
  "kind": "Variable",
  "name": "subtopics",
  "variableName": "subtopics"
},
v5 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  (v6/*: any*/),
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
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v9 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  {
    "kind": "Literal",
    "name": "isChat",
    "value": true
  },
  (v3/*: any*/),
  {
    "kind": "Literal",
    "name": "sort",
    "value": "created_at asc"
  },
  (v4/*: any*/),
  (v5/*: any*/)
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
    "name": "ChatListBlockQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ChatUserNames_query"
      },
      {
        "args": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ChatListBlock_tipsQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ChatListBlockQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "users",
        "plural": true,
        "selections": (v7/*: any*/),
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
          (v6/*: any*/),
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "userFollowers",
            "plural": true,
            "selections": (v7/*: any*/),
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
          (v6/*: any*/),
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
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "channelFlag(channel:\"domain\",flag:\"presence\")"
      },
      {
        "alias": null,
        "args": (v9/*: any*/),
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
                  (v6/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
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
                    "selections": (v7/*: any*/),
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
                      (v6/*: any*/)
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
        "alias": null,
        "args": (v9/*: any*/),
        "filters": [
          "topicId",
          "subtopics",
          "root",
          "isChat",
          "sort"
        ],
        "handle": "connection",
        "key": "ChatListBlock_tips",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "7ee69de419ca0fb2b626d0dfb63e0523",
    "id": null,
    "metadata": {},
    "name": "ChatListBlockQuery",
    "operationKind": "query",
    "text": "query ChatListBlockQuery(\n  $topicId: ID\n  $subtopics: Boolean\n  $root: Boolean\n) {\n  ...ChatUserNames_query\n  ...ChatListBlock_tipsQuery_2Relrj\n}\n\nfragment ChatItem_chat on Tip {\n  id\n  title\n  chatUnreads\n  ...ChatUserNames_chat\n}\n\nfragment ChatListBlock_tipsQuery_2Relrj on Query {\n  tips(first: 15, topicId: $topicId, subtopics: $subtopics, root: $root, isChat: true, sort: \"created_at asc\") {\n    edges {\n      node {\n        id\n        title\n        slug\n        ...ChatItem_chat\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ChatUserNames_chat on Tip {\n  id\n  user {\n    id\n    name\n    username\n  }\n  private\n  sharePublic\n  shareFollowing\n  shareSettings {\n    sharingObjectType\n    sharingObjectId\n    id\n  }\n}\n\nfragment ChatUserNames_query on Query {\n  users {\n    id\n    name\n    username\n  }\n  groups {\n    id\n    title\n    userFollowers {\n      id\n      name\n      username\n    }\n  }\n  onlinePresences: channelFlag(channel: \"domain\", flag: \"presence\") {\n    id\n    channel\n    users {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dce28b860f5de782d549ffd25fb63b4f';

module.exports = node;
