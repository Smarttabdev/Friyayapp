/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type hooksTipDeletedSubscriptionVariables = {|
  topicId: string
|};
export type hooksTipDeletedSubscriptionResponse = {|
  +tipDeleted: {|
    +tipId: ?string
  |}
|};
export type hooksTipDeletedSubscription = {|
  variables: hooksTipDeletedSubscriptionVariables,
  response: hooksTipDeletedSubscriptionResponse,
|};
*/


/*
subscription hooksTipDeletedSubscription(
  $topicId: ID!
) {
  tipDeleted(topicId: $topicId) {
    tipId
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "topicId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "topicId",
        "variableName": "topicId"
      }
    ],
    "concreteType": "TipDeletedPayload",
    "kind": "LinkedField",
    "name": "tipDeleted",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "tipId",
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
    "name": "hooksTipDeletedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "hooksTipDeletedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "19cca93e41aba689e61e9e5cf2ea88ec",
    "id": null,
    "metadata": {},
    "name": "hooksTipDeletedSubscription",
    "operationKind": "subscription",
    "text": "subscription hooksTipDeletedSubscription(\n  $topicId: ID!\n) {\n  tipDeleted(topicId: $topicId) {\n    tipId\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f96d6450c75da6dabb4d245191232ba4';

module.exports = node;
