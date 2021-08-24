/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type filtersActiveFiltersOrderQueryVariables = {|
  topicId?: ?string,
  lenseId?: ?string,
  lenseKey?: ?string,
  name?: ?string,
  defaultFilters?: ?any,
|};
export type filtersActiveFiltersOrderQueryResponse = {|
  +activeFiltersOrder: ?{|
    +id: string,
    +name: ?string,
    +order: ?$ReadOnlyArray<string>,
  |}
|};
export type filtersActiveFiltersOrderQuery = {|
  variables: filtersActiveFiltersOrderQueryVariables,
  response: filtersActiveFiltersOrderQueryResponse,
|};
*/


/*
query filtersActiveFiltersOrderQuery(
  $topicId: ID
  $lenseId: ID
  $lenseKey: String
  $name: String
  $defaultFilters: JSON
) {
  activeFiltersOrder: activeCustomOrder(orderType: filters, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey, create: true, name: $name, defaultFilters: $defaultFilters, key: "team_default") {
    id
    name
    order
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "defaultFilters"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseKey"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v5 = [
  {
    "alias": "activeFiltersOrder",
    "args": [
      {
        "kind": "Literal",
        "name": "create",
        "value": true
      },
      {
        "kind": "Variable",
        "name": "defaultFilters",
        "variableName": "defaultFilters"
      },
      {
        "kind": "Literal",
        "name": "key",
        "value": "team_default"
      },
      {
        "kind": "Variable",
        "name": "lenseId",
        "variableName": "lenseId"
      },
      {
        "kind": "Variable",
        "name": "lenseKey",
        "variableName": "lenseKey"
      },
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      },
      {
        "kind": "Literal",
        "name": "orderType",
        "value": "filters"
      },
      {
        "kind": "Variable",
        "name": "topicId",
        "variableName": "topicId"
      }
    ],
    "concreteType": "CustomOrder",
    "kind": "LinkedField",
    "name": "activeCustomOrder",
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
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "order",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "filtersActiveFiltersOrderQuery",
    "selections": (v5/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v4/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "filtersActiveFiltersOrderQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "33e71bbf05e51fde95c45a0d1b9012be",
    "id": null,
    "metadata": {},
    "name": "filtersActiveFiltersOrderQuery",
    "operationKind": "query",
    "text": "query filtersActiveFiltersOrderQuery(\n  $topicId: ID\n  $lenseId: ID\n  $lenseKey: String\n  $name: String\n  $defaultFilters: JSON\n) {\n  activeFiltersOrder: activeCustomOrder(orderType: filters, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey, create: true, name: $name, defaultFilters: $defaultFilters, key: \"team_default\") {\n    id\n    name\n    order\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e62243ebf52177451bf4ec2d33b5ee86';

module.exports = node;
