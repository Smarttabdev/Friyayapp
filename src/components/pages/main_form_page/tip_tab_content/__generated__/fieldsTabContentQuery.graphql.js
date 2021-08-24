/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type fieldsTabContentQueryVariables = {|
  isDomain: boolean,
  isTip: boolean,
  topicId?: ?string,
  tipId: string,
|};
export type fieldsTabContentQueryResponse = {|
  +currentDomain?: ?{|
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
    +abilities: ?{|
      +self: ?{|
        +canUpdate: ?boolean
      |}
    |},
  |},
  +topicQuery?: ?{|
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
    +abilities: ?{|
      +self: ?{|
        +canUpdate: ?boolean
      |}
    |},
  |},
  +tip?: ?{|
    +id: string,
    +customFieldValues: ?$ReadOnlyArray<{|
      +id: string,
      +value: ?any,
      +customField: {|
        +id: string
      |},
    |}>,
    +abilities: ?{|
      +self: ?{|
        +canUpdate: ?boolean
      |}
    |},
  |},
|};
export type fieldsTabContentQuery = {|
  variables: fieldsTabContentQueryVariables,
  response: fieldsTabContentQueryResponse,
|};
*/


/*
query fieldsTabContentQuery(
  $isDomain: Boolean!
  $isTip: Boolean!
  $topicId: ID
  $tipId: ID!
) {
  currentDomain @include(if: $isDomain) {
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
    abilities {
      self {
        canUpdate
      }
    }
  }
  topicQuery: topic(id: $topicId) @skip(if: $isDomain) {
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
    abilities {
      self {
        canUpdate
      }
    }
  }
  tip(id: $tipId) @include(if: $isTip) {
    id
    customFieldValues {
      id
      value
      customField {
        id
      }
    }
    abilities {
      self {
        canUpdate
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "isDomain"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "isTip"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tipId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  (v4/*: any*/),
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
v6 = {
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
    (v4/*: any*/),
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
      "selections": (v5/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": "activeFields(sort:\"position asc, created_at asc\")"
},
v7 = {
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
  "selections": (v5/*: any*/),
  "storageKey": "inactiveFields(sort:\"field_type asc\")"
},
v8 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Abilities",
    "kind": "LinkedField",
    "name": "self",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "canUpdate",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "TopicAbilities",
  "kind": "LinkedField",
  "name": "abilities",
  "plural": false,
  "selections": (v8/*: any*/),
  "storageKey": null
},
v10 = [
  {
    "condition": "isDomain",
    "kind": "Condition",
    "passingValue": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Domain",
        "kind": "LinkedField",
        "name": "currentDomain",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "DomainAbilities",
            "kind": "LinkedField",
            "name": "abilities",
            "plural": false,
            "selections": (v8/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  {
    "condition": "isDomain",
    "kind": "Condition",
    "passingValue": false,
    "selections": [
      {
        "alias": "topicQuery",
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "topicId"
          }
        ],
        "concreteType": "Topic",
        "kind": "LinkedField",
        "name": "topic",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  {
    "condition": "isTip",
    "kind": "Condition",
    "passingValue": true,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "tipId"
          }
        ],
        "concreteType": "Tip",
        "kind": "LinkedField",
        "name": "tip",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CustomFieldValue",
            "kind": "LinkedField",
            "name": "customFieldValues",
            "plural": true,
            "selections": [
              (v4/*: any*/),
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
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "fieldsTabContentQuery",
    "selections": (v10/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "fieldsTabContentQuery",
    "selections": (v10/*: any*/)
  },
  "params": {
    "cacheID": "40bbb21dc7fbbbfa3cc1e7bfb5c61688",
    "id": null,
    "metadata": {},
    "name": "fieldsTabContentQuery",
    "operationKind": "query",
    "text": "query fieldsTabContentQuery(\n  $isDomain: Boolean!\n  $isTip: Boolean!\n  $topicId: ID\n  $tipId: ID!\n) {\n  currentDomain @include(if: $isDomain) {\n    id\n    activeFields(sort: \"position asc, created_at asc\") {\n      id\n      position\n      customField {\n        id\n        name\n        fieldType\n      }\n    }\n    inactiveFields(sort: \"field_type asc\") {\n      id\n      name\n      fieldType\n    }\n    abilities {\n      self {\n        canUpdate\n      }\n    }\n  }\n  topicQuery: topic(id: $topicId) @skip(if: $isDomain) {\n    id\n    activeFields(sort: \"position asc, created_at asc\") {\n      id\n      position\n      customField {\n        id\n        name\n        fieldType\n      }\n    }\n    inactiveFields(sort: \"field_type asc\") {\n      id\n      name\n      fieldType\n    }\n    abilities {\n      self {\n        canUpdate\n      }\n    }\n  }\n  tip(id: $tipId) @include(if: $isTip) {\n    id\n    customFieldValues {\n      id\n      value\n      customField {\n        id\n      }\n    }\n    abilities {\n      self {\n        canUpdate\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a6367ea1babcfe0c908cbef3966ae983';

module.exports = node;
