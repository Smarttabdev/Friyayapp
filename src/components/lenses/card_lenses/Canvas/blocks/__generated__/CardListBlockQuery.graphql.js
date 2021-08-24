/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type CardListBlock_tipsQuery$ref = any;
export type CardListBlockQueryVariables = {|
  topicId?: ?string,
  subtopics?: ?boolean,
  root?: ?boolean,
|};
export type CardListBlockQueryResponse = {|
  +$fragmentRefs: CardListBlock_tipsQuery$ref
|};
export type CardListBlockQuery = {|
  variables: CardListBlockQueryVariables,
  response: CardListBlockQueryResponse,
|};
*/


/*
query CardListBlockQuery(
  $topicId: ID
  $subtopics: Boolean
  $root: Boolean
) {
  ...CardListBlock_tipsQuery_2Relrj
}

fragment CardListBlock_tipsQuery_2Relrj on Query {
  tips(first: 15, topicId: $topicId, subtopics: $subtopics, root: $root) {
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
  "name": "root"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "subtopics"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v3 = {
  "kind": "Variable",
  "name": "root",
  "variableName": "root"
},
v4 = {
  "kind": "Variable",
  "name": "subtopics",
  "variableName": "subtopics"
},
v5 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  (v3/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/)
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
    "name": "CardListBlockQuery",
    "selections": [
      {
        "args": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
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
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CardListBlockQuery",
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
        "args": (v6/*: any*/),
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
    "cacheID": "dda9181cc0b00b3dbf4fb8b8ea4a4b5f",
    "id": null,
    "metadata": {},
    "name": "CardListBlockQuery",
    "operationKind": "query",
    "text": "query CardListBlockQuery(\n  $topicId: ID\n  $subtopics: Boolean\n  $root: Boolean\n) {\n  ...CardListBlock_tipsQuery_2Relrj\n}\n\nfragment CardListBlock_tipsQuery_2Relrj on Query {\n  tips(first: 15, topicId: $topicId, subtopics: $subtopics, root: $root) {\n    edges {\n      node {\n        id\n        title\n        slug\n        cardType\n        nestedTips {\n          totalCount\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '818dd3212f9f2c2432f66b21138d4ef3';

module.exports = node;
