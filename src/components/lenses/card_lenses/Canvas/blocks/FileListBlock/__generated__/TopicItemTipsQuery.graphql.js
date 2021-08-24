/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TopicItemTips_tipsQuery$ref = any;
export type TopicItemTipsQueryVariables = {|
  cursor?: ?string,
  topicId?: ?string,
  subtopics?: ?boolean,
  root?: ?boolean,
|};
export type TopicItemTipsQueryResponse = {|
  +$fragmentRefs: TopicItemTips_tipsQuery$ref
|};
export type TopicItemTipsQuery = {|
  variables: TopicItemTipsQueryVariables,
  response: TopicItemTipsQueryResponse,
|};
*/


/*
query TopicItemTipsQuery(
  $cursor: String
  $topicId: ID
  $subtopics: Boolean
  $root: Boolean
) {
  ...TopicItemTips_tipsQuery_2S1ICs
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

fragment TopicItemTips_tipsQuery_2S1ICs on Query {
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
    "name": "TopicItemTipsQuery",
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
        "name": "TopicItemTips_tipsQuery"
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
    "name": "TopicItemTipsQuery",
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
        "key": "TopicItemTips_tips",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "46bf79df53d45d7ba0b2909869b9f8da",
    "id": null,
    "metadata": {},
    "name": "TopicItemTipsQuery",
    "operationKind": "query",
    "text": "query TopicItemTipsQuery(\n  $cursor: String\n  $topicId: ID\n  $subtopics: Boolean\n  $root: Boolean\n) {\n  ...TopicItemTips_tipsQuery_2S1ICs\n}\n\nfragment TipItem_tip on Tip {\n  id\n  title\n  slug\n  attachments {\n    id\n    url\n  }\n}\n\nfragment TopicItemTips_tipsQuery_2S1ICs on Query {\n  tips(first: 15, after: $cursor, topicId: $topicId, subtopics: $subtopics, root: $root, haveFiles: true) {\n    edges {\n      node {\n        id\n        ...TipItem_tip\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '138d7d69d4cc1a26e662b6dec049d21f';

module.exports = node;
