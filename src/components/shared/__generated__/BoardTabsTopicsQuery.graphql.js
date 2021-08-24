/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type BoardTabsTopicsQueryVariables = {|
  topicIds?: ?$ReadOnlyArray<string>,
  include: boolean,
|};
export type BoardTabsTopicsQueryResponse = {|
  +topics?: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: string,
        +slug: string,
      |}
    |}>
  |}
|};
export type BoardTabsTopicsQuery = {|
  variables: BoardTabsTopicsQueryVariables,
  response: BoardTabsTopicsQueryResponse,
|};
*/


/*
query BoardTabsTopicsQuery(
  $topicIds: [ID!]
  $include: Boolean!
) {
  topics(ids: $topicIds, all: true) @include(if: $include) {
    edges {
      node {
        id
        title
        slug
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "include"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicIds"
},
v2 = [
  {
    "condition": "include",
    "kind": "Condition",
    "passingValue": true,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "all",
            "value": true
          },
          {
            "kind": "Variable",
            "name": "ids",
            "variableName": "topicIds"
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
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "BoardTabsTopicsQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "BoardTabsTopicsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "02da45aab794fceb8b013dc9554fe593",
    "id": null,
    "metadata": {},
    "name": "BoardTabsTopicsQuery",
    "operationKind": "query",
    "text": "query BoardTabsTopicsQuery(\n  $topicIds: [ID!]\n  $include: Boolean!\n) {\n  topics(ids: $topicIds, all: true) @include(if: $include) {\n    edges {\n      node {\n        id\n        title\n        slug\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '640931021578a7cea7359beefa8be75b';

module.exports = node;
