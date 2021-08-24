/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RightActionBarContainer_query$ref: FragmentReference;
declare export opaque type RightActionBarContainer_query$fragmentType: RightActionBarContainer_query$ref;
export type RightActionBarContainer_query = {|
  +config: ?{|
    +id: string,
    +value: ?any,
  |},
  +$refType: RightActionBarContainer_query$ref,
|};
export type RightActionBarContainer_query$data = RightActionBarContainer_query;
export type RightActionBarContainer_query$key = {
  +$data?: RightActionBarContainer_query$data,
  +$fragmentRefs: RightActionBarContainer_query$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "owner"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "RightActionBarContainer_query",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "config",
          "value": "right_submenu_quick_open_close_array"
        },
        {
          "kind": "Variable",
          "name": "owner",
          "variableName": "owner"
        }
      ],
      "concreteType": "Config",
      "kind": "LinkedField",
      "name": "config",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "value",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '8d7cc7fe2c12e3d4b352f1bbde17ee8a';

module.exports = node;
