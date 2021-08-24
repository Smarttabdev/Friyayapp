/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type FileBlock_tipsQuery$ref = any;
export type FileBlockQueryVariables = {|
  topicId?: ?string,
  subtopics?: ?boolean,
  root?: ?boolean,
|};
export type FileBlockQueryResponse = {|
  +$fragmentRefs: FileBlock_tipsQuery$ref
|};
export type FileBlockQuery = {|
  variables: FileBlockQueryVariables,
  response: FileBlockQueryResponse,
|};
*/


/*
query FileBlockQuery(
  $topicId: ID
  $subtopics: Boolean
  $root: Boolean
) {
  ...FileBlock_tipsQuery_2Relrj
}

fragment FileBlock_tipsQuery_2Relrj on Query {
  tips(first: 15, topicId: $topicId, subtopics: $subtopics, root: $root, haveFiles: true) {
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
    "name": "haveFiles",
    "value": true
  },
  (v3/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/)
],
v7 = {
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
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "FileBlockQuery",
    "selections": [
      {
        "args": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
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
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "FileBlockQuery",
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
                  (v7/*: any*/),
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
                      (v7/*: any*/),
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
        "args": (v6/*: any*/),
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
    "cacheID": "7160f21194b6324db45ec2f19b0f29b8",
    "id": null,
    "metadata": {},
    "name": "FileBlockQuery",
    "operationKind": "query",
    "text": "query FileBlockQuery(\n  $topicId: ID\n  $subtopics: Boolean\n  $root: Boolean\n) {\n  ...FileBlock_tipsQuery_2Relrj\n}\n\nfragment FileBlock_tipsQuery_2Relrj on Query {\n  tips(first: 15, topicId: $topicId, subtopics: $subtopics, root: $root, haveFiles: true) {\n    edges {\n      node {\n        id\n        ...TipItem_tip\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment TipItem_tip on Tip {\n  id\n  title\n  slug\n  attachments {\n    id\n    url\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '44e445a7b37d8a1d4b3a930b11912ae7';

module.exports = node;
