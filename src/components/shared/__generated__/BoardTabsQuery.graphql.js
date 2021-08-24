/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type BoardTabsQueryVariables = {|
  topicId: string,
  lenseId?: ?string,
  lenseKey?: ?string,
  userId: string,
|};
export type BoardTabsQueryResponse = {|
  +activeTopicsOrder: ?{|
    +id: string,
    +name: ?string,
    +order: ?$ReadOnlyArray<string>,
  |},
  +multiRowsConfig: ?{|
    +id: string,
    +config: ?string,
    +value: ?any,
  |},
|};
export type BoardTabsQuery = {|
  variables: BoardTabsQueryVariables,
  response: BoardTabsQueryResponse,
|};
*/


/*
query BoardTabsQuery(
  $topicId: ID!
  $lenseId: ID
  $lenseKey: String
  $userId: ID!
) {
  activeTopicsOrder: activeCustomOrder(orderType: topics, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {
    id
    name
    order
  }
  multiRowsConfig: config(owner: $userId, config: "tabs.multi_rows") {
    id
    config
    value
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseKey"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userId"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  {
    "alias": "activeTopicsOrder",
    "args": [
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
        "kind": "Literal",
        "name": "orderType",
        "value": "topics"
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
      (v4/*: any*/),
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
  },
  {
    "alias": "multiRowsConfig",
    "args": [
      {
        "kind": "Literal",
        "name": "config",
        "value": "tabs.multi_rows"
      },
      {
        "kind": "Variable",
        "name": "owner",
        "variableName": "userId"
      }
    ],
    "concreteType": "Config",
    "kind": "LinkedField",
    "name": "config",
    "plural": false,
    "selections": [
      (v4/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "config",
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "BoardTabsQuery",
    "selections": (v5/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "BoardTabsQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "22495c327251595d4db93009acb3df59",
    "id": null,
    "metadata": {},
    "name": "BoardTabsQuery",
    "operationKind": "query",
    "text": "query BoardTabsQuery(\n  $topicId: ID!\n  $lenseId: ID\n  $lenseKey: String\n  $userId: ID!\n) {\n  activeTopicsOrder: activeCustomOrder(orderType: topics, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n    name\n    order\n  }\n  multiRowsConfig: config(owner: $userId, config: \"tabs.multi_rows\") {\n    id\n    config\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '13200ff5f640bf7106e93170b6493d2b';

module.exports = node;
