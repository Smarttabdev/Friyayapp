/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type DashboardLens_query$ref = any;
export type DashboardLensQueryVariables = {|
  owner: string
|};
export type DashboardLensQueryResponse = {|
  +$fragmentRefs: DashboardLens_query$ref
|};
export type DashboardLensQuery = {|
  variables: DashboardLensQueryVariables,
  response: DashboardLensQueryResponse,
|};
*/


/*
query DashboardLensQuery(
  $owner: ID!
) {
  ...DashboardLens_query_1JS2nm
}

fragment DashboardLens_query_1JS2nm on Query {
  linkedBoardsConfig: config(owner: $owner, config: "dashboard_boards") {
    value
    id
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
    "name": "DashboardLensQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "DashboardLens_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DashboardLensQuery",
    "selections": [
      {
        "alias": "linkedBoardsConfig",
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "dashboard_boards"
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
            "name": "value",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4b1f0d76ae1cd62c076b17ec70c9fc07",
    "id": null,
    "metadata": {},
    "name": "DashboardLensQuery",
    "operationKind": "query",
    "text": "query DashboardLensQuery(\n  $owner: ID!\n) {\n  ...DashboardLens_query_1JS2nm\n}\n\nfragment DashboardLens_query_1JS2nm on Query {\n  linkedBoardsConfig: config(owner: $owner, config: \"dashboard_boards\") {\n    value\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4cef7d0d95330312d7399fb7d1fdb7ab';

module.exports = node;
