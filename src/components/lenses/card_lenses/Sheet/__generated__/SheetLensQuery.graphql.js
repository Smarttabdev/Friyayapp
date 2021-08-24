/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SheetLensQueryVariables = {|
  topicId?: ?string,
  lenseId?: ?string,
  lenseKey?: ?string,
  tipIds: $ReadOnlyArray<string>,
  includeTips: boolean,
  customFieldValuesFilter?: ?any,
|};
export type SheetLensQueryResponse = {|
  +currentDomain: ?{|
    +id: string,
    +customFields: ?$ReadOnlyArray<{|
      +id: string,
      +name: string,
      +fieldType: string,
    |}>,
    +activeFields: ?$ReadOnlyArray<{|
      +id: string,
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
  +topicQuery: ?{|
    +id: string,
    +activeFields: ?$ReadOnlyArray<{|
      +id: string,
      +customField: {|
        +id: string
      |},
    |}>,
    +abilities: ?{|
      +self: ?{|
        +canUpdate: ?boolean
      |}
    |},
    +config: ?{|
      +value: ?any
    |},
  |},
  +tips?: ?$ReadOnlyArray<{|
    +id: string,
    +customFieldValues: ?$ReadOnlyArray<{|
      +id: string,
      +value: ?any,
      +customField: {|
        +id: string
      |},
    |}>,
  |}>,
  +activeColumnOrder: ?{|
    +id: string,
    +name: ?string,
    +order: ?$ReadOnlyArray<string>,
  |},
|};
export type SheetLensQuery = {|
  variables: SheetLensQueryVariables,
  response: SheetLensQueryResponse,
|};
*/


/*
query SheetLensQuery(
  $topicId: ID
  $lenseId: ID
  $lenseKey: String
  $tipIds: [ID!]!
  $includeTips: Boolean!
  $customFieldValuesFilter: JSON
) {
  currentDomain {
    id
    customFields {
      id
      name
      fieldType
    }
    activeFields {
      id
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
  topicQuery: topic(id: $topicId) {
    id
    activeFields {
      id
      customField {
        id
      }
    }
    abilities {
      self {
        canUpdate
      }
    }
    config(config: "expandedTopics") {
      value
      id
    }
  }
  tips: allTips(ids: $tipIds) @include(if: $includeTips) {
    id
    customFieldValues(filter: $customFieldValuesFilter) {
      id
      value
      customField {
        id
      }
    }
  }
  activeColumnOrder: activeCustomOrder(orderType: column_order, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {
    id
    name
    order
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
  "name": "includeTips"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseKey"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tipIds"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "CustomField",
  "kind": "LinkedField",
  "name": "customField",
  "plural": false,
  "selections": [
    (v6/*: any*/)
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "ActiveField",
  "kind": "LinkedField",
  "name": "activeFields",
  "plural": true,
  "selections": [
    (v6/*: any*/),
    (v8/*: any*/)
  ],
  "storageKey": null
},
v10 = [
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
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "Domain",
  "kind": "LinkedField",
  "name": "currentDomain",
  "plural": false,
  "selections": [
    (v6/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "CustomField",
      "kind": "LinkedField",
      "name": "customFields",
      "plural": true,
      "selections": [
        (v6/*: any*/),
        (v7/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "fieldType",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v9/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "DomainAbilities",
      "kind": "LinkedField",
      "name": "abilities",
      "plural": false,
      "selections": (v10/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v12 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "topicId"
  }
],
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "TopicAbilities",
  "kind": "LinkedField",
  "name": "abilities",
  "plural": false,
  "selections": (v10/*: any*/),
  "storageKey": null
},
v14 = [
  {
    "kind": "Literal",
    "name": "config",
    "value": "expandedTopics"
  }
],
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v16 = {
  "alias": "activeColumnOrder",
  "args": [
    {
      "kind": "Variable",
      "name": "lenseId",
      "variableName": "lenseId"
    },
    {
      "kind": "Variable",
      "name": "lenseKey",
      "variableName": "lenseKey"
    },
    {
      "kind": "Literal",
      "name": "orderType",
      "value": "column_order"
    },
    {
      "kind": "Variable",
      "name": "topicId",
      "variableName": "topicId"
    }
  ],
  "concreteType": "CustomOrder",
  "kind": "LinkedField",
  "name": "activeCustomOrder",
  "plural": false,
  "selections": [
    (v6/*: any*/),
    (v7/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "order",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v17 = {
  "condition": "includeTips",
  "kind": "Condition",
  "passingValue": true,
  "selections": [
    {
      "alias": "tips",
      "args": [
        {
          "kind": "Variable",
          "name": "ids",
          "variableName": "tipIds"
        }
      ],
      "concreteType": "Tip",
      "kind": "LinkedField",
      "name": "allTips",
      "plural": true,
      "selections": [
        (v6/*: any*/),
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
            (v6/*: any*/),
            (v15/*: any*/),
            (v8/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ]
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SheetLensQuery",
    "selections": [
      (v11/*: any*/),
      {
        "alias": "topicQuery",
        "args": (v12/*: any*/),
        "concreteType": "Topic",
        "kind": "LinkedField",
        "name": "topic",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          (v9/*: any*/),
          (v13/*: any*/),
          {
            "alias": null,
            "args": (v14/*: any*/),
            "concreteType": "Config",
            "kind": "LinkedField",
            "name": "config",
            "plural": false,
            "selections": [
              (v15/*: any*/)
            ],
            "storageKey": "config(config:\"expandedTopics\")"
          }
        ],
        "storageKey": null
      },
      (v16/*: any*/),
      (v17/*: any*/)
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v5/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "SheetLensQuery",
    "selections": [
      (v11/*: any*/),
      {
        "alias": "topicQuery",
        "args": (v12/*: any*/),
        "concreteType": "Topic",
        "kind": "LinkedField",
        "name": "topic",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          (v9/*: any*/),
          (v13/*: any*/),
          {
            "alias": null,
            "args": (v14/*: any*/),
            "concreteType": "Config",
            "kind": "LinkedField",
            "name": "config",
            "plural": false,
            "selections": [
              (v15/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": "config(config:\"expandedTopics\")"
          }
        ],
        "storageKey": null
      },
      (v16/*: any*/),
      (v17/*: any*/)
    ]
  },
  "params": {
    "cacheID": "eff7539ebb49f27ef6fba907ca847908",
    "id": null,
    "metadata": {},
    "name": "SheetLensQuery",
    "operationKind": "query",
    "text": "query SheetLensQuery(\n  $topicId: ID\n  $lenseId: ID\n  $lenseKey: String\n  $tipIds: [ID!]!\n  $includeTips: Boolean!\n  $customFieldValuesFilter: JSON\n) {\n  currentDomain {\n    id\n    customFields {\n      id\n      name\n      fieldType\n    }\n    activeFields {\n      id\n      customField {\n        id\n      }\n    }\n    abilities {\n      self {\n        canUpdate\n      }\n    }\n  }\n  topicQuery: topic(id: $topicId) {\n    id\n    activeFields {\n      id\n      customField {\n        id\n      }\n    }\n    abilities {\n      self {\n        canUpdate\n      }\n    }\n    config(config: \"expandedTopics\") {\n      value\n      id\n    }\n  }\n  tips: allTips(ids: $tipIds) @include(if: $includeTips) {\n    id\n    customFieldValues(filter: $customFieldValuesFilter) {\n      id\n      value\n      customField {\n        id\n      }\n    }\n  }\n  activeColumnOrder: activeCustomOrder(orderType: column_order, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n    name\n    order\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '17bac3f52a46067e77eead4a5aab8337';

module.exports = node;
