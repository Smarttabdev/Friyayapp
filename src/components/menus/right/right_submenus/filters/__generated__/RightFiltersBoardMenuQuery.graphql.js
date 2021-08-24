/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type RightFiltersBoardMenuQueryVariables = {|
  ids?: ?$ReadOnlyArray<string>,
  include: boolean,
|};
export type RightFiltersBoardMenuQueryResponse = {|
  +topics?: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: string,
      |}
    |}>
  |}
|};
export type RightFiltersBoardMenuQuery = {|
  variables: RightFiltersBoardMenuQueryVariables,
  response: RightFiltersBoardMenuQueryResponse,
|};
*/


/*
query RightFiltersBoardMenuQuery(
  $ids: [ID!]
  $include: Boolean!
) {
  topics(ids: $ids, all: true) @include(if: $include) {
    edges {
      node {
        id
        title
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "ids"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "include"
  }
],
v1 = [
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
            "variableName": "ids"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RightFiltersBoardMenuQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RightFiltersBoardMenuQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5d8605b6f2b9d8ebe45cf7188139f1b3",
    "id": null,
    "metadata": {},
    "name": "RightFiltersBoardMenuQuery",
    "operationKind": "query",
    "text": "query RightFiltersBoardMenuQuery(\n  $ids: [ID!]\n  $include: Boolean!\n) {\n  topics(ids: $ids, all: true) @include(if: $include) {\n    edges {\n      node {\n        id\n        title\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8fefa8aa76a01fbdeafe3cde94cad831';

module.exports = node;
