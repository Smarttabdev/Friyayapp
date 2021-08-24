/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type subscriptionsLogTimeDeletedSubscriptionVariables = {|
  tipId: string
|};
export type subscriptionsLogTimeDeletedSubscriptionResponse = {|
  +logTimeDeleted: {|
    +logTime: ?{|
      +id: string
    |}
  |}
|};
export type subscriptionsLogTimeDeletedSubscription = {|
  variables: subscriptionsLogTimeDeletedSubscriptionVariables,
  response: subscriptionsLogTimeDeletedSubscriptionResponse,
|};
*/


/*
subscription subscriptionsLogTimeDeletedSubscription(
  $tipId: ID!
) {
  logTimeDeleted(tipId: $tipId) {
    logTime {
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "tipId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "tipId",
        "variableName": "tipId"
      }
    ],
    "concreteType": "LogTimeDeletedPayload",
    "kind": "LinkedField",
    "name": "logTimeDeleted",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LogTime",
        "kind": "LinkedField",
        "name": "logTime",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "subscriptionsLogTimeDeletedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "subscriptionsLogTimeDeletedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3989714335ba2df136e3d63815fede34",
    "id": null,
    "metadata": {},
    "name": "subscriptionsLogTimeDeletedSubscription",
    "operationKind": "subscription",
    "text": "subscription subscriptionsLogTimeDeletedSubscription(\n  $tipId: ID!\n) {\n  logTimeDeleted(tipId: $tipId) {\n    logTime {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5d13a74127d02e87fea56cb26c874b7b';

module.exports = node;
