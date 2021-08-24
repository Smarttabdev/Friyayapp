/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type configsSetConfigMutationVariables = {|
  owner: string,
  config: string,
  value?: ?any,
|};
export type configsSetConfigMutationResponse = {|
  +setConfig: ?{|
    +config: ?{|
      +id: string,
      +config: ?string,
      +value: ?any,
    |}
  |}
|};
export type configsSetConfigMutation = {|
  variables: configsSetConfigMutationVariables,
  response: configsSetConfigMutationResponse,
|};
*/


/*
mutation configsSetConfigMutation(
  $owner: ID!
  $config: String!
  $value: JSON
) {
  setConfig(input: {owner: $owner, config: $config, value: $value}) {
    config {
      id
      config
      value
    }
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
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "value"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "config",
            "variableName": "config"
          },
          {
            "kind": "Variable",
            "name": "owner",
            "variableName": "owner"
          },
          {
            "kind": "Variable",
            "name": "value",
            "variableName": "value"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "SetConfigPayload",
    "kind": "LinkedField",
    "name": "setConfig",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "configsSetConfigMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "configsSetConfigMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "b0602345c116f74bdf36ffc95a7df088",
    "id": null,
    "metadata": {},
    "name": "configsSetConfigMutation",
    "operationKind": "mutation",
    "text": "mutation configsSetConfigMutation(\n  $owner: ID!\n  $config: String!\n  $value: JSON\n) {\n  setConfig(input: {owner: $owner, config: $config, value: $value}) {\n    config {\n      id\n      config\n      value\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c23a8c8dbe0e8265e69ddbf61b41f98f';

module.exports = node;
