/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type VideoChatListBlock_tipsQuery$ref = any;
export type VideoChatListBlockQueryVariables = {|
  topicId?: ?string,
  subtopics?: ?boolean,
  root?: ?boolean,
|};
export type VideoChatListBlockQueryResponse = {|
  +$fragmentRefs: VideoChatListBlock_tipsQuery$ref
|};
export type VideoChatListBlockQuery = {|
  variables: VideoChatListBlockQueryVariables,
  response: VideoChatListBlockQueryResponse,
|};
*/


/*
query VideoChatListBlockQuery(
  $topicId: ID
  $subtopics: Boolean
  $root: Boolean
) {
  ...VideoChatListBlock_tipsQuery_2Relrj
}

fragment VideoChatListBlock_tipsQuery_2Relrj on Query {
  tips(first: 15, topicId: $topicId, subtopics: $subtopics, root: $root, isVideoChat: true) {
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
  {
    "kind": "Literal",
    "name": "isVideoChat",
    "value": true
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
    "name": "VideoChatListBlockQuery",
    "selections": [
      {
        "args": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
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
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "VideoChatListBlockQuery",
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
    "cacheID": "5049ae50e110c6c539c43944150949e2",
    "id": null,
    "metadata": {},
    "name": "VideoChatListBlockQuery",
    "operationKind": "query",
    "text": "query VideoChatListBlockQuery(\n  $topicId: ID\n  $subtopics: Boolean\n  $root: Boolean\n) {\n  ...VideoChatListBlock_tipsQuery_2Relrj\n}\n\nfragment VideoChatListBlock_tipsQuery_2Relrj on Query {\n  tips(first: 15, topicId: $topicId, subtopics: $subtopics, root: $root, isVideoChat: true) {\n    edges {\n      node {\n        id\n        title\n        slug\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '09242d35fbd62b739fe6adbaf8d8f41e';

module.exports = node;
