/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TopicTile_query$ref = any;
export type TopicTileRefetchQueryVariables = {|
  owner: string
|};
export type TopicTileRefetchQueryResponse = {|
  +$fragmentRefs: TopicTile_query$ref
|};
export type TopicTileRefetchQuery = {|
  variables: TopicTileRefetchQueryVariables,
  response: TopicTileRefetchQueryResponse,
|};
*/


/*
query TopicTileRefetchQuery(
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
    "name": "TopicTileRefetchQuery",
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
    "name": "TopicTileRefetchQuery",
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
    "cacheID": "b8d6aec60bf8070fcb066a7b8f55b490",
    "id": null,
    "metadata": {},
    "name": "TopicTileRefetchQuery",
    "operationKind": "query",
    "text": "query TopicTileRefetchQuery(\n  $owner: ID!\n) {\n  ...TopicTile_query_1JS2nm\n}\n\nfragment TopicTile_query_1JS2nm on Query {\n  config(owner: $owner, config: \"hide_home_main_board_message\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'cfe85d7b5c497aaac3ee53f3f651c866';

module.exports = node;
