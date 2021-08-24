/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ItemList_items$ref: FragmentReference;
declare export opaque type ItemList_items$fragmentType: ItemList_items$ref;
export type ItemList_items = $ReadOnlyArray<{|
  +id: ?string,
  +itemId: ?string,
  +title: ?string,
  +slug: ?string,
  +baseType: ?string,
  +itemType: ?string,
  +createdAt: string,
  +updatedAt: string,
  +completedAt: ?string,
  +meta: ?any,
  +speed: ?number,
  +completion: ?number,
  +tip: ?{|
    +id: string,
    +parent: ?{|
      +id: string,
      +title: ?string,
    |},
    +topic: ?{|
      +id: string,
      +title: string,
    |},
  |},
  +topic: ?{|
    +id: string,
    +parent: ?{|
      +id: string,
      +title: string,
    |},
  |},
  +$refType: ItemList_items$ref,
|}>;
export type ItemList_items$data = ItemList_items;
export type ItemList_items$key = $ReadOnlyArray<{
  +$data?: ItemList_items$data,
  +$fragmentRefs: ItemList_items$ref,
  ...
}>;
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v2 = [
  (v0/*: any*/),
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ItemList_items",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "itemId",
      "storageKey": null
    },
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "baseType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "itemType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updatedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "completedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "meta",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "speed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "completion",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Tip",
      "kind": "LinkedField",
      "name": "tip",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Tip",
          "kind": "LinkedField",
          "name": "parent",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Topic",
          "kind": "LinkedField",
          "name": "topic",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Topic",
      "kind": "LinkedField",
      "name": "topic",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Topic",
          "kind": "LinkedField",
          "name": "parent",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Item",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '8e6c99da671bb0421eb8c910eaef6d53';

module.exports = node;
