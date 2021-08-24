/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SheetCardTipUpdatedSubscriptionVariables = {|
  id: string,
  customFieldValuesFilter?: ?any,
|};
export type SheetCardTipUpdatedSubscriptionResponse = {|
  +tipUpdated: {|
    +tip: ?{|
      +id: string,
      +customFieldValues: ?$ReadOnlyArray<{|
        +id: string,
        +value: ?any,
        +customField: {|
          +id: string
        |},
      |}>,
    |}
  |}
|};
export type SheetCardTipUpdatedSubscription = {|
  variables: SheetCardTipUpdatedSubscriptionVariables,
  response: SheetCardTipUpdatedSubscriptionResponse,
|};
*/


/*
subscription SheetCardTipUpdatedSubscription(
  $id: ID!
  $customFieldValuesFilter: JSON
) {
  tipUpdated(id: $id) {
    tip {
      id
      customFieldValues(filter: $customFieldValuesFilter) {
        id
        value
        customField {
          id
        }
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "customFieldValuesFilter"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "TipUpdatedPayload",
    "kind": "LinkedField",
    "name": "tipUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Tip",
        "kind": "LinkedField",
        "name": "tip",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "filter",
                "variableName": "customFieldValuesFilter"
              }
            ],
            "concreteType": "CustomFieldValue",
            "kind": "LinkedField",
            "name": "customFieldValues",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "value",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CustomField",
                "kind": "LinkedField",
                "name": "customField",
                "plural": false,
                "selections": [
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SheetCardTipUpdatedSubscription",
    "selections": (v3/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "SheetCardTipUpdatedSubscription",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "67f7fd7d0dbe00d0c6c16e84c6358312",
    "id": null,
    "metadata": {},
    "name": "SheetCardTipUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription SheetCardTipUpdatedSubscription(\n  $id: ID!\n  $customFieldValuesFilter: JSON\n) {\n  tipUpdated(id: $id) {\n    tip {\n      id\n      customFieldValues(filter: $customFieldValuesFilter) {\n        id\n        value\n        customField {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '77b6ae190a5decbfacba0bcd3206b57d';

module.exports = node;
