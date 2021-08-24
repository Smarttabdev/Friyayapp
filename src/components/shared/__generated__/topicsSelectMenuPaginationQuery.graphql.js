/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type topicsSelectMenu_topicsQuery$ref = any;
export type topicsSelectMenuPaginationQueryVariables = {|
  cursor?: ?string,
  parentId?: ?string,
  searchQuery?: ?string,
  tagged?: ?$ReadOnlyArray<string>,
  filter?: ?any,
|};
export type topicsSelectMenuPaginationQueryResponse = {|
  +$fragmentRefs: topicsSelectMenu_topicsQuery$ref
|};
export type topicsSelectMenuPaginationQuery = {|
  variables: topicsSelectMenuPaginationQueryVariables,
  response: topicsSelectMenuPaginationQueryResponse,
|};
*/


/*
query topicsSelectMenuPaginationQuery(
  $cursor: String
  $parentId: ID
  $searchQuery: String
  $tagged: [String!]
  $filter: JSON
) {
  ...topicsSelectMenu_topicsQuery_186zkq
}

fragment topicsSelectMenu_topicsQuery_186zkq on Query {
  topics(first: 99, after: $cursor, parentId: $parentId, title: $searchQuery, tagged: $tagged, filter: $filter) {
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
  "name": "cursor"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filter"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "parentId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "searchQuery"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tagged"
},
v5 = {
  "kind": "Variable",
  "name": "filter",
  "variableName": "filter"
},
v6 = {
  "kind": "Variable",
  "name": "parentId",
  "variableName": "parentId"
},
v7 = {
  "kind": "Variable",
  "name": "tagged",
  "variableName": "tagged"
},
v8 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v5/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 99
  },
  (v6/*: any*/),
  (v7/*: any*/),
  {
    "kind": "Variable",
    "name": "title",
    "variableName": "searchQuery"
  }
],
v9 = [
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
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "topicsSelectMenuPaginationQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "kind": "Variable",
            "name": "searchQuery",
            "variableName": "searchQuery"
          },
          (v7/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "topicsSelectMenu_topicsQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "topicsSelectMenuPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
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
                        "selections": (v9/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Abilities",
                        "kind": "LinkedField",
                        "name": "tips",
                        "plural": false,
                        "selections": (v9/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Abilities",
                        "kind": "LinkedField",
                        "name": "questions",
                        "plural": false,
                        "selections": (v9/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Abilities",
                        "kind": "LinkedField",
                        "name": "comments",
                        "plural": false,
                        "selections": (v9/*: any*/),
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
        "args": (v8/*: any*/),
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
      }
    ]
  },
  "params": {
    "cacheID": "59e73ecb3d325b1db856051797c985fa",
    "id": null,
    "metadata": {},
    "name": "topicsSelectMenuPaginationQuery",
    "operationKind": "query",
    "text": "query topicsSelectMenuPaginationQuery(\n  $cursor: String\n  $parentId: ID\n  $searchQuery: String\n  $tagged: [String!]\n  $filter: JSON\n) {\n  ...topicsSelectMenu_topicsQuery_186zkq\n}\n\nfragment topicsSelectMenu_topicsQuery_186zkq on Query {\n  topics(first: 99, after: $cursor, parentId: $parentId, title: $searchQuery, tagged: $tagged, filter: $filter) {\n    edges {\n      node {\n        id\n        title\n        slug\n        kind\n        masks {\n          isAdmin\n          isOwner\n          isGuest\n          isCollaborator\n          isMember\n          isPower\n        }\n        abilities {\n          self {\n            canCreate\n          }\n          tips {\n            canCreate\n          }\n          questions {\n            canCreate\n          }\n          comments {\n            canCreate\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '04ce7e6682df57ca18254d741ffe7e28';

module.exports = node;
