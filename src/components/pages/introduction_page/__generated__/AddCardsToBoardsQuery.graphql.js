/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AddCardsToBoards_query$ref = any;
export type AddCardsToBoardsQueryVariables = {|
  topicId?: ?string,
  cursor?: ?string,
|};
export type AddCardsToBoardsQueryResponse = {|
  +$fragmentRefs: AddCardsToBoards_query$ref
|};
export type AddCardsToBoardsQuery = {|
  variables: AddCardsToBoardsQueryVariables,
  response: AddCardsToBoardsQueryResponse,
|};
*/


/*
query AddCardsToBoardsQuery(
  $topicId: ID
  $cursor: String
) {
  ...AddCardsToBoards_query_sq8rb
}

fragment AddCardsToBoards_query_sq8rb on Query {
  topics(first: 15, after: $cursor, all: true, parentId: $topicId, sort: "created_at desc") {
    totalCount
    edges {
      node {
        id
        title
        defaultViewId
        tips(sort: "created_at desc") {
          totalCount
          edges {
            node {
              id
              title
            }
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
  tips {
    totalCount
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
  "name": "topicId"
},
v2 = {
  "kind": "Literal",
  "name": "sort",
  "value": "created_at desc"
},
v3 = [
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
  {
    "kind": "Variable",
    "name": "parentId",
    "variableName": "topicId"
  },
  (v2/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddCardsToBoardsQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          {
            "kind": "Variable",
            "name": "topicId",
            "variableName": "topicId"
          }
        ],
        "kind": "FragmentSpread",
        "name": "AddCardsToBoards_query"
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
    "name": "AddCardsToBoardsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "TopicConnection",
        "kind": "LinkedField",
        "name": "topics",
        "plural": false,
        "selections": [
          (v4/*: any*/),
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
                  (v5/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "defaultViewId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      (v2/*: any*/)
                    ],
                    "concreteType": "TipConnection",
                    "kind": "LinkedField",
                    "name": "tips",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
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
                              (v6/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "tips(sort:\"created_at desc\")"
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
        "args": (v3/*: any*/),
        "filters": [
          "all",
          "parentId",
          "sort"
        ],
        "handle": "connection",
        "key": "AddCardsToBoards_topics",
        "kind": "LinkedHandle",
        "name": "topics"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "TipConnection",
        "kind": "LinkedField",
        "name": "tips",
        "plural": false,
        "selections": [
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "61fec824e6f983621cb5361cd0f3fbe0",
    "id": null,
    "metadata": {},
    "name": "AddCardsToBoardsQuery",
    "operationKind": "query",
    "text": "query AddCardsToBoardsQuery(\n  $topicId: ID\n  $cursor: String\n) {\n  ...AddCardsToBoards_query_sq8rb\n}\n\nfragment AddCardsToBoards_query_sq8rb on Query {\n  topics(first: 15, after: $cursor, all: true, parentId: $topicId, sort: \"created_at desc\") {\n    totalCount\n    edges {\n      node {\n        id\n        title\n        defaultViewId\n        tips(sort: \"created_at desc\") {\n          totalCount\n          edges {\n            node {\n              id\n              title\n            }\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  tips {\n    totalCount\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2cceac3db7d6d2fde2f2926464ea9be8';

module.exports = node;
