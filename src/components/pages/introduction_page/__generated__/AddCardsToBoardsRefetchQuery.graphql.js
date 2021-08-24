/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AddCardsToBoards_query$ref = any;
export type AddCardsToBoardsRefetchQueryVariables = {|
  topicId?: ?string,
  cursor?: ?string,
|};
export type AddCardsToBoardsRefetchQueryResponse = {|
  +$fragmentRefs: AddCardsToBoards_query$ref
|};
export type AddCardsToBoardsRefetchQuery = {|
  variables: AddCardsToBoardsRefetchQueryVariables,
  response: AddCardsToBoardsRefetchQueryResponse,
|};
*/


/*
query AddCardsToBoardsRefetchQuery(
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
    "name": "AddCardsToBoardsRefetchQuery",
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
    "name": "AddCardsToBoardsRefetchQuery",
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
    "cacheID": "a05c09d934577f758217e4c84f7773d9",
    "id": null,
    "metadata": {},
    "name": "AddCardsToBoardsRefetchQuery",
    "operationKind": "query",
    "text": "query AddCardsToBoardsRefetchQuery(\n  $topicId: ID\n  $cursor: String\n) {\n  ...AddCardsToBoards_query_sq8rb\n}\n\nfragment AddCardsToBoards_query_sq8rb on Query {\n  topics(first: 15, after: $cursor, all: true, parentId: $topicId, sort: \"created_at desc\") {\n    totalCount\n    edges {\n      node {\n        id\n        title\n        defaultViewId\n        tips(sort: \"created_at desc\") {\n          totalCount\n          edges {\n            node {\n              id\n              title\n            }\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  tips {\n    totalCount\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a62d4786567f7fa059ee2c0ebe7fc6a2';

module.exports = node;
