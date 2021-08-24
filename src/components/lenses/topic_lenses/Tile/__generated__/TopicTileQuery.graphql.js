/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TopicTile_query$ref = any;
export type TopicTileQueryVariables = {|
  owner: string
|};
export type TopicTileQueryResponse = {|
  +$fragmentRefs: TopicTile_query$ref
|};
export type TopicTileQuery = {|
  variables: TopicTileQueryVariables,
  response: TopicTileQueryResponse,
|};
*/


/*
query TopicTileQuery(
  $owner: ID!
) {
  ...TopicTile_query_1JS2nm
}

fragment TopicTile_query_1JS2nm on Query {
  config(owner: $owner, config: "hide_home_main_board_message") {
    id
    value
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "owner"
  }
],
v1 = {
  "kind": "Variable",
  "name": "owner",
  "variableName": "owner"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TopicTileQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "TopicTile_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TopicTileQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "hide_home_main_board_message"
          },
          (v1/*: any*/)
        ],
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
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
            "name": "value",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c41ef0c2a742476ec7b6915ebca380b4",
    "id": null,
    "metadata": {},
    "name": "TopicTileQuery",
    "operationKind": "query",
    "text": "query TopicTileQuery(\n  $owner: ID!\n) {\n  ...TopicTile_query_1JS2nm\n}\n\nfragment TopicTile_query_1JS2nm on Query {\n  config(owner: $owner, config: \"hide_home_main_board_message\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd8ebba6f2236644c52aa4a27ef3d71b3';

module.exports = node;
