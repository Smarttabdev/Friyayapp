/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type subscriptionsBlockUpdatedSubscriptionVariables = {|
  id: string
|};
export type subscriptionsBlockUpdatedSubscriptionResponse = {|
  +blockUpdated: {|
    +block: ?{|
      +id: string,
      +position: number,
      +config: any,
    |}
  |}
|};
export type subscriptionsBlockUpdatedSubscription = {|
  variables: subscriptionsBlockUpdatedSubscriptionVariables,
  response: subscriptionsBlockUpdatedSubscriptionResponse,
|};
*/


/*
subscription subscriptionsBlockUpdatedSubscription(
  $id: ID!
) {
  blockUpdated(id: $id) {
    block {
      id
      position
      config
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "BlockUpdatedPayload",
    "kind": "LinkedField",
    "name": "blockUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Block",
        "kind": "LinkedField",
        "name": "block",
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
            "name": "position",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "config",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "subscriptionsBlockUpdatedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "subscriptionsBlockUpdatedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "79a7b00723b47d8668af7c437b98b8ef",
    "id": null,
    "metadata": {},
    "name": "subscriptionsBlockUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription subscriptionsBlockUpdatedSubscription(\n  $id: ID!\n) {\n  blockUpdated(id: $id) {\n    block {\n      id\n      position\n      config\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd6f098175a33d258535e235efaad9bb1';

module.exports = node;
