/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type PinnedToolsOrderList_query$ref: FragmentReference;
declare export opaque type PinnedToolsOrderList_query$fragmentType: PinnedToolsOrderList_query$ref;
export type PinnedToolsOrderList_query = {|
  +pinnedLensesOrders: ?$ReadOnlyArray<{|
    +id: string,
    +name: ?string,
  |}>,
  +activePinnedLensesOrder: ?{|
    +id: string
  |},
  +defaultPinnedLensesOrder: ?{|
    +id: string
  |},
  +$refType: PinnedToolsOrderList_query$ref,
|};
export type PinnedToolsOrderList_query$data = PinnedToolsOrderList_query;
export type PinnedToolsOrderList_query$key = {
  +$data?: PinnedToolsOrderList_query$data,
  +$fragmentRefs: PinnedToolsOrderList_query$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = [
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
      "name": "topicId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "PinnedToolsOrderList_query",
  "selections": [
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "PinnedLensesOrder",
      "kind": "LinkedField",
      "name": "pinnedLensesOrders",
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
      "concreteType": "PinnedLensesOrder",
      "kind": "LinkedField",
      "name": "activePinnedLensesOrder",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "PinnedLensesOrder",
      "kind": "LinkedField",
      "name": "defaultPinnedLensesOrder",
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
(node/*: any*/).hash = '1a384f291ad447fffdb9a75571e6b59e';

module.exports = node;
