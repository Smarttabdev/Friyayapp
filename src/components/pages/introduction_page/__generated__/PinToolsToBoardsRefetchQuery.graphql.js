/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type PinToolsToBoards_query$ref = any;
export type PinToolsToBoardsRefetchQueryVariables = {|
  topicId?: ?string,
  cursor?: ?string,
|};
export type PinToolsToBoardsRefetchQueryResponse = {|
  +$fragmentRefs: PinToolsToBoards_query$ref
|};
export type PinToolsToBoardsRefetchQuery = {|
  variables: PinToolsToBoardsRefetchQueryVariables,
  response: PinToolsToBoardsRefetchQueryResponse,
|};
*/


/*
query PinToolsToBoardsRefetchQuery(
  $topicId: ID
  $cursor: String
) {
  ...PinToolsToBoards_query_sq8rb
}

fragment PinToolsToBoards_query_sq8rb on Query {
  topics(first: 15, after: $cursor, all: true, parentId: $topicId, sort: "created_at desc") {
    totalCount
    edges {
      node {
        id
        title
        defaultViewId
        tagList
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
  "name": "topicId"
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
  {
    "kind": "Variable",
    "name": "parentId",
    "variableName": "topicId"
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "created_at desc"
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
    "name": "PinToolsToBoardsRefetchQuery",
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
        "name": "PinToolsToBoards_query"
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
    "name": "PinToolsToBoardsRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "TopicConnection",
        "kind": "LinkedField",
        "name": "topics",
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
                    "name": "defaultViewId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "tagList",
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
        "args": (v2/*: any*/),
        "filters": [
          "all",
          "parentId",
          "sort"
        ],
        "handle": "connection",
        "key": "PinToolsToBoards_topics",
        "kind": "LinkedHandle",
        "name": "topics"
      }
    ]
  },
  "params": {
    "cacheID": "205947487327664c72fe09310fb24f91",
    "id": null,
    "metadata": {},
    "name": "PinToolsToBoardsRefetchQuery",
    "operationKind": "query",
    "text": "query PinToolsToBoardsRefetchQuery(\n  $topicId: ID\n  $cursor: String\n) {\n  ...PinToolsToBoards_query_sq8rb\n}\n\nfragment PinToolsToBoards_query_sq8rb on Query {\n  topics(first: 15, after: $cursor, all: true, parentId: $topicId, sort: \"created_at desc\") {\n    totalCount\n    edges {\n      node {\n        id\n        title\n        defaultViewId\n        tagList\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1b6458ff8ab19554680d9ea164230c01';

module.exports = node;
