/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ChatUserNames_query$ref = any;
export type ChatPanelQueryVariables = {|
  hasChat: boolean,
  chatId: string,
|};
export type ChatPanelQueryResponse = {|
  +chat?: ?{|
    +id: string,
    +title: ?string,
    +topic: ?{|
      +id: string,
      +title: string,
    |},
  |},
  +$fragmentRefs: ChatUserNames_query$ref,
|};
export type ChatPanelQuery = {|
  variables: ChatPanelQueryVariables,
  response: ChatPanelQueryResponse,
|};
*/


/*
query ChatPanelQuery(
  $hasChat: Boolean!
  $chatId: ID!
) {
  chat: tip(id: $chatId) @include(if: $hasChat) {
    id
    title
    topic {
      id
      title
    }
  }
  ...ChatUserNames_query
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
  "name": "chatId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasChat"
},
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
  "name": "title",
  "storageKey": null
},
v4 = {
  "condition": "hasChat",
  "kind": "Condition",
  "passingValue": true,
  "selections": [
    {
      "alias": "chat",
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "chatId"
        }
      ],
      "concreteType": "Tip",
      "kind": "LinkedField",
      "name": "tip",
      "plural": false,
      "selections": [
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Topic",
          "kind": "LinkedField",
          "name": "topic",
          "plural": false,
          "selections": [
            (v2/*: any*/),
            (v3/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ]
},
v5 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatPanelQuery",
    "selections": [
      (v4/*: any*/),
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ChatUserNames_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ChatPanelQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "users",
        "plural": true,
        "selections": (v5/*: any*/),
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
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "userFollowers",
            "plural": true,
            "selections": (v5/*: any*/),
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
      (v4/*: any*/)
    ]
  },
  "params": {
    "cacheID": "a1a2de507336f949d5114ba4945cb4d4",
    "id": null,
    "metadata": {},
    "name": "ChatPanelQuery",
    "operationKind": "query",
    "text": "query ChatPanelQuery(\n  $hasChat: Boolean!\n  $chatId: ID!\n) {\n  chat: tip(id: $chatId) @include(if: $hasChat) {\n    id\n    title\n    topic {\n      id\n      title\n    }\n  }\n  ...ChatUserNames_query\n}\n\nfragment ChatUserNames_query on Query {\n  users {\n    id\n    name\n    username\n  }\n  groups {\n    id\n    title\n    userFollowers {\n      id\n      name\n      username\n    }\n  }\n  onlinePresences: channelFlag(channel: \"domain\", flag: \"presence\") {\n    id\n    channel\n    users {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a97ed3e96c9de37898d8e67607e46578';

module.exports = node;
