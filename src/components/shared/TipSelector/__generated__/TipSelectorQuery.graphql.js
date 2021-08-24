/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TopicList_topicsQuery$ref = any;
export type TipSelectorQueryVariables = {|
  havingTips?: ?any
|};
export type TipSelectorQueryResponse = {|
  +$fragmentRefs: TopicList_topicsQuery$ref
|};
export type TipSelectorQuery = {|
  variables: TipSelectorQueryVariables,
  response: TipSelectorQueryResponse,
|};
*/


/*
query TipSelectorQuery(
  $havingTips: JSON
) {
  ...TopicList_topicsQuery_4D25Bg
}

fragment TopicList_topicsQuery_4D25Bg on Query {
  topics(first: 15, havingTips: $havingTips) {
    edges {
      node {
        id
        title
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
    "name": "havingTips"
  }
],
v1 = {
  "kind": "Variable",
  "name": "havingTips",
  "variableName": "havingTips"
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  (v1/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TipSelectorQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "TopicList_topicsQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TipSelectorQuery",
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
          "havingTips"
        ],
        "handle": "connection",
        "key": "TopicList_topics",
        "kind": "LinkedHandle",
        "name": "topics"
      }
    ]
  },
  "params": {
    "cacheID": "cb35f8465f488e58f41177df6ee24319",
    "id": null,
    "metadata": {},
    "name": "TipSelectorQuery",
    "operationKind": "query",
    "text": "query TipSelectorQuery(\n  $havingTips: JSON\n) {\n  ...TopicList_topicsQuery_4D25Bg\n}\n\nfragment TopicList_topicsQuery_4D25Bg on Query {\n  topics(first: 15, havingTips: $havingTips) {\n    edges {\n      node {\n        id\n        title\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a50c9f92401e5ae4229f1f31e867c180';

module.exports = node;
