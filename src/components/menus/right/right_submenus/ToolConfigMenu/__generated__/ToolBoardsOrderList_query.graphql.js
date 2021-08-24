/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ToolBoardsOrderList_query$ref: FragmentReference;
declare export opaque type ToolBoardsOrderList_query$fragmentType: ToolBoardsOrderList_query$ref;
export type ToolBoardsOrderList_query = {|
  +customOrders: ?$ReadOnlyArray<{|
    +id: string,
    +name: ?string,
  |}>,
  +activeCustomOrder: ?{|
    +id: string
  |},
  +defaultCustomOrder: ?{|
    +id: string
  |},
  +$refType: ToolBoardsOrderList_query$ref,
|};
export type ToolBoardsOrderList_query$data = ToolBoardsOrderList_query;
export type ToolBoardsOrderList_query$key = {
  +$data?: ToolBoardsOrderList_query$data,
  +$fragmentRefs: ToolBoardsOrderList_query$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = [
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
    "value": "topics"
  },
  {
    "kind": "Variable",
    "name": "topicId",
    "variableName": "topicId"
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
      "name": "topicId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ToolBoardsOrderList_query",
  "selections": [
    {
      "alias": null,
      "args": (v0/*: any*/),
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
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "CustomOrder",
      "kind": "LinkedField",
      "name": "activeCustomOrder",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "CustomOrder",
      "kind": "LinkedField",
      "name": "defaultCustomOrder",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '8c2f700b06edc049ba7f7f52ed1088c4';

module.exports = node;
