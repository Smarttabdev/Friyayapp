/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TopicListItemTips_tipsQuery$ref = any;
export type TopicListItemQueryVariables = {|
  topicId?: ?string,
  tipsFilter?: ?any,
|};
export type TopicListItemQueryResponse = {|
  +$fragmentRefs: TopicListItemTips_tipsQuery$ref
|};
export type TopicListItemQuery = {|
  variables: TopicListItemQueryVariables,
  response: TopicListItemQueryResponse,
|};
*/


/*
query TopicListItemQuery(
  $topicId: ID
  $tipsFilter: JSON
) {
  ...TopicListItemTips_tipsQuery_2gN0yX
}

fragment TopicListItemTips_tipsQuery_2gN0yX on Query {
  tips(first: 10, filter: $tipsFilter, sort: "updated_at desc", topicId: $topicId) {
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
  "name": "tipsFilter"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v2 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v3 = [
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
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TopicListItemQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "tipsFilter",
            "variableName": "tipsFilter"
          },
          (v2/*: any*/)
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
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "TopicListItemQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
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
        "args": (v3/*: any*/),
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
    "cacheID": "598696b998182ed22ecfdbb4e3650241",
    "id": null,
    "metadata": {},
    "name": "TopicListItemQuery",
    "operationKind": "query",
    "text": "query TopicListItemQuery(\n  $topicId: ID\n  $tipsFilter: JSON\n) {\n  ...TopicListItemTips_tipsQuery_2gN0yX\n}\n\nfragment TopicListItemTips_tipsQuery_2gN0yX on Query {\n  tips(first: 10, filter: $tipsFilter, sort: \"updated_at desc\", topicId: $topicId) {\n    edges {\n      node {\n        id\n        title\n        cardType\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fb923e8d4f4948d3c92bb2c99f601d86';

module.exports = node;
