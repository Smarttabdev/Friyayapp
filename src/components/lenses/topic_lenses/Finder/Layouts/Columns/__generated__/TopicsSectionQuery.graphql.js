/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TopicsSectionQueryVariables = {|
  parentId?: ?string,
  cursor?: ?string,
  title?: ?string,
  tagged?: ?$ReadOnlyArray<string>,
  sort?: ?any,
|};
export type TopicsSectionQueryResponse = {|
  +topics: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: string,
        +slug: string,
        +tagList: ?$ReadOnlyArray<string>,
      |}
    |}>
  |}
|};
export type TopicsSectionQuery = {|
  variables: TopicsSectionQueryVariables,
  response: TopicsSectionQueryResponse,
|};
*/


/*
query TopicsSectionQuery(
  $parentId: ID
  $cursor: String
  $title: String
  $tagged: [String!]
  $sort: JSON
) {
  topics(after: $cursor, parentId: $parentId, title: $title, tagged: $tagged, sort: $sort) {
    edges {
      node {
        id
        title
        slug
        tagList
      }
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
  "name": "parentId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sort"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tagged"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v5 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "after",
        "variableName": "cursor"
      },
      {
        "kind": "Variable",
        "name": "parentId",
        "variableName": "parentId"
      },
      {
        "kind": "Variable",
        "name": "sort",
        "variableName": "sort"
      },
      {
        "kind": "Variable",
        "name": "tagged",
        "variableName": "tagged"
      },
      {
        "kind": "Variable",
        "name": "title",
        "variableName": "title"
      }
    ],
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
                "name": "tagList",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
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
    "name": "TopicsSectionQuery",
    "selections": (v5/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v4/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "TopicsSectionQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "684e78238cbeadfaa9b652d482babe2f",
    "id": null,
    "metadata": {},
    "name": "TopicsSectionQuery",
    "operationKind": "query",
    "text": "query TopicsSectionQuery(\n  $parentId: ID\n  $cursor: String\n  $title: String\n  $tagged: [String!]\n  $sort: JSON\n) {\n  topics(after: $cursor, parentId: $parentId, title: $title, tagged: $tagged, sort: $sort) {\n    edges {\n      node {\n        id\n        title\n        slug\n        tagList\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '53aced2a02c272f9f88eaf6ce3531515';

module.exports = node;
