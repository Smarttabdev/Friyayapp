/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RightUiSettings_query$ref: FragmentReference;
declare export opaque type RightUiSettings_query$fragmentType: RightUiSettings_query$ref;
export type RightUiSettings_query = {|
  +boardTabsClosed: ?{|
    +value: ?any
  |},
  +rightBarQuickOpen: ?{|
    +id: string,
    +value: ?any,
  |},
  +$refType: RightUiSettings_query$ref,
|};
export type RightUiSettings_query$data = RightUiSettings_query;
export type RightUiSettings_query$key = {
  +$data?: RightUiSettings_query$data,
  +$fragmentRefs: RightUiSettings_query$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "kind": "Variable",
  "name": "owner",
  "variableName": "owner"
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "config"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "owner"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "RightUiSettings_query",
  "selections": [
    {
      "alias": "boardTabsClosed",
      "args": [
        {
          "kind": "Variable",
          "name": "config",
          "variableName": "config"
        },
        (v0/*: any*/)
      ],
      "concreteType": "Config",
      "kind": "LinkedField",
      "name": "config",
      "plural": false,
      "selections": [
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": "rightBarQuickOpen",
      "args": [
        {
          "kind": "Literal",
          "name": "config",
          "value": "right_submenu_quick_open_close_array"
        },
        (v0/*: any*/)
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
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bdca7f3e7ea3c7d1e38bd0414d6bc9f3';

module.exports = node;
