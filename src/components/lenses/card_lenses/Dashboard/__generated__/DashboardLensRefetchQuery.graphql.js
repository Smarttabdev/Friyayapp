/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type DashboardLens_query$ref = any;
export type DashboardLensRefetchQueryVariables = {|
  owner: string
|};
export type DashboardLensRefetchQueryResponse = {|
  +$fragmentRefs: DashboardLens_query$ref
|};
export type DashboardLensRefetchQuery = {|
  variables: DashboardLensRefetchQueryVariables,
  response: DashboardLensRefetchQueryResponse,
|};
*/


/*
query DashboardLensRefetchQuery(
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
    "name": "DashboardLensRefetchQuery",
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
    "name": "DashboardLensRefetchQuery",
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
    "cacheID": "1625cca166002a817bb66388a57e410b",
    "id": null,
    "metadata": {},
    "name": "DashboardLensRefetchQuery",
    "operationKind": "query",
    "text": "query DashboardLensRefetchQuery(\n  $owner: ID!\n) {\n  ...DashboardLens_query_1JS2nm\n}\n\nfragment DashboardLens_query_1JS2nm on Query {\n  linkedBoardsConfig: config(owner: $owner, config: \"dashboard_boards\") {\n    value\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2b2d52d6fa2a42a7c80e684a7ecd78b8';

module.exports = node;
