/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type fieldsTabContentDomainUpdatedSubscriptionVariables = {|
  id: string
|};
export type fieldsTabContentDomainUpdatedSubscriptionResponse = {|
  +domainUpdated: {|
    +domain: ?{|
      +id: string,
      +activeFields: ?$ReadOnlyArray<{|
        +id: string,
        +position: number,
        +customField: {|
          +id: string,
          +name: string,
          +fieldType: string,
        |},
      |}>,
      +inactiveFields: ?$ReadOnlyArray<{|
        +id: string,
        +name: string,
        +fieldType: string,
      |}>,
    |}
  |}
|};
export type fieldsTabContentDomainUpdatedSubscription = {|
  variables: fieldsTabContentDomainUpdatedSubscriptionVariables,
  response: fieldsTabContentDomainUpdatedSubscriptionResponse,
|};
*/


/*
subscription fieldsTabContentDomainUpdatedSubscription(
  $id: ID!
) {
  domainUpdated(id: $id) {
    domain {
      id
      activeFields(sort: "position asc, created_at asc") {
        id
        position
        customField {
          id
          name
          fieldType
        }
      }
      inactiveFields(sort: "field_type asc") {
        id
        name
        fieldType
      }
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v1/*: any*/),
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
    "concreteType": "DomainUpdatedPayload",
    "kind": "LinkedField",
    "name": "domainUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Domain",
        "kind": "LinkedField",
        "name": "domain",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "sort",
                "value": "position asc, created_at asc"
              }
            ],
            "concreteType": "ActiveField",
            "kind": "LinkedField",
            "name": "activeFields",
            "plural": true,
            "selections": [
              (v1/*: any*/),
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
                "concreteType": "CustomField",
                "kind": "LinkedField",
                "name": "customField",
                "plural": false,
                "selections": (v2/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": "activeFields(sort:\"position asc, created_at asc\")"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "sort",
                "value": "field_type asc"
              }
            ],
            "concreteType": "CustomField",
            "kind": "LinkedField",
            "name": "inactiveFields",
            "plural": true,
            "selections": (v2/*: any*/),
            "storageKey": "inactiveFields(sort:\"field_type asc\")"
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
    "name": "fieldsTabContentDomainUpdatedSubscription",
    "selections": (v3/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "fieldsTabContentDomainUpdatedSubscription",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "cde8942cf3631d7a5d245399e2cc5803",
    "id": null,
    "metadata": {},
    "name": "fieldsTabContentDomainUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription fieldsTabContentDomainUpdatedSubscription(\n  $id: ID!\n) {\n  domainUpdated(id: $id) {\n    domain {\n      id\n      activeFields(sort: \"position asc, created_at asc\") {\n        id\n        position\n        customField {\n          id\n          name\n          fieldType\n        }\n      }\n      inactiveFields(sort: \"field_type asc\") {\n        id\n        name\n        fieldType\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b49251e5043bce0f8abed876645dfcda';

module.exports = node;
