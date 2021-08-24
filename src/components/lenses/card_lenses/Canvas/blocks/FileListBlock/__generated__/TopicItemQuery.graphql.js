/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TopicItemTips_tipsQuery$ref = any;
export type TopicItemQueryVariables = {|
  topicId?: ?string,
  subtopics?: ?boolean,
  root?: ?boolean,
|};
export type TopicItemQueryResponse = {|
  +$fragmentRefs: TopicItemTips_tipsQuery$ref
|};
export type TopicItemQuery = {|
  variables: TopicItemQueryVariables,
  response: TopicItemQueryResponse,
|};
*/


/*
query TopicItemQuery(
  $topicId: ID
  $subtopics: Boolean
  $root: Boolean
) {
  ...TopicItemTips_tipsQuery_2Relrj
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

fragment TopicItemTips_tipsQuery_2Relrj on Query {
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
    "name": "TopicItemQuery",
    "selections": [
      {
        "args": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
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
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "TopicItemQuery",
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
        "key": "TopicItemTips_tips",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "64f2cf25ca954c7bf36e2fd4a19ee858",
    "id": null,
    "metadata": {},
    "name": "TopicItemQuery",
    "operationKind": "query",
    "text": "query TopicItemQuery(\n  $topicId: ID\n  $subtopics: Boolean\n  $root: Boolean\n) {\n  ...TopicItemTips_tipsQuery_2Relrj\n}\n\nfragment TipItem_tip on Tip {\n  id\n  title\n  slug\n  attachments {\n    id\n    url\n  }\n}\n\nfragment TopicItemTips_tipsQuery_2Relrj on Query {\n  tips(first: 15, topicId: $topicId, subtopics: $subtopics, root: $root, haveFiles: true) {\n    edges {\n      node {\n        id\n        ...TipItem_tip\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '36d4cfd414bbafb20f88d1bb7b929140';

module.exports = node;
