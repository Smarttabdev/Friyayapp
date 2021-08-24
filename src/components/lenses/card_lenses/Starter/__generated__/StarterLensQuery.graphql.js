/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type StarterLens_query$ref = any;
export type ItemTypeEnum = "ALL" | "BOARD" | "CARD" | "CHAT_CARD" | "DATA_BOARD" | "DATA_CARD" | "FILE_BOARD" | "FILE_CARD" | "GOAL_BOARD" | "KNOWLEDGE_BOARD" | "NOTES_BOARD" | "NOTES_CARD" | "PROJECT_BOARD" | "TASK_BOARD" | "TASK_CARD" | "VIDEO_CHAT_CARD" | "%future added value";
export type StarterLensQueryVariables = {|
  cursor?: ?string,
  sort?: ?any,
  filters?: ?any,
  itemTypes?: ?$ReadOnlyArray<ItemTypeEnum>,
  topicId?: ?string,
|};
export type StarterLensQueryResponse = {|
  +$fragmentRefs: StarterLens_query$ref
|};
export type StarterLensQuery = {|
  variables: StarterLensQueryVariables,
  response: StarterLensQueryResponse,
|};
*/


/*
query StarterLensQuery(
  $cursor: String
  $sort: JSON
  $filters: JSON
  $itemTypes: [ItemTypeEnum!]
  $topicId: ID
) {
  ...StarterLens_query_18WXhd
}

fragment ItemList_items on Item {
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
}

fragment StarterLens_query_18WXhd on Query {
  items(first: 15, after: $cursor, sort: $sort, filters: $filters, itemTypes: $itemTypes, topicId: $topicId) {
    totalCount
    edges {
      node {
        id
        ...ItemList_items
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
  "name": "sort"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v5 = {
  "kind": "Variable",
  "name": "filters",
  "variableName": "filters"
},
v6 = {
  "kind": "Variable",
  "name": "itemTypes",
  "variableName": "itemTypes"
},
v7 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
},
v8 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v9 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v5/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  (v6/*: any*/),
  (v7/*: any*/),
  (v8/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v12 = [
  (v10/*: any*/),
  (v11/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "StarterLensQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "StarterLens_query"
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
      (v1/*: any*/),
      (v2/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Operation",
    "name": "StarterLensQuery",
    "selections": [
      {
        "alias": null,
        "args": (v9/*: any*/),
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
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "itemId",
                    "storageKey": null
                  },
                  (v11/*: any*/),
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
                      (v10/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Tip",
                        "kind": "LinkedField",
                        "name": "parent",
                        "plural": false,
                        "selections": (v12/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Topic",
                        "kind": "LinkedField",
                        "name": "topic",
                        "plural": false,
                        "selections": (v12/*: any*/),
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
                      (v10/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Topic",
                        "kind": "LinkedField",
                        "name": "parent",
                        "plural": false,
                        "selections": (v12/*: any*/),
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
        "args": (v9/*: any*/),
        "filters": [
          "sort",
          "filters",
          "itemTypes",
          "topicId"
        ],
        "handle": "connection",
        "key": "StarterLens_items",
        "kind": "LinkedHandle",
        "name": "items"
      }
    ]
  },
  "params": {
    "cacheID": "40d47aebe0b448f33e3df5510112b7b5",
    "id": null,
    "metadata": {},
    "name": "StarterLensQuery",
    "operationKind": "query",
    "text": "query StarterLensQuery(\n  $cursor: String\n  $sort: JSON\n  $filters: JSON\n  $itemTypes: [ItemTypeEnum!]\n  $topicId: ID\n) {\n  ...StarterLens_query_18WXhd\n}\n\nfragment ItemList_items on Item {\n  id\n  itemId\n  title\n  slug\n  baseType\n  itemType\n  createdAt\n  updatedAt\n  completedAt\n  meta\n  speed\n  completion\n  tip {\n    id\n    parent {\n      id\n      title\n    }\n    topic {\n      id\n      title\n    }\n  }\n  topic {\n    id\n    parent {\n      id\n      title\n    }\n  }\n}\n\nfragment StarterLens_query_18WXhd on Query {\n  items(first: 15, after: $cursor, sort: $sort, filters: $filters, itemTypes: $itemTypes, topicId: $topicId) {\n    totalCount\n    edges {\n      node {\n        id\n        ...ItemList_items\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '63c0d16b52ee32828b939df2ef366964';

module.exports = node;
