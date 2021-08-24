/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type subscriptionsBlockCreatedSubscriptionVariables = {|
  ownerId: string
|};
export type subscriptionsBlockCreatedSubscriptionResponse = {|
  +blockCreated: {|
    +block: ?{|
      +id: string,
      +type: string,
      +position: number,
      +config: any,
    |}
  |}
|};
export type subscriptionsBlockCreatedSubscription = {|
  variables: subscriptionsBlockCreatedSubscriptionVariables,
  response: subscriptionsBlockCreatedSubscriptionResponse,
|};
*/


/*
subscription subscriptionsBlockCreatedSubscription(
  $ownerId: ID!
) {
  blockCreated(ownerId: $ownerId) {
    block {
      id
      type
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
    "name": "ownerId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "ownerId",
        "variableName": "ownerId"
      }
    ],
    "concreteType": "BlockCreatedPayload",
    "kind": "LinkedField",
    "name": "blockCreated",
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
            "name": "type",
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
    "name": "subscriptionsBlockCreatedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "subscriptionsBlockCreatedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1db82f5b1c36d0d178599141885ff455",
    "id": null,
    "metadata": {},
    "name": "subscriptionsBlockCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription subscriptionsBlockCreatedSubscription(\n  $ownerId: ID!\n) {\n  blockCreated(ownerId: $ownerId) {\n    block {\n      id\n      type\n      position\n      config\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dfb3893af29a6e1b5e205a67b0a15262';

module.exports = node;
