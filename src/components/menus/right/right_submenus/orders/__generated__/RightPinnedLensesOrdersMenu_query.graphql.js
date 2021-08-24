/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RightPinnedLensesOrdersMenu_query$ref: FragmentReference;
declare export opaque type RightPinnedLensesOrdersMenu_query$fragmentType: RightPinnedLensesOrdersMenu_query$ref;
export type RightPinnedLensesOrdersMenu_query = {|
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
  +$refType: RightPinnedLensesOrdersMenu_query$ref,
|};
export type RightPinnedLensesOrdersMenu_query$data = RightPinnedLensesOrdersMenu_query;
export type RightPinnedLensesOrdersMenu_query$key = {
  +$data?: RightPinnedLensesOrdersMenu_query$data,
  +$fragmentRefs: RightPinnedLensesOrdersMenu_query$ref,
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
  "name": "RightPinnedLensesOrdersMenu_query",
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
(node/*: any*/).hash = '398d4d74ca010571f40fba401c8f8234';

module.exports = node;
