/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type DashboardLens_query$ref: FragmentReference;
declare export opaque type DashboardLens_query$fragmentType: DashboardLens_query$ref;
export type DashboardLens_query = {|
  +linkedBoardsConfig: ?{|
    +value: ?any
  |},
  +$refType: DashboardLens_query$ref,
|};
export type DashboardLens_query$data = DashboardLens_query;
export type DashboardLens_query$key = {
  +$data?: DashboardLens_query$data,
  +$fragmentRefs: DashboardLens_query$ref,
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
  "name": "DashboardLens_query",
  "selections": [
    {
      "alias": "linkedBoardsConfig",
      "args": [
        {
          "kind": "Literal",
          "name": "config",
          "value": "dashboard_boards"
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
(node/*: any*/).hash = '4691e19ba66558a9a22915d56a86efd7';

module.exports = node;
