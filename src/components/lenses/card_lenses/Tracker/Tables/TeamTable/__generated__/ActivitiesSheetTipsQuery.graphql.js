/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ActivitiesSheet_tipsQuery$ref = any;
export type ActivitiesSheetTipsQueryVariables = {|
  cursor?: ?string,
  topicId?: ?string,
  tipsFilter?: ?any,
  topicsParams?: ?any,
|};
export type ActivitiesSheetTipsQueryResponse = {|
  +$fragmentRefs: ActivitiesSheet_tipsQuery$ref
|};
export type ActivitiesSheetTipsQuery = {|
  variables: ActivitiesSheetTipsQueryVariables,
  response: ActivitiesSheetTipsQueryResponse,
|};
*/


/*
query ActivitiesSheetTipsQuery(
  $cursor: String
  $topicId: ID
  $tipsFilter: JSON
  $topicsParams: JSON
) {
  ...ActivitiesSheet_tipsQuery_4xPQmQ
}

fragment ActivitiesSheet_tipsQuery_4xPQmQ on Query {
  tips(first: 10, after: $cursor, topicId: $topicId, filter: $tipsFilter, topicsParams: $topicsParams, subtopics: true) {
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
  "name": "cursor"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tipsFilter"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicsParams"
},
v4 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v5 = {
  "kind": "Variable",
  "name": "topicsParams",
  "variableName": "topicsParams"
},
v6 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
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
  (v4/*: any*/),
  (v5/*: any*/)
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
    "name": "ActivitiesSheetTipsQuery",
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
            "name": "tipsFilter",
            "variableName": "tipsFilter"
          },
          (v4/*: any*/),
          (v5/*: any*/)
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
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "ActivitiesSheetTipsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
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
        "args": (v6/*: any*/),
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
    "cacheID": "d435c700de26d0d1b0ec11f931a3103f",
    "id": null,
    "metadata": {},
    "name": "ActivitiesSheetTipsQuery",
    "operationKind": "query",
    "text": "query ActivitiesSheetTipsQuery(\n  $cursor: String\n  $topicId: ID\n  $tipsFilter: JSON\n  $topicsParams: JSON\n) {\n  ...ActivitiesSheet_tipsQuery_4xPQmQ\n}\n\nfragment ActivitiesSheet_tipsQuery_4xPQmQ on Query {\n  tips(first: 10, after: $cursor, topicId: $topicId, filter: $tipsFilter, topicsParams: $topicsParams, subtopics: true) {\n    totalCount\n    edges {\n      node {\n        id\n        jsonApi\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f4c59452edd3467b208ba39bd5507a1c';

module.exports = node;
