/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type cardTypesUpdateCardTypesMutationVariables = {|
  topicId: string,
  config: any,
  toolConfig: any,
|};
export type cardTypesUpdateCardTypesMutationResponse = {|
  +updateCardTypes: ?{|
    +id: ?string
  |}
|};
export type cardTypesUpdateCardTypesMutation = {|
  variables: cardTypesUpdateCardTypesMutationVariables,
  response: cardTypesUpdateCardTypesMutationResponse,
|};
*/


/*
mutation cardTypesUpdateCardTypesMutation(
  $topicId: ID!
  $config: JSON!
  $toolConfig: JSON!
) {
  updateCardTypes(input: {topicId: $topicId, config: $config, toolConfig: $toolConfig}) {
    id
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
  "name": "toolConfig"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
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
            "name": "toolConfig",
            "variableName": "toolConfig"
          },
          {
            "kind": "Variable",
            "name": "topicId",
            "variableName": "topicId"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "UpdateCardTypesPayload",
    "kind": "LinkedField",
    "name": "updateCardTypes",
    "plural": false,
    "selections": [
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
    "name": "cardTypesUpdateCardTypesMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "cardTypesUpdateCardTypesMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "02def306d3fe12046686ff368ed5f265",
    "id": null,
    "metadata": {},
    "name": "cardTypesUpdateCardTypesMutation",
    "operationKind": "mutation",
    "text": "mutation cardTypesUpdateCardTypesMutation(\n  $topicId: ID!\n  $config: JSON!\n  $toolConfig: JSON!\n) {\n  updateCardTypes(input: {topicId: $topicId, config: $config, toolConfig: $toolConfig}) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '29f56c94662235dd693c34779b98355d';

module.exports = node;
