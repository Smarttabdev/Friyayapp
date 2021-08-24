/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type cardsLogTimesQueryVariables = {|
  ids?: ?$ReadOnlyArray<string>
|};
export type cardsLogTimesQueryResponse = {|
  +tips: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +logTimes: ?$ReadOnlyArray<{|
          +id: string,
          +jsonApi: ?any,
        |}>,
      |}
    |}>
  |}
|};
export type cardsLogTimesQuery = {|
  variables: cardsLogTimesQueryVariables,
  response: cardsLogTimesQueryResponse,
|};
*/


/*
query cardsLogTimesQuery(
  $ids: [ID!]
) {
  tips(ids: $ids) {
    edges {
      node {
        id
        logTimes {
          id
          jsonApi
        }
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
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "ids",
        "variableName": "ids"
      }
    ],
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
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "LogTime",
                "kind": "LinkedField",
                "name": "logTimes",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "jsonApi",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "cardsLogTimesQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "cardsLogTimesQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "4cc863917d69fd59d66369defdd335dc",
    "id": null,
    "metadata": {},
    "name": "cardsLogTimesQuery",
    "operationKind": "query",
    "text": "query cardsLogTimesQuery(\n  $ids: [ID!]\n) {\n  tips(ids: $ids) {\n    edges {\n      node {\n        id\n        logTimes {\n          id\n          jsonApi\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bb7fe635888ad5419eb3404e882625a0';

module.exports = node;
