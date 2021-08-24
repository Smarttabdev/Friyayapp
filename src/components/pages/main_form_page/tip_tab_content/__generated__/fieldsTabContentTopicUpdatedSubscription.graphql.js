/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type fieldsTabContentTopicUpdatedSubscriptionVariables = {|
  id: string
|};
export type fieldsTabContentTopicUpdatedSubscriptionResponse = {|
  +topicUpdated: {|
    +topic: ?{|
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
export type fieldsTabContentTopicUpdatedSubscription = {|
  variables: fieldsTabContentTopicUpdatedSubscriptionVariables,
  response: fieldsTabContentTopicUpdatedSubscriptionResponse,
|};
*/


/*
subscription fieldsTabContentTopicUpdatedSubscription(
  $id: ID!
) {
  topicUpdated(id: $id) {
    topic {
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
    "concreteType": "TopicUpdatedPayload",
    "kind": "LinkedField",
    "name": "topicUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Topic",
        "kind": "LinkedField",
        "name": "topic",
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
    "name": "fieldsTabContentTopicUpdatedSubscription",
    "selections": (v3/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "fieldsTabContentTopicUpdatedSubscription",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "d2fc386362d17fb030cb96e4a0c8770d",
    "id": null,
    "metadata": {},
    "name": "fieldsTabContentTopicUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription fieldsTabContentTopicUpdatedSubscription(\n  $id: ID!\n) {\n  topicUpdated(id: $id) {\n    topic {\n      id\n      activeFields(sort: \"position asc, created_at asc\") {\n        id\n        position\n        customField {\n          id\n          name\n          fieldType\n        }\n      }\n      inactiveFields(sort: \"field_type asc\") {\n        id\n        name\n        fieldType\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f7458f945f7e6b32056f4be6bd5d7648';

module.exports = node;
