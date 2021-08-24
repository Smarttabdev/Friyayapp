/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type FinderLens_query$ref = any;
export type ItemTypeEnum = "ALL" | "BOARD" | "CARD" | "CHAT_CARD" | "DATA_BOARD" | "DATA_CARD" | "FILE_BOARD" | "FILE_CARD" | "GOAL_BOARD" | "KNOWLEDGE_BOARD" | "NOTES_BOARD" | "NOTES_CARD" | "PROJECT_BOARD" | "TASK_BOARD" | "TASK_CARD" | "VIDEO_CHAT_CARD" | "%future added value";
export type FinderLensQueryVariables = {|
  cursor?: ?string,
  sort?: ?any,
  filters?: ?any,
  refreshCount?: ?string,
  itemTypes?: ?$ReadOnlyArray<ItemTypeEnum>,
  topicId?: ?string,
|};
export type FinderLensQueryResponse = {|
  +$fragmentRefs: FinderLens_query$ref
|};
export type FinderLensQuery = {|
  variables: FinderLensQueryVariables,
  response: FinderLensQueryResponse,
|};
*/


/*
query FinderLensQuery(
  $cursor: String
  $sort: JSON
  $filters: JSON
  $itemTypes: [ItemTypeEnum!]
  $topicId: ID
) {
  ...FinderLens_query_L0YLw
}

fragment FinderLens_query_L0YLw on Query {
  items(first: 20, after: $cursor, sort: $sort, filters: $filters, itemTypes: $itemTypes, topicId: $topicId) {
    totalCount
    edges {
      node {
        id
        itemId
        title
        slug
        baseType
        itemType
        createdAt
        updatedAt
        completedAt
        meta
        speed
        completion
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
  "name": "filters"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "itemTypes"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "refreshCount"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sort"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v6 = {
  "kind": "Variable",
  "name": "filters",
  "variableName": "filters"
},
v7 = {
  "kind": "Variable",
  "name": "itemTypes",
  "variableName": "itemTypes"
},
v8 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
},
v9 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v10 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v6/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  },
  (v7/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/)
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v13 = [
  (v11/*: any*/),
  (v12/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "FinderLensQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "kind": "Variable",
            "name": "refreshCount",
            "variableName": "refreshCount"
          },
          (v8/*: any*/),
          (v9/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "FinderLens_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v4/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Operation",
    "name": "FinderLensQuery",
    "selections": [
      {
        "alias": null,
        "args": (v10/*: any*/),
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
                  (v11/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "itemId",
                    "storageKey": null
                  },
                  (v12/*: any*/),
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
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "updatedAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "completedAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "meta",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "speed",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "completion",
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
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Tip",
                        "kind": "LinkedField",
                        "name": "parent",
                        "plural": false,
                        "selections": (v13/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Topic",
                        "kind": "LinkedField",
                        "name": "topic",
                        "plural": false,
                        "selections": (v13/*: any*/),
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
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Topic",
                        "kind": "LinkedField",
                        "name": "parent",
                        "plural": false,
                        "selections": (v13/*: any*/),
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
        "args": (v10/*: any*/),
        "filters": [
          "sort",
          "filters",
          "itemTypes",
          "topicId"
        ],
        "handle": "connection",
        "key": "Finderlens_items",
        "kind": "LinkedHandle",
        "name": "items"
      }
    ]
  },
  "params": {
    "cacheID": "3c61645acaa4af11e4340df3c9396222",
    "id": null,
    "metadata": {},
    "name": "FinderLensQuery",
    "operationKind": "query",
    "text": "query FinderLensQuery(\n  $cursor: String\n  $sort: JSON\n  $filters: JSON\n  $itemTypes: [ItemTypeEnum!]\n  $topicId: ID\n) {\n  ...FinderLens_query_L0YLw\n}\n\nfragment FinderLens_query_L0YLw on Query {\n  items(first: 20, after: $cursor, sort: $sort, filters: $filters, itemTypes: $itemTypes, topicId: $topicId) {\n    totalCount\n    edges {\n      node {\n        id\n        itemId\n        title\n        slug\n        baseType\n        itemType\n        createdAt\n        updatedAt\n        completedAt\n        meta\n        speed\n        completion\n        tip {\n          id\n          parent {\n            id\n            title\n          }\n          topic {\n            id\n            title\n          }\n        }\n        topic {\n          id\n          parent {\n            id\n            title\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '964eb0285806ee267252203b011a627c';

module.exports = node;
