/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type InboxLens_tipsQuery$ref = any;
export type InboxLensTipsQueryVariables = {|
  topicsParams?: ?any,
  filter?: ?any,
  labels?: ?$ReadOnlyArray<string>,
|};
export type InboxLensTipsQueryResponse = {|
  +$fragmentRefs: InboxLens_tipsQuery$ref
|};
export type InboxLensTipsQuery = {|
  variables: InboxLensTipsQueryVariables,
  response: InboxLensTipsQueryResponse,
|};
*/


/*
query InboxLensTipsQuery(
  $topicsParams: JSON
  $filter: JSON
  $labels: [ID!]
) {
  ...InboxLens_tipsQuery_35x4Jl
}

fragment InboxLens_tipsQuery_35x4Jl on Query {
  tips(first: 30, topicsParams: $topicsParams, filter: $filter, labels: $labels) {
    totalCount
    edges {
      node {
        id
        title
        slug
        cardType
        updatedAt
        tipAssignments {
          assignmentType
          assignmentId
          id
        }
        labels {
          id
          name
          kind
          color
        }
        activities {
          id
          action
          read
          createdAt
          object {
            __typename
            ... on Label {
              id
              name
              kind
              color
            }
            id
          }
          notifier {
            id
            firstName
            name
            avatarUrl
          }
          user {
            id
            firstName
            name
            avatarUrl
          }
        }
        user {
          id
          firstName
          name
          avatarUrl
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
  "name": "filter"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "labels"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicsParams"
},
v3 = {
  "kind": "Variable",
  "name": "filter",
  "variableName": "filter"
},
v4 = {
  "kind": "Variable",
  "name": "labels",
  "variableName": "labels"
},
v5 = {
  "kind": "Variable",
  "name": "topicsParams",
  "variableName": "topicsParams"
},
v6 = [
  (v3/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 30
  },
  (v4/*: any*/),
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "kind",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "color",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v12 = [
  (v7/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "firstName",
    "storageKey": null
  },
  (v8/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "avatarUrl",
    "storageKey": null
  }
],
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": (v12/*: any*/),
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
    "name": "InboxLensTipsQuery",
    "selections": [
      {
        "args": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "InboxLens_tipsQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "InboxLensTipsQuery",
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
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          },
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
                    "kind": "ScalarField",
                    "name": "cardType",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "updatedAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TipAssignment",
                    "kind": "LinkedField",
                    "name": "tipAssignments",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "assignmentType",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "assignmentId",
                        "storageKey": null
                      },
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Label",
                    "kind": "LinkedField",
                    "name": "labels",
                    "plural": true,
                    "selections": [
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Activity",
                    "kind": "LinkedField",
                    "name": "activities",
                    "plural": true,
                    "selections": [
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "action",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "read",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "createdAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "object",
                        "plural": false,
                        "selections": [
                          (v11/*: any*/),
                          (v7/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v8/*: any*/),
                              (v9/*: any*/),
                              (v10/*: any*/)
                            ],
                            "type": "Label",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "notifier",
                        "plural": false,
                        "selections": (v12/*: any*/),
                        "storageKey": null
                      },
                      (v13/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v13/*: any*/),
                  (v11/*: any*/)
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
          "topicsParams",
          "filter",
          "labels"
        ],
        "handle": "connection",
        "key": "InboxLens_tips",
        "kind": "LinkedHandle",
        "name": "tips"
      }
    ]
  },
  "params": {
    "cacheID": "605e51e28411fac46994478a83e0b1c4",
    "id": null,
    "metadata": {},
    "name": "InboxLensTipsQuery",
    "operationKind": "query",
    "text": "query InboxLensTipsQuery(\n  $topicsParams: JSON\n  $filter: JSON\n  $labels: [ID!]\n) {\n  ...InboxLens_tipsQuery_35x4Jl\n}\n\nfragment InboxLens_tipsQuery_35x4Jl on Query {\n  tips(first: 30, topicsParams: $topicsParams, filter: $filter, labels: $labels) {\n    totalCount\n    edges {\n      node {\n        id\n        title\n        slug\n        cardType\n        updatedAt\n        tipAssignments {\n          assignmentType\n          assignmentId\n          id\n        }\n        labels {\n          id\n          name\n          kind\n          color\n        }\n        activities {\n          id\n          action\n          read\n          createdAt\n          object {\n            __typename\n            ... on Label {\n              id\n              name\n              kind\n              color\n            }\n            id\n          }\n          notifier {\n            id\n            firstName\n            name\n            avatarUrl\n          }\n          user {\n            id\n            firstName\n            name\n            avatarUrl\n          }\n        }\n        user {\n          id\n          firstName\n          name\n          avatarUrl\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ff082f57a1d68d4e4d937aba4cb50fc4';

module.exports = node;
