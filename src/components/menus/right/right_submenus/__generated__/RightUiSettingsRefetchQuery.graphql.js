/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type RightUiSettings_query$ref = any;
export type RightUiSettingsRefetchQueryVariables = {|
  owner: string,
  config: string,
|};
export type RightUiSettingsRefetchQueryResponse = {|
  +$fragmentRefs: RightUiSettings_query$ref
|};
export type RightUiSettingsRefetchQuery = {|
  variables: RightUiSettingsRefetchQueryVariables,
  response: RightUiSettingsRefetchQueryResponse,
|};
*/


/*
query RightUiSettingsRefetchQuery(
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
    "name": "RightUiSettingsRefetchQuery",
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
    "name": "RightUiSettingsRefetchQuery",
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
    "cacheID": "af4b887cbd8402e4ac15a949c861f325",
    "id": null,
    "metadata": {},
    "name": "RightUiSettingsRefetchQuery",
    "operationKind": "query",
    "text": "query RightUiSettingsRefetchQuery(\n  $owner: ID!\n  $config: String!\n) {\n  ...RightUiSettings_query_28h0EF\n}\n\nfragment RightUiSettings_query_28h0EF on Query {\n  boardTabsClosed: config(owner: $owner, config: $config) {\n    value\n    id\n  }\n  rightBarQuickOpen: config(owner: $owner, config: \"right_submenu_quick_open_close_array\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ab7fef4ccc5a7ee59c169d8a842fcf22';

module.exports = node;
