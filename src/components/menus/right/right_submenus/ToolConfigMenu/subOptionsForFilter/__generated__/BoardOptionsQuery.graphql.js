/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type BoardOptionsQueryVariables = {|
  ids?: ?$ReadOnlyArray<string>,
  include: boolean,
|};
export type BoardOptionsQueryResponse = {|
  +topics?: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: string,
      |}
    |}>
  |}
|};
export type BoardOptionsQuery = {|
  variables: BoardOptionsQueryVariables,
  response: BoardOptionsQueryResponse,
|};
*/


/*
query BoardOptionsQuery(
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
    "name": "BoardOptionsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BoardOptionsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "641709f7e68b67996cac426a50eb183e",
    "id": null,
    "metadata": {},
    "name": "BoardOptionsQuery",
    "operationKind": "query",
    "text": "query BoardOptionsQuery(\n  $ids: [ID!]\n  $include: Boolean!\n) {\n  topics(ids: $ids, all: true) @include(if: $include) {\n    edges {\n      node {\n        id\n        title\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c95525881c31469c17fc1b468d220597';

module.exports = node;
