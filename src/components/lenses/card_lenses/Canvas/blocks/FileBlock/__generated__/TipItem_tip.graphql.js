/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TipItem_tip$ref: FragmentReference;
declare export opaque type TipItem_tip$fragmentType: TipItem_tip$ref;
export type TipItem_tip = {|
  +id: string,
  +title: ?string,
  +slug: string,
  +attachments: $ReadOnlyArray<{|
    +id: string,
    +url: ?string,
  |}>,
  +$refType: TipItem_tip$ref,
|};
export type TipItem_tip$data = TipItem_tip;
export type TipItem_tip$key = {
  +$data?: TipItem_tip$data,
  +$fragmentRefs: TipItem_tip$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TipItem_tip",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
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
      "concreteType": "Attachment",
      "kind": "LinkedField",
      "name": "attachments",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Tip",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ee9401aa157d223e24c174e567610ece';

module.exports = node;
