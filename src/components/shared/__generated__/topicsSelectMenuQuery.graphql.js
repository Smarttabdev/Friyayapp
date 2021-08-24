/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type topicsSelectMenu_topicsQuery$ref = any;
export type topicsSelectMenuQueryVariables = {|
  useBoardOrder: boolean,
  topicId?: ?string,
  lenseId?: ?string,
  lenseKey?: ?string,
  parentId?: ?string,
  searchQuery?: ?string,
  tagged?: ?$ReadOnlyArray<string>,
  filter?: ?any,
|};
export type topicsSelectMenuQueryResponse = {|
  +activeTopicsOrder?: ?{|
    +id: string,
    +name: ?string,
    +order: ?$ReadOnlyArray<string>,
  |},
  +$fragmentRefs: topicsSelectMenu_topicsQuery$ref,
|};
export type topicsSelectMenuQuery = {|
  variables: topicsSelectMenuQueryVariables,
  response: topicsSelectMenuQueryResponse,
|};
*/


/*
query topicsSelectMenuQuery(
  $useBoardOrder: Boolean!
  $topicId: ID
  $lenseId: ID
  $lenseKey: String
  $parentId: ID
  $searchQuery: String
  $tagged: [String!]
  $filter: JSON
) {
  ...topicsSelectMenu_topicsQuery_4BZlqm
  activeTopicsOrder: activeCustomOrder(orderType: topics, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) @include(if: $useBoardOrder) {
    id
    name
    order
  }
}

fragment topicsSelectMenu_topicsQuery_4BZlqm on Query {
  topics(first: 99, parentId: $parentId, title: $searchQuery, tagged: $tagged, filter: $filter) {
    edges {
      node {
        id
        title
        slug
        kind
        masks {
          isAdmin
          isOwner
          isGuest
          isCollaborator
          isMember
          isPower
        }
        abilities {
          self {
            canCreate
          }
          tips {
            canCreate
          }
          questions {
            canCreate
          }
          comments {
            canCreate
          }
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
  "name": "lenseId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseKey"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "parentId"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "searchQuery"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tagged"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "useBoardOrder"
},
v8 = {
  "kind": "Variable",
  "name": "filter",
  "variableName": "filter"
},
v9 = {
  "kind": "Variable",
  "name": "parentId",
  "variableName": "parentId"
},
v10 = {
  "kind": "Variable",
  "name": "tagged",
  "variableName": "tagged"
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = {
  "condition": "useBoardOrder",
  "kind": "Condition",
  "passingValue": true,
  "selections": [
    {
      "alias": "activeTopicsOrder",
      "args": [
        {
          "kind": "Variable",
          "name": "lenseId",
          "variableName": "lenseId"
        },
        {
          "kind": "Variable",
          "name": "lenseKey",
          "variableName": "lenseKey"
        },
        {
          "kind": "Literal",
          "name": "orderType",
          "value": "topics"
        },
        {
          "kind": "Variable",
          "name": "topicId",
          "variableName": "topicId"
        }
      ],
      "concreteType": "CustomOrder",
      "kind": "LinkedField",
      "name": "activeCustomOrder",
      "plural": false,
      "selections": [
        (v11/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "order",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ]
},
v13 = [
  (v8/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 99
  },
  (v9/*: any*/),
  (v10/*: any*/),
  {
    "kind": "Variable",
    "name": "title",
    "variableName": "searchQuery"
  }
],
v14 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "canCreate",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "topicsSelectMenuQuery",
    "selections": [
      {
        "args": [
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "kind": "Variable",
            "name": "searchQuery",
            "variableName": "searchQuery"
          },
          (v10/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "topicsSelectMenu_topicsQuery"
      },
      (v12/*: any*/)
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v7/*: any*/),
      (v6/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "topicsSelectMenuQuery",
    "selections": [
      {
        "alias": null,
        "args": (v13/*: any*/),
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
                  (v11/*: any*/),
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
                    "name": "kind",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Masks",
                    "kind": "LinkedField",
                    "name": "masks",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isAdmin",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isOwner",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isGuest",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isCollaborator",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isMember",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isPower",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TopicAbilities",
                    "kind": "LinkedField",
                    "name": "abilities",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Abilities",
                        "kind": "LinkedField",
                        "name": "self",
                        "plural": false,
                        "selections": (v14/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Abilities",
                        "kind": "LinkedField",
                        "name": "tips",
                        "plural": false,
                        "selections": (v14/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Abilities",
                        "kind": "LinkedField",
                        "name": "questions",
                        "plural": false,
                        "selections": (v14/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Abilities",
                        "kind": "LinkedField",
                        "name": "comments",
                        "plural": false,
                        "selections": (v14/*: any*/),
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
        "args": (v13/*: any*/),
        "filters": [
          "parentId",
          "title",
          "tagged",
          "filter"
        ],
        "handle": "connection",
        "key": "topicsSelectMenu_topics",
        "kind": "LinkedHandle",
        "name": "topics"
      },
      (v12/*: any*/)
    ]
  },
  "params": {
    "cacheID": "2eba24855ab0c5f63b30ffcb8c830cfc",
    "id": null,
    "metadata": {},
    "name": "topicsSelectMenuQuery",
    "operationKind": "query",
    "text": "query topicsSelectMenuQuery(\n  $useBoardOrder: Boolean!\n  $topicId: ID\n  $lenseId: ID\n  $lenseKey: String\n  $parentId: ID\n  $searchQuery: String\n  $tagged: [String!]\n  $filter: JSON\n) {\n  ...topicsSelectMenu_topicsQuery_4BZlqm\n  activeTopicsOrder: activeCustomOrder(orderType: topics, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) @include(if: $useBoardOrder) {\n    id\n    name\n    order\n  }\n}\n\nfragment topicsSelectMenu_topicsQuery_4BZlqm on Query {\n  topics(first: 99, parentId: $parentId, title: $searchQuery, tagged: $tagged, filter: $filter) {\n    edges {\n      node {\n        id\n        title\n        slug\n        kind\n        masks {\n          isAdmin\n          isOwner\n          isGuest\n          isCollaborator\n          isMember\n          isPower\n        }\n        abilities {\n          self {\n            canCreate\n          }\n          tips {\n            canCreate\n          }\n          questions {\n            canCreate\n          }\n          comments {\n            canCreate\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '075741ff197baa607655196782a2b795';

module.exports = node;
