/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type orderQueryContainer_query$ref: FragmentReference;
declare export opaque type orderQueryContainer_query$fragmentType: orderQueryContainer_query$ref;
export type orderQueryContainer_query = {|
  +customOrders: ?$ReadOnlyArray<{|
    +id: string,
    +name: ?string,
    +order: ?$ReadOnlyArray<string>,
  |}>,
  +activeCustomOrder: ?{|
    +id: string
  |},
  +defaultCustomOrder: ?{|
    +id: string
  |},
  +$refType: orderQueryContainer_query$ref,
|};
export type orderQueryContainer_query$data = orderQueryContainer_query;
export type orderQueryContainer_query$key = {
  +$data?: orderQueryContainer_query$data,
  +$fragmentRefs: orderQueryContainer_query$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "kind": "Variable",
  "name": "orderType",
  "variableName": "orderType"
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
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
  (v0/*: any*/),
  {
    "kind": "Variable",
    "name": "topicId",
    "variableName": "topicId"
  }
],
v3 = [
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "lenseId"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "lenseKey"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "orderType"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "queryLenseId"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "queryLenseKey"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "queryTopicId"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "topicId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "orderQueryContainer_query",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "lenseId",
          "variableName": "queryLenseId"
        },
        {
          "kind": "Variable",
          "name": "lenseKey",
          "variableName": "queryLenseKey"
        },
        (v0/*: any*/),
        {
          "kind": "Variable",
          "name": "topicId",
          "variableName": "queryTopicId"
        }
      ],
      "concreteType": "CustomOrder",
      "kind": "LinkedField",
      "name": "customOrders",
      "plural": true,
      "selections": [
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
          "name": "order",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v2/*: any*/),
      "concreteType": "CustomOrder",
      "kind": "LinkedField",
      "name": "activeCustomOrder",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v2/*: any*/),
      "concreteType": "CustomOrder",
      "kind": "LinkedField",
      "name": "defaultCustomOrder",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '8deae0615a53dd7301cd60a12e1845fc';

module.exports = node;
