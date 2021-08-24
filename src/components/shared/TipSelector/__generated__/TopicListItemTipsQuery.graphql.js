/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TopicListItemTips_tipsQuery$ref = any;
export type TopicListItemTipsQueryVariables = {|
  cursor?: ?string,
  topicId?: ?string,
  tipsFilter?: ?any,
|};
export type TopicListItemTipsQueryResponse = {|
  +$fragmentRefs: TopicListItemTips_tipsQuery$ref
|};
export type TopicListItemTipsQuery = {|
  variables: TopicListItemTipsQueryVariables,
  response: TopicListItemTipsQueryResponse,
|};
*/


/*
query TopicListItemTipsQuery(
  $cursor: String
  $topicId: ID
  $tipsFilter: JSON
) {
  ...TopicListItemTips_tipsQuery_3U2J1W
}

fragment TopicListItemTips_tipsQuery_3U2J1W on Query {
  tips(first: 10, after: $cursor, filter: $tipsFilter, sort: "updated_at desc", topicId: $topicId) {
    edges {
      node {
        id
        title
        cardType
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
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v4 = [
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
    "name": "sort",
    "value": "updated_at desc"
  },
  (v3/*: any*/)
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
    "name": "TopicListItemTipsQuery",
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
          (v3/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "TopicListItemTips_tipsQuery"
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
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "TopicListItemTipsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "TipConnection",
        "kind": "LinkedField",
        "name": "tips",
        "plural": false,
        "selections": [
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
                    "name": "title",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cardType",
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
        "args": (v4/*: any*/),
        "filters": [
          "filter",
          "sort",
          "topicId"
        ],
        "handle": "connection",
        "key": "TopicListItemTips_tips",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "98463d5ff224ea7100f2ea6943979955",
    "id": null,
    "metadata": {},
    "name": "TopicListItemTipsQuery",
    "operationKind": "query",
    "text": "query TopicListItemTipsQuery(\n  $cursor: String\n  $topicId: ID\n  $tipsFilter: JSON\n) {\n  ...TopicListItemTips_tipsQuery_3U2J1W\n}\n\nfragment TopicListItemTips_tipsQuery_3U2J1W on Query {\n  tips(first: 10, after: $cursor, filter: $tipsFilter, sort: \"updated_at desc\", topicId: $topicId) {\n    edges {\n      node {\n        id\n        title\n        cardType\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3b012d898a72f5b580bb853bcf430dc1';

module.exports = node;
