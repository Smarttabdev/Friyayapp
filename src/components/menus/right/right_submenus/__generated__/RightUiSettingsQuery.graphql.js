/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type RightUiSettings_query$ref = any;
export type RightUiSettingsQueryVariables = {|
  owner: string,
  config: string,
|};
export type RightUiSettingsQueryResponse = {|
  +$fragmentRefs: RightUiSettings_query$ref
|};
export type RightUiSettingsQuery = {|
  variables: RightUiSettingsQueryVariables,
  response: RightUiSettingsQueryResponse,
|};
*/


/*
query RightUiSettingsQuery(
  $owner: ID!
  $config: String!
) {
  ...RightUiSettings_query_28h0EF
}

fragment RightUiSettings_query_28h0EF on Query {
  boardTabsClosed: config(owner: $owner, config: $config) {
    value
    id
  }
  rightBarQuickOpen: config(owner: $owner, config: "right_submenu_quick_open_close_array") {
    id
    value
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "config"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "owner"
},
v2 = {
  "kind": "Variable",
  "name": "owner",
  "variableName": "owner"
},
v3 = [
  {
    "kind": "Variable",
    "name": "config",
    "variableName": "config"
  },
  (v2/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RightUiSettingsQuery",
    "selections": [
      {
        "args": (v3/*: any*/),
        "kind": "FragmentSpread",
        "name": "RightUiSettings_query"
      }
    ],
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
    "name": "RightUiSettingsQuery",
    "selections": [
      {
        "alias": "boardTabsClosed",
        "args": (v3/*: any*/),
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "rightBarQuickOpen",
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "right_submenu_quick_open_close_array"
          },
          (v2/*: any*/)
        ],
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "040c5ba58b6b4c54dcf0a8a105f4b063",
    "id": null,
    "metadata": {},
    "name": "RightUiSettingsQuery",
    "operationKind": "query",
    "text": "query RightUiSettingsQuery(\n  $owner: ID!\n  $config: String!\n) {\n  ...RightUiSettings_query_28h0EF\n}\n\nfragment RightUiSettings_query_28h0EF on Query {\n  boardTabsClosed: config(owner: $owner, config: $config) {\n    value\n    id\n  }\n  rightBarQuickOpen: config(owner: $owner, config: \"right_submenu_quick_open_close_array\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '58d3301f501c37bf9fdeebf0024a9ec7';

module.exports = node;
