/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ExpandedTopic_query$ref = any;
export type ItemTypeEnum = "ALL" | "BOARD" | "CARD" | "CHAT_CARD" | "DATA_BOARD" | "DATA_CARD" | "FILE_BOARD" | "FILE_CARD" | "GOAL_BOARD" | "KNOWLEDGE_BOARD" | "NOTES_BOARD" | "NOTES_CARD" | "PROJECT_BOARD" | "TASK_BOARD" | "TASK_CARD" | "VIDEO_CHAT_CARD" | "%future added value";
export type ExpandedTopicQueryVariables = {|
  cursor?: ?string,
  topicId?: ?string,
  sort?: ?any,
  itemTypes?: ?$ReadOnlyArray<ItemTypeEnum>,
|};
export type ExpandedTopicQueryResponse = {|
  +$fragmentRefs: ExpandedTopic_query$ref
|};
export type ExpandedTopicQuery = {|
  variables: ExpandedTopicQueryVariables,
  response: ExpandedTopicQueryResponse,
|};
*/


/*
query ExpandedTopicQuery(
  $cursor: String
  $topicId: ID
  $sort: JSON
  $itemTypes: [ItemTypeEnum!]
) {
  ...ExpandedTopic_query_2SysVS
}

fragment ExpandedTopic_query_2SysVS on Query {
  items(first: 15, after: $cursor, topicId: $topicId, itemTypes: $itemTypes, sort: $sort) {
    totalCount
    edges {
      node {
        id
        itemId
        title
        slug
        baseType
        itemType
        tip {
          id
          parent {
            id
            title
          }
          topic {
            id
            title
          }
        }
        topic {
          id
          parent {
            id
            title
          }
        }
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
  "name": "cursor"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "itemTypes"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sort"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v4 = {
  "kind": "Variable",
  "name": "itemTypes",
  "variableName": "itemTypes"
},
v5 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
},
v6 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v7 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  (v4/*: any*/),
  (v5/*: any*/),
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v10 = [
  (v8/*: any*/),
  (v9/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ExpandedTopicQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ExpandedTopic_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "ExpandedTopicQuery",
    "selections": [
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "ItemConnection",
        "kind": "LinkedField",
        "name": "items",
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
            "concreteType": "ItemEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Item",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "itemId",
                    "storageKey": null
                  },
                  (v9/*: any*/),
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
                    "name": "baseType",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "itemType",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Tip",
                    "kind": "LinkedField",
                    "name": "tip",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Tip",
                        "kind": "LinkedField",
                        "name": "parent",
                        "plural": false,
                        "selections": (v10/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Topic",
                        "kind": "LinkedField",
                        "name": "topic",
                        "plural": false,
                        "selections": (v10/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Topic",
                    "kind": "LinkedField",
                    "name": "topic",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Topic",
                        "kind": "LinkedField",
                        "name": "parent",
                        "plural": false,
                        "selections": (v10/*: any*/),
                        "storageKey": null
                      }
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
        "args": (v7/*: any*/),
        "filters": [
          "topicId",
          "itemTypes",
          "sort"
        ],
        "handle": "connection",
        "key": "ExpandedTopic_items",
        "kind": "LinkedHandle",
        "name": "items"
      }
    ]
  },
  "params": {
    "cacheID": "4b782bbaf8f7124ce166a2e037b6c8fe",
    "id": null,
    "metadata": {},
    "name": "ExpandedTopicQuery",
    "operationKind": "query",
    "text": "query ExpandedTopicQuery(\n  $cursor: String\n  $topicId: ID\n  $sort: JSON\n  $itemTypes: [ItemTypeEnum!]\n) {\n  ...ExpandedTopic_query_2SysVS\n}\n\nfragment ExpandedTopic_query_2SysVS on Query {\n  items(first: 15, after: $cursor, topicId: $topicId, itemTypes: $itemTypes, sort: $sort) {\n    totalCount\n    edges {\n      node {\n        id\n        itemId\n        title\n        slug\n        baseType\n        itemType\n        tip {\n          id\n          parent {\n            id\n            title\n          }\n          topic {\n            id\n            title\n          }\n        }\n        topic {\n          id\n          parent {\n            id\n            title\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '83d167158cfcee2242a808f3a2b5dd61';

module.exports = node;
