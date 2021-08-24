/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type WorkspaceHeaderQueryVariables = {|
  topicId: string,
  config: string,
|};
export type WorkspaceHeaderQueryResponse = {|
  +bannerHeightConfig: ?{|
    +id: string,
    +value: ?any,
  |}
|};
export type WorkspaceHeaderQuery = {|
  variables: WorkspaceHeaderQueryVariables,
  response: WorkspaceHeaderQueryResponse,
|};
*/


/*
query WorkspaceHeaderQuery(
  $topicId: ID!
  $config: String!
) {
  bannerHeightConfig: config(owner: $topicId, config: $config) {
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
  "name": "topicId"
},
v2 = [
  {
    "alias": "bannerHeightConfig",
    "args": [
      {
        "kind": "Variable",
        "name": "config",
        "variableName": "config"
      },
      {
        "kind": "Variable",
        "name": "owner",
        "variableName": "topicId"
      }
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "WorkspaceHeaderQuery",
    "selections": (v2/*: any*/),
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
    "name": "WorkspaceHeaderQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "fbc35d9e5e4e40fe95503e72912dd09e",
    "id": null,
    "metadata": {},
    "name": "WorkspaceHeaderQuery",
    "operationKind": "query",
    "text": "query WorkspaceHeaderQuery(\n  $topicId: ID!\n  $config: String!\n) {\n  bannerHeightConfig: config(owner: $topicId, config: $config) {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2b8feebee5eebd4bb61ae4965744a263';

module.exports = node;
