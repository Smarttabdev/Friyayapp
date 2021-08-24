/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type GoalBoardsLensQueryVariables = {||};
export type GoalBoardsLensQueryResponse = {|
  +goalBoards: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: ?string,
        +title: ?string,
        +speed: ?number,
        +completion: ?number,
      |}
    |}>
  |}
|};
export type GoalBoardsLensQuery = {|
  variables: GoalBoardsLensQueryVariables,
  response: GoalBoardsLensQueryResponse,
|};
*/


/*
query GoalBoardsLensQuery {
  goalBoards: items(itemTypes: [GOAL_BOARD]) {
    edges {
      node {
        id
        title
        speed
        completion
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": "goalBoards",
    "args": [
      {
        "kind": "Literal",
        "name": "itemTypes",
        "value": [
          "GOAL_BOARD"
        ]
      }
    ],
    "concreteType": "ItemConnection",
    "kind": "LinkedField",
    "name": "items",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ItemEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Item",
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
                "name": "speed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "completion",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "items(itemTypes:[\"GOAL_BOARD\"])"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GoalBoardsLensQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GoalBoardsLensQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "1fb206c6e11e71ca0afee435ccba0b21",
    "id": null,
    "metadata": {},
    "name": "GoalBoardsLensQuery",
    "operationKind": "query",
    "text": "query GoalBoardsLensQuery {\n  goalBoards: items(itemTypes: [GOAL_BOARD]) {\n    edges {\n      node {\n        id\n        title\n        speed\n        completion\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8a020aa48cd8b3150132170474d87c8b';

module.exports = node;
