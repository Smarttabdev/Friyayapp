/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type FileListBlock_topicsQuery$ref = any;
export type FileListBlockTopicsQueryVariables = {|
  cursor?: ?string,
  parentId?: ?string,
|};
export type FileListBlockTopicsQueryResponse = {|
  +$fragmentRefs: FileListBlock_topicsQuery$ref
|};
export type FileListBlockTopicsQuery = {|
  variables: FileListBlockTopicsQueryVariables,
  response: FileListBlockTopicsQueryResponse,
|};
*/


/*
query FileListBlockTopicsQuery(
  $cursor: String
  $parentId: ID
) {
  ...FileListBlock_topicsQuery_3OnjOP
}

fragment FileListBlock_topicsQuery_3OnjOP on Query {
  topics(first: 15, after: $cursor, parentId: $parentId, havingTips: {"have_files":true}) {
    edges {
      node {
        id
        title
        slug
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
    "name": "parentId"
  }
],
v1 = {
  "kind": "Variable",
  "name": "parentId",
  "variableName": "parentId"
},
v2 = [
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
  {
    "kind": "Literal",
    "name": "havingTips",
    "value": {
      "have_files": true
    }
  },
  (v1/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FileListBlockTopicsQuery",
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
        "name": "FileListBlock_topicsQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FileListBlockTopicsQuery",
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
                    "name": "slug",
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
          "parentId",
          "havingTips"
        ],
        "handle": "connection",
        "key": "FileListBlock_topics",
        "kind": "LinkedHandle",
        "name": "topics"
      }
    ]
  },
  "params": {
    "cacheID": "055d80208c5d61c93234363e8599411f",
    "id": null,
    "metadata": {},
    "name": "FileListBlockTopicsQuery",
    "operationKind": "query",
    "text": "query FileListBlockTopicsQuery(\n  $cursor: String\n  $parentId: ID\n) {\n  ...FileListBlock_topicsQuery_3OnjOP\n}\n\nfragment FileListBlock_topicsQuery_3OnjOP on Query {\n  topics(first: 15, after: $cursor, parentId: $parentId, havingTips: {\"have_files\":true}) {\n    edges {\n      node {\n        id\n        title\n        slug\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6a18ddcf79ac6f6373b23d784959034b';

module.exports = node;
