/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type BulkChangesModal_topicsQuery$ref = any;
export type BulkChangesModalSubtopicsQueryVariables = {|
  topicId?: ?string
|};
export type BulkChangesModalSubtopicsQueryResponse = {|
  +$fragmentRefs: BulkChangesModal_topicsQuery$ref
|};
export type BulkChangesModalSubtopicsQuery = {|
  variables: BulkChangesModalSubtopicsQueryVariables,
  response: BulkChangesModalSubtopicsQueryResponse,
|};
*/


/*
query BulkChangesModalSubtopicsQuery(
  $topicId: ID
) {
  ...BulkChangesModal_topicsQuery_1QjtfV
}

fragment BulkChangesModal_topicsQuery_1QjtfV on Query {
  topics(first: 99, parentId: $topicId) {
    edges {
      node {
        id
        title
        defaultViewId
        topics {
          totalCount
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "topicId"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 99
  },
  {
    "kind": "Variable",
    "name": "parentId",
    "variableName": "topicId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BulkChangesModalSubtopicsQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "topicId",
            "variableName": "topicId"
          }
        ],
        "kind": "FragmentSpread",
        "name": "BulkChangesModal_topicsQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BulkChangesModalSubtopicsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                    "name": "defaultViewId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
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
        "args": (v1/*: any*/),
        "filters": [
          "parentId"
        ],
        "handle": "connection",
        "key": "BulkChangesModal_topics",
        "kind": "LinkedHandle",
        "name": "topics"
      }
    ]
  },
  "params": {
    "cacheID": "331c7adf56facf1a8acd716bde9f78a9",
    "id": null,
    "metadata": {},
    "name": "BulkChangesModalSubtopicsQuery",
    "operationKind": "query",
    "text": "query BulkChangesModalSubtopicsQuery(\n  $topicId: ID\n) {\n  ...BulkChangesModal_topicsQuery_1QjtfV\n}\n\nfragment BulkChangesModal_topicsQuery_1QjtfV on Query {\n  topics(first: 99, parentId: $topicId) {\n    edges {\n      node {\n        id\n        title\n        defaultViewId\n        topics {\n          totalCount\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fd0d17990a1eaaadbd7da2db8fbf2383';

module.exports = node;
