/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ActivitiesSheet_tipsQuery$ref = any;
export type ActivitiesSheetQueryVariables = {|
  topicId?: ?string,
  tipsFilter?: ?any,
  topicsParams?: ?any,
|};
export type ActivitiesSheetQueryResponse = {|
  +$fragmentRefs: ActivitiesSheet_tipsQuery$ref
|};
export type ActivitiesSheetQuery = {|
  variables: ActivitiesSheetQueryVariables,
  response: ActivitiesSheetQueryResponse,
|};
*/


/*
query ActivitiesSheetQuery(
  $topicId: ID
  $tipsFilter: JSON
  $topicsParams: JSON
) {
  ...ActivitiesSheet_tipsQuery_dKxHO
}

fragment ActivitiesSheet_tipsQuery_dKxHO on Query {
  tips(first: 10, topicId: $topicId, filter: $tipsFilter, topicsParams: $topicsParams, subtopics: true) {
    totalCount
    edges {
      node {
        id
        jsonApi
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
  "name": "tipsFilter"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicsParams"
},
v3 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v4 = {
  "kind": "Variable",
  "name": "topicsParams",
  "variableName": "topicsParams"
},
v5 = [
  {
    "kind": "Variable",
    "name": "filter",
    "variableName": "tipsFilter"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "subtopics",
    "value": true
  },
  (v3/*: any*/),
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivitiesSheetQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "tipsFilter",
            "variableName": "tipsFilter"
          },
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ActivitiesSheet_tipsQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "ActivitiesSheetQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "TipConnection",
        "kind": "LinkedField",
        "name": "tips",
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
                    "name": "jsonApi",
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
        "args": (v5/*: any*/),
        "filters": [
          "topicId",
          "filter",
          "topicsParams",
          "subtopics"
        ],
        "handle": "connection",
        "key": "ActivitiesSheet_tips",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "8194522a986f4db381d09baa2a16faf7",
    "id": null,
    "metadata": {},
    "name": "ActivitiesSheetQuery",
    "operationKind": "query",
    "text": "query ActivitiesSheetQuery(\n  $topicId: ID\n  $tipsFilter: JSON\n  $topicsParams: JSON\n) {\n  ...ActivitiesSheet_tipsQuery_dKxHO\n}\n\nfragment ActivitiesSheet_tipsQuery_dKxHO on Query {\n  tips(first: 10, topicId: $topicId, filter: $tipsFilter, topicsParams: $topicsParams, subtopics: true) {\n    totalCount\n    edges {\n      node {\n        id\n        jsonApi\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f3333ff83dead554460e6e4fc9677580';

module.exports = node;
