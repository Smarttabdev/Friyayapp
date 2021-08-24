/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type VideoChatListBlock_tipsQuery$ref = any;
export type VideoChatListBlockTipsQueryVariables = {|
  cursor?: ?string,
  topicId?: ?string,
  subtopics?: ?boolean,
  root?: ?boolean,
|};
export type VideoChatListBlockTipsQueryResponse = {|
  +$fragmentRefs: VideoChatListBlock_tipsQuery$ref
|};
export type VideoChatListBlockTipsQuery = {|
  variables: VideoChatListBlockTipsQueryVariables,
  response: VideoChatListBlockTipsQueryResponse,
|};
*/


/*
query VideoChatListBlockTipsQuery(
  $cursor: String
  $topicId: ID
  $subtopics: Boolean
  $root: Boolean
) {
  ...VideoChatListBlock_tipsQuery_2S1ICs
}

fragment VideoChatListBlock_tipsQuery_2S1ICs on Query {
  tips(first: 15, after: $cursor, topicId: $topicId, subtopics: $subtopics, root: $root, isVideoChat: true) {
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
  {
    "kind": "Literal",
    "name": "isVideoChat",
    "value": true
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
    "name": "VideoChatListBlockTipsQuery",
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
        "name": "VideoChatListBlock_tipsQuery"
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
    "name": "VideoChatListBlockTipsQuery",
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
          "root",
          "isVideoChat"
        ],
        "handle": "connection",
        "key": "VideoChatListBlock_tips",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "0e99ed41ff15e693943092797738ac48",
    "id": null,
    "metadata": {},
    "name": "VideoChatListBlockTipsQuery",
    "operationKind": "query",
    "text": "query VideoChatListBlockTipsQuery(\n  $cursor: String\n  $topicId: ID\n  $subtopics: Boolean\n  $root: Boolean\n) {\n  ...VideoChatListBlock_tipsQuery_2S1ICs\n}\n\nfragment VideoChatListBlock_tipsQuery_2S1ICs on Query {\n  tips(first: 15, after: $cursor, topicId: $topicId, subtopics: $subtopics, root: $root, isVideoChat: true) {\n    edges {\n      node {\n        id\n        title\n        slug\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b5675a2336856a602521198ed49d5e95';

module.exports = node;
