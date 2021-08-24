/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type FileBlock_tipsQuery$ref = any;
export type FileBlockTipsQueryVariables = {|
  cursor?: ?string,
  topicId?: ?string,
  subtopics?: ?boolean,
  root?: ?boolean,
|};
export type FileBlockTipsQueryResponse = {|
  +$fragmentRefs: FileBlock_tipsQuery$ref
|};
export type FileBlockTipsQuery = {|
  variables: FileBlockTipsQueryVariables,
  response: FileBlockTipsQueryResponse,
|};
*/


/*
query FileBlockTipsQuery(
  $cursor: String
  $topicId: ID
  $subtopics: Boolean
  $root: Boolean
) {
  ...FileBlock_tipsQuery_2S1ICs
}

fragment FileBlock_tipsQuery_2S1ICs on Query {
  tips(first: 15, after: $cursor, topicId: $topicId, subtopics: $subtopics, root: $root, haveFiles: true) {
    edges {
      node {
        id
        ...TipItem_tip
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

fragment TipItem_tip on Tip {
  id
  title
  slug
  attachments {
    id
    url
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
    "name": "haveFiles",
    "value": true
  },
  (v4/*: any*/),
  (v5/*: any*/),
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
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
    "name": "FileBlockTipsQuery",
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
        "name": "FileBlock_tipsQuery"
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
    "name": "FileBlockTipsQuery",
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
                  (v8/*: any*/),
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
                    "concreteType": "Attachment",
                    "kind": "LinkedField",
                    "name": "attachments",
                    "plural": true,
                    "selections": [
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "url",
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
          "root",
          "haveFiles"
        ],
        "handle": "connection",
        "key": "FileBlock_tips",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "944f1eac35201898840202c010bc0e06",
    "id": null,
    "metadata": {},
    "name": "FileBlockTipsQuery",
    "operationKind": "query",
    "text": "query FileBlockTipsQuery(\n  $cursor: String\n  $topicId: ID\n  $subtopics: Boolean\n  $root: Boolean\n) {\n  ...FileBlock_tipsQuery_2S1ICs\n}\n\nfragment FileBlock_tipsQuery_2S1ICs on Query {\n  tips(first: 15, after: $cursor, topicId: $topicId, subtopics: $subtopics, root: $root, haveFiles: true) {\n    edges {\n      node {\n        id\n        ...TipItem_tip\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment TipItem_tip on Tip {\n  id\n  title\n  slug\n  attachments {\n    id\n    url\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6a510cd8d942056bc2d62f75e706afcc';

module.exports = node;
