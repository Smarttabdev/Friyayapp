/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type BoardChatList_topicsQuery$ref = any;
export type BoardChatListTopicsQueryVariables = {|
  cursor?: ?string,
  havingTips?: ?any,
|};
export type BoardChatListTopicsQueryResponse = {|
  +$fragmentRefs: BoardChatList_topicsQuery$ref
|};
export type BoardChatListTopicsQuery = {|
  variables: BoardChatListTopicsQueryVariables,
  response: BoardChatListTopicsQueryResponse,
|};
*/


/*
query BoardChatListTopicsQuery(
  $cursor: String
  $havingTips: JSON
) {
  ...BoardChatList_topicsQuery_3I8mDP
}

fragment BoardChatList_topicsQuery_3I8mDP on Query {
  chatTopics: topics(first: 15, after: $cursor, all: true, subtopics: true, havingTips: $havingTips) {
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
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "havingTips"
  }
],
v1 = {
  "kind": "Variable",
  "name": "havingTips",
  "variableName": "havingTips"
},
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Literal",
    "name": "all",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "subtopics",
    "value": true
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BoardChatListTopicsQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v1/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BoardChatListTopicsQuery",
    "selections": [
      {
        "alias": "chatTopics",
        "args": (v2/*: any*/),
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
                    "name": "title",
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
        "alias": "chatTopics",
        "args": (v2/*: any*/),
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
    "cacheID": "2385f16e87a825796ba03773e28baaee",
    "id": null,
    "metadata": {},
    "name": "BoardChatListTopicsQuery",
    "operationKind": "query",
    "text": "query BoardChatListTopicsQuery(\n  $cursor: String\n  $havingTips: JSON\n) {\n  ...BoardChatList_topicsQuery_3I8mDP\n}\n\nfragment BoardChatList_topicsQuery_3I8mDP on Query {\n  chatTopics: topics(first: 15, after: $cursor, all: true, subtopics: true, havingTips: $havingTips) {\n    edges {\n      node {\n        id\n        title\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '46a840e50a9db53a8a80cd7f070170b6';

module.exports = node;
