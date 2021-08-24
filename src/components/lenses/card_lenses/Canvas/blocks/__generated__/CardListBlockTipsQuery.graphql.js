/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type CardListBlock_tipsQuery$ref = any;
export type CardListBlockTipsQueryVariables = {|
  cursor?: ?string,
  topicId?: ?string,
  subtopics?: ?boolean,
  root?: ?boolean,
|};
export type CardListBlockTipsQueryResponse = {|
  +$fragmentRefs: CardListBlock_tipsQuery$ref
|};
export type CardListBlockTipsQuery = {|
  variables: CardListBlockTipsQueryVariables,
  response: CardListBlockTipsQueryResponse,
|};
*/


/*
query CardListBlockTipsQuery(
  $cursor: String
  $topicId: ID
  $subtopics: Boolean
  $root: Boolean
) {
  ...CardListBlock_tipsQuery_2S1ICs
}

fragment CardListBlock_tipsQuery_2S1ICs on Query {
  tips(first: 15, after: $cursor, topicId: $topicId, subtopics: $subtopics, root: $root) {
    edges {
      node {
        id
        title
        slug
        cardType
        nestedTips {
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "root"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "subtopics"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v4 = {
  "kind": "Variable",
  "name": "root",
  "variableName": "root"
},
v5 = {
  "kind": "Variable",
  "name": "subtopics",
  "variableName": "subtopics"
},
v6 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v7 = [
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
  (v4/*: any*/),
  (v5/*: any*/),
  (v6/*: any*/)
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
    "name": "CardListBlockTipsQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "CardListBlock_tipsQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "CardListBlockTipsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v7/*: any*/),
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
                    "name": "slug",
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
                    "concreteType": "TipConnection",
                    "kind": "LinkedField",
                    "name": "nestedTips",
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
        "args": (v7/*: any*/),
        "filters": [
          "topicId",
          "subtopics",
          "root"
        ],
        "handle": "connection",
        "key": "CardListBlock_tips",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "69c96c28631c1976669dabbad80bb7ae",
    "id": null,
    "metadata": {},
    "name": "CardListBlockTipsQuery",
    "operationKind": "query",
    "text": "query CardListBlockTipsQuery(\n  $cursor: String\n  $topicId: ID\n  $subtopics: Boolean\n  $root: Boolean\n) {\n  ...CardListBlock_tipsQuery_2S1ICs\n}\n\nfragment CardListBlock_tipsQuery_2S1ICs on Query {\n  tips(first: 15, after: $cursor, topicId: $topicId, subtopics: $subtopics, root: $root) {\n    edges {\n      node {\n        id\n        title\n        slug\n        cardType\n        nestedTips {\n          totalCount\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f746188c1d9e3147084c20e86bad4284';

module.exports = node;
