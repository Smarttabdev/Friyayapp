/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type subscriptionsCustomFieldUpdatedSubscriptionVariables = {|
  id: string
|};
export type subscriptionsCustomFieldUpdatedSubscriptionResponse = {|
  +customFieldUpdated: {|
    +customField: ?{|
      +id: string,
      +name: string,
      +fieldType: string,
    |}
  |}
|};
export type subscriptionsCustomFieldUpdatedSubscription = {|
  variables: subscriptionsCustomFieldUpdatedSubscriptionVariables,
  response: subscriptionsCustomFieldUpdatedSubscriptionResponse,
|};
*/


/*
subscription subscriptionsCustomFieldUpdatedSubscription(
  $id: ID!
) {
  customFieldUpdated(id: $id) {
    customField {
      id
      name
      fieldType
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
    "concreteType": "CustomFieldUpdatedPayload",
    "kind": "LinkedField",
    "name": "customFieldUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CustomField",
        "kind": "LinkedField",
        "name": "customField",
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
            "name": "fieldType",
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
    "name": "subscriptionsCustomFieldUpdatedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "subscriptionsCustomFieldUpdatedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8776939317a39b02838b5877ae913933",
    "id": null,
    "metadata": {},
    "name": "subscriptionsCustomFieldUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription subscriptionsCustomFieldUpdatedSubscription(\n  $id: ID!\n) {\n  customFieldUpdated(id: $id) {\n    customField {\n      id\n      name\n      fieldType\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '982d003878c0a3908ee4788834c19d33';

module.exports = node;
